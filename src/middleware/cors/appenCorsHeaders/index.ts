import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { appendHeaders } from "../../../response/appendHeaders";
import type { UwsCorsOptions } from "../cors.types";
import { createCredentialsHeaders } from "../createCredentialOptions";
import { createExposeHeaders } from "../createExposeHeaders";
import { createOriginHeaders } from "../createOriginHeader";

/**
 * Append CORS headers to the response.
 */
export const appendCorsHeaders =
  (options: UwsCorsOptions) => (res: HttpResponse, req: HttpRequest) => {
    appendHeaders(
      res,
      Object.assign(
        {},
        createOriginHeaders(req, options),
        createCredentialsHeaders(options),
        createExposeHeaders(options),
      ),
    );
  };
