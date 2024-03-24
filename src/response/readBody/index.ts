import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { readRawBody } from "../readRawBody";
import type { StringEnum } from "@techmely/types";

type ReadBodyOptions = {
  encoding: StringEnum<"utf8">;
  parser: typeof JSON.parse;
};

export async function readBody<T = any>(
  req: HttpRequest,
  res: HttpResponse,
  _opts?: ReadBodyOptions,
) {
  const opts = _opts || { encoding: "utf8", parser: JSON.parse };
  const handleError = () => {};
  return new Promise((resolve, reject) => {
    readRawBody(
      req,
      res,
      (chunk) => {
        try {
          const parsed = opts.parser(chunk.toString());
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      },
      handleError,
    );
  });
}
