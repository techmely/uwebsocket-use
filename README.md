# Uwebsocket Use

Here is the todo list I want to compose

## Middleware

Common middleware

- [x] Serve static
- [x] CORS
- [ ] Compress
- [ ] Etag
- [ ] Cache
- [ ] Secure Headers
- [ ] Power By
- [ ] Timing(Latency)
- [ ] Pretty JSON
- [ ] Logger
- [ ] Og Image
- [ ] Feature Flags
- [ ] Cookie

Specific middleware we used

- [ ] Superbase Auth
- [ ] AuthJs
- [ ] Swagger UI
- [ ] Valibot/Zod Validator

## Utility functions

### Request

- [x] assertMethod(req, expected. allowHead?)
- [x] getRequestIp(req)
- [x] getRequestHost(req, opts: { xForwardedHost? })
- [x] getRequestProtocol(req, opts: { xForwardedProto? })
- [ ] getValidateQuery(req, validateFn)
- [x] isMethod(req, expected, allowHead?)

### Response

- [x] readRawBody(res, encoding)
- [x] readBody(res)
- [ ] readFomData(res)
- [ ] readMultipartFormData(res)
- [x] readValidatedBody
- [x] appendHeaders(res, headers)
- [x] isStream(data) [Checks if the data is a stream. (Node.js Readable Stream, WebStream or React Pipeable Stream)]
- [x] sendRedirect(res, location, code?)
- [ ] sendStream(res, stream)
- [ ] sendNoContent(res, code?)
- [ ] writeEarlyHints(res, hints, callback)
- [x] handleCacheHeaders(res, opts)

### Cookie Utils

- [x] deleteCookie(res, name, serializeOptions?)
- [x] getCookie(req, name)
- [x] setCookie(res)
- [ ] parseCookies(req)

### Cors

- [x] appendCorsHeaders(res, options)
- [x] appendCorsPrelightHeaders(res, options)
- [ ] handleCors(res, options)

### Proxy

- [ ] proxyRequest(res, req, opts)
- [ ] sendProxy(res, target, opts)
