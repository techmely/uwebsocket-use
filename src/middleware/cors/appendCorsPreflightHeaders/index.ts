import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { appendHeaders } from "../../../response/appendHeaders";
import type { UwsCorsOptions } from "../cors.types";
import { createAllowHeaderHeaders } from "../createAllowHeaderHeaders";
import { createCredentialsHeaders } from "../createCredentialOptions";
import { createExposeHeaders } from "../createExposeHeaders";
import { createMethodsHeaders } from "../createMethodsHeader";
import { createOriginHeaders } from "../createOriginHeader";

/**
 * Append CORS preflight headers to the response.
 */
export const appendCorsPreflightHeaders =
  (options: UwsCorsOptions) => (res: HttpResponse, req: HttpRequest) => {
    appendHeaders(
      res,
      Object.assign(
        {},
        createOriginHeaders(req, options),
        createCredentialsHeaders(options),
        createExposeHeaders(options),
        createMethodsHeaders(options),
        createAllowHeaderHeaders(req, options),
      ),
    );
  };
