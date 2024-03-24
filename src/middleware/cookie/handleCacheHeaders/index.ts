import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { HTTP_NOT_MODIFIED } from "@techmely/http";

export interface CacheConditions {
  modifiedTime?: string | Date;
  maxAge?: number;
  etag?: string;
  cacheControls?: string[];
}

/**
 * Check request caching headers (`If-Modified-Since`) and add caching headers (Last-Modified, Cache-Control)
 * Note: `public` cache control will be added by default
 * @returns `true` when cache headers are matching. When `true` is returned, no reponse should be sent anymore
 */
export const handleCacheHeaders =
  (opts: CacheConditions) => (res: HttpResponse, req: HttpRequest) => {
    const cacheControls = ["public", ...(opts.cacheControls || [])];
    let cacheMatched = true;
    if (opts.maxAge) {
      const maxAgeHead = `max-age=${+opts.maxAge}`;
      const sMaxAgeHead = `s-maxage=${+opts.maxAge}`;
      cacheControls.push(maxAgeHead, sMaxAgeHead);
    }

    if (opts.modifiedTime) {
      const modifiedTime = new Date(opts.modifiedTime);
      const ifModifiedSince = req.getHeader("if-modified-since");
      res.writeHeader("last-modified", modifiedTime.toUTCString());
      if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
        cacheMatched = true;
      }
    }

    if (opts.etag) {
      res.writeHeader("etag", opts.etag);
      const ifNonMatch = req.getHeader("if-non-match");
      if (ifNonMatch === opts.etag) {
        cacheMatched = true;
      }
    }
    res.writeHeader("cache-control", cacheControls.join(","));
    if (cacheMatched) {
      res.writeStatus(String(HTTP_NOT_MODIFIED));
      res.end();
      return true;
    }
    return false;
  };
