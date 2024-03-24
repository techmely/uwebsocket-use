import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { assertMethod } from "../../request";
import type { HttpMethod } from "@techmely/http";

type CallbackResponseBody = (data: Buffer) => void;
const CONTAIN_PAYLOAD_METHODS: HttpMethod[] = [
  "PATCH",
  "POST",
  "PUT",
  "DELETE",
];

/*
 * @descroption Read the raw body
 * @return callback
 */
export function readRawBody(
  req: HttpRequest,
  res: HttpResponse,
  callback: CallbackResponseBody,
  err: VoidFunction,
) {
  assertMethod(req, res, CONTAIN_PAYLOAD_METHODS);

  let buffer: Buffer;
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab);
    if (isLast) {
      if (buffer) {
        const data = Buffer.concat([buffer, chunk]);
        callback(data);
      } else {
        callback(chunk);
      }
    } else {
      buffer = Buffer.concat(buffer ? [buffer, chunk] : [chunk]);
    }
  });

  /* Register error callback */
  res.onAborted(err);
}
