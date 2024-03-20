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

- [ ] readRawBody(res, encoding)
- [ ] readBody(res)
- [ ] readFomData(res)
- [ ] readMultipartFormData(res)
- [ ] readValidatedBody
- [x] appendHeaders(res, headers)
- [ ] isStream(data) [Checks if the data is a stream. (Node.js Readable Stream, WebStream or React Pipeable Stream)]
- [ ] sendRedirect(res, location, code?)
- [ ] sendStream(res, stream)
- [ ] sendNoContent(res, code?)
- [ ] writeEarlyHints(res, hints, callback)
- [ ] handleCacheHeaders(res, opts)

### Cookie Utils
- [x] deleteCookie(res, name, serializeOptions?)
- [x] getCookie(req, name)
- [x] setCookie(res)
- [ ] parseCookies(req)

### Cors
- [ ] appendCorsHeaders(res, options)
- [ ] appendCorsPrelightHeaders(res, options)
- [ ] handleCors(res, options)

### Proxy
- [ ] proxyRequest(res, req, opts)
- [ ] sendProxy(res, target, opts)
   
