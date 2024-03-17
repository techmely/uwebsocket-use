import type { HttpMethod } from "@techmely/http";
import { ExceptionBase, HTTP_METHOD_NOT_ALLOWED } from "@techmely/http";
import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { createError } from "../../response/createError";
import { isMethod } from "../isMethod";

class HttpMethodNotAllow extends ExceptionBase {
  override code = "HTTP_NOT_ALLOW";
  override statusCode = HTTP_METHOD_NOT_ALLOWED;
}

/**
 * Asserts that the incoming request method is of the expected type using `isMethod`.
 *
 * If the method is not allowed, it will throw a 405 error with the message "HTTP method is not allowed".
 */
export function assertMethod(
  req: HttpRequest,
  res: HttpResponse,
  expected: HttpMethod | HttpMethod[],
  allowHead?: boolean,
) {
  if (!isMethod(req, expected, allowHead)) {
    createError(res, new HttpMethodNotAllow("HTTP method is not allowed."));
  }
}
