import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { sendNoContent } from "../../../response/sendNoContent";
import { appendCorsHeaders } from "../appendCorsHeaders";
import { appendCorsPreflightHeaders } from "../appendCorsPreflightHeaders";
import type { UwsCorsOptions } from "../cors.types";
import { isPreflightRequest } from "../isPreflightRequest";
import { resolveCorsOptions } from "../resolveCorsOptions";

/**
 * Handle CORS for the incoming request.
 *
 * If the incoming request is a CORS preflight request, it will append the CORS preflight headers and send a 204 response.
 *
 * If return value is `true`, the request is handled and no further action is needed.
 */
export function handleCors(res: HttpResponse, req: HttpRequest, options: UwsCorsOptions): boolean {
  const _options = resolveCorsOptions(options);
  if (isPreflightRequest(req)) {
    appendCorsPreflightHeaders(options)(res, req);
    sendNoContent(res, _options.preflight?.statusCode);
    return true;
  }
  appendCorsHeaders(options)(res, req);
  return false;
}
