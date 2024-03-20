import type { UwsCorsOptions, UwsAccessControlAllowMethodsHeader } from "../cors.types";

/**
 * Create the `access-control-allow-methods` header.
 */
export function createMethodsHeaders(options: UwsCorsOptions): UwsAccessControlAllowMethodsHeader {
  const { methods } = options;

  if (!methods) {
    return {};
  }

  if (methods === "*") {
    return { "access-control-allow-methods": "*" };
  }

  return methods.length > 0 ? { "access-control-allow-methods": methods.join(",") } : {};
}
