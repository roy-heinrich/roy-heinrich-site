const fs = require('fs');
const path = require('path');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

function CanvasFactory(Canvas) {
  this.Canvas = Canvas;
}

CanvasFactory.prototype = {
  create: function (width, height) {
    const canvas = this.Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    return { canvas, context: ctx };
  },
  reset: function (canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },
  destroy: function (canvasAndContext) {
    // no-op
  },
};

async function renderPdfBufferToJpeg(buffer, outPath, scale = 1.5) {
  const { createCanvas, Image } = require('canvas');

  const loadingTask = pdfjs.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext('2d');

  const renderTask = page.render({ canvasContext: ctx, viewport, canvasFactory: new CanvasFactory({ createCanvas }) });
  await renderTask.promise;

  const outBuf = canvas.toBuffer('image/jpeg', { quality: 0.85 });
  fs.writeFileSync(outPath, outBuf);
}

async function fetchArrayBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return await res.arrayBuffer();
}

async function main() {
  const manifestPath = path.join(__dirname, '..', 'public', 'certs', 'index.json');
  const thumbsDir = path.join(__dirname, '..', 'public', 'certs', 'thumbs');
  if (!fs.existsSync(manifestPath)) {
    console.error('Manifest not found:', manifestPath);
    process.exit(2);
  }
  if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  let created = 0;

  for (const entry of manifest) {
    const name = entry.name || entry.title || 'cert';
    const isPdf = /\.pdf$/i.test(name) || (entry.type && entry.type.includes('pdf'));
    const safeName = name.replace(/[^a-z0-9\.\-]+/gi, '_');
    const outPath = path.join(thumbsDir, `${safeName}.jpg`);
    if (fs.existsSync(outPath)) continue;

    try {
      if (!isPdf) {
        // download image directly
        const src = entry.directUrl || entry.previewUrl || entry.url;
        if (!src) throw new Error('No image URL');
        const arr = await fetchArrayBuffer(src);
        fs.writeFileSync(outPath, Buffer.from(arr));
        created++;
        console.log('Saved image thumb:', outPath);
        continue;
      }

      const src = entry.directUrl || entry.previewUrl || entry.url;
      if (!src) throw new Error('No PDF URL');
      console.log('Fetching PDF for', name);
      const arrbuf = await fetchArrayBuffer(src);
      await renderPdfBufferToJpeg(arrbuf, outPath, 1.5);
      console.log('Wrote thumbnail:', outPath);
      created++;
    } catch (err) {
      console.error('Failed to create thumb for', name, err && err.message ? err.message : err);
    }
  }

  console.log('Thumbnails created:', created);
}

main().catch(err => { console.error(err); process.exit(1); });
