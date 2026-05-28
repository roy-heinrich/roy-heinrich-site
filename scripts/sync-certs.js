import fs from 'fs/promises';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const SRC = process.env.CERTS_SRC || `C:\\Users\\heinz\\Documents\\Certificates DICT`;
const OUT_DIR = path.resolve(process.cwd(), 'public', 'certs');
const DATE_PATTERNS = [
  /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s+\d{1,2},?\s+\d{4}\b/i,
  /\b\d{1,2}(?:st|nd|rd|th)?\s+(?:day of\s+)?(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?),?\s+\d{4}\b/i,
  /\b\d{4}-\d{2}-\d{2}\b/,
  /\b\d{1,2}\/\d{1,2}\/\d{4}\b/,
];

function normalizeDateText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

async function extractPdfText(filePath) {
  const data = await fs.readFile(filePath);
  const doc = await getDocument({ data: new Uint8Array(data) }).promise;
  let text = '';
  const pages = Math.min(doc.numPages, 3);

  for (let pageNum = 1; pageNum <= pages; pageNum += 1) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    text += `${content.items.map((item) => item.str).join(' ')}\n`;
  }

  await doc.destroy();
  return normalizeDateText(text);
}

function extractDate(text) {
  for (const pattern of DATE_PATTERNS) {
    const match = text.match(pattern);
    if (match?.[0]) return match[0].replace(/\s+/g, ' ').trim();
  }
  return '';
}

function formatDate(rawDate) {
  const value = rawDate.replace(/\b(\d{1,2})(st|nd|rd|th)\b/gi, '$1');
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return rawDate;
}

async function main() {
  try {
    await fs.mkdir(OUT_DIR, { recursive: true });
    const entries = await fs.readdir(SRC);
    const allowed = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp']);
    const items = [];

    for (const name of entries) {
      const ext = path.extname(name).toLowerCase();
      if (!allowed.has(ext)) continue;
      const srcPath = path.join(SRC, name);
      const destPath = path.join(OUT_DIR, name);
      try {
        await fs.copyFile(srcPath, destPath);
        const type = ext === '.pdf' ? 'application/pdf' : `image/${ext.slice(1)}`;
        let date = '';
        if (ext === '.pdf') {
          try {
            const text = await extractPdfText(srcPath);
            const extracted = extractDate(text);
            date = extracted ? formatDate(extracted) : '';
          } catch (err) {
            console.warn(`Failed to extract date from ${name}:`, err);
          }
        }
        items.push({ name, url: `/certs/${encodeURIComponent(name)}`, type, date });
      } catch (err) {
        console.warn(`Failed to copy ${name}:`, err);
      }
    }

    await fs.writeFile(path.join(OUT_DIR, 'index.json'), JSON.stringify(items, null, 2), 'utf8');
    console.log(`Copied ${items.length} certificate(s) to ${OUT_DIR}`);
  } catch (err) {
    console.error('sync-certs error:', err);
    process.exitCode = 1;
  }
}

main();
