import { serializeCookie, type CookieSerializeOptions } from "@techmely/utils";
import type { HttpResponse } from "uWebSockets.js";

/**
 * Set a cookie value by name.
 * @param res {HttpResponse} http response
 * @param name Name of the cookie to set
 * @param value Value of the cookie to set
 * @param serializeOptions {CookieSerializeOptions} Options for serializing the cookie
 * ```ts
 * setCookie(res, 'Authorization', '1234567')
 * ```
 */
export function setCookie(
  res: HttpResponse,
  name: string,
  value: string,
  serializeOptions?: CookieSerializeOptions,
) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serializeCookie(name, value, serializeOptions);
  res.writeHeader("set-cookie", cookieStr);
}

