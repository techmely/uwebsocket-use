import type { HttpResponse } from "uWebSockets.js";

export function appendHeaders(res: HttpResponse, headers: Record<string, any>) {
  const headersEntries = Object.entries(headers);
  for (const [key, value] of headersEntries) {
    res.writeHeader(key, value);
  }
}
