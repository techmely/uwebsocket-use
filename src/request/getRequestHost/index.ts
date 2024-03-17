import type { HttpRequest } from "uWebSockets.js";

/**
 * Get the request hostname.
 *
 * If `xForwardedHost` is `true`, it will use the `x-forwarded-host` header if it exists.
 *
 * If no host header is found, it will default to "localhost".
 */
export function getRequestHost(req: HttpRequest, opts: { xForwardedHost?: boolean } = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = req.getHeader("x-forwarded-host");
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return req.getHeader("host") || "localhost";
}
