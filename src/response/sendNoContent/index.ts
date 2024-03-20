import { HTTP_NO_CONTENT } from "@techmely/http";
import type { HttpResponse } from "uWebSockets.js";

/**
 * Respond with an empty payload.<br>
 *
 * Note that calling this function will close the connection and no other data can be sent to the client afterwards.
 *
 * @param event H3 event
 * @param code status code to be send. By default, it is `204 No Content`.
 */
export function sendNoContent(res: HttpResponse, code?: number) {
  if (!code && res.statusCode !== 200) {
    // status code was set with setResponseStatus
    code = res.statusCode;
  }
  const _code = code || HTTP_NO_CONTENT;
  // 204 responses MUST NOT have a Content-Length header field
  // https://www.rfc-editor.org/rfc/rfc7230#section-3.3.2
  if (_code === 204) {
    res.writeHeader("content-length", "");
  }
  res.writeHead(_code);
  res.end();
}
