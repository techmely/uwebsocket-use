# Uwebsocket Use

Here is the todo list I want to compose

## Middleware

Common middleware
- [ ] Serve static
- [ ] CORS
- [ ] Compress
- [ ] Etag
- [ ] Cache
- [ ] Secure Headers
- [ ] Power By
- [ ] Timing(Latency)
- [ ] Pretty JSON
- [ ] Logger
- [ ] Redirect
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

- [ ] assertMethod(req, expected. allowHead?)
- [ ] getRequestIp(req)
- [ ] getRequestHost(req, opts: { xForwardedHost? })
- [ ] getRequestProtocol(req, opts: { xForwardedProto? })
- [ ] getValidateQuery(req, validateFn)
- [ ] isMethod(req, expected, allowHead?)

### Response

- [ ] readRawBody(res, encoding)
- [ ] readBody(res)
- [ ] readFomData(res)
- [ ] readMultipartFormData(res)
- [ ] readValidatedBody
- [ ] appendHeaders(res, headers)
- [ ] isStream(data) [Checks if the data is a stream. (Node.js Readable Stream, WebStream or React Pipeable Stream)
- [ ] sendRedirect(res, location, code?)
- [ ] sendStream(res, stream)
- [ ] writeEarlyHints(res, hints, callback)

### Cookie Utils
- [ ] deleteCookie(res, name, serializeOptions?)
- [ ] getCookie(req, name)
- [ ] parseCookies(req)
- [ ] setCookie(res)
- [ ] handleCacheHeaders(res, opts)

### Cors
- [ ] appendCorsHeaders(res, options)
- [ ] appendCorsPrelightHeaders(res, options)
- [ ] handleCors(res, options)

### Proxy
- [ ] proxyRequest(res, req, opts)
- [ ] sendProxy(res, target, opts)
   
