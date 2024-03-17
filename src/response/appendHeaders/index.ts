import type { HttpResponse } from "uWebSockets.js";

export function appendHeaders(res: HttpResponse, headers: string[][]) {
  for (const [key, value] of headers) {
    res.writeHeader(key, value);
  }
}
