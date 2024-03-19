import { mergeDeep } from "@techmely/utils";
import type { UwsCorsOptions } from "../cors.types";

export function resolveCorsOptions(options: UwsCorsOptions = {}): UwsCorsOptions {
  const defaultOptions: UwsCorsOptions = {
    origin: "*",
    methods: "*",
    allowHeaders: "*",
    exposeHeaders: "*",
    credentials: false,
    maxAge: false,
    preflight: {
      statusCode: 204,
    },
  };
  return mergeDeep(options, defaultOptions) as UwsCorsOptions;
}
