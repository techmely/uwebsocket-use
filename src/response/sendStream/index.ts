import type { ReadableStream } from "node:stream";

/**
 * Send a stream response to the client.
 *
 * Note: You can directly `return` a stream value inside event handlers alternatively which is recommended.
 */
export function sendStream(res: HttpResponse, stream: Readable | ReadableStream) {
  // Validate input
  if (!stream || typeof stream !== "object") {
    throw new Error("[uws] Invalid stream provided");
  }

  // Node.js Readable Streams
  // https://nodejs.org/api/stream.html#readable-streams
  if ("pipe" in stream && typeof (stream as Readable).pipe === "function") {
    return new Promise((resolve, reject) => {
      (stream as Readable).pipe(res);

      // Handle stream events (if supported)
      if ((stream as Readable).on) {
        (stream as Readable)
          .on("end", () => {
            res.end();
          })(stream as Readable)
          .on("error", (err: Error) => {
            reject(err);
          });
      }

      res.on("close", () => {
        // https://react.dev/reference/react-dom/server/renderToPipeableStream
        if ((stream as any).abort) {
          (stream as any).abort();
        }
      });
    });
  }
}
