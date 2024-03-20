import type { UwsAccessControlExposeHeadersHeader, UwsCorsOptions } from "../cors.types";

/**
 * Create the `access-control-expose-headers` header.
 */
export function createExposeHeaders(options: UwsCorsOptions): UwsAccessControlExposeHeadersHeader {
  const { exposeHeaders } = options;

  if (!exposeHeaders) {
    return {};
  }

  if (exposeHeaders === "*") {
    return { "access-control-expose-headers": exposeHeaders };
  }

  return { "access-control-expose-headers": exposeHeaders.join(",") };
}
