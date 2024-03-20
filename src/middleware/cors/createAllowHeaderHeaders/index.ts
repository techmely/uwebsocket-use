import type { HttpRequest } from "uWebSockets.js";
import type { UwsAccessControlAllowHeadersHeader, UwsCorsOptions } from "../cors.types";

/**
 * Create the `access-control-allow-headers` and `vary` headers.
 */
export function createAllowHeaderHeaders(
  req: HttpRequest,
  options: UwsCorsOptions,
): UwsAccessControlAllowHeadersHeader {
  const { allowHeaders } = options;

  if (!allowHeaders || allowHeaders === "*" || allowHeaders.length === 0) {
    const header = req.getHeader("access-control-request-headers");

    return header
      ? {
          "access-control-allow-headers": header,
          vary: "access-control-request-headers",
        }
      : {};
  }

  return {
    "access-control-allow-headers": allowHeaders.join(","),
    vary: "access-control-request-headers",
  };
}
