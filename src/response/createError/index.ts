import type { ExceptionBase } from "@techmely/http";
import type { HttpResponse } from "uWebSockets.js";

export function createError(res: HttpResponse, exception: ExceptionBase) {
  res.writeStatus(String(exception.statusCode));
  res.end(JSON.stringify(exception.toJSON()));
}
