const fs = require('fs');
const path = require('path');

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

function main() {
  if (!fs.existsSync(indexPath)) {
    console.error('index.json not found at', indexPath);
    process.exit(1);
  }

  const data = safeReadJson(indexPath);
  if (!Array.isArray(data)) {
    console.error('index.json is not an array');
    process.exit(1);
  }

  const backupPath = indexPath + '.bak';
  fs.copyFileSync(indexPath, backupPath);

  let updated = 0;
  for (const item of data) {
    if (!item) continue;
    const hasDate = item.date && String(item.date).trim().length > 0;
    if (hasDate) continue;

    const fileName = item.name || item.title || item.id;
    if (!fileName) continue;
    const filePath = path.join(certsDir, fileName);
    if (!fs.existsSync(filePath)) {
      // try encoded name variant
      const enc = encodeURIComponent(fileName);
      const altPath = path.join(certsDir, enc);
      if (fs.existsSync(altPath)) {
        const stat = fs.statSync(altPath);
        item.date = stat.mtime.toISOString().slice(0, 10);
        updated++;
      }
      continue;
    }

    try {
      const stat = fs.statSync(filePath);
      item.date = stat.mtime.toISOString().slice(0, 10);
      updated++;
    } catch (err) {
      // ignore
    }
  }

  fs.writeFileSync(indexPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Updated', updated, 'entries in', indexPath);
  console.log('Backup saved to', backupPath);
}

main();
