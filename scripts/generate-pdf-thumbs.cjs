const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function saveImageBuffer(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
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

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  let created = 0;
  for (const entry of manifest) {
    const name = entry.name || entry.title || 'cert';
    const isPdf = /\.pdf$/i.test(name) || (entry.type && entry.type.includes('pdf'));
    const safeName = name.replace(/[^a-z0-9\.\-]+/gi, '_');
    const outPath = path.join(thumbsDir, `${safeName}.jpg`);
    if (fs.existsSync(outPath)) continue;

    try {
      if (!isPdf) {
        // image: download directly
        const src = entry.directUrl || entry.previewUrl || entry.url;
        if (!src) throw new Error('No image URL');
        await saveImageBuffer(src, outPath);
        console.log('Saved image thumbnail for', name);
        created++;
        continue;
      }

      const src = entry.directUrl || entry.previewUrl || entry.url;
      if (!src) throw new Error('No PDF URL');

      console.log('Rendering PDF thumbnail for', name);
      // Fetch PDF bytes server-side, then render first page in a small HTML page using pdf.js
      const resp = await fetch(src);
      if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
      const arr = new Uint8Array(await resp.arrayBuffer());
      const base64 = Buffer.from(arr).toString('base64');
      const html = `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;">
        <canvas id="c"></canvas>
        <script src="https://unpkg.com/pdfjs-dist/build/pdf.min.js"></script>
        <script>
          (async function(){
            const url = 'data:application/pdf;base64,${base64}';
            const res = await fetch(url);
            const data = await res.arrayBuffer();
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js';
            const pdf = await pdfjsLib.getDocument({data}).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({scale: 1.5});
            const canvas = document.getElementById('c');
            canvas.width = viewport.width; canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({canvasContext: ctx, viewport}).promise;
            document.title = 'rendered';
          })();
        </script>
      </body></html>`;

      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.waitForFunction('document.title === "rendered"', { timeout: 60000 });
      const canvasEl = await page.$('canvas');
      if (!canvasEl) throw new Error('Canvas not found');
      await canvasEl.screenshot({ path: outPath, type: 'jpeg', quality: 80 });
      console.log('Wrote thumbnail:', outPath);
      created++;
    } catch (err) {
      console.error('Failed:', name, err && err.message ? err.message : err);
    }
  }

  await browser.close();
  console.log('Thumbnails created:', created);
}

main().catch(err => { console.error(err); process.exit(1); });
