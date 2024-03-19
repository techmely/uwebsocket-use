import type { HttpMethod } from "@techmely/http";

export interface UwsCorsOptions {
  origin?: "*" | "null" | (string | RegExp)[] | ((origin: string) => boolean);
  methods?: "*" | HttpMethod[];
  allowHeaders?: "*" | string[];
  exposeHeaders?: "*" | string[];
  credentials?: boolean;
  maxAge?: string | false;
  preflight?: {
    statusCode?: number;
  };
}

export interface UwsResolvedCorsOptions {
  origin: "*" | "null" | (string | RegExp)[] | ((origin: string) => boolean);
  methods: "*" | HttpMethod[];
  allowHeaders: "*" | string[];
  exposeHeaders: "*" | string[];
  credentials: boolean;
  maxAge: string | false;
  preflight: {
    statusCode: number;
  };
}

export type UwsEmptyHeader = Record<string, never>;

export type UwsAccessControlAllowOriginHeader =
  | {
      "access-control-allow-origin": "*";
    }
  | {
      "access-control-allow-origin": "null" | string;
      vary: "origin";
    }
  | UwsEmptyHeader;

export type UwsAccessControlAllowMethodsHeader =
  | {
      "access-control-allow-methods": "*" | string;
    }
  | UwsEmptyHeader;

export type UwsAccessControlAllowCredentialsHeader =
  | {
      "access-control-allow-credentials": "true";
    }
  | UwsEmptyHeader;

export type UwsAccessControlAllowHeadersHeader =
  | {
      "access-control-allow-headers": "*" | string;
      vary: "access-control-request-headers";
    }
  | UwsEmptyHeader;

export type UwsAccessControlExposeHeadersHeader =
  | {
      "access-control-expose-headers": "*" | string;
    }
  | UwsEmptyHeader;

export type UwsAccessControlMaxAgeHeader =
  | {
      "access-control-max-age": string;
    }
  | UwsEmptyHeader;

export type UwsCorsHeaders =
  | UwsAccessControlAllowOriginHeader
  | UwsAccessControlAllowMethodsHeader
  | UwsAccessControlAllowCredentialsHeader
  | UwsAccessControlAllowHeadersHeader
  | UwsAccessControlExposeHeadersHeader
  | UwsAccessControlMaxAgeHeader;
