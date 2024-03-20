import type { UwsCorsOptions } from "../cors.types";

/**
 * Check if the incoming request is a CORS request.
 */
export function isCorsOriginAllowed(origin: string, options: UwsCorsOptions): boolean {
  const { origin: originOption } = options;

  if (!origin || !originOption || originOption === "*" || originOption === "null") {
    return true;
  }

  if (Array.isArray(originOption)) {
    return originOption.some((_origin) => {
      if (_origin instanceof RegExp) {
        return _origin.test(origin);
      }

      return origin === _origin;
    });
  }

  return originOption(origin);
}
