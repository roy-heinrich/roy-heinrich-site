const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const repoRoot = path.resolve(__dirname, '..');
const indexPath = path.join(repoRoot, 'public', 'certs', 'index.json');
const certsDir = path.join(repoRoot, 'public', 'certs');

function safeReadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.error('Failed to read JSON:', p, err.message);
    process.exit(1);
  }
}

async function generatePlaceholder(filePath) {
  try {
    const buf = await sharp(filePath).resize(20).png().toBuffer();
    // further blur via CSS will be applied; return base64 data url
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch (err) {
    console.error('Failed to generate placeholder for', filePath, err.message);
    return null;
  }
}

async function main() {
  if (!fs.existsSync(indexPath)) {
    console.error('index.json not found at', indexPath);
    process.exit(1);
  }

  const data = safeReadJson(indexPath);
  if (!Array.isArray(data)) {
    console.error('index.json is not an array');
    process.exit(1);
  }

  const backupPath = indexPath + '.placeholders.bak';
  fs.copyFileSync(indexPath, backupPath);

  let updated = 0;
  for (const item of data) {
    if (!item) continue;
    const fileName = item.name || item.title || item.id;
    if (!fileName) continue;
    const filePath = path.join(certsDir, fileName);
    if (!fs.existsSync(filePath)) {
      const enc = encodeURIComponent(fileName);
      const altPath = path.join(certsDir, enc);
      if (fs.existsSync(altPath)) {
        item.placeholder = await generatePlaceholder(altPath);
        updated++;
      }
      continue;
    }
    const placeholder = await generatePlaceholder(filePath);
    if (placeholder) {
      item.placeholder = placeholder;
      updated++;
    }
  }

  fs.writeFileSync(indexPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Added placeholders for', updated, 'entries in', indexPath);
  console.log('Backup saved to', backupPath);
}

main();
