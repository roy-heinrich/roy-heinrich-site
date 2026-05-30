const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const repoRoot = path.resolve(__dirname, '..');
const indexPath = path.join(repoRoot, 'public', 'certs', 'index.json');
const certsDir = path.join(repoRoot, 'public', 'certs');
const thumbsDir = path.join(certsDir, 'thumbs');

function safeReadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.error('Failed to read JSON:', p, err.message);
    process.exit(1);
  }
}

const crypto = require('crypto');
async function makeThumb(srcPath, outPath) {
  await sharp(srcPath).resize({ width: 640 }).jpeg({ quality: 80 }).toFile(outPath);
}

async function main() {
  if (!fs.existsSync(indexPath)) {
    console.error('index.json not found at', indexPath);
    process.exit(1);
  }
  if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });

  const data = safeReadJson(indexPath);
  if (!Array.isArray(data)) {
    console.error('index.json is not an array');
    process.exit(1);
  }

  const backupPath = indexPath + '.thumbs.bak';
  fs.copyFileSync(indexPath, backupPath);

  let updated = 0;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (!item) continue;
    const fileName = item.name || item.title || item.id;
    if (!fileName) continue;
    const srcPath = path.join(certsDir, fileName);
    let actualSrc = srcPath;
    if (!fs.existsSync(srcPath)) {
      const enc = encodeURIComponent(fileName);
      const altPath = path.join(certsDir, enc);
      if (fs.existsSync(altPath)) actualSrc = altPath;
      else continue;
    }

    // create a short hash-based filename to avoid long/invalid names
    const hash = crypto.createHash('sha1').update(String(fileName)).digest('hex').slice(0, 12);
    const outName = `${hash}.jpg`;
    const outPath = path.join(thumbsDir, outName);
    try {
      // skip if already exists
      if (!fs.existsSync(outPath)) await makeThumb(actualSrc, outPath);
      item.thumbnail = `/certs/thumbs/${outName}`;
      updated++;
    } catch (e) {
      console.error('thumb error', actualSrc, e.message);
    }
  }

  fs.writeFileSync(indexPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Generated', updated, 'thumbnails and updated', indexPath);
  console.log('Backup saved to', backupPath);
}

main().catch((e) => { console.error(e); process.exit(1); });
