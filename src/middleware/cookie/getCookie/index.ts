import { parseCookie } from "@techmely/utils";
import type { HttpRequest } from "uWebSockets.js";

/**
 * Parse the request to get HTTP Cookie header string and returning an object of all cookie name-value pairs.
 * @param req {HttpRequest} http request
 * @returns Object of cookie name-value pairs
 * ```ts
 * const cookies = parseCookies(event)
 * ```
 */
export function getCookie(req: HttpRequest): Record<string, string> {
  return parseCookie(req.getHeader('cookie') || "");
}

