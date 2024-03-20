import type { UwsAccessControlMaxAgeHeader, UwsCorsOptions } from "../cors.types";

/**
 * Create the `access-control-max-age` header.
 */
export function createMaxAgeHeader(options: UwsCorsOptions): UwsAccessControlMaxAgeHeader {
  const { maxAge } = options;

  if (maxAge) {
    return { "access-control-max-age": maxAge };
  }

  return {};
}
