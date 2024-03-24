import type { HttpRequest, HttpResponse } from "uWebSockets.js";
import { validateData } from "../../internal/validateData";
import { readBody } from "../readBody";

/**
 * Tries to read the request body via `readBody`, then uses the provided validation function and either throws a validation error or returns the result.
 *
 * You can use a simple function to validate the body or use a library like `zod` to define a schema.
 *
 * @example
 * app.post('/*', (res, req) => {
 *   const body = await readValidatedBody(req, res, (body) => {
 *     return typeof body === "object" && body !== null;
 *  });
 * })
 * @example
 * import { z } from "zod";
 * app.post("/*", (res, req) => {
 *   const schemaObj = z.object();
 *   const body = await readValidatedBody(req, res, schemaObj.safeParse);
 * })
 *
 * @param req, res http request
 * @param validateFn The function to use for body validation. It will be called passing the read request body. If the result is not false, the parsed body will be returned.
 * @throws If the validation function returns `false` or throws, a validation error will be thrown.
 * @return {*} The `Object`, `Array`, `String`, `Number`, `Boolean`, or `null` value corresponding to the request JSON body.
 * @see {readBody}
 */
export async function readValidatedBody<T = any>(
  req: HttpRequest,
  res: HttpResponse,
  validateFn: any,
): Promise<T> {
  const body = await readBody(req, res);
  return validateData(res, body, validateFn);
}
