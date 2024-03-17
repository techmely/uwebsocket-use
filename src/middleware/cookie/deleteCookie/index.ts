import type { CookieSerializeOptions } from "@techmely/utils";
import type { HttpResponse } from "uWebSockets.js";
import { setCookie } from "../setCookie";

/**
 * Remove a cookie by name.
 * @param res {HttpResponse} Response from u-web-socket
 * @param name Name of the cookie to delete
 * @param serializeOptions {CookieSerializeOptions} Cookie options
 * ```ts
 * deleteCookie(res, 'SessionId')
 * ```
 */
export function deleteCookie(
  res: HttpResponse,
  name: string,
  serializeOptions?: CookieSerializeOptions,
) {
  setCookie(res, name, "", {
    ...serializeOptions,
    maxAge: 0,
  });
}
