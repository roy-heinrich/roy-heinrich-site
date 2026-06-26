import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve path to the SSR worker entry built by Vite
const workerEntryPath = path.resolve(__dirname, "..", "dist", "server", "index.js");
const { default: workerEntry } = await import(workerEntryPath);

if (!workerEntry || typeof workerEntry.fetch !== "function") {
  throw new Error("Expected a fetch handler from dist/server/index.js");
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

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const body = await readRequestBody(req);

    const request = new Request(url.toString(), {
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
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }

    res.end();
  } catch (error) {
    console.error("Vercel Serverless SSR Error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error: " + error.message);
  }
}
