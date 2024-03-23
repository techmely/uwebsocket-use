import { HTTP_TEMPORARY_REDIRECT } from "@techmely/http";
import type { HttpResponse } from "uWebSockets.js";

/**
 * Send a redirect response to the client.
 *
 * It adds the `location` header to the response and sets the status code to 302 by default.
 *
 * In the body, it sends a simple HTML page with a meta refresh tag to redirect the client in case the headers are ignored.
 */
export function sendRedirect(
  res: HttpResponse,
  location: string,
  code = HTTP_TEMPORARY_REDIRECT,
) {
  res.writeStatus(String(code));
  res.setHeader("location", location);
  res.writeHeader("content-type", "text/html");
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  res.end(html);
}
