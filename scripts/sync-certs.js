import fs from 'fs/promises';
import path from 'path';
import { Dropbox } from 'dropbox';

const OUT_DIR = path.resolve(process.cwd(), 'public', 'certs');
const MANIFEST_PATH = path.join(OUT_DIR, 'index.json');
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg']);

function parseEnvFile(contents) {
  const values = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.replace(/^\uFEFF/, '').trim();
    if (!line || line.startsWith('#')) continue;

    const equalsIndex = line.indexOf('=');
    if (equalsIndex === -1) continue;

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

async function loadWorkspaceEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    const contents = await fs.readFile(envPath, 'utf8');
    return parseEnvFile(contents);
  } catch {
    return {};
  }
}

const workspaceEnv = await loadWorkspaceEnv();
const DROPBOX_ACCESS_TOKEN =
  process.env.DROPBOX_TOKEN ||
  workspaceEnv.DROPBOX_TOKEN ||
  process.env.DROPBOX_ACCESS_TOKEN ||
  workspaceEnv.DROPBOX_ACCESS_TOKEN ||
  '';
const DROPBOX_CERTS_FOLDER =
  process.env.DROPBOX_CERTS_FOLDER || workspaceEnv.DROPBOX_CERTS_FOLDER || '/Certificates';

if (!DROPBOX_ACCESS_TOKEN) {
  throw new Error('Missing Dropbox access token. Set DROPBOX_TOKEN in .env.');
}

const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });

function toRawDropboxUrl(sharedUrl) {
  if (!sharedUrl) return '';

  try {
    const parsed = new URL(sharedUrl);
    parsed.searchParams.delete('dl');
    parsed.searchParams.delete('raw');
    parsed.searchParams.set('raw', '1');
    return parsed.toString();
  } catch {
    return sharedUrl.includes('raw=1')
      ? sharedUrl
      : `${sharedUrl}${sharedUrl.includes('?') ? '&' : '?'}raw=1`;
  }
}

function getType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext) ? `image/${ext.slice(1) === 'jpg' ? 'jpeg' : ext.slice(1)}` : 'application/pdf';
}

async function getSharedUrl(filePath) {
  try {
    const created = await dbx.filesGetTemporaryLink({ path: filePath });
    return created.result.link;
  } catch (error) {
    throw error;
  }
}

async function main() {
  try {
    await fs.mkdir(OUT_DIR, { recursive: true });

    let existing = [];
    try {
      const raw = await fs.readFile(MANIFEST_PATH, 'utf8');
      existing = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
    } catch {
      existing = [];
    }

    const metadataByName = new Map(
      existing
        .filter((item) => item?.name)
        .map((item) => [item.name.trim().toLowerCase(), item])
    );

    const items = [];

    for (const [normalizedName, metadata] of metadataByName.entries()) {
      const dropboxPath = `${DROPBOX_CERTS_FOLDER.replace(/\/+$/, '')}/${metadata.name}`;
      const sharedUrl = await getSharedUrl(dropboxPath);
      items.push({
        ...metadata,
        id: metadata.id,
        name: metadata.name,
        type: metadata.type ?? getType(metadata.name),
        url: sharedUrl,
        previewUrl: sharedUrl,
        directUrl: sharedUrl,
      });
    }

    await fs.writeFile(MANIFEST_PATH, JSON.stringify(items, null, 2), 'utf8');
    console.log(`Wrote ${items.length} Dropbox-backed certificate entries to ${MANIFEST_PATH}`);
  } catch (error) {
    console.error('sync-certs error:', error);
    process.exitCode = 1;
  }
}

main();
