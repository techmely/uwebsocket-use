import type { HttpResponse } from "uWebSockets.js";
import { createError } from "../response";
import { ArgumentInvalidException } from "@techmely/http";

export async function validateData<T>(
  res: HttpResponse,
  data: unknown,
  fn: any,
) {
  try {
    const res = await fn(data);
    return res;
  } catch (err) {
    createValidationError(res, err);
  }
}

function createValidationError(res: HttpResponse, validateError?: any) {
  const exc = new ArgumentInvalidException("Validation Error", {
    reason: validateError,
  });
  throw createError(res, exc);
}
