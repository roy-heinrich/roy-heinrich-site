import http from "node:http";

const PORT = Number(process.env.PORT || 10000);
const APP_ORIGIN = "http://127.0.0.1";

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