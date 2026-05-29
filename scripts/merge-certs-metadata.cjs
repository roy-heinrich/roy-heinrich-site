const fs = require('fs');
const path = require('path');

function readFile(p){
  return fs.readFileSync(p, 'utf8');
}

function parseCsv(content){
  // Simple CSV parser that handles quoted fields with commas
  // some exported CSVs may contain literal "\\r" sequences; normalize them to real newlines
  const normalized = content.replace(/\\r/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split(/\n/).map(l => l.replace(/\n/g,'')).filter(Boolean);
  console.log('CSV lines read:', lines.length);
  // Find header line index robustly
  let headerIdx = lines.findIndex(l => {
    const low = l.toLowerCase();
    return low.includes('training') && low.includes('title') && l.includes(',');
  });
  if(headerIdx === -1) headerIdx = 0;
  console.log('Header index:', headerIdx);
  console.log('First 8 CSV lines:', lines.slice(0,8));
  const rows = [];
  for(let i = headerIdx+1; i < lines.length; i++){
    const line = lines[i];
    const fields = [];
    let cur = '';
    let inQuotes = false;
    for(let j=0;j<line.length;j++){
      const ch = line[j];
      if(ch === '"'){
        inQuotes = !inQuotes;
        continue;
      }
      if(ch === ',' && !inQuotes){
        fields.push(cur.trim());
        cur = '';
        continue;
      }
      cur += ch;
    }
    fields.push(cur.trim());
    // ensure three columns
    while(fields.length < 3) fields.push('');
    rows.push({title: fields[0], type: fields[1], date: fields[2]});
  }
  return rows.filter(r => r.title && r.title.length>0);
}

function normalize(s){
  return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}

function main(){
  const csvPath = process.argv[2] || path.join(process.env.USERPROFILE||'', 'Downloads', 'Certificates_Summary_Report.csv');
  const manifestPath = path.join(__dirname, '..', 'public', 'certs', 'index.json');

  if(!fs.existsSync(csvPath)){
    console.error('CSV not found:', csvPath);
    process.exit(2);
  }
  if(!fs.existsSync(manifestPath)){
    console.error('Manifest not found:', manifestPath);
    process.exit(2);
  }

  const csv = readFile(csvPath);
  const rows = parseCsv(csv);
  const manifest = JSON.parse(readFile(manifestPath));

  const csvMap = rows.map(r => ({...r, norm: normalize(r.title)}));

  let matched = 0;
  manifest.forEach(entry => {
    const baseName = entry.name.replace(/\.[^.]+$/, '');
    const normName = normalize(baseName);

    // find exact or substring match
    let best = null;
    for(const c of csvMap){
      if(c.norm === normName || normName.includes(c.norm) || c.norm.includes(normName)){
        // prefer longer matches
        if(!best || c.norm.length > best.norm.length) best = c;
      }
    }

    if(!best){
      // try token overlap: count shared words
      let bestScore = 0;
      for(const c of csvMap){
        const a = new Set(normName.split(' '));
        const b = new Set(c.norm.split(' '));
        let score = 0;
        a.forEach(w => { if(b.has(w) && w.length>2) score++; });
        if(score > bestScore){ bestScore = score; best = c; }
      }
      if(bestScore === 0) best = null;
    }

    if(best){
      entry.title = best.title;
      entry.certType = best.type;
      entry.date = best.date;
      matched++;
    }
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Merged metadata. CSV rows:', rows.length, 'Manifest entries:', manifest.length, 'Matched:', matched);
}

main();
