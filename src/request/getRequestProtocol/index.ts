import type { HttpRequest } from "uWebSockets.js";

/**
 * Get the request protocol.
 *
 * If `x-forwarded-proto` header is set to "https", it will return "https". You can disable this behavior by setting `xForwardedProto` to `false`.
 *
 * If protocol cannot be determined, it will default to "http".
 */
export function getRequestProtocol(req: HttpRequest, opts: { xForwardedProto?: boolean } = {}) {
  if (opts.xForwardedProto !== false && req.getHeader("x-forwarded-proto") === "https") {
    return "https";
  }
  return "http";
}
