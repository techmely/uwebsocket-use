import type { HttpRequest } from "uWebSockets.js";
import type { UwsAccessControlAllowOriginHeader, UwsCorsOptions } from "../cors.types";
import { isCorsOriginAllowed } from "../isCorsOriginAllowed";

/**
 * Create the `access-control-allow-origin` header.
 */
export function createOriginHeaders(
  req: HttpRequest,
  options: UwsCorsOptions,
): UwsAccessControlAllowOriginHeader {
  const { origin: originOption } = options;
  const origin = req.getHeader("origin");

  if (!origin || !originOption || originOption === "*") {
    return { "access-control-allow-origin": "*" };
  }

  if (typeof originOption === "string") {
    return { "access-control-allow-origin": originOption, vary: "origin" };
  }

  return isCorsOriginAllowed(origin, options)
    ? { "access-control-allow-origin": origin, vary: "origin" }
    : {};
}
