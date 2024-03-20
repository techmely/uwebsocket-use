import type { UwsAccessControlAllowCredentialsHeader, UwsCorsOptions } from "../cors.types";

/**
 * Create the `access-control-allow-credentials` header.
 */
export function createCredentialsHeaders(
  options: UwsCorsOptions,
): UwsAccessControlAllowCredentialsHeader {
  const { credentials } = options;

  if (credentials) {
    return { "access-control-allow-credentials": "true" };
  }

  return {};
}
