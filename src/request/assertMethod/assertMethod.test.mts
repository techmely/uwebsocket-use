import { HTTP_METHOD_NOT_ALLOWED } from "@techmely/http";
import supertest, { type SuperTest } from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { assertMethod } from ".";
import { createTestServer, type CreateTestServer } from "../../../test/setup";

describe("Assert method", () => {
  let testServer: CreateTestServer;
  let request: SuperTest;

  beforeEach(async () => {
    testServer = await createTestServer();
    // @ts-expect-error I dont know
    request = supertest(testServer.httpConnection);
  });

  afterEach(() => {
    vi.resetAllMocks();
    testServer.app.close();
  });

  it("Assert correct method ", async () => {
    testServer.app.get("/api", (res, req) => {
      assertMethod(req, res, ["GET"]);
      const result = JSON.stringify({ method: req.getMethod() });
      res.writeStatus(String(200)).end(result);
    });
    const res = await request.get("/api");
    expect(res.text).toEqual('{"method":"get"}');
  });
  it("Assert wrong correct method ", async () => {
    testServer.app.get("/api", (res, req) => {
      assertMethod(req, res, ["PUT"]);
      const result = JSON.stringify({ method: req.getMethod() });
      res.writeStatus(String(200)).end(result);
    });
    const res = await request.get("/api");
    expect(res.statusCode).toEqual(HTTP_METHOD_NOT_ALLOWED);
  });
});
