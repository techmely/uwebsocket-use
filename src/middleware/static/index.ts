import { type Stats, createReadStream, lstatSync } from "node:fs";
import path from "node:path";
import { lookupMineType } from "@techmely/utils";
import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { appendHeaders } from "../../response/appendHeaders";

export const serverStatic = (dir: string) => (res: HttpResponse, req: HttpRequest) => {
  try {
    const url = req.getUrl().slice(1) || "index.html";
    const filePath = path.resolve(dir, url);
    const isFileOutsideDir = filePath.indexOf(path.resolve(dir)) !== 0;

    if (isFileOutsideDir) {
      res.writeStatus("403");
      res.end();
      return;
    }

    const fileStats = getFileStats(filePath);

    if (!fileStats) {
      res.writeStatus("404");
      res.end();
      return;
    }

    const { contentType, lastModified } = fileStats;
    const ifModifiedSince = req.getHeader("if-modified-since");

    if (ifModifiedSince === lastModified) {
      res.writeStatus("304");
      res.end();
      return;
    }
    appendHeaders(res, [
      ["Content-Type", contentType],
      ["Last-Modified", lastModified],
    ]);

    streamFile(res, fileStats);
  } catch (error) {
    res.writeStatus("500");
    res.end(error);
  }
};

function getFileStats(filePath: string): FileStats | undefined {
  const stats: Stats | undefined = lstatSync(filePath, { throwIfNoEntry: false });

  if (!stats || stats.isDirectory()) {
    return;
  }
  const fileExtension = path.extname(filePath);
  const contentType = lookupMineType(fileExtension) || "application/octet-stream";
  const { mtime, size } = stats;
  const lastModified = mtime.toUTCString();

  return { filePath, lastModified, size, contentType };
}

const toArrayBuffer = (buffer: Buffer) => {
  const { buffer: arrayBuffer, byteOffset, byteLength } = buffer;
  return arrayBuffer.slice(byteOffset, byteOffset + byteLength);
};

function streamFile(res: HttpResponse, { filePath, size }: FileStats) {
  const readStream = createReadStream(filePath);
  const destroyReadStream = () => !readStream.destroyed && readStream.destroy();

  const onError = (error: Error) => {
    destroyReadStream();
    throw error;
  };

  const onDataChunk = (chunk: Buffer) => {
    const arrayBufferChunk = toArrayBuffer(chunk);

    res.cork(() => {
      const lastOffset = res.getWriteOffset();
      const [ok, done] = res.tryEnd(arrayBufferChunk, size);

      if (!done && !ok) {
        readStream.pause();

        res.onWritable((offset) => {
          const [ok, done] = res.tryEnd(arrayBufferChunk.slice(offset - lastOffset), size);

          if (!done && ok) {
            readStream.resume();
          }

          return ok;
        });
      }
    });
  };

  res.onAborted(destroyReadStream);
  readStream.on("data", onDataChunk).on("error", onError).on("end", destroyReadStream);
}

type FileStats = {
  filePath: string;
  lastModified: string;
  size: number;
  contentType: string;
};
