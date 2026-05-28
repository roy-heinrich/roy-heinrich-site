import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return await res.text();
}

function extractFilenames(html) {
  // crude regex to capture filenames with common extensions
  const re = /([\w \-\(\)\[\]_–—.,]+\.(?:pdf|png|jpe?g|webp))/gi;
  const matches = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    matches.push(m[1].trim());
  }
  // unique while preserving order
  const uniq = [];
  for (const s of matches) {
    const lower = s.toLowerCase();
    if (lower.startsWith('logo_drive_') || lower.includes('broken_image') || lower === 'al-icon.png') continue;
    if (!uniq.includes(s)) uniq.push(s);
  }
  return uniq;
}

async function main() {
  const folderUrl = process.argv[2] || process.env.DRIVE_FOLDER_URL;
  if (!folderUrl) {
    console.error('Usage: node update-drive-names.js <drive-folder-url>');
    process.exit(2);
  }

  const base = path.resolve(process.cwd(), 'public', 'certs-drive.json');
  const raw = await fs.readFile(base, 'utf8');
  const entries = JSON.parse(raw);

  console.log('Fetching folder page to extract filenames...');
  const html = await fetchText(folderUrl);
  const names = extractFilenames(html);
  console.log(`Found ${names.length} candidate filenames.`);

  // Map names to entries by order. If lengths mismatch, map as many as possible.
  const certificateNames = names.filter((name) => !/^\d+\.png$/i.test(name) && !/^logo_drive_/i.test(name));
  const count = Math.min(entries.length, certificateNames.length);
  for (let i = 0; i < count; i++) {
    entries[i].name = certificateNames[i];
  }

  // As fallback, for entries without a name, derive from id
  for (let i = 0; i < entries.length; i++) {
    if (!entries[i].name) {
      const id = entries[i].id || entries[i].name || `Certificate ${i + 1}`;
      // convert id-like names to nicer text
      const nice = id
        .replace(/[-_]/g, ' ')
        .replace(/\b([A-Z]{2,})\b/g, (m) => m.toUpperCase())
        .replace(/\s+/g, ' ')
        .trim();
      entries[i].name = nice;
    }
  }

  await fs.writeFile(base, JSON.stringify(entries, null, 2), 'utf8');
  console.log(`Updated ${base} with ${entries.length} names.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
