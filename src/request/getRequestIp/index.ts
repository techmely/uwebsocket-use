import type { HttpResponse } from "uWebSockets.js";

export function getIpAddress(res: HttpResponse) {
  return Buffer.from(res.getRemoteAddressAsText()).toString();
}

export function getProxyIpAddress(res: HttpResponse) {
  return Buffer.from(res.getProxiedRemoteAddressAsText()).toString();
}
