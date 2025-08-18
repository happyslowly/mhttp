import { pipeline } from "stream/promises";
import { RequestOptions } from "./index";
import { logger } from "./logger";
import { mimeToExtension } from "./mime";
import { createWriteStream } from "fs";
import { SingleBar } from "cli-progress";
import { Transform } from "stream";

export async function makeRequest(r: RequestOptions) {
  try {
    const resp = await fetch(r.url, {
      method: r.method,
      headers: r.headers,
      body: r.data,
    });
    await handleResponse(resp, r.verbose);
  } catch (error) {
    throw new Error(`Unable to reach: ${r.url}`);
  }
}

async function handleResponse(resp: Response, verbose: boolean) {
  if (verbose) {
    logger.log(`HTTP/1.1 ${resp.status} ${resp.statusText}`);
    for (const [key, value] of resp.headers.entries()) {
      logger.log(`${key} ${value}`);
    }
    logger.log("");
  }

  if (resp.status < 200 || resp.status >= 400) {
    throw new Error(`${resp.status} ${resp.statusText}`);
  }

  const contentType = resp.headers.get("content-type") || "";

  if (
    contentType.includes("text/event-stream") ||
    contentType.includes("chunked")
  ) {
    await handleStreaming(resp);
  } else if (isBinaryContentType(contentType)) {
    await handleBinary(resp);
  } else if (contentType.includes("application/json")) {
    const json = await resp.json();
    logger.log(JSON.stringify(json, null, 2));
  } else {
    const text = await resp.text();
    logger.log(text);
  }
}

async function handleStreaming(resp: Response) {
  const reader = resp.body?.getReader();
  if (reader) {
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        process.stdout.write(chunk);
      }
    } catch (error) {
      throw new Error(`Streaming error: ${(error as Error).message}`);
    } finally {
      reader.releaseLock();
    }
  }
}

function isBinaryContentType(contentType: string): boolean {
  const binaryTypes = [
    "application/octet-stream",
    "application/zip",
    "application/pdf",
    "application/zip",
    "image/",
    "audio/",
    "video/",
    "application/vnd.",
    "application/x-executable",
  ];
  return binaryTypes.some((t) => contentType.toLowerCase().includes(t));
}

async function handleBinary(resp: Response) {
  const contentType = resp.headers.get("content-type") || "";
  const contentDisposition = resp.headers.get("content-disposition") || "";
  const contentLength = resp.headers.get("content-length")
    ? parseInt(resp.headers.get("content-length")!)
    : null;
  let filename = undefined;
  if (contentDisposition) {
    filename = extractFilename(contentDisposition);
  }
  if (!filename) {
    filename = getDefaultFilename(contentType);
  }
  if (!filename) {
    throw new Error("Cannot determine filename");
  }

  const stream = resp.body;
  if (stream) {
    try {
      const writer = createWriteStream(filename);
      let written = 0;
      let progressBar = null;
      if (contentLength && contentLength > 0) {
        progressBar = new SingleBar({
          format: "Progress [{bar}] {percentage}% | {value}/{total} bytes",
          barCompleteChar: "\u2588",
          barIncompleteChar: "\u2591",
          hideCursor: true,
          fps: 5,
        });
        progressBar.start(contentLength, 0, { speed: "0.00" });
      }

      const progressStream = new Transform({
        transform(chunk, _encoding, callback) {
          written += chunk.length;
          if (progressBar) {
            progressBar.update(written);
          }
          callback(null, chunk);
        },
      });
      await pipeline(stream, progressStream, writer);

      if (progressBar) {
        progressBar.stop();
      }
    } catch (error) {
      throw new Error(`Write file error: ${(error as Error).message}`);
    }
  }
}

function extractFilename(contentDisposition: string): string | undefined {
  // Match quoted filename
  const quotedMatch = contentDisposition.match(/filename="([^"]*)"/);
  if (quotedMatch) return quotedMatch[1];

  // Match unquoted filename
  const unquotedMatch = contentDisposition.match(/filename=([^;\n]*)/);
  if (unquotedMatch) return unquotedMatch[1].trim();

  // Match UTF-8 encoded filename
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;\n]*)/);
  if (utf8Match) return decodeURIComponent(utf8Match[1]);

  return undefined;
}

function getDefaultFilename(contentType: string): string | undefined {
  if (!contentType) {
    return undefined;
  }

  const defaultName = "Untitled";
  const ext = mimeToExtension[contentType] || ".bin";
  return `${defaultName}.${ext}`;
}
