import type { HttpRequest } from "uWebSockets.js";

/**
 * Check if the incoming request is a CORS preflight request.
 */
export function isPreflightRequest(req: HttpRequest): boolean {
  const origin = req.getHeader("origin");
  const accessControlRequestMethod = req.getHeader("access-control-request-method");

  return req.getMethod() === "OPTIONS" && !!origin && !!accessControlRequestMethod;
}
