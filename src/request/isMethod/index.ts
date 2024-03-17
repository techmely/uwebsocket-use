import type { HttpMethod } from "@techmely/http";
import type { HttpRequest } from "uWebSockets.js";

/**
 *
 * Checks if the incoming request method is of the expected type.
 *
 * If `allowHead` is `true`, it will allow `HEAD` requests to pass if the expected method is `GET`.
 *
 */
export function isMethod(
  req: HttpRequest,
  expected: HttpMethod | HttpMethod[],
  allowHead?: boolean,
) {
  const method = req.getCaseSensitiveMethod() as HttpMethod;
  if (allowHead && method === "HEAD") {
    return true;
  }

  if (typeof expected === "string") {
    if (method === expected) {
      return true;
    }
  } else if (expected.includes(method)) {
    return true;
  }

  return false;
}
