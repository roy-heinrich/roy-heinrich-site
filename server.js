import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT || 10000);
const APP_ORIGIN = "http://127.0.0.1";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.join(__dirname, "dist", "client");
const ASSET_DIR = path.join(CLIENT_DIR, "assets");

const STATIC_CONTENT_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function getContentType(filePath) {
  return STATIC_CONTENT_TYPES.get(path.extname(filePath).toLowerCase()) || "application/octet-stream";
}

async function serveStaticAsset(request, response) {
  const { pathname } = new URL(request.url || "/", `${APP_ORIGIN}:${PORT}`);
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;

  const candidatePath = normalizedPath.startsWith("/assets/")
    ? path.join(ASSET_DIR, normalizedPath.slice("/assets/".length))
    : path.join(CLIENT_DIR, normalizedPath.slice(1));

  const resolvedPath = path.resolve(candidatePath);
  const allowedRoot = normalizedPath.startsWith("/assets/") ? ASSET_DIR : CLIENT_DIR;

  if (!resolvedPath.startsWith(path.resolve(allowedRoot) + path.sep) && resolvedPath !== path.resolve(allowedRoot)) {
    return false;
  }

  try {
    const file = await readFile(resolvedPath);
    response.writeHead(200, {
      "content-type": getContentType(resolvedPath),
      "cache-control": normalizedPath.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    });
    response.end(file);
    return true;
  } catch {
    return false;
  }
}

function toNodeHeaders(headers) {
  const nodeHeaders = {};
  for (const [key, value] of headers.entries()) {
    if (nodeHeaders[key]) {
      nodeHeaders[key] = `${nodeHeaders[key]}, ${value}`;
    } else {
      nodeHeaders[key] = value;
    }
  }
  return nodeHeaders;
}

async function readRequestBody(request) {
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined;
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return chunks.length > 0 ? Buffer.concat(chunks) : undefined;
}

const { default: workerEntry } = await import("./dist/server/index.js");

if (!workerEntry || typeof workerEntry.fetch !== "function") {
  throw new Error("Expected a fetch handler from dist/server/index.js");
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" || req.method === "HEAD") {
      const served = await serveStaticAsset(req, res);
      if (served) {
        return;
      }
    }

    const body = await readRequestBody(req);
    const url = new URL(req.url || "/", `${APP_ORIGIN}:${PORT}`);

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
    });

    const response = await workerEntry.fetch(request, process.env, {});

    res.writeHead(response.status, toNodeHeaders(response.headers));

    if (req.method === "HEAD" || response.body == null) {
      res.end();
      return;
    }

    const reader = response.body.getReader();
    const encoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(typeof value === "string" ? value : Buffer.from(value));
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});