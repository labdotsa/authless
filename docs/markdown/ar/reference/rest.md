# مرجع واجهة REST

استدعِ واجهة الإدارة وطوّر التكامل اعتماداً على عقد OpenAPI الموثوق.

راجع الصلاحية والقيود والنتائج وأمان إعادة المحاولة وأمثلة بلا بيانات اعتماد لكل عملية منشورة.

الرابط الأساسي: https://docs.authle.ss/reference/rest?lang=ar
اللغة البديلة: https://docs.authle.ss/reference/rest
اللغة: ar
آخر مراجعة: 2026-08-14
المالك: وثائق المطورين
المرحلة: متاح

> تحذير: هذه وثائق عامة للقراءة فقط ولا تمنح صلاحية لفحص مستأجر أو تعديله. لا تضع بيانات اعتماد أو بيانات مستأجر في الأمثلة أو مطالبات الوكلاء أو السجلات أو رسائل الدعم.

## سلوك البروتوكول

راجع الصلاحية والقيود والنتائج وأمان إعادة المحاولة وأمثلة بلا بيانات اعتماد لكل عملية منشورة.

## العمليات

راجع الصلاحية والقيود والنتائج وأمان إعادة المحاولة وأمثلة بلا بيانات اعتماد لكل عملية منشورة.

## التوافق ودورة الحياة

راجع الصلاحية والقيود والنتائج وأمان إعادة المحاولة وأمثلة بلا بيانات اعتماد لكل عملية منشورة.

## نفّذ طلباً وشخّص فشله

راجع الصلاحية والقيود والنتائج وأمان إعادة المحاولة وأمثلة بلا بيانات اعتماد لكل عملية منشورة.

## مثال واجهة آمن

```ts
import { createAuthless } from "@authless/browser";

const auth = createAuthless({ issuer: AUTHLESS_ISSUER });
```

## السياق المنظم الموثوق

هذا الإسقاط المفحوص مشترك مع الدليل المقروء ويحفظ الأمثلة والإخفاقات والتحذيرات وبيانات التوافق ودورة الحياة بدقة. يبقى النص العربي في الرابط الأساسي هو المرجع اللغوي.

```json
{
  "schema": "authless.rest-reference/v1",
  "contractVersion": "0.1.0",
  "server": "https://api.authle.ss",
  "protocol": {
    "requestIdentifiers": "Send x-correlation-id on every request; the API echoes it so a failed call can be traced without credentials.",
    "problemDetails": {
      "mediaType": "application/json",
      "note": "JSON error envelopes are RFC 9457-compatible problem objects plus the stable error code extension. The contract does not claim application/problem+json transport until the API serves it."
    },
    "pagination": "Collection operations use opaque cursor and bounded limit parameters. Follow the returned nextCursor; do not parse cursors.",
    "filtering": {
      "supported": [
        "action",
        "actor",
        "appId",
        "correlation",
        "environment",
        "from",
        "outcome",
        "query",
        "resource",
        "status",
        "to",
        "transaction"
      ]
    },
    "sorting": {
      "available": false,
      "note": "No public sort parameter is currently supported; preserve the contract-defined order."
    },
    "idempotency": "Mutations marked caller-supplied or durable-replay require idempotency-key. Reuse a key only for the same logical command.",
    "concurrency": "Operations marked with a version precondition require the quoted current version in If-Match and return 412 or 428 when stale or absent.",
    "retry": "Retry only operations marked safe. Unsafe operations are never automatically retried even when they carry a caller request identity.",
    "rateLimits": {
      "available": false,
      "note": "No public quota or 429 retry interval is promised by this contract. Treat 429 as non-automatic and contact support with the correlation ID."
    },
    "longRunningOperations": {
      "supported": [
        "bulk access"
      ],
      "note": "Only bulk-access execution exposes a durable operation resource. Poll its operation URL; other operations are not documented as asynchronous jobs."
    }
  },
  "lifecycle": {
    "contractVersion": "0.1.0",
    "compatibility": "Additive schemas and operations require release review; generated clients and rendered reference must be regenerated from the same contract.",
    "versioning": "Operation paths are unversioned by default; the server pins each request to the supported contract version. Clients may select a version with Authless-Version or api-version.",
    "breakingChanges": "Removing or moving an operation, tightening inputs, changing authority, or changing response shapes requires a new major path.",
    "deprecation": "Deprecated operations are marked in OpenAPI and announced with Deprecation and Sunset dates before removal.",
    "sunset": "A deprecated operation stays available until its published Sunset date; no unpublished minimum duration is promised.",
    "changelog": "/changes",
    "supportWindow": "The published contract version and any explicitly non-sunset major path are supported; preview and unpublished surfaces are excluded.",
    "selectors": "Use one selector only. Authless-Version: 1 or v1 and ?api-version=1 or v1 select the effective contract version. Conflicting or unsupported selectors fail before dispatch."
  },
  "operations": [
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RequestIdentityContinuationRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"email\":\"person@example.com\",\"locale\":\"en\"}' 'https://api.authle.ss/identity/continuations'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "email": "person@example.com",
        "locale": "en"
      },
      "method": "POST",
      "operationId": "requestIdentityContinuation",
      "outcomes": [
        {
          "description": "The continuation request was accepted without disclosing identity state",
          "status": 202,
          "success": true
        },
        {
          "description": "The continuation request is invalid or unavailable",
          "status": 400,
          "success": false
        },
        {
          "description": "The continuation capability is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/continuations",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "person@example.com",
          "name": "email",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 320"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RequestIdentityContinuationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Request an enumeration-safe platform email continuation code"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/VerifyIdentityContinuationRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"challengeId\":\"identity_continuation_example\",\"code\":\"123456\",\"locale\":\"en\"}' 'https://api.authle.ss/identity/continuations/verifications'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "challengeId": "identity_continuation_example",
        "code": "123456",
        "locale": "en"
      },
      "method": "POST",
      "operationId": "verifyIdentityContinuation",
      "outcomes": [
        {
          "description": "The continuation was authenticated and the platform session cookie was set",
          "status": 204,
          "success": true
        },
        {
          "description": "The continuation code or request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The continuation challenge is terminal with an explicit reason",
          "status": 410,
          "success": false
        },
        {
          "description": "The continuation capability is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/continuations/verifications",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "identity_continuation_example",
          "name": "challengeId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "123456",
          "name": "code",
          "required": true,
          "type": "string",
          "validation": "minLength 6, maxLength 6, pattern ^[0-9]{6}$"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/VerifyIdentityContinuationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Verify a platform email continuation code and create a session"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ConsumeIdentityRecoveryRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"token\":\"recovery-proof-token\"}' 'https://api.authle.ss/identity/recovery-proofs'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "token": "recovery-proof-token"
      },
      "method": "POST",
      "operationId": "consumeIdentityRecovery",
      "outcomes": [
        {
          "description": "The proof was accepted and a bounded recovery-authority cookie was set",
          "status": 204,
          "success": true
        },
        {
          "description": "The recovery proof or request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Recovery proof attempts are temporarily throttled",
          "status": 429,
          "success": false
        },
        {
          "description": "Recovery proof consumption is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery-proofs",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "recovery-proof-token",
          "name": "token",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ConsumeIdentityRecoveryRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Consume a recovery proof and create bounded recovery authority"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RequestIdentityRecoveryRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"identifier\":\"person@example.com\",\"locale\":\"en\"}' 'https://api.authle.ss/identity/recovery-requests'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "identifier": "person@example.com",
        "locale": "en"
      },
      "method": "POST",
      "operationId": "requestIdentityRecovery",
      "outcomes": [
        {
          "description": "Recovery delivery was accepted without disclosing identifier ownership",
          "status": 202,
          "success": true
        },
        {
          "description": "The recovery request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Recovery delivery is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery-requests",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "person@example.com",
          "name": "identifier",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 320"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RequestIdentityRecoveryRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Request enumeration-safe identity recovery delivery"
    },
    {
      "authority": [
        "Bounded recovery authority. Never expose this value in response bodies, browser bundles, or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RevokeIdentityRecoveryPasswordRequest"
      ],
      "example": "curl --request DELETE -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"locale\":\"en\"}' 'https://api.authle.ss/identity/recovery/authenticators/password'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "locale": "en"
      },
      "method": "DELETE",
      "operationId": "revokeIdentityRecoveryPassword",
      "outcomes": [
        {
          "description": "The password was revoked and compromised platform sessions were contained",
          "status": 200,
          "success": true
        },
        {
          "description": "The revocation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Recovery authority is missing or invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The password authenticator was not found",
          "status": 404,
          "success": false
        },
        {
          "description": "Revocation would remove the last usable recovery factor",
          "status": 409,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "Password revocation is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery/authenticators/password",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RevokeIdentityRecoveryPasswordRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Revoke a password through bounded recovery authority"
    },
    {
      "authority": [
        "Bounded recovery authority. Never expose this value in response bodies, browser bundles, or logs."
      ],
      "constraints": [],
      "example": "curl --request GET 'https://api.authle.ss/identity/recovery/factors'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "getIdentityRecoveryFactors",
      "outcomes": [
        {
          "description": "The authenticated recovery factor inventory",
          "status": 200,
          "success": true
        },
        {
          "description": "Recovery authority is missing, expired, or invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "Recovery factor inspection is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery/factors",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List the secret-free recovery factor inventory"
    },
    {
      "authority": [
        "Bounded recovery authority. Never expose this value in response bodies, browser bundles, or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RequestIdentityRecoveryEmailReplacementRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"email\":\"new.person@example.com\",\"locale\":\"en\"}' 'https://api.authle.ss/identity/recovery/identifier-replacements/email'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "email": "new.person@example.com",
        "locale": "en"
      },
      "method": "POST",
      "operationId": "requestIdentityRecoveryEmailReplacement",
      "outcomes": [
        {
          "description": "Independent proof of the new email was staged",
          "status": 202,
          "success": true
        },
        {
          "description": "The replacement request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Recovery authority is missing or invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The email is unchanged or privately unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "Confirmation is required or the email is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "Email replacement staging is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery/identifier-replacements/email",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "new.person@example.com",
          "name": "email",
          "required": false,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RequestIdentityRecoveryEmailReplacementRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Request independent proof for a recovery email replacement"
    },
    {
      "authority": [
        "Bounded recovery authority. Never expose this value in response bodies, browser bundles, or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/VerifyIdentityRecoveryEmailReplacementRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"locale\":\"en\",\"token\":\"replacement-proof-token\"}' 'https://api.authle.ss/identity/recovery/identifier-replacements/email/verifications'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "locale": "en",
        "token": "replacement-proof-token"
      },
      "method": "POST",
      "operationId": "verifyIdentityRecoveryEmailReplacement",
      "outcomes": [
        {
          "description": "The email was replaced and compromised platform sessions were contained",
          "status": 200,
          "success": true
        },
        {
          "description": "The replacement proof or request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Recovery authority is missing or invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "Email replacement verification is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery/identifier-replacements/email/verifications",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        },
        {
          "example": "replacement-proof-token",
          "name": "token",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/VerifyIdentityRecoveryEmailReplacementRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Verify independent proof and promote a recovery email replacement"
    },
    {
      "authority": [
        "Bounded recovery authority. Never expose this value in response bodies, browser bundles, or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ReplaceIdentityRecoveryUsernameRequest"
      ],
      "example": "curl --request PUT -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"locale\":\"en\",\"username\":\"new_name\"}' 'https://api.authle.ss/identity/recovery/identifiers/username'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "locale": "en",
        "username": "new_name"
      },
      "method": "PUT",
      "operationId": "replaceIdentityRecoveryUsername",
      "outcomes": [
        {
          "description": "The username was replaced and compromised platform sessions were contained",
          "status": 200,
          "success": true
        },
        {
          "description": "The replacement request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Recovery authority is missing or invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The username is unchanged or privately unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "Confirmation is required or the username is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "Username replacement is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/recovery/identifiers/username",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        },
        {
          "example": "new_name",
          "name": "username",
          "required": false,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ReplaceIdentityRecoveryUsernameRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Replace a username through bounded recovery authority"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RegisterIdentityRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"email\":\"person@example.com\",\"locale\":\"en\",\"password\":\"correct horse battery staple\"}' 'https://api.authle.ss/identity/registrations'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "email": "person@example.com",
        "locale": "en",
        "password": "correct horse battery staple"
      },
      "method": "POST",
      "operationId": "registerIdentity",
      "outcomes": [
        {
          "description": "Registration was accepted without disclosing existing identity state",
          "status": 202,
          "success": true
        },
        {
          "description": "The registration request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The submitted password is compromised",
          "status": 422,
          "success": false
        },
        {
          "description": "Registration or password checking is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/registrations",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "person@example.com",
          "name": "email",
          "required": true,
          "type": "string",
          "validation": "minLength 1"
        },
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        },
        {
          "example": "correct horse battery staple",
          "name": "password",
          "required": true,
          "type": "string",
          "validation": "minLength 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RegisterIdentityRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Register an identity without disclosing existing identity state"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/VerifyIdentityRequest"
      ],
      "example": "curl --request POST -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"locale\":\"en\",\"token\":\"verification-token\"}' 'https://api.authle.ss/identity/verifications'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "locale": "en",
        "token": "verification-token"
      },
      "method": "POST",
      "operationId": "verifyIdentity",
      "outcomes": [
        {
          "description": "The identity was verified and the platform session cookie was set",
          "status": 204,
          "success": true
        },
        {
          "description": "The verification token or request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The verification capability is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/identity/verifications",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "en",
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        },
        {
          "example": "verification-token",
          "name": "token",
          "required": true,
          "type": "string",
          "validation": "minLength 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/VerifyIdentityRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Verify a registration email token and create a platform session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path appId (required): string",
        "query environment (optional): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/me/commerce/apps/%7BappId%7D/catalog'",
      "exampleParameters": {
        "appId": "{appId}"
      },
      "method": "GET",
      "operationId": "listPersonalCommerceCatalog",
      "outcomes": [
        {
          "description": "Connected app catalog",
          "status": 200,
          "success": true
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "App catalog unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/me/commerce/apps/{appId}/catalog",
      "parameters": [
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "environment",
          "required": false,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List an app catalog available to the personal profile"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/CreatePersonalCommerceCheckoutRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"acceptedTermsDigest\":\"{acceptedTermsDigest}\",\"appId\":\"{appId}\",\"planKey\":\"{planKey}\",\"returnUrl\":\"{returnUrl}\"}' 'https://api.authle.ss/me/commerce/checkouts'",
      "exampleParameters": {
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "acceptedTermsDigest": "{acceptedTermsDigest}",
        "appId": "{appId}",
        "planKey": "{planKey}",
        "returnUrl": "{returnUrl}"
      },
      "method": "POST",
      "operationId": "createPersonalCommerceCheckout",
      "outcomes": [
        {
          "description": "Checkout accepted by the configured provider adapter",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid checkout",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "Idempotency conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/me/commerce/checkouts",
      "parameters": [
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "name": "environment",
          "required": false,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{planKey}",
          "name": "planKey",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{returnUrl}",
          "name": "returnUrl",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "quantity",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "example": "{acceptedTermsDigest}",
          "name": "acceptedTermsDigest",
          "required": true,
          "type": "string",
          "validation": "minLength 1"
        },
        {
          "name": "addOns",
          "required": false,
          "type": "array",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreatePersonalCommerceCheckoutRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create a provider checkout for an app plan"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path checkoutRef (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/me/commerce/checkouts/%7BcheckoutRef%7D/complete'",
      "exampleParameters": {
        "checkoutRef": "{checkoutRef}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "completePersonalCommerceCheckout",
      "outcomes": [
        {
          "description": "Mock checkout completion accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Checkout cannot be completed",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "Checkout unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/me/commerce/checkouts/{checkoutRef}/complete",
      "parameters": [
        {
          "example": "{checkoutRef}",
          "location": "path",
          "name": "checkoutRef",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Complete a test checkout in the mock provider"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "query appId (optional): string",
        "query cursor (optional): string",
        "query limit (optional): integer, min 1, max 100"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/me/commerce/invoices'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "listPersonalCommerceInvoices",
      "outcomes": [
        {
          "description": "Personal invoices",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid page",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/me/commerce/invoices",
      "parameters": [
        {
          "location": "query",
          "name": "appId",
          "required": false,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List invoices linked to the personal profile"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "JSON request body (required): application/json, #/components/schemas/CreatePersonalCommercePortalSessionRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"appId\":\"{appId}\",\"returnUrl\":\"{returnUrl}\"}' 'https://api.authle.ss/me/commerce/portal-sessions'",
      "exampleParameters": {},
      "exampleRequestBody": {
        "appId": "{appId}",
        "returnUrl": "{returnUrl}"
      },
      "method": "POST",
      "operationId": "createPersonalCommercePortalSession",
      "outcomes": [
        {
          "description": "Portal session created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid portal request",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/me/commerce/portal-sessions",
      "parameters": [],
      "requestBodyFields": [
        {
          "example": "{appId}",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{returnUrl}",
          "name": "returnUrl",
          "required": true,
          "type": "string",
          "validation": "format uri"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreatePersonalCommercePortalSessionRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create a short-lived provider billing portal session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/CreatePersonalCommerceQuoteRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"appId\":\"{appId}\",\"planKey\":\"{planKey}\"}' 'https://api.authle.ss/me/commerce/quotes'",
      "exampleParameters": {
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "appId": "{appId}",
        "planKey": "{planKey}"
      },
      "method": "POST",
      "operationId": "createPersonalCommerceQuote",
      "outcomes": [
        {
          "description": "Idempotent replay",
          "status": 200,
          "success": true
        },
        {
          "description": "Quote created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid quote request",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/me/commerce/quotes",
      "parameters": [
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "name": "environment",
          "required": false,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{planKey}",
          "name": "planKey",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "name": "quantity",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "name": "addOns",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "name": "discountCode",
          "required": false,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreatePersonalCommerceQuoteRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create an immutable personal commerce quote"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path quoteId (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/AcceptPersonalCommerceQuoteRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"termsDigest\":\"{termsDigest}\"}' 'https://api.authle.ss/me/commerce/quotes/%7BquoteId%7D/accept'",
      "exampleParameters": {
        "quoteId": "{quoteId}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "termsDigest": "{termsDigest}"
      },
      "method": "POST",
      "operationId": "acceptPersonalCommerceQuote",
      "outcomes": [
        {
          "description": "Quote acceptance recorded",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid or expired quote",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "Quote unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/me/commerce/quotes/{quoteId}/accept",
      "parameters": [
        {
          "example": "{quoteId}",
          "location": "path",
          "name": "quoteId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{termsDigest}",
          "name": "termsDigest",
          "required": true,
          "type": "string",
          "validation": "minLength 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AcceptPersonalCommerceQuoteRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Accept a personal commerce quote"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "query appId (optional): string",
        "query cursor (optional): string",
        "query limit (optional): integer, min 1, max 100"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/me/commerce/subscriptions'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "listPersonalCommerceSubscriptions",
      "outcomes": [
        {
          "description": "Personal subscriptions",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid page",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/me/commerce/subscriptions",
      "parameters": [
        {
          "location": "query",
          "name": "appId",
          "required": false,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List subscriptions linked to the personal profile"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path subscriptionRef (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/me/commerce/subscriptions/%7BsubscriptionRef%7D/cancel'",
      "exampleParameters": {
        "subscriptionRef": "{subscriptionRef}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "cancelPersonalCommerceSubscription",
      "outcomes": [
        {
          "description": "Cancellation accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "Subscription unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/me/commerce/subscriptions/{subscriptionRef}/cancel",
      "parameters": [
        {
          "example": "{subscriptionRef}",
          "location": "path",
          "name": "subscriptionRef",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Cancel a personal app subscription"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path subscriptionRef (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/ChangePersonalCommerceSubscriptionRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"effectiveAt\":\"now\"}' 'https://api.authle.ss/me/commerce/subscriptions/%7BsubscriptionRef%7D/changes'",
      "exampleParameters": {
        "subscriptionRef": "{subscriptionRef}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "effectiveAt": "now"
      },
      "method": "POST",
      "operationId": "changePersonalCommerceSubscription",
      "outcomes": [
        {
          "description": "Subscription change accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid subscription change",
          "status": 400,
          "success": false
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "Idempotency or version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/me/commerce/subscriptions/{subscriptionRef}/changes",
      "parameters": [
        {
          "example": "{subscriptionRef}",
          "location": "path",
          "name": "subscriptionRef",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "name": "planKey",
          "required": false,
          "type": "string",
          "validation": "—"
        },
        {
          "name": "addOns",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "name": "quantity",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "example": "now",
          "name": "effectiveAt",
          "required": true,
          "type": "string",
          "validation": "one of now | renewal"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ChangePersonalCommerceSubscriptionRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Change a personal app subscription"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path subscriptionRef (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/me/commerce/subscriptions/%7BsubscriptionRef%7D/resume'",
      "exampleParameters": {
        "subscriptionRef": "{subscriptionRef}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "resumePersonalCommerceSubscription",
      "outcomes": [
        {
          "description": "Resume accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Personal session required",
          "status": 401,
          "success": false
        },
        {
          "description": "Subscription unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/me/commerce/subscriptions/{subscriptionRef}/resume",
      "parameters": [
        {
          "example": "{subscriptionRef}",
          "location": "path",
          "name": "subscriptionRef",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Resume a personal app subscription"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/me/security-activity'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "listPersonalSecurityActivity",
      "outcomes": [
        {
          "description": "A bounded redacted session-security timeline",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Security activity is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/me/security-activity",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List the current person's session-security activity"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (optional): application/json, #/components/schemas/SignOutOtherSessionsRequest"
      ],
      "example": "curl --request DELETE -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/me/sessions'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "signOutOtherPersonalSessions",
      "outcomes": [
        {
          "description": "Other sessions were signed out and the acting session was rotated",
          "status": 204,
          "success": true
        },
        {
          "description": "The mutation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "Session mutation is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/me/sessions",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/SignOutOtherSessionsRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Sign out every other platform session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/me/sessions'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "listPersonalSessions",
      "outcomes": [
        {
          "description": "A bounded safe platform-session inventory",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Session inventory is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/me/sessions",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List the current person's platform sessions"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path sessionId (required): string, pattern ^session_[0-9A-HJKMNP-TV-Z]{26}$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (optional): application/json, #/components/schemas/RevokePersonalSessionRequest"
      ],
      "example": "curl --request DELETE -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/me/sessions/session_01J5K6M7N8P9QRSTVWXYZABCDE'",
      "exampleParameters": {
        "sessionId": "session_01J5K6M7N8P9QRSTVWXYZABCDE",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "revokePersonalSession",
      "outcomes": [
        {
          "description": "The target session was revoked",
          "status": 204,
          "success": true
        },
        {
          "description": "The mutation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session is not authorized for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The target session is unavailable through the private not-found boundary",
          "status": 404,
          "success": false
        },
        {
          "description": "Session revocation is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/me/sessions/{sessionId}",
      "parameters": [
        {
          "example": "session_01J5K6M7N8P9QRSTVWXYZABCDE",
          "location": "path",
          "name": "sessionId",
          "required": true,
          "type": "string",
          "validation": "pattern ^session_[0-9A-HJKMNP-TV-Z]{26}$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RevokePersonalSessionRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Revoke one platform session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path sessionId (required): string, pattern ^session_[0-9A-HJKMNP-TV-Z]{26}$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (optional): application/json, #/components/schemas/ReportPersonalSessionRiskRequest"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/me/sessions/session_01J5K6M7N8P9QRSTVWXYZABCDE/risk'",
      "exampleParameters": {
        "sessionId": "session_01J5K6M7N8P9QRSTVWXYZABCDE",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "PUT",
      "operationId": "reportPersonalSessionRisk",
      "outcomes": [
        {
          "description": "The target session was reported as high risk",
          "status": 204,
          "success": true
        },
        {
          "description": "The mutation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session is not authorized for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The target session is unavailable through the private not-found boundary",
          "status": 404,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "Session risk reporting is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/me/sessions/{sessionId}/risk",
      "parameters": [
        {
          "example": "session_01J5K6M7N8P9QRSTVWXYZABCDE",
          "location": "path",
          "name": "sessionId",
          "required": true,
          "type": "string",
          "validation": "pattern ^session_[0-9A-HJKMNP-TV-Z]{26}$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "locale",
          "required": false,
          "type": "string",
          "validation": "one of ar | en"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ReportPersonalSessionRiskRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Report one platform session as high risk"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path appId (required): string",
        "path assetId (required): string",
        "path size (required): integer, one of 24 | 64 | 256",
        "query transaction (optional): string"
      ],
      "example": "curl --request GET 'https://api.authle.ss/media/public/app-icons/%7BappId%7D/%7BassetId%7D/24'",
      "exampleParameters": {
        "appId": "{appId}",
        "assetId": "{assetId}",
        "size": 24
      },
      "method": "GET",
      "operationId": "getPublicAppIcon",
      "outcomes": [
        {
          "description": "WebP app icon bytes",
          "status": 200,
          "success": true
        },
        {
          "description": "Icon unavailable, unpublished, or transaction reference invalid",
          "status": 404,
          "success": false
        }
      ],
      "path": "/media/public/app-icons/{appId}/{assetId}/{size}",
      "parameters": [
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{assetId}",
          "location": "path",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 24,
          "location": "path",
          "name": "size",
          "required": true,
          "type": "integer",
          "validation": "one of 24 | 64 | 256"
        },
        {
          "location": "query",
          "name": "transaction",
          "required": false,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get a public app icon"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/personal/overview'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "getPersonalOverview",
      "outcomes": [
        {
          "description": "A safe personal overview with connected app projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Personal overview service is unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/overview",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get the current person's safe account overview"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/personal/profile'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "getPersonalProfile",
      "outcomes": [
        {
          "description": "Personal profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Error",
          "status": 401,
          "success": false
        },
        {
          "description": "Error",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/profile",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get the current person's profile"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "JSON request body (required): application/json, #/components/schemas/PersonalProfileDisplayNameRequest"
      ],
      "example": "curl --request PATCH -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"displayName\":\"{displayName}\",\"expectedVersion\":1}' 'https://api.authle.ss/personal/profile'",
      "exampleParameters": {},
      "exampleRequestBody": {
        "displayName": "{displayName}",
        "expectedVersion": 1
      },
      "method": "PATCH",
      "operationId": "updatePersonalProfile",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Error",
          "status": 400,
          "success": false
        },
        {
          "description": "Error",
          "status": 401,
          "success": false
        },
        {
          "description": "Error",
          "status": 409,
          "success": false
        },
        {
          "description": "Error",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/profile",
      "parameters": [],
      "requestBodyFields": [
        {
          "example": "{displayName}",
          "name": "displayName",
          "required": true,
          "type": "value",
          "validation": "minLength 1, maxLength 80"
        },
        {
          "example": 1,
          "name": "expectedVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/PersonalProfileDisplayNameRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Update the current person's display name"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header if-match (required): integer, min 1"
      ],
      "example": "curl --request DELETE -H 'cookie: __Host-authless_session={platform_session}' -H 'if-match: 1' 'https://api.authle.ss/personal/profile/avatar'",
      "exampleParameters": {
        "if-match": 1
      },
      "method": "DELETE",
      "operationId": "removePersonalAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Error",
          "status": 401,
          "success": false
        },
        {
          "description": "Error",
          "status": 409,
          "success": false
        },
        {
          "description": "Error",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/profile/avatar",
      "parameters": [
        {
          "example": 1,
          "location": "header",
          "name": "if-match",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Remove the current person's avatar"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/personal/profile/avatar-intents'",
      "exampleParameters": {},
      "method": "POST",
      "operationId": "createPersonalAvatarIntent",
      "outcomes": [
        {
          "description": "Upload intent",
          "status": 201,
          "success": true
        },
        {
          "description": "Error",
          "status": 401,
          "success": false
        },
        {
          "description": "Error",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/profile/avatar-intents",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Create a single-use personal avatar upload intent"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path assetId (required): string",
        "path size (required): integer, one of 24 | 64 | 256"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/personal/profile/avatar/%7BassetId%7D/24'",
      "exampleParameters": {
        "assetId": "{assetId}",
        "size": 24
      },
      "method": "GET",
      "operationId": "getPersonalAvatar",
      "outcomes": [
        {
          "description": "WebP avatar",
          "status": 200,
          "success": true
        },
        {
          "description": "Error",
          "status": 401,
          "success": false
        },
        {
          "description": "Error",
          "status": 404,
          "success": false
        },
        {
          "description": "Error",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/profile/avatar/{assetId}/{size}",
      "parameters": [
        {
          "example": "{assetId}",
          "location": "path",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 24,
          "location": "path",
          "name": "size",
          "required": true,
          "type": "integer",
          "validation": "one of 24 | 64 | 256"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Fetch the current person's private avatar"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path intentId (required): string",
        "header if-match (required): integer, min 1",
        "Raw binary request body (required): image/png, image/jpeg, image/webp"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'if-match: 1' -H 'content-type: image/png' --data-binary @icon.png 'https://api.authle.ss/personal/profile/avatar/%7BintentId%7D'",
      "exampleParameters": {
        "intentId": "{intentId}",
        "if-match": 1
      },
      "method": "PUT",
      "operationId": "uploadPersonalAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Error",
          "status": 400,
          "success": false
        },
        {
          "description": "Error",
          "status": 401,
          "success": false
        },
        {
          "description": "Error",
          "status": 404,
          "success": false
        },
        {
          "description": "Error",
          "status": 409,
          "success": false
        },
        {
          "description": "Image upload exceeds the 5 MiB encoded limit",
          "status": 413,
          "success": false
        },
        {
          "description": "Error",
          "status": 422,
          "success": false
        },
        {
          "description": "Error",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/profile/avatar/{intentId}",
      "parameters": [
        {
          "example": "{intentId}",
          "location": "path",
          "name": "intentId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "location": "header",
          "name": "if-match",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "format": "binary"
      },
      "retrySafety": "unsafe",
      "summary": "Upload a personal avatar"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (optional): application/json, #/components/schemas/RemovePersonalUsernameRequest"
      ],
      "example": "curl --request DELETE -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/personal/username'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "removePersonalUsername",
      "outcomes": [
        {
          "description": "The username was removed and the previous name was reserved",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The identity cannot remove its last usable username",
          "status": 409,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "Username removal is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/username",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RemovePersonalUsernameRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Remove the current person's username"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/AddPersonalUsernameRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"username\":\"{username}\"}' 'https://api.authle.ss/personal/username'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "username": "{username}"
      },
      "method": "POST",
      "operationId": "addPersonalUsername",
      "outcomes": [
        {
          "description": "The normalized username was enrolled",
          "status": 201,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The username already exists or is reserved; an unavailable username includes a safe recovery choice",
          "status": 409,
          "success": false
        },
        {
          "description": "The username is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "Username enrollment is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/username",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{username}",
          "name": "username",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AddPersonalUsernameRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Add a username to the current person's identity"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ChangePersonalUsernameRequest"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"username\":\"{username}\"}' 'https://api.authle.ss/personal/username'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "username": "{username}"
      },
      "method": "PUT",
      "operationId": "changePersonalUsername",
      "outcomes": [
        {
          "description": "The username changed with its cooldown and previous-name reservation",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The username is unavailable, unchanged, or still in cooldown; unavailable usernames include a safe recovery choice and cooldown includes availableAt",
          "status": 409,
          "success": false
        },
        {
          "description": "The username is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "Username change is temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/personal/username",
      "parameters": [
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{username}",
          "name": "username",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ChangePersonalUsernameRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Change the current person's username"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/personal/workspace-correlations'",
      "exampleParameters": {},
      "method": "GET",
      "operationId": "listPersonalWorkspaceCorrelations",
      "outcomes": [
        {
          "description": "Safe workspace, app-name, and version correlation projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        }
      ],
      "path": "/personal/workspace-correlations",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List the current person's workspace correlation disclosures"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/SplitPersonalWorkspaceCorrelationRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"expectedVersion\":1}' 'https://api.authle.ss/personal/workspace-correlations/%7BworkspaceId%7D/split'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "expectedVersion": 1
      },
      "method": "POST",
      "operationId": "splitPersonalWorkspaceCorrelation",
      "outcomes": [
        {
          "description": "The workspace correlation was split at a new version",
          "status": 200,
          "success": true
        },
        {
          "description": "The confirmation or expected version is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The workspace correlation is unavailable through the private not-found boundary",
          "status": 404,
          "success": false
        },
        {
          "description": "The expected version is stale",
          "status": 409,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        }
      ],
      "path": "/personal/workspace-correlations/{workspaceId}/split",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "expectedVersion",
          "required": true,
          "type": "integer",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/SplitPersonalWorkspaceCorrelationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Split the current person's identity correlation in one workspace"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "header merchant-signature (required): string",
        "JSON request body (required): application/json, object"
      ],
      "example": "curl --request POST -H 'merchant-signature: {merchant-signature}' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/providers/merchant/billing-events'",
      "exampleParameters": {
        "merchant-signature": "{merchant-signature}"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "reconcileCommercialBillingProviderEvent",
      "outcomes": [
        {
          "description": "The signed event was applied or recognized as a duplicate",
          "status": 202,
          "success": true
        },
        {
          "description": "The provider signature or event is invalid",
          "status": 400,
          "success": false
        }
      ],
      "path": "/providers/merchant/billing-events",
      "parameters": [
        {
          "example": "{merchant-signature}",
          "location": "header",
          "name": "merchant-signature",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "object",
        "additionalProperties": true
      },
      "retrySafety": "unsafe",
      "summary": "Reconcile a signed merchant billing provider event"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationBinding"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"appId\":\"{appId}x\",\"clientId\":\"{clientId}\",\"environmentId\":\"{environmentId}\",\"method\":\"guest\",\"mode\":\"backend\",\"nonce\":\"{nonce}x\",\"origin\":\"{origin}\",\"policyVersion\":1,\"principalMode\":\"person\",\"redirectUri\":\"{redirectUri}\",\"state\":\"{state}x\",\"workspaceId\":\"{workspaceId}\"}' 'https://api.authle.ss/v1/custom-auth/transactions'",
      "exampleParameters": {},
      "exampleRequestBody": {
        "appId": "{appId}x",
        "clientId": "{clientId}",
        "environmentId": "{environmentId}",
        "method": "guest",
        "mode": "backend",
        "nonce": "{nonce}x",
        "origin": "{origin}",
        "policyVersion": 1,
        "principalMode": "person",
        "redirectUri": "{redirectUri}",
        "state": "{state}x",
        "workspaceId": "{workspaceId}"
      },
      "method": "POST",
      "operationId": "beginCustomAuthenticationTransaction",
      "outcomes": [
        {
          "description": "Transaction created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid or unavailable custom authentication request",
          "status": 400,
          "success": false
        },
        {
          "description": "Registered origin rejected",
          "status": 403,
          "success": false
        }
      ],
      "path": "/v1/custom-auth/transactions",
      "parameters": [],
      "requestBodyFields": [
        {
          "example": "{appId}x",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "browserSessionBinding",
          "required": false,
          "type": "value",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "codeChallenge",
          "required": false,
          "type": "value",
          "validation": "pattern ^[A-Za-z0-9_-]{43}$"
        },
        {
          "example": "{environmentId}",
          "name": "environmentId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{nonce}x",
          "name": "nonce",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": 1,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "person",
          "name": "principalMode",
          "required": true,
          "type": "value",
          "validation": "one of person | guest"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "requestedScopes",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{state}x",
          "name": "state",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{workspaceId}",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationBinding"
      },
      "retrySafety": "unsafe",
      "summary": "Begin a registered custom authentication transaction"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path transactionId (required): string, minLength 8, maxLength 512",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationBinding"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"appId\":\"{appId}x\",\"clientId\":\"{clientId}\",\"environmentId\":\"{environmentId}\",\"method\":\"guest\",\"mode\":\"backend\",\"nonce\":\"{nonce}x\",\"origin\":\"{origin}\",\"policyVersion\":1,\"principalMode\":\"person\",\"redirectUri\":\"{redirectUri}\",\"state\":\"{state}x\",\"workspaceId\":\"{workspaceId}\"}' 'https://api.authle.ss/v1/custom-auth/transactions/%7BtransactionId%7D/cancel'",
      "exampleParameters": {
        "transactionId": "{transactionId}"
      },
      "exampleRequestBody": {
        "appId": "{appId}x",
        "clientId": "{clientId}",
        "environmentId": "{environmentId}",
        "method": "guest",
        "mode": "backend",
        "nonce": "{nonce}x",
        "origin": "{origin}",
        "policyVersion": 1,
        "principalMode": "person",
        "redirectUri": "{redirectUri}",
        "state": "{state}x",
        "workspaceId": "{workspaceId}"
      },
      "method": "POST",
      "operationId": "cancelCustomAuthenticationTransaction",
      "outcomes": [
        {
          "description": "Transaction cancelled",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid or unavailable custom authentication request",
          "status": 400,
          "success": false
        }
      ],
      "path": "/v1/custom-auth/transactions/{transactionId}/cancel",
      "parameters": [
        {
          "example": "{transactionId}",
          "location": "path",
          "name": "transactionId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}x",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "browserSessionBinding",
          "required": false,
          "type": "value",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "codeChallenge",
          "required": false,
          "type": "value",
          "validation": "pattern ^[A-Za-z0-9_-]{43}$"
        },
        {
          "example": "{environmentId}",
          "name": "environmentId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{nonce}x",
          "name": "nonce",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": 1,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "person",
          "name": "principalMode",
          "required": true,
          "type": "value",
          "validation": "one of person | guest"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "requestedScopes",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{state}x",
          "name": "state",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{workspaceId}",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationBinding"
      },
      "retrySafety": "safe",
      "summary": "Cancel a custom authentication transaction"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path transactionId (required): string, minLength 8, maxLength 512",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationChallengeRequest"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"appId\":\"{appId}x\",\"clientId\":\"{clientId}\",\"environmentId\":\"{environmentId}\",\"method\":\"guest\",\"mode\":\"backend\",\"nonce\":\"{nonce}x\",\"origin\":\"{origin}\",\"policyVersion\":1,\"principalMode\":\"person\",\"redirectUri\":\"{redirectUri}\",\"state\":\"{state}x\",\"workspaceId\":\"{workspaceId}\",\"email\":\"person@example.test\"}' 'https://api.authle.ss/v1/custom-auth/transactions/%7BtransactionId%7D/challenge'",
      "exampleParameters": {
        "transactionId": "{transactionId}"
      },
      "exampleRequestBody": {
        "appId": "{appId}x",
        "clientId": "{clientId}",
        "environmentId": "{environmentId}",
        "method": "guest",
        "mode": "backend",
        "nonce": "{nonce}x",
        "origin": "{origin}",
        "policyVersion": 1,
        "principalMode": "person",
        "redirectUri": "{redirectUri}",
        "state": "{state}x",
        "workspaceId": "{workspaceId}",
        "email": "person@example.test"
      },
      "method": "POST",
      "operationId": "requestCustomAuthenticationEmailCode",
      "outcomes": [
        {
          "description": "Challenge accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid or unavailable custom authentication request",
          "status": 400,
          "success": false
        }
      ],
      "path": "/v1/custom-auth/transactions/{transactionId}/challenge",
      "parameters": [
        {
          "example": "{transactionId}",
          "location": "path",
          "name": "transactionId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}x",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "browserSessionBinding",
          "required": false,
          "type": "value",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "codeChallenge",
          "required": false,
          "type": "value",
          "validation": "pattern ^[A-Za-z0-9_-]{43}$"
        },
        {
          "example": "person@example.test",
          "name": "email",
          "required": true,
          "type": "string",
          "validation": "format email"
        },
        {
          "example": "{environmentId}",
          "name": "environmentId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{nonce}x",
          "name": "nonce",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": 1,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "person",
          "name": "principalMode",
          "required": true,
          "type": "value",
          "validation": "one of person | guest"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "requestedScopes",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{state}x",
          "name": "state",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{workspaceId}",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationChallengeRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Request or resend a transaction-bound email code"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path transactionId (required): string, minLength 8, maxLength 512",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationBinding"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"appId\":\"{appId}x\",\"clientId\":\"{clientId}\",\"environmentId\":\"{environmentId}\",\"method\":\"guest\",\"mode\":\"backend\",\"nonce\":\"{nonce}x\",\"origin\":\"{origin}\",\"policyVersion\":1,\"principalMode\":\"person\",\"redirectUri\":\"{redirectUri}\",\"state\":\"{state}x\",\"workspaceId\":\"{workspaceId}\"}' 'https://api.authle.ss/v1/custom-auth/transactions/%7BtransactionId%7D/complete'",
      "exampleParameters": {
        "transactionId": "{transactionId}"
      },
      "exampleRequestBody": {
        "appId": "{appId}x",
        "clientId": "{clientId}",
        "environmentId": "{environmentId}",
        "method": "guest",
        "mode": "backend",
        "nonce": "{nonce}x",
        "origin": "{origin}",
        "policyVersion": 1,
        "principalMode": "person",
        "redirectUri": "{redirectUri}",
        "state": "{state}x",
        "workspaceId": "{workspaceId}"
      },
      "method": "POST",
      "operationId": "completeCustomAuthenticationTransaction",
      "outcomes": [
        {
          "description": "Proof consumed",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid or unavailable custom authentication request",
          "status": 400,
          "success": false
        }
      ],
      "path": "/v1/custom-auth/transactions/{transactionId}/complete",
      "parameters": [
        {
          "example": "{transactionId}",
          "location": "path",
          "name": "transactionId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}x",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "browserSessionBinding",
          "required": false,
          "type": "value",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "codeChallenge",
          "required": false,
          "type": "value",
          "validation": "pattern ^[A-Za-z0-9_-]{43}$"
        },
        {
          "example": "{environmentId}",
          "name": "environmentId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{nonce}x",
          "name": "nonce",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": 1,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "person",
          "name": "principalMode",
          "required": true,
          "type": "value",
          "validation": "one of person | guest"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "requestedScopes",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{state}x",
          "name": "state",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{workspaceId}",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationBinding"
      },
      "retrySafety": "safe",
      "summary": "Consume one custom proof for authorization-code binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path transactionId (required): string, minLength 8, maxLength 512",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationBinding"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"appId\":\"{appId}x\",\"clientId\":\"{clientId}\",\"environmentId\":\"{environmentId}\",\"method\":\"guest\",\"mode\":\"backend\",\"nonce\":\"{nonce}x\",\"origin\":\"{origin}\",\"policyVersion\":1,\"principalMode\":\"person\",\"redirectUri\":\"{redirectUri}\",\"state\":\"{state}x\",\"workspaceId\":\"{workspaceId}\"}' 'https://api.authle.ss/v1/custom-auth/transactions/%7BtransactionId%7D/read'",
      "exampleParameters": {
        "transactionId": "{transactionId}"
      },
      "exampleRequestBody": {
        "appId": "{appId}x",
        "clientId": "{clientId}",
        "environmentId": "{environmentId}",
        "method": "guest",
        "mode": "backend",
        "nonce": "{nonce}x",
        "origin": "{origin}",
        "policyVersion": 1,
        "principalMode": "person",
        "redirectUri": "{redirectUri}",
        "state": "{state}x",
        "workspaceId": "{workspaceId}"
      },
      "method": "POST",
      "operationId": "readCustomAuthenticationTransaction",
      "outcomes": [
        {
          "description": "Transaction state",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid or unavailable custom authentication request",
          "status": 400,
          "success": false
        }
      ],
      "path": "/v1/custom-auth/transactions/{transactionId}/read",
      "parameters": [
        {
          "example": "{transactionId}",
          "location": "path",
          "name": "transactionId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}x",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "browserSessionBinding",
          "required": false,
          "type": "value",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "codeChallenge",
          "required": false,
          "type": "value",
          "validation": "pattern ^[A-Za-z0-9_-]{43}$"
        },
        {
          "example": "{environmentId}",
          "name": "environmentId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{nonce}x",
          "name": "nonce",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": 1,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "person",
          "name": "principalMode",
          "required": true,
          "type": "value",
          "validation": "one of person | guest"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "requestedScopes",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{state}x",
          "name": "state",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{workspaceId}",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationBinding"
      },
      "retrySafety": "safe",
      "summary": "Read a bound custom authentication transaction"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path transactionId (required): string, minLength 8, maxLength 512",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationVerifyRequest"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"appId\":\"{appId}x\",\"clientId\":\"{clientId}\",\"environmentId\":\"{environmentId}\",\"method\":\"guest\",\"mode\":\"backend\",\"nonce\":\"{nonce}x\",\"origin\":\"{origin}\",\"policyVersion\":1,\"principalMode\":\"person\",\"redirectUri\":\"{redirectUri}\",\"state\":\"{state}x\",\"workspaceId\":\"{workspaceId}\"}' 'https://api.authle.ss/v1/custom-auth/transactions/%7BtransactionId%7D/verify'",
      "exampleParameters": {
        "transactionId": "{transactionId}"
      },
      "exampleRequestBody": {
        "appId": "{appId}x",
        "clientId": "{clientId}",
        "environmentId": "{environmentId}",
        "method": "guest",
        "mode": "backend",
        "nonce": "{nonce}x",
        "origin": "{origin}",
        "policyVersion": 1,
        "principalMode": "person",
        "redirectUri": "{redirectUri}",
        "state": "{state}x",
        "workspaceId": "{workspaceId}"
      },
      "method": "POST",
      "operationId": "verifyCustomAuthenticationProof",
      "outcomes": [
        {
          "description": "Proof accepted",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid or unavailable custom authentication request",
          "status": 400,
          "success": false
        }
      ],
      "path": "/v1/custom-auth/transactions/{transactionId}/verify",
      "parameters": [
        {
          "example": "{transactionId}",
          "location": "path",
          "name": "transactionId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{appId}x",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "browserSessionBinding",
          "required": false,
          "type": "value",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "name": "code",
          "required": false,
          "type": "string",
          "validation": "minLength 6, maxLength 6"
        },
        {
          "name": "codeChallenge",
          "required": false,
          "type": "value",
          "validation": "pattern ^[A-Za-z0-9_-]{43}$"
        },
        {
          "example": "{environmentId}",
          "name": "environmentId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{nonce}x",
          "name": "nonce",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": 1,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "person",
          "name": "principalMode",
          "required": true,
          "type": "value",
          "validation": "one of person | guest"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "requestedScopes",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{state}x",
          "name": "state",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "{workspaceId}",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationVerifyRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Verify a guest or email proof"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side management OAuth bearer issued for an owner-created workspace delegation. This scheme is supported only on operations that list it explicitly, currently workspace reads, and requires x-authless-client: server. Never use a browser session cookie as an agent credential. Required scope: workspace:read."
      ],
      "constraints": [
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces'",
      "exampleParameters": {
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "listWorkspaces",
      "outcomes": [
        {
          "description": "Cursor-paginated safe workspace projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The page request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces",
      "parameters": [
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List workspaces available to the current platform session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/CreateWorkspaceRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"name\":\"Example workspace\"}' 'https://api.authle.ss/workspaces'",
      "exampleParameters": {
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "name": "Example workspace"
      },
      "method": "POST",
      "operationId": "createWorkspace",
      "outcomes": [
        {
          "description": "The workspace was created",
          "status": 201,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "Current terms must be accepted",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces",
      "parameters": [
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "Example workspace",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 80"
        },
        {
          "name": "termsAccepted",
          "required": false,
          "type": "boolean",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateWorkspaceRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create a workspace for the current platform session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side management OAuth bearer issued for an owner-created workspace delegation. This scheme is supported only on operations that list it explicitly, currently workspace reads, and requires x-authless-client: server. Never use a browser session cookie as an agent credential. Required scope: workspace:read."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "getWorkspace",
      "outcomes": [
        {
          "description": "Authoritative safe workspace projection",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The workspace is unavailable to this session",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read one workspace available to the current platform session"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path delegationId (required): string, minLength 3, maxLength 128",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/AgentDelegationKeyRotationPreviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"publicJwks\":{}}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/agent-delegations/%7BdelegationId%7D/key-rotation-previews'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "delegationId": "{delegationId}",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "publicJwks": {}
      },
      "method": "POST",
      "operationId": "previewAgentDelegationKeyRotation",
      "outcomes": [
        {
          "description": "Key rotation preview created",
          "status": 201,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The session is not authenticated",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The delegation is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "A preview cannot be created in the current state",
          "status": 409,
          "success": false
        },
        {
          "description": "The key version is stale",
          "status": 412,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/agent-delegations/{delegationId}/key-rotation-previews",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{delegationId}",
          "location": "path",
          "name": "delegationId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": {},
          "name": "publicJwks",
          "required": true,
          "type": "object",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AgentDelegationKeyRotationPreviewRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Preview an agent delegation key rotation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "listApps",
      "outcomes": [
        {
          "description": "Cursor-paginated app projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The page request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The workspace is unavailable to this session",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List apps available in one workspace"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/CreateAppRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"description\":\"Customer sign-in for the Example product\",\"name\":\"Example web app\",\"ownerContactEmail\":\"security@example.com\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "description": "Customer sign-in for the Example product",
        "name": "Example web app",
        "ownerContactEmail": "security@example.com"
      },
      "method": "POST",
      "operationId": "createApp",
      "outcomes": [
        {
          "description": "The app was created",
          "status": 201,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The workspace is unavailable to this session",
          "status": 404,
          "success": false
        },
        {
          "description": "The app violates the app contract",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "Customer sign-in for the Example product",
          "name": "description",
          "required": true,
          "type": "string",
          "validation": "maxLength 500"
        },
        {
          "example": "Example web app",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 80"
        },
        {
          "example": "security@example.com",
          "name": "ownerContactEmail",
          "required": true,
          "type": "string",
          "validation": "maxLength 254, format email"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateAppRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create an app in one workspace"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/UpdateAppMetadataRequest"
      ],
      "example": "curl --request PATCH -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"name\":\"Example\",\"description\":\"{description}\",\"ownerContactEmail\":\"person@example.test\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "name": "Example",
        "description": "{description}",
        "ownerContactEmail": "person@example.test"
      },
      "method": "PATCH",
      "operationId": "updateAppMetadata",
      "outcomes": [
        {
          "description": "Updated app metadata and version",
          "status": 200,
          "success": true
        },
        {
          "description": "The request or resource is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 403,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 404,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 412,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 80"
        },
        {
          "example": "{description}",
          "name": "description",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 500"
        },
        {
          "example": "person@example.test",
          "name": "ownerContactEmail",
          "required": true,
          "type": "string",
          "validation": "maxLength 254, format email"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/UpdateAppMetadataRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Update app metadata"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path environment (required): string, one of production | test",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "getAppEnvironment",
      "outcomes": [
        {
          "description": "Versioned non-secret app environment projection",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The app environment is unavailable to this session",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read one versioned app environment"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ChangeAppEnvironmentStatusRequest"
      ],
      "example": "curl --request PATCH -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '\"{value}\"' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": "{value}",
      "method": "PATCH",
      "operationId": "changeAppEnvironmentStatus",
      "outcomes": [
        {
          "description": "The environment was updated",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Missing app:activate returns insufficient_scope with requiredScope. Suspended commercial operations return commercial_dunning_suspended.",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The environment is retired (environment_retired), or production app capacity is exhausted (production_app_allowance_exhausted).",
          "status": 409,
          "success": false
        },
        {
          "description": "The environment version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation, lifecycle, active-policy, HTTPS registration, or OIDC-profile readiness failed: confirmation_required, invalid_lifecycle_transition, policy_required, invalid_endpoints, or invalid_oidc_profile.",
          "status": 422,
          "success": false
        },
        {
          "description": "A current environment version precondition is required.",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "$ref": "#/components/schemas/ChangeAppEnvironmentStatusRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Change environment status"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/credentials'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production"
      },
      "method": "GET",
      "operationId": "listIntegrationCredentials",
      "outcomes": [
        {
          "description": "Cursor-paginated secret-free credential projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The page request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The app integration boundary is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/credentials",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List secret-free integration credentials for an app environment"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/CreateIntegrationCredentialRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"name\":\"Example\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/credentials'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "name": "Example"
      },
      "method": "POST",
      "operationId": "createIntegrationCredential",
      "outcomes": [
        {
          "description": "The canonical credential result was replayed without its secret",
          "status": 200,
          "success": true
        },
        {
          "description": "The credential was created and its secret disclosed once",
          "status": 201,
          "success": true
        },
        {
          "description": "The credential request is malformed",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The app integration boundary is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or environment state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The requested integration state is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation or credential policy validation failed",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/credentials",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "name": "capabilities",
          "required": false,
          "type": "array",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateIntegrationCredentialRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create an app-environment credential with one-time secret disclosure"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path credentialId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RevokeIntegrationCredentialRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/credentials/%7BcredentialId%7D/revoke'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "credentialId": "{credentialId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "revokeIntegrationCredential",
      "outcomes": [
        {
          "description": "The credential was revoked or its secret-free result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The credential is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or environment state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The credential version is stale and includes the safe current state",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation or credential policy validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid version and idempotency key are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/credentials/{credentialId}/revoke",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{credentialId}",
          "location": "path",
          "name": "credentialId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "compromised",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RevokeIntegrationCredentialRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Revoke an app-environment credential without disclosing secret material"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path credentialId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RotateIntegrationCredentialRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"overlapSeconds\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/credentials/%7BcredentialId%7D/rotate'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "credentialId": "{credentialId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "overlapSeconds": 1
      },
      "method": "POST",
      "operationId": "rotateIntegrationCredential",
      "outcomes": [
        {
          "description": "The credential was rotated with one-time secret disclosure, or its safe result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The credential is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or environment state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The credential version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation or credential policy validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid version and idempotency key are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/credentials/{credentialId}/rotate",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{credentialId}",
          "location": "path",
          "name": "credentialId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "overlapSeconds",
          "required": true,
          "type": "number",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RotateIntegrationCredentialRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Rotate an app-environment credential with bounded secret overlap"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path environment (required): string, minLength 1, maxLength 64",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationRegistrationInput"
      ],
      "example": "curl --request DELETE -H 'authorization: Bearer {app_credential}' -H 'content-type: application/json' --data '{\"clientId\":\"{clientId}\",\"method\":\"guest\",\"mode\":\"backend\",\"origin\":\"{origin}\",\"redirectUri\":\"{redirectUri}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/%7Benvironment%7D/custom-auth'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "{environment}"
      },
      "exampleRequestBody": {
        "clientId": "{clientId}",
        "method": "guest",
        "mode": "backend",
        "origin": "{origin}",
        "redirectUri": "{redirectUri}"
      },
      "method": "DELETE",
      "operationId": "revokeCustomAuthenticationRegistration",
      "outcomes": [
        {
          "description": "Registration revoked",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid registration",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Registration not found",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/custom-auth",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{environment}",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 64"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "expectedUpdatedAt",
          "required": false,
          "type": "string",
          "validation": "format date-time"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationRegistrationInput"
      },
      "retrySafety": "unsafe",
      "summary": "Revoke custom authentication configuration"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path environment (required): string, minLength 1, maxLength 64"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/%7Benvironment%7D/custom-auth'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "{environment}"
      },
      "method": "GET",
      "operationId": "listCustomAuthenticationRegistrations",
      "outcomes": [
        {
          "description": "Registered custom authentication configuration",
          "status": 200,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/custom-auth",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{environment}",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 64"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List custom authentication registrations"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path environment (required): string, minLength 1, maxLength 64",
        "JSON request body (required): application/json, #/components/schemas/CustomAuthenticationRegistrationInput"
      ],
      "example": "curl --request PUT -H 'authorization: Bearer {app_credential}' -H 'content-type: application/json' --data '{\"clientId\":\"{clientId}\",\"method\":\"guest\",\"mode\":\"backend\",\"origin\":\"{origin}\",\"redirectUri\":\"{redirectUri}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/%7Benvironment%7D/custom-auth'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "{environment}"
      },
      "exampleRequestBody": {
        "clientId": "{clientId}",
        "method": "guest",
        "mode": "backend",
        "origin": "{origin}",
        "redirectUri": "{redirectUri}"
      },
      "method": "PUT",
      "operationId": "replaceCustomAuthenticationRegistration",
      "outcomes": [
        {
          "description": "Registered custom authentication configuration",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid registration",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Registration version conflict",
          "status": 412,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/custom-auth",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{environment}",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 64"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{clientId}",
          "name": "clientId",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 512"
        },
        {
          "example": "guest",
          "name": "method",
          "required": true,
          "type": "value",
          "validation": "one of guest | email_code"
        },
        {
          "example": "backend",
          "name": "mode",
          "required": true,
          "type": "value",
          "validation": "one of backend | public"
        },
        {
          "example": "{origin}",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": "{redirectUri}",
          "name": "redirectUri",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "name": "expectedUpdatedAt",
          "required": false,
          "type": "string",
          "validation": "format date-time"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CustomAuthenticationRegistrationInput"
      },
      "retrySafety": "unsafe",
      "summary": "Register or replace custom authentication configuration"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/EndpointSetMutationRequest"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"postLogoutUris\":[],\"redirectUris\":[],\"trustedOrigins\":[]}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/endpoints'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "postLogoutUris": [],
        "redirectUris": [],
        "trustedOrigins": []
      },
      "method": "PUT",
      "operationId": "replaceAppEnvironmentEndpoints",
      "outcomes": [
        {
          "description": "The environment was updated",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The environment is unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "The environment version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The configuration is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/endpoints",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": [],
          "name": "postLogoutUris",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "example": [],
          "name": "redirectUris",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "example": [],
          "name": "trustedOrigins",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/EndpointSetMutationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Replace environment endpoints"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/guest-admission'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "getGuestAdmissionPolicy",
      "outcomes": [
        {
          "description": "Guest admission policy",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-admission",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read the environment guest admission policy"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (required): application/json, #/components/schemas/GuestAdmissionPolicyUpdate"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"accessSeconds\":1,\"absoluteSeconds\":1,\"capabilities\":[\"app:read\"],\"enabled\":true,\"idleSeconds\":1,\"maxCreationsPerSource\":1,\"maxRequestsPerSource\":1,\"maxWorkspaceGuests\":1,\"mode\":\"open\",\"policyVersion\":0,\"requiredAssurance\":\"anonymous\",\"expectedPolicyVersion\":0}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/guest-admission'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {
        "accessSeconds": 1,
        "absoluteSeconds": 1,
        "capabilities": [
          "app:read"
        ],
        "enabled": true,
        "idleSeconds": 1,
        "maxCreationsPerSource": 1,
        "maxRequestsPerSource": 1,
        "maxWorkspaceGuests": 1,
        "mode": "open",
        "policyVersion": 0,
        "requiredAssurance": "anonymous",
        "expectedPolicyVersion": 0
      },
      "method": "PUT",
      "operationId": "updateGuestAdmissionPolicy",
      "outcomes": [
        {
          "description": "Updated guest admission policy",
          "status": 200,
          "success": true
        },
        {
          "description": "Policy version conflict",
          "status": 412,
          "success": false
        },
        {
          "description": "Invalid policy",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-admission",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "example": 1,
          "name": "accessSeconds",
          "required": true,
          "type": "integer",
          "validation": "min 1, max 600"
        },
        {
          "example": 1,
          "name": "absoluteSeconds",
          "required": true,
          "type": "integer",
          "validation": "min 1, max 86400"
        },
        {
          "example": [
            "app:read"
          ],
          "name": "capabilities",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "example": true,
          "name": "enabled",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "idleSeconds",
          "required": true,
          "type": "integer",
          "validation": "min 1, max 3600"
        },
        {
          "example": 1,
          "name": "maxCreationsPerSource",
          "required": true,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "example": 1,
          "name": "maxRequestsPerSource",
          "required": true,
          "type": "integer",
          "validation": "min 1, max 1000"
        },
        {
          "example": 1,
          "name": "maxWorkspaceGuests",
          "required": true,
          "type": "integer",
          "validation": "min 1, max 10000"
        },
        {
          "example": "open",
          "name": "mode",
          "required": true,
          "type": "string",
          "validation": "one of open | invitation_only | administrator_approval"
        },
        {
          "example": 0,
          "name": "policyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        },
        {
          "example": "anonymous",
          "name": "requiredAssurance",
          "required": true,
          "type": "string",
          "validation": "one of anonymous | single_factor | multi_factor"
        },
        {
          "example": 0,
          "name": "expectedPolicyVersion",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/GuestAdmissionPolicyUpdate"
      },
      "retrySafety": "unsafe",
      "summary": "Update the environment guest admission policy"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/guest-admission/usage'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "getGuestAdmissionUsage",
      "outcomes": [
        {
          "description": "Guest usage",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-admission/usage",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read safe guest admission usage"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header x-authless-conversion-intent (required): string, minLength 16, maxLength 512",
        "header idempotency-key (required): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/GuestConversionConfirmationRequest"
      ],
      "example": "curl --request POST -H 'x-authless-conversion-intent: {x-authless-conversion-intent}' -H 'idempotency-key: request-example-001' -H 'content-type: application/json' --data '{\"confirmation\":\"convert_guest\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/guest-conversion'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "x-authless-conversion-intent": "{x-authless-conversion-intent}",
        "idempotency-key": "request-example-001"
      },
      "exampleRequestBody": {
        "confirmation": "convert_guest"
      },
      "method": "POST",
      "operationId": "confirmGuestConversion",
      "outcomes": [
        {
          "description": "Previously applied conversion",
          "status": 200,
          "success": true
        },
        {
          "description": "Conversion completed",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid conversion request",
          "status": 400,
          "success": false
        },
        {
          "description": "Conversion authority rejected",
          "status": 401,
          "success": false
        },
        {
          "description": "Conversion conflict or idempotency mismatch",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-conversion",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{x-authless-conversion-intent}",
          "location": "header",
          "name": "x-authless-conversion-intent",
          "required": true,
          "type": "string",
          "validation": "minLength 16, maxLength 512"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "convert_guest",
          "name": "confirmation",
          "required": true,
          "type": "string",
          "validation": "one of convert_guest"
        },
        {
          "name": "mergeProfile",
          "required": false,
          "type": "string",
          "validation": "one of keep_person | keep_guest"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/GuestConversionConfirmationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Confirm a hosted guest conversion"
    },
    {
      "authority": [
        "A browser-held guest access token. Pair it with the required DPoP, origin, CSRF, and browser-binding headers. Never store it as a server credential or expose it in logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header authorization (required): string, minLength 8",
        "header dpop (required): string, minLength 8",
        "header origin (required): string, format uri",
        "header x-authless-browser-binding (required): string, minLength 8",
        "header x-csrf-token (required): string, minLength 8",
        "JSON request body (required): application/json, #/components/schemas/GuestConversionIntentRequest"
      ],
      "example": "curl --request POST -H 'authorization: {authorization}' -H 'dpop: {dpop}xx' -H 'origin: {origin}' -H 'x-authless-browser-binding: {x-authless-browser-binding}' -H 'x-csrf-token: {x-csrf-token}' -H 'content-type: application/json' --data '{\"requestedScopes\":[\"{requestedScopes_1}\"]}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/guest-conversion/intents'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "authorization": "{authorization}",
        "dpop": "{dpop}xx",
        "origin": "{origin}",
        "x-authless-browser-binding": "{x-authless-browser-binding}",
        "x-csrf-token": "{x-csrf-token}"
      },
      "exampleRequestBody": {
        "requestedScopes": [
          "{requestedScopes_1}"
        ]
      },
      "method": "POST",
      "operationId": "beginGuestConversionIntent",
      "outcomes": [
        {
          "description": "Hosted conversion intent created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid conversion request",
          "status": 400,
          "success": false
        },
        {
          "description": "Guest authority rejected",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-conversion/intents",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{authorization}",
          "location": "header",
          "name": "authorization",
          "required": true,
          "type": "string",
          "validation": "minLength 8"
        },
        {
          "example": "{dpop}xx",
          "location": "header",
          "name": "dpop",
          "required": true,
          "type": "string",
          "validation": "minLength 8"
        },
        {
          "example": "{origin}",
          "location": "header",
          "name": "origin",
          "required": true,
          "type": "string",
          "validation": "format uri"
        },
        {
          "example": "{x-authless-browser-binding}",
          "location": "header",
          "name": "x-authless-browser-binding",
          "required": true,
          "type": "string",
          "validation": "minLength 8"
        },
        {
          "example": "{x-csrf-token}",
          "location": "header",
          "name": "x-csrf-token",
          "required": true,
          "type": "string",
          "validation": "minLength 8"
        }
      ],
      "requestBodyFields": [
        {
          "example": [
            "{requestedScopes_1}"
          ],
          "name": "requestedScopes",
          "required": true,
          "type": "array",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/GuestConversionIntentRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Begin a hosted guest conversion intent"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path intent (required): string, minLength 16, maxLength 512"
      ],
      "example": "curl --request GET 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/guest-conversion/intents/%7Bintent%7Dxxxxxxxx'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "intent": "{intent}xxxxxxxx"
      },
      "method": "GET",
      "operationId": "getGuestConversionIntent",
      "outcomes": [
        {
          "description": "Conversion intent",
          "status": 200,
          "success": true
        },
        {
          "description": "Conversion intent not found",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-conversion/intents/{intent}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{intent}xxxxxxxx",
          "location": "path",
          "name": "intent",
          "required": true,
          "type": "string",
          "validation": "minLength 16, maxLength 512"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read a hosted guest conversion intent"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/OidcClientProfileMutationRequest"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"dpopBoundAccessTokens\":true,\"publicJwks\":{\"keys\":[]},\"refreshEligible\":true,\"tokenEndpointAuthMethod\":\"none\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/oidc-profile'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "dpopBoundAccessTokens": true,
        "publicJwks": {
          "keys": []
        },
        "refreshEligible": true,
        "tokenEndpointAuthMethod": "none"
      },
      "method": "PUT",
      "operationId": "replaceAppEnvironmentOidcProfile",
      "outcomes": [
        {
          "description": "The environment was updated",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The environment is unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "The environment version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The configuration is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/oidc-profile",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "backchannelLogoutUri",
          "required": false,
          "type": "value",
          "validation": "—"
        },
        {
          "example": true,
          "name": "dpopBoundAccessTokens",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "jwtAccessTokenResources",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "example": {
            "keys": []
          },
          "name": "publicJwks",
          "required": true,
          "type": "value",
          "validation": "—"
        },
        {
          "example": true,
          "name": "refreshEligible",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "none",
          "name": "tokenEndpointAuthMethod",
          "required": true,
          "type": "string",
          "validation": "one of none | private_key_jwt"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/OidcClientProfileMutationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Replace environment OIDC profile"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/policy'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "getAuthenticationPolicy",
      "outcomes": [
        {
          "description": "The policy view",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read the active policy and draft"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header if-match (optional): string, pattern ^\"(0|[1-9]\\d*)\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/PolicyDefinitionRequest"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"definition\":{\"appIdentity\":{\"description\":\"{description}\",\"name\":\"Example\",\"ownerContactEmail\":\"person@example.test\"},\"consentPurpose\":\"{consentPurpose}\",\"correlation\":{\"boundary\":\"app\",\"essential\":true,\"purpose\":\"{purpose}\"},\"eligibleMethods\":[\"M-01\"],\"enrollmentMode\":\"administrator_approval\",\"recovery\":{\"verifiedEmailRequired\":true},\"requestedClaims\":[],\"session\":{\"absoluteSeconds\":1,\"idleSeconds\":1}}}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/policy'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "definition": {
          "appIdentity": {
            "description": "{description}",
            "name": "Example",
            "ownerContactEmail": "person@example.test"
          },
          "consentPurpose": "{consentPurpose}",
          "correlation": {
            "boundary": "app",
            "essential": true,
            "purpose": "{purpose}"
          },
          "eligibleMethods": [
            "M-01"
          ],
          "enrollmentMode": "administrator_approval",
          "recovery": {
            "verifiedEmailRequired": true
          },
          "requestedClaims": [],
          "session": {
            "absoluteSeconds": 1,
            "idleSeconds": 1
          }
        }
      },
      "method": "PUT",
      "operationId": "saveAuthenticationPolicyDraft",
      "outcomes": [
        {
          "description": "The policy view",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The environment is unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "The version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The policy is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "A version precondition is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"(0|[1-9]\\d*)\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": {
            "appIdentity": {
              "description": "{description}",
              "name": "Example",
              "ownerContactEmail": "person@example.test"
            },
            "consentPurpose": "{consentPurpose}",
            "correlation": {
              "boundary": "app",
              "essential": true,
              "purpose": "{purpose}"
            },
            "eligibleMethods": [
              "M-01"
            ],
            "enrollmentMode": "administrator_approval",
            "recovery": {
              "verifiedEmailRequired": true
            },
            "requestedClaims": [],
            "session": {
              "absoluteSeconds": 1,
              "idleSeconds": 1
            }
          },
          "name": "definition",
          "required": true,
          "type": "object",
          "validation": "—"
        },
        {
          "name": "expectedDraftVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/PolicyDefinitionRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Replace the policy draft"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header if-match (optional): string, pattern ^\"(0|[1-9]\\d*)\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ActivatePolicyRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/policy/activate'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true
      },
      "method": "POST",
      "operationId": "activateAuthenticationPolicy",
      "outcomes": [
        {
          "description": "The policy view",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The environment is unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "The version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The policy is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "A version precondition is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy/activate",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"(0|[1-9]\\d*)\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "one of true"
        },
        {
          "name": "expectedDraftVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ActivatePolicyRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Publish the policy draft"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "query limit (optional): integer, min 1, max 100",
        "query cursor (optional): integer, min 0"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/policy/history'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "listAuthenticationPolicyHistory",
      "outcomes": [
        {
          "description": "A page of immutable revisions",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy/history",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List immutable policy revisions"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path version (required): integer, min 1"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/policy/history/1'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "version": 1
      },
      "method": "GET",
      "operationId": "getAuthenticationPolicyRevision",
      "outcomes": [
        {
          "description": "The immutable revision",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy/history/{version}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": 1,
          "location": "path",
          "name": "version",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read one immutable policy revision"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path version (required): integer, min 1",
        "header if-match (optional): string, pattern ^\"(0|[1-9]\\d*)\"$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RestorePolicyRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/policy/history/1/restore'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "version": 1,
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "restoreAuthenticationPolicyRevision",
      "outcomes": [
        {
          "description": "The policy view",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The environment is unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "The version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The policy is invalid",
          "status": 422,
          "success": false
        },
        {
          "description": "A version precondition is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy/history/{version}/restore",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": 1,
          "location": "path",
          "name": "version",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"(0|[1-9]\\d*)\"$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "expectedDraftVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RestorePolicyRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Restore a revision into the draft"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (optional): application/json, object"
      ],
      "example": "curl --request DELETE -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/app/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "removeAppProfileAppAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "properties": {
          "expectedVersion": {
            "type": "integer"
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (required): application/json, #/components/schemas/AppProfileAvatarPublishRequest"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"assetId\":\"{assetId}\",\"revision\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/app/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {
        "assetId": "{assetId}",
        "revision": 1
      },
      "method": "POST",
      "operationId": "publishAppProfileAppAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{assetId}",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "revision",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AppProfileAvatarPublishRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request POST 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/app/avatar-intents'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "POST",
      "operationId": "createAppProfileAppAvatarIntent",
      "outcomes": [
        {
          "description": "Upload intent",
          "status": 201,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar-intents",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Issue an app-profile avatar upload intent"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path intentId (required): string",
        "Raw binary request body (required): image/png, image/jpeg, image/webp"
      ],
      "example": "curl --request PUT -H 'content-type: image/png' --data-binary @icon.png 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/app/avatar/%7BintentId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "intentId": "{intentId}"
      },
      "method": "PUT",
      "operationId": "uploadAppProfileAppAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar/{intentId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{intentId}",
          "location": "path",
          "name": "intentId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "format": "binary"
      },
      "retrySafety": "unsafe",
      "summary": "Upload an app-profile avatar"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/me'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "getAppProfileMe",
      "outcomes": [
        {
          "description": "Profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/me",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read an app-local user profile"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (required): application/json, object"
      ],
      "example": "curl --request PATCH -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/me'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {},
      "method": "PATCH",
      "operationId": "updateAppProfileMe",
      "outcomes": [
        {
          "description": "Profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/me",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "name": "displayName",
          "required": false,
          "type": "value",
          "validation": "maxLength 80"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "displayName": {
            "type": [
              "string",
              "null"
            ],
            "maxLength": 80
          },
          "expectedVersion": {
            "type": "integer",
            "minimum": 0
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-local user profile"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (optional): application/json, object"
      ],
      "example": "curl --request DELETE -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/user/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "removeAppProfileUserAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "properties": {
          "expectedVersion": {
            "type": "integer"
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (required): application/json, #/components/schemas/AppProfileAvatarPublishRequest"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"assetId\":\"{assetId}\",\"revision\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/user/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {
        "assetId": "{assetId}",
        "revision": 1
      },
      "method": "POST",
      "operationId": "publishAppProfileUserAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{assetId}",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "revision",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AppProfileAvatarPublishRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request POST 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/user/avatar-intents'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "POST",
      "operationId": "createAppProfileUserAvatarIntent",
      "outcomes": [
        {
          "description": "Upload intent",
          "status": 201,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar-intents",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Issue an app-profile avatar upload intent"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path intentId (required): string",
        "Raw binary request body (required): image/png, image/jpeg, image/webp"
      ],
      "example": "curl --request PUT -H 'content-type: image/png' --data-binary @icon.png 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profile/user/avatar/%7BintentId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "intentId": "{intentId}"
      },
      "method": "PUT",
      "operationId": "uploadAppProfileUserAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar/{intentId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{intentId}",
          "location": "path",
          "name": "intentId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "format": "binary"
      },
      "retrySafety": "unsafe",
      "summary": "Upload an app-profile avatar"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string"
      ],
      "example": "curl --request GET 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "method": "GET",
      "operationId": "getAppProfileSubject",
      "outcomes": [
        {
          "description": "Profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read an app-local user profile"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string",
        "JSON request body (required): application/json, object"
      ],
      "example": "curl --request PATCH -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "exampleRequestBody": {},
      "method": "PATCH",
      "operationId": "updateAppProfileSubject",
      "outcomes": [
        {
          "description": "Profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "name": "displayName",
          "required": false,
          "type": "value",
          "validation": "maxLength 80"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "displayName": {
            "type": [
              "string",
              "null"
            ],
            "maxLength": 80
          },
          "expectedVersion": {
            "type": "integer",
            "minimum": 0
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-local user profile"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string",
        "JSON request body (optional): application/json, object"
      ],
      "example": "curl --request DELETE -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/app/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "removeAppProfileSubjectAppAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "properties": {
          "expectedVersion": {
            "type": "integer"
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string",
        "JSON request body (required): application/json, #/components/schemas/AppProfileAvatarPublishRequest"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"assetId\":\"{assetId}\",\"revision\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/app/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "exampleRequestBody": {
        "assetId": "{assetId}",
        "revision": 1
      },
      "method": "POST",
      "operationId": "publishAppProfileSubjectAppAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{assetId}",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "revision",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AppProfileAvatarPublishRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string"
      ],
      "example": "curl --request POST 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/app/avatar-intents'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "method": "POST",
      "operationId": "createAppProfileSubjectAppAvatarIntent",
      "outcomes": [
        {
          "description": "Upload intent",
          "status": 201,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar-intents",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Issue an app-profile avatar upload intent"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path intentId (required): string",
        "path subjectId (required): string",
        "Raw binary request body (required): image/png, image/jpeg, image/webp"
      ],
      "example": "curl --request PUT -H 'content-type: image/png' --data-binary @icon.png 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/app/avatar/%7BintentId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "intentId": "{intentId}",
        "subjectId": "{subjectId}"
      },
      "method": "PUT",
      "operationId": "uploadAppProfileSubjectAppAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar/{intentId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{intentId}",
          "location": "path",
          "name": "intentId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "format": "binary"
      },
      "retrySafety": "unsafe",
      "summary": "Upload an app-profile avatar"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string",
        "JSON request body (optional): application/json, object"
      ],
      "example": "curl --request DELETE -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/user/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "exampleRequestBody": {},
      "method": "DELETE",
      "operationId": "removeAppProfileSubjectUserAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "properties": {
          "expectedVersion": {
            "type": "integer"
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string",
        "JSON request body (required): application/json, #/components/schemas/AppProfileAvatarPublishRequest"
      ],
      "example": "curl --request POST -H 'content-type: application/json' --data '{\"assetId\":\"{assetId}\",\"revision\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/user/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "exampleRequestBody": {
        "assetId": "{assetId}",
        "revision": 1
      },
      "method": "POST",
      "operationId": "publishAppProfileSubjectUserAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{assetId}",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "revision",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/AppProfileAvatarPublishRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Update an app-profile avatar binding"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path subjectId (required): string"
      ],
      "example": "curl --request POST 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/user/avatar-intents'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "subjectId": "{subjectId}"
      },
      "method": "POST",
      "operationId": "createAppProfileSubjectUserAvatarIntent",
      "outcomes": [
        {
          "description": "Upload intent",
          "status": 201,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar-intents",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Issue an app-profile avatar upload intent"
    },
    {
      "authority": [
        "Public command. Send no credential; enumeration-safe responses do not disclose identity state."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path intentId (required): string",
        "path subjectId (required): string",
        "Raw binary request body (required): image/png, image/jpeg, image/webp"
      ],
      "example": "curl --request PUT -H 'content-type: image/png' --data-binary @icon.png 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/profiles/%7BsubjectId%7D/user/avatar/%7BintentId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "intentId": "{intentId}",
        "subjectId": "{subjectId}"
      },
      "method": "PUT",
      "operationId": "uploadAppProfileSubjectUserAvatar",
      "outcomes": [
        {
          "description": "Updated profile",
          "status": 200,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "Version conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar/{intentId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{intentId}",
          "location": "path",
          "name": "intentId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{subjectId}",
          "location": "path",
          "name": "subjectId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "format": "binary"
      },
      "retrySafety": "unsafe",
      "summary": "Upload an app-profile avatar"
    },
    {
      "authority": [
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "JSON request body (required): application/json, #/components/schemas/ValidateAppSessionRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'content-type: application/json' --data '{\"sessionReference\":\"session_reference_example_01\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/test/sessions/validate'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "exampleRequestBody": {
        "sessionReference": "session_reference_example_01"
      },
      "method": "POST",
      "operationId": "validateAppSessionOnline",
      "outcomes": [
        {
          "description": "The current online session decision",
          "status": 200,
          "success": true
        },
        {
          "description": "The session reference is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The app credential is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The app environment is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/sessions/validate",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [
        {
          "example": "session_reference_example_01",
          "name": "sessionReference",
          "required": true,
          "type": "string",
          "validation": "minLength 16, maxLength 16384, pattern ^[A-Za-z0-9_.-]+$"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ValidateAppSessionRequest"
      },
      "retrySafety": "safe",
      "summary": "Validate an app session against the current policy"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production"
      },
      "method": "GET",
      "operationId": "listIntegrationWebhooks",
      "outcomes": [
        {
          "description": "Cursor-paginated secret-free webhook projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The page request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The app integration boundary is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List secret-free webhooks for an app environment"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RegisterIntegrationWebhookRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"subscriptions\":[],\"url\":\"{url}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "subscriptions": [],
        "url": "{url}"
      },
      "method": "POST",
      "operationId": "registerIntegrationWebhook",
      "outcomes": [
        {
          "description": "The canonical webhook result was replayed without its signing secret",
          "status": 200,
          "success": true
        },
        {
          "description": "The webhook was registered and its signing secret disclosed once",
          "status": 201,
          "success": true
        },
        {
          "description": "The webhook request is malformed",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The app integration boundary is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or environment state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The requested integration state is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation or webhook safety validation failed",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": [],
          "name": "subscriptions",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "example": "{url}",
          "name": "url",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RegisterIntegrationWebhookRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Register an app-environment webhook with one-time signing-secret disclosure"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path webhookId (required): string",
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks/%7BwebhookId%7D/deliveries'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "webhookId": "{webhookId}"
      },
      "method": "GET",
      "operationId": "listIntegrationWebhookDeliveries",
      "outcomes": [
        {
          "description": "Cursor-paginated secret-free webhook delivery projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The page request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The webhook delivery boundary is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks/{webhookId}/deliveries",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{webhookId}",
          "location": "path",
          "name": "webhookId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List secret-free delivery state for an app-environment webhook"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path webhookId (required): string",
        "path deliveryId (required): string",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ReplayIntegrationWebhookDeliveryRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks/%7BwebhookId%7D/deliveries/%7BdeliveryId%7D/replay'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "webhookId": "{webhookId}",
        "deliveryId": "{deliveryId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "replayIntegrationWebhookDelivery",
      "outcomes": [
        {
          "description": "The delivery replay was accepted or its durable idempotent outcome returned",
          "status": 202,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The webhook or delivery is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or webhook state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "Confirmation validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid idempotency key and request body are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks/{webhookId}/deliveries/{deliveryId}/replay",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{webhookId}",
          "location": "path",
          "name": "webhookId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{deliveryId}",
          "location": "path",
          "name": "deliveryId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ReplayIntegrationWebhookDeliveryRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Replay one webhook delivery with an idempotent operation envelope"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path webhookId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/DisableIntegrationWebhookRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks/%7BwebhookId%7D/disable'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "webhookId": "{webhookId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "disableIntegrationWebhook",
      "outcomes": [
        {
          "description": "The webhook was disabled or its canonical result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The webhook is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or webhook state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The webhook version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid version, idempotency key, and request body are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks/{webhookId}/disable",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{webhookId}",
          "location": "path",
          "name": "webhookId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/DisableIntegrationWebhookRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Disable an app-environment webhook without exposing signing-secret state"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path webhookId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RotateIntegrationWebhookSecretRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"overlapSeconds\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks/%7BwebhookId%7D/rotate'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "webhookId": "{webhookId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "overlapSeconds": 1
      },
      "method": "POST",
      "operationId": "rotateIntegrationWebhookSecret",
      "outcomes": [
        {
          "description": "The signing secret was rotated with one-time disclosure, or its safe result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The webhook is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or webhook state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The webhook version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation or rotation-overlap validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid version, idempotency key, and overlap are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks/{webhookId}/rotate",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{webhookId}",
          "location": "path",
          "name": "webhookId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "overlapSeconds",
          "required": true,
          "type": "number",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RotateIntegrationWebhookSecretRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Rotate an app-environment webhook signing secret with bounded overlap"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "path webhookId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ReplaceIntegrationWebhookSubscriptionsRequest"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"subscriptions\":[]}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks/%7BwebhookId%7D/subscriptions'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "webhookId": "{webhookId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "subscriptions": []
      },
      "method": "PUT",
      "operationId": "replaceIntegrationWebhookSubscriptions",
      "outcomes": [
        {
          "description": "The subscription set was replaced or its canonical result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The webhook is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or webhook state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The webhook version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Confirmation or subscription validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid version, idempotency key, and subscription set are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks/{webhookId}/subscriptions",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "{webhookId}",
          "location": "path",
          "name": "webhookId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": [],
          "name": "subscriptions",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ReplaceIntegrationWebhookSubscriptionsRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Replace an app-environment webhook subscription set"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of production | test",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ReconcileIntegrationWebhooksRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/production/webhooks/reconcile'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "production",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "reconcileIntegrationWebhooks",
      "outcomes": [
        {
          "description": "Webhook delivery state was reconciled or its durable idempotent outcome returned",
          "status": 202,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent platform authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The app integration boundary is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or environment state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "Confirmation validation failed",
          "status": 422,
          "success": false
        },
        {
          "description": "A valid idempotency key and request body are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/{environment}/webhooks/reconcile",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "production",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of production | test"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ReconcileIntegrationWebhooksRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Reconcile webhook delivery state with an idempotent operation envelope"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path operationId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/bulk-access/operations/%7BoperationId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "operationId": "{operationId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "getBulkAccessOperation",
      "outcomes": [
        {
          "description": "The exact durable operation",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Current exact-app administration is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact operation is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{operationId}",
          "location": "path",
          "name": "operationId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read one exact durable bulk access operation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path operationId (required): string",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ConfirmBulkAccessRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/bulk-access/operations/%7BoperationId%7D/cancellation'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "operationId": "{operationId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true
      },
      "method": "POST",
      "operationId": "cancelBulkAccessOperation",
      "outcomes": [
        {
          "description": "The operation was cancelled or its canonical result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The cancellation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent exact-app administration is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact operation is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The operation is busy, terminal, or the idempotency claim conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The operation version changed",
          "status": 412,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "A version or idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}/cancellation",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{operationId}",
          "location": "path",
          "name": "operationId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ConfirmBulkAccessRequest"
      },
      "retrySafety": "safe",
      "summary": "Cancel one exact version-bound bulk access operation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path operationId (required): string",
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100",
        "query download (optional): string, one of 1",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/bulk-access/operations/%7BoperationId%7D/results'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "operationId": "{operationId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "listBulkAccessResults",
      "outcomes": [
        {
          "description": "A bounded JSON page or immutable JSONL evidence",
          "status": 200,
          "success": true
        },
        {
          "description": "The result request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The exact operation is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "Immutable result evidence is not yet available",
          "status": 409,
          "success": false
        },
        {
          "description": "Immutable result evidence has expired",
          "status": 410,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}/results",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{operationId}",
          "location": "path",
          "name": "operationId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "location": "query",
          "name": "download",
          "required": false,
          "type": "string",
          "validation": "one of 1"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List safe item results or download immutable JSONL evidence for one bulk operation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/CreateBulkAccessPreviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"action\":\"suspend_memberships\",\"filter\":{\"membershipIds\":[\"{membershipIds_1}\"]},\"reason\":\"administrator_action\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/bulk-access/previews'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "action": "suspend_memberships",
        "filter": {
          "membershipIds": [
            "{membershipIds_1}"
          ]
        },
        "reason": "administrator_action"
      },
      "method": "POST",
      "operationId": "createBulkAccessPreview",
      "outcomes": [
        {
          "description": "The immutable bulk access preview was created",
          "status": 201,
          "success": true
        },
        {
          "description": "The preview request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent exact-app administration is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact role or entitlement definition is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "suspend_memberships",
          "name": "action",
          "required": true,
          "type": "string",
          "validation": "one of grant_entitlements | grant_roles | suspend_memberships"
        },
        {
          "name": "entitlement",
          "required": false,
          "type": "object",
          "validation": "—"
        },
        {
          "example": {
            "membershipIds": [
              "{membershipIds_1}"
            ]
          },
          "name": "filter",
          "required": true,
          "type": "object",
          "validation": "—"
        },
        {
          "example": "administrator_action",
          "name": "reason",
          "required": true,
          "type": "string",
          "validation": "one of administrator_action | policy_violation | security_review"
        },
        {
          "name": "role",
          "required": false,
          "type": "object",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateBulkAccessPreviewRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create a read-only preview of an exact-app bulk access change"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path previewId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/bulk-access/previews/%7BpreviewId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "previewId": "{previewId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "getBulkAccessPreview",
      "outcomes": [
        {
          "description": "The exact durable preview",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent exact-app administration is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact preview is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews/{previewId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{previewId}",
          "location": "path",
          "name": "previewId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read one exact durable bulk access preview"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path previewId (required): string",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ExecuteBulkAccessPreviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"previewIntegrityDigest\":\"sha256:0000000000000000000000000000000000000000000000000000000000000000\",\"previewVersion\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/bulk-access/previews/%7BpreviewId%7D/executions'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "previewId": "{previewId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "previewIntegrityDigest": "sha256:0000000000000000000000000000000000000000000000000000000000000000",
        "previewVersion": 1
      },
      "method": "POST",
      "operationId": "executeBulkAccessPreview",
      "outcomes": [
        {
          "description": "The canonical operation was replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The operation was queued",
          "status": 202,
          "success": true
        },
        {
          "description": "The execution request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent exact-app administration is required",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact preview is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency claim or preview digest conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The preview expired",
          "status": 410,
          "success": false
        },
        {
          "description": "The preview version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "An idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews/{previewId}/executions",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{previewId}",
          "location": "path",
          "name": "previewId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "sha256:0000000000000000000000000000000000000000000000000000000000000000",
          "name": "previewIntegrityDigest",
          "required": true,
          "type": "string",
          "validation": "pattern ^sha256:[0-9a-f]{64}$"
        },
        {
          "example": 1,
          "name": "previewVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ExecuteBulkAccessPreviewRequest"
      },
      "retrySafety": "safe",
      "summary": "Confirm and queue one exact durable bulk access preview"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}"
      },
      "method": "GET",
      "operationId": "getAppCommerceView",
      "outcomes": [
        {
          "description": "App commerce configuration",
          "status": 200,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "App unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get app commerce configuration"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "getAppCommerceEnvironmentView",
      "outcomes": [
        {
          "description": "Environment commerce configuration",
          "status": 200,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "App environment unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get app commerce configuration for an environment"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/accounting'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "getAppCommercePublisherAccounting",
      "outcomes": [
        {
          "description": "Publisher accounting state",
          "status": 200,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Accounting unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/accounting",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Read app publisher accounting"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/accounting/release-reserves'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "releaseAppCommercePublisherReserves",
      "outcomes": [
        {
          "description": "Reserve release accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/accounting/release-reserves",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Release matured publisher reserves"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/CreateAppCommerceAddonRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"amountMicros\":0,\"currency\":\"{currency}\",\"interval\":\"month\",\"key\":\"{key}\",\"name\":\"Example\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/addons'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "amountMicros": 0,
        "currency": "{currency}",
        "interval": "month",
        "key": "{key}",
        "name": "Example"
      },
      "method": "POST",
      "operationId": "createAppCommerceAddon",
      "outcomes": [
        {
          "description": "Add-on created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid add-on",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/addons",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{key}",
          "name": "key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        },
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        },
        {
          "name": "description",
          "required": false,
          "type": "string",
          "validation": "maxLength 2000"
        },
        {
          "example": "{currency}",
          "name": "currency",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 0,
          "name": "amountMicros",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        },
        {
          "example": "month",
          "name": "interval",
          "required": true,
          "type": "string",
          "validation": "one of month | year | one_time"
        },
        {
          "name": "features",
          "required": false,
          "type": "object",
          "validation": "—"
        },
        {
          "name": "entitlementDuration",
          "required": false,
          "type": "string",
          "validation": "one of period | indefinite"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateAppCommerceAddonRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create an app commerce add-on"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/CreateAppCommerceCatalogRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"defaultCurrency\":\"USD\",\"name\":\"Example\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/catalog'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "defaultCurrency": "USD",
        "name": "Example"
      },
      "method": "POST",
      "operationId": "createAppCommerceCatalog",
      "outcomes": [
        {
          "description": "Catalog created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid catalog",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Catalog already exists",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/catalog",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 240"
        },
        {
          "example": "USD",
          "name": "defaultCurrency",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 3"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateAppCommerceCatalogRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create an app commerce catalog"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path customerRef (required): string"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/customers/%7BcustomerRef%7D/entitlements'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "customerRef": "{customerRef}"
      },
      "method": "GET",
      "operationId": "getAppCommerceEntitlements",
      "outcomes": [
        {
          "description": "Effective entitlements",
          "status": 200,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Customer or app environment unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/customers/{customerRef}/entitlements",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{customerRef}",
          "location": "path",
          "name": "customerRef",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get effective entitlements for an app customer"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path customerRef (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/RecordAppCommerceUsageRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"meterKey\":\"{meterKey}\",\"quantity\":0}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/customers/%7BcustomerRef%7D/usage'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "customerRef": "{customerRef}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "meterKey": "{meterKey}",
        "quantity": 0
      },
      "method": "POST",
      "operationId": "recordAppCommerceUsage",
      "outcomes": [
        {
          "description": "Usage accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid usage",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/customers/{customerRef}/usage",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{customerRef}",
          "location": "path",
          "name": "customerRef",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{meterKey}",
          "name": "meterKey",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        },
        {
          "example": 0,
          "name": "quantity",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RecordAppCommerceUsageRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Record usage for an app customer"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/CreateAppCommerceFeatureRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"key\":\"{key}\",\"name\":\"Example\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/features'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "key": "{key}",
        "name": "Example"
      },
      "method": "POST",
      "operationId": "createAppCommerceFeature",
      "outcomes": [
        {
          "description": "Feature created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid feature",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/features",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{key}",
          "name": "key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        },
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        },
        {
          "name": "description",
          "required": false,
          "type": "string",
          "validation": "maxLength 2000"
        },
        {
          "name": "metered",
          "required": false,
          "type": "boolean",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateAppCommerceFeatureRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create an app commerce feature"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path invoiceId (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/RequestAppCommerceRefundRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"amountMinor\":1,\"currency\":\"{currency}\",\"paymentId\":\"{paymentId}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/invoices/%7BinvoiceId%7D/refunds'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "invoiceId": "{invoiceId}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "amountMinor": 1,
        "currency": "{currency}",
        "paymentId": "{paymentId}"
      },
      "method": "POST",
      "operationId": "requestAppCommerceRefund",
      "outcomes": [
        {
          "description": "Refund request accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid refund request",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/invoices/{invoiceId}/refunds",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{invoiceId}",
          "location": "path",
          "name": "invoiceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{paymentId}",
          "name": "paymentId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{currency}",
          "name": "currency",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "amountMinor",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RequestAppCommerceRefundRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Request a refund for an app invoice"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/plans'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test"
      },
      "method": "GET",
      "operationId": "listAppCommercePlans",
      "outcomes": [
        {
          "description": "Published plans",
          "status": 200,
          "success": true
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "App environment unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/plans",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List published plans for an app environment"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240",
        "JSON request body (required): application/json, #/components/schemas/CreateAppCommercePlanRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' -H 'content-type: application/json' --data '{\"amountMicros\":0,\"currency\":\"{currency}\",\"interval\":\"month\",\"key\":\"{key}\",\"name\":\"Example\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/plans'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "exampleRequestBody": {
        "amountMicros": 0,
        "currency": "{currency}",
        "interval": "month",
        "key": "{key}",
        "name": "Example"
      },
      "method": "POST",
      "operationId": "createAppCommercePlan",
      "outcomes": [
        {
          "description": "Idempotent replay",
          "status": 200,
          "success": true
        },
        {
          "description": "Plan created",
          "status": 201,
          "success": true
        },
        {
          "description": "Invalid plan",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Idempotency conflict",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/plans",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{key}",
          "name": "key",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 240"
        },
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 240"
        },
        {
          "name": "description",
          "required": false,
          "type": "string",
          "validation": "maxLength 2000"
        },
        {
          "example": "{currency}",
          "name": "currency",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 0,
          "name": "amountMicros",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        },
        {
          "example": "month",
          "name": "interval",
          "required": true,
          "type": "string",
          "validation": "one of month | year"
        },
        {
          "name": "features",
          "required": false,
          "type": "object",
          "validation": "—"
        },
        {
          "name": "addOns",
          "required": false,
          "type": "array",
          "validation": "—"
        },
        {
          "name": "includedMeters",
          "required": false,
          "type": "object",
          "validation": "—"
        },
        {
          "name": "trialDays",
          "required": false,
          "type": "integer",
          "validation": "min 0, max 365"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateAppCommercePlanRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create a plan in an app environment"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path planId (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/plans/%7BplanId%7D/publish'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "planId": "{planId}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "publishAppCommercePlan",
      "outcomes": [
        {
          "description": "Plan publication accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "Invalid plan",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        },
        {
          "description": "Plan unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/plans/{planId}/publish",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{planId}",
          "location": "path",
          "name": "planId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Publish an app commerce plan revision"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/settlements'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "createAppCommerceSettlement",
      "outcomes": [
        {
          "description": "Settlement created",
          "status": 201,
          "success": true
        },
        {
          "description": "Settlement unavailable",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/settlements",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Create a publisher settlement"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "path environment (required): string, one of test | production",
        "path settlementId (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/test/settlements/%7BsettlementId%7D/payouts'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "environment": "test",
        "settlementId": "{settlementId}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "simulateAppCommercePayout",
      "outcomes": [
        {
          "description": "Simulated payout recorded",
          "status": 201,
          "success": true
        },
        {
          "description": "Payout unavailable",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/settlements/{settlementId}/payouts",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "test",
          "location": "path",
          "name": "environment",
          "required": true,
          "type": "string",
          "validation": "one of test | production"
        },
        {
          "example": "{settlementId}",
          "location": "path",
          "name": "settlementId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Create a simulated publisher payout"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path appId (required): string",
        "header Idempotency-Key (required): string, minLength 1, maxLength 240"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'Idempotency-Key: {Idempotency-Key}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/commerce/simulate-renewal'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "Idempotency-Key": "{Idempotency-Key}"
      },
      "method": "POST",
      "operationId": "simulateMockCommerceRenewal",
      "outcomes": [
        {
          "description": "Mock renewal accepted",
          "status": 202,
          "success": true
        },
        {
          "description": "The configured provider is not the test mock",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication required",
          "status": 401,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/commerce/simulate-renewal",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{Idempotency-Key}",
          "location": "header",
          "name": "Idempotency-Key",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 240"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Simulate a provider renewal in the test mock"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "JSON request body (required): application/json, object"
      ],
      "example": "curl --request DELETE -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"expected\":\"{expected}\"}' 'https://api.authle.ss/workspaces/undefined/apps/undefined/icon'",
      "exampleParameters": {},
      "exampleRequestBody": {
        "expected": "{expected}"
      },
      "method": "DELETE",
      "operationId": "clearAppIcon",
      "outcomes": [
        {
          "description": "Icon cleared",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid input",
          "status": 400,
          "success": false
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "App or asset not found",
          "status": 404,
          "success": false
        },
        {
          "description": "Revision conflict",
          "status": 409,
          "success": false
        },
        {
          "description": "Unexpected service failure",
          "status": 500,
          "success": false
        },
        {
          "description": "Temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/icon",
      "parameters": [],
      "requestBodyFields": [
        {
          "example": "{expected}",
          "name": "expected",
          "required": true,
          "type": "value",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "required": [
          "expected"
        ],
        "properties": {
          "expected": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/AppIconBinding"
              }
            ]
          }
        },
        "additionalProperties": false
      },
      "retrySafety": "unsafe",
      "summary": "Clear an app icon"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "JSON request body (required): application/json, object"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"assetId\":\"{assetId}\",\"revision\":1,\"expected\":\"{expected}\"}' 'https://api.authle.ss/workspaces/undefined/apps/undefined/icon'",
      "exampleParameters": {},
      "exampleRequestBody": {
        "assetId": "{assetId}",
        "revision": 1,
        "expected": "{expected}"
      },
      "method": "POST",
      "operationId": "publishAppIcon",
      "outcomes": [
        {
          "description": "Icon published",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid input",
          "status": 400,
          "success": false
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "App or asset not found",
          "status": 404,
          "success": false
        },
        {
          "description": "Revision conflict",
          "status": 409,
          "success": false
        },
        {
          "description": "Unexpected service failure",
          "status": 500,
          "success": false
        },
        {
          "description": "Temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/icon",
      "parameters": [],
      "requestBodyFields": [
        {
          "example": "{assetId}",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "revision",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "{expected}",
          "name": "expected",
          "required": true,
          "type": "value",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "required": [
          "assetId",
          "revision",
          "expected"
        ],
        "properties": {
          "assetId": {
            "type": "string"
          },
          "revision": {
            "type": "integer",
            "minimum": 1
          },
          "expected": {
            "anyOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/components/schemas/AppIconBinding"
              }
            ]
          }
        },
        "additionalProperties": false
      },
      "retrySafety": "unsafe",
      "summary": "Publish an app icon"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/undefined/apps/undefined/icon/intents'",
      "exampleParameters": {},
      "method": "POST",
      "operationId": "createAppIconUploadIntent",
      "outcomes": [
        {
          "description": "Upload intent created",
          "status": 201,
          "success": true
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "App or asset not found",
          "status": 404,
          "success": false
        },
        {
          "description": "Unexpected service failure",
          "status": 500,
          "success": false
        },
        {
          "description": "Temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/icon/intents",
      "parameters": [],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Create an app icon upload intent"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "Raw binary request body (required): image/png, image/jpeg, image/webp"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: image/png' --data-binary @icon.png 'https://api.authle.ss/workspaces/undefined/apps/undefined/icon/intents/undefined'",
      "exampleParameters": {},
      "method": "PUT",
      "operationId": "uploadAppIcon",
      "outcomes": [
        {
          "description": "Icon uploaded",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid input",
          "status": 400,
          "success": false
        },
        {
          "description": "Unauthorized",
          "status": 401,
          "success": false
        },
        {
          "description": "App or asset not found",
          "status": 404,
          "success": false
        },
        {
          "description": "Image upload exceeds the 5 MiB encoded limit",
          "status": 413,
          "success": false
        },
        {
          "description": "Unexpected service failure",
          "status": 500,
          "success": false
        },
        {
          "description": "Temporarily unavailable",
          "status": 503,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/icon/intents/{intentId}",
      "parameters": [],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "format": "binary"
      },
      "retrySafety": "unsafe",
      "summary": "Upload a processed app icon"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "query cursor (optional): string, maxLength 2048",
        "query limit (optional): integer, min 1, max 100",
        "query query (optional): string, maxLength 254",
        "query status (optional): ",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "listAppMemberships",
      "outcomes": [
        {
          "description": "Cursor-paginated consent-safe app-membership projections",
          "status": 200,
          "success": true
        },
        {
          "description": "The search or page request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-membership authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 2048"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "location": "query",
          "name": "query",
          "required": false,
          "type": "string",
          "validation": "maxLength 254"
        },
        {
          "location": "query",
          "name": "status",
          "required": false,
          "type": "string",
          "validation": "one of active | deleted | invited | pending_approval | pending_consent | revoked | suspended"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List privacy-safe app memberships under exact app authority"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/InviteAppMembershipRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"email\":\"person@example.test\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "email": "person@example.test"
      },
      "method": "POST",
      "operationId": "inviteAppMembership",
      "outcomes": [
        {
          "description": "The enumeration-safe invitation request was accepted or replayed",
          "status": 202,
          "success": true
        },
        {
          "description": "The invitation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-membership authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The idempotency key or customer reference conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "An idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "customerReference",
          "required": false,
          "type": "string",
          "validation": "maxLength 128"
        },
        {
          "example": "person@example.test",
          "name": "email",
          "required": true,
          "type": "string",
          "validation": "format email"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/InviteAppMembershipRequest"
      },
      "retrySafety": "safe",
      "summary": "Submit one enumeration-safe app-membership invitation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "getAppMembership",
      "outcomes": [
        {
          "description": "Authoritative versioned app-membership projection",
          "status": 200,
          "success": true
        },
        {
          "description": "The membership selector is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-membership authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The app membership is unavailable under this authority",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Inspect one privacy-safe versioned app membership"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'authorization: Bearer {app_credential}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D/access'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "getAppMembershipAccess",
      "outcomes": [
        {
          "description": "Independent membership, role, and entitlement state",
          "status": 200,
          "success": true
        },
        {
          "description": "The access selector is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-access authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The app membership is unavailable under this authority",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/access",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Inspect one membership's independent role and entitlement grants"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/GrantAppEntitlementRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"key\":\"{key}\",\"source\":\"{source}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D/entitlements'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "key": "{key}",
        "source": "{source}"
      },
      "method": "POST",
      "operationId": "grantAppEntitlement",
      "outcomes": [
        {
          "description": "The canonical entitlement grant was replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The entitlement was granted",
          "status": 201,
          "success": true
        },
        {
          "description": "The grant request, expiry, or referenced resource is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-access authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The definition version or idempotency key conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "Confirmation, a definition version, or an idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/entitlements",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "expiresAt",
          "required": false,
          "type": "string",
          "validation": "format date-time"
        },
        {
          "example": "{key}",
          "name": "key",
          "required": true,
          "type": "string",
          "validation": "maxLength 128"
        },
        {
          "example": "{source}",
          "name": "source",
          "required": true,
          "type": "string",
          "validation": "maxLength 200"
        },
        {
          "name": "expectedDefinitionVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/GrantAppEntitlementRequest"
      },
      "retrySafety": "safe",
      "summary": "Grant one optionally expiring entitlement to an exact app membership"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "path grantId (required): string, minLength 3, maxLength 128",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RevokeAppEntitlementRequest"
      ],
      "example": "curl --request DELETE -H 'authorization: Bearer {app_credential}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D/entitlements/%7BgrantId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "grantId": "{grantId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true
      },
      "method": "DELETE",
      "operationId": "revokeAppEntitlement",
      "outcomes": [
        {
          "description": "The entitlement was revoked or its canonical result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The revocation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-access authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact app-access grant is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts or the grant state is invalid",
          "status": 409,
          "success": false
        },
        {
          "description": "The entitlement-grant version changed",
          "status": 412,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "A grant version or idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/entitlements/{grantId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{grantId}",
          "location": "path",
          "name": "grantId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "expectedGrantVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RevokeAppEntitlementRequest"
      },
      "retrySafety": "safe",
      "summary": "Revoke one exact versioned app-entitlement grant"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/ChangeAppMembershipStatusRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"action\":\"activate\",\"confirmed\":true,\"reason\":\"access_ended\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D/lifecycle'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "action": "activate",
        "confirmed": true,
        "reason": "access_ended"
      },
      "method": "POST",
      "operationId": "changeAppMembershipStatus",
      "outcomes": [
        {
          "description": "The transition was applied or its canonical result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The lifecycle request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-membership authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The app membership is unavailable under this authority",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts or the transition is invalid",
          "status": 409,
          "success": false
        },
        {
          "description": "The membership version changed",
          "status": 412,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "A version precondition and idempotency key are required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/lifecycle",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "activate",
          "name": "action",
          "required": true,
          "type": "string",
          "validation": "one of activate | delete | revoke | suspend"
        },
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "access_ended",
          "name": "reason",
          "required": true,
          "type": "string",
          "validation": "one of access_ended | administrator_action | approval_granted | data_retention_complete | policy_violation | security_review"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ChangeAppMembershipStatusRequest"
      },
      "retrySafety": "safe",
      "summary": "Apply one confirmed, version-bound app-membership transition"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/GrantAppRoleRequest"
      ],
      "example": "curl --request POST -H 'authorization: Bearer {app_credential}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true,\"key\":\"{key}\",\"source\":\"{source}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D/roles'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true,
        "key": "{key}",
        "source": "{source}"
      },
      "method": "POST",
      "operationId": "grantAppRole",
      "outcomes": [
        {
          "description": "The canonical role grant was replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The role was granted",
          "status": 201,
          "success": true
        },
        {
          "description": "The grant request or referenced resource is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-access authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The definition version or idempotency key conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "Confirmation, a definition version, or an idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/roles",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "{key}",
          "name": "key",
          "required": true,
          "type": "string",
          "validation": "maxLength 128"
        },
        {
          "example": "{source}",
          "name": "source",
          "required": true,
          "type": "string",
          "validation": "maxLength 200"
        },
        {
          "name": "expectedDefinitionVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/GrantAppRoleRequest"
      },
      "retrySafety": "safe",
      "summary": "Grant one version-bound role to an exact app membership"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "Server-side credential scoped to one exact app environment. Never expose this value to browser bundles, logs, examples, or diagnostics."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "path appId (required): string, minLength 3, maxLength 128",
        "path membershipId (required): string, minLength 3, maxLength 128",
        "path grantId (required): string, minLength 3, maxLength 128",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, #/components/schemas/RevokeAppRoleRequest"
      ],
      "example": "curl --request DELETE -H 'authorization: Bearer {app_credential}' -H 'idempotency-key: request-example-001' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"confirmed\":true}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/apps/%7BappId%7D/memberships/%7BmembershipId%7D/roles/%7BgrantId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "appId": "{appId}",
        "membershipId": "{membershipId}",
        "grantId": "{grantId}",
        "idempotency-key": "request-example-001",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "confirmed": true
      },
      "method": "DELETE",
      "operationId": "revokeAppRole",
      "outcomes": [
        {
          "description": "The role was revoked or its canonical result replayed",
          "status": 200,
          "success": true
        },
        {
          "description": "The revocation request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "App-access authority is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The authenticated session lacks permission for this operation",
          "status": 403,
          "success": false
        },
        {
          "description": "The exact app-access grant is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts or the grant state is invalid",
          "status": 409,
          "success": false
        },
        {
          "description": "The role-grant version changed",
          "status": 412,
          "success": false
        },
        {
          "description": "Explicit confirmation is required",
          "status": 422,
          "success": false
        },
        {
          "description": "A grant version or idempotency key is required",
          "status": 428,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/roles/{grantId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{appId}",
          "location": "path",
          "name": "appId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{membershipId}",
          "location": "path",
          "name": "membershipId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "example": "{grantId}",
          "location": "path",
          "name": "grantId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "name": "expectedGrantVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RevokeAppRoleRequest"
      },
      "retrySafety": "safe",
      "summary": "Revoke one exact versioned app-role grant"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string, minLength 3, maxLength 128",
        "query cursor (optional): string, maxLength 1024",
        "query limit (optional): integer, min 1, max 100",
        "query action (optional): string, maxLength 160",
        "query actor (optional): string, maxLength 160",
        "query appId (optional): string, maxLength 160",
        "query correlation (optional): string, maxLength 160",
        "query from (optional): string, format date-time",
        "query outcome (optional): string, one of failure | retry | success",
        "query resource (optional): string, maxLength 160",
        "query to (optional): string, format date-time",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/audit-events'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "GET",
      "operationId": "listAuditEvents",
      "outcomes": [
        {
          "description": "Cursor-paginated redacted audit evidence within the effective workspace or app scope",
          "status": 200,
          "success": true
        },
        {
          "description": "The page or audit filter is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The requested audit scope is unavailable to this session",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/audit-events",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 128"
        },
        {
          "location": "query",
          "name": "cursor",
          "required": false,
          "type": "string",
          "validation": "maxLength 1024"
        },
        {
          "location": "query",
          "name": "limit",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        },
        {
          "location": "query",
          "name": "action",
          "required": false,
          "type": "string",
          "validation": "maxLength 160"
        },
        {
          "location": "query",
          "name": "actor",
          "required": false,
          "type": "string",
          "validation": "maxLength 160"
        },
        {
          "location": "query",
          "name": "appId",
          "required": false,
          "type": "string",
          "validation": "maxLength 160"
        },
        {
          "location": "query",
          "name": "correlation",
          "required": false,
          "type": "string",
          "validation": "maxLength 160"
        },
        {
          "location": "query",
          "name": "from",
          "required": false,
          "type": "string",
          "validation": "format date-time"
        },
        {
          "location": "query",
          "name": "outcome",
          "required": false,
          "type": "string",
          "validation": "one of failure | retry | success"
        },
        {
          "location": "query",
          "name": "resource",
          "required": false,
          "type": "string",
          "validation": "maxLength 160"
        },
        {
          "location": "query",
          "name": "to",
          "required": false,
          "type": "string",
          "validation": "format date-time"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List one bounded page of redacted audit evidence within the session's effective workspace scope"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (optional): application/json, object"
      ],
      "example": "curl --request DELETE -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"expected\":\"{expected}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "expected": "{expected}"
      },
      "method": "DELETE",
      "operationId": "removeWorkspaceAvatar",
      "outcomes": [
        {
          "description": "Avatar removed",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid avatar request",
          "status": 400,
          "success": false
        },
        {
          "description": "Session unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace or avatar asset unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "Avatar changed",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{expected}",
          "name": "expected",
          "required": true,
          "type": "value",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "expected"
        ],
        "properties": {
          "expected": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/WorkspaceAvatar"
              },
              {
                "type": "null"
              }
            ]
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Remove a workspace avatar"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "JSON request body (required): application/json, object"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: application/json' --data '{\"assetId\":\"{assetId}\",\"assetRevision\":1,\"expected\":\"{expected}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/avatar'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "exampleRequestBody": {
        "assetId": "{assetId}",
        "assetRevision": 1,
        "expected": "{expected}"
      },
      "method": "PUT",
      "operationId": "attachWorkspaceAvatar",
      "outcomes": [
        {
          "description": "Avatar attached",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid avatar request",
          "status": 400,
          "success": false
        },
        {
          "description": "Session unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace or avatar asset unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "Avatar changed",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/avatar",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{assetId}",
          "name": "assetId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "assetRevision",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "{expected}",
          "name": "expected",
          "required": true,
          "type": "value",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "assetId",
          "assetRevision",
          "expected"
        ],
        "properties": {
          "assetId": {
            "type": "string"
          },
          "assetRevision": {
            "type": "integer",
            "minimum": 1
          },
          "expected": {
            "oneOf": [
              {
                "$ref": "#/components/schemas/WorkspaceAvatar"
              },
              {
                "type": "null"
              }
            ]
          }
        }
      },
      "retrySafety": "unsafe",
      "summary": "Attach a workspace avatar asset"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "path size (required): integer, one of 24 | 64 | 256"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/avatar/24'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001",
        "size": 24
      },
      "method": "GET",
      "operationId": "getWorkspaceAvatar",
      "outcomes": [
        {
          "description": "Private avatar image",
          "status": 200,
          "success": true
        },
        {
          "description": "Session unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Avatar unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/avatar/{size}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        },
        {
          "example": 24,
          "location": "path",
          "name": "size",
          "required": true,
          "type": "integer",
          "validation": "one of 24 | 64 | 256"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Deliver a private workspace avatar variant"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/avatar/intents'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001"
      },
      "method": "POST",
      "operationId": "issueWorkspaceAvatarIntent",
      "outcomes": [
        {
          "description": "Upload intent issued",
          "status": 201,
          "success": true
        },
        {
          "description": "Session unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/avatar/intents",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "unsafe",
      "summary": "Issue a workspace avatar upload intent"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "header x-correlation-id (optional): string, minLength 8, maxLength 128",
        "path intentId (required): string",
        "header content-type (required): string",
        "JSON request body (required): application/json, string"
      ],
      "example": "curl --request PUT -H 'cookie: __Host-authless_session={platform_session}' -H 'x-correlation-id: request_example_001' -H 'content-type: {content-type}' -H 'content-type: application/json' --data '\"{value}\"' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/avatar/intents/%7BintentId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "x-correlation-id": "request_example_001",
        "intentId": "{intentId}",
        "content-type": "{content-type}"
      },
      "exampleRequestBody": "{value}",
      "method": "PUT",
      "operationId": "uploadWorkspaceAvatar",
      "outcomes": [
        {
          "description": "Avatar asset uploaded",
          "status": 200,
          "success": true
        },
        {
          "description": "Invalid upload",
          "status": 400,
          "success": false
        },
        {
          "description": "Session unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The image exceeds the 5 MiB encoded upload limit",
          "status": 413,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/avatar/intents/{intentId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request_example_001",
          "location": "header",
          "name": "x-correlation-id",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 128"
        },
        {
          "example": "{intentId}",
          "location": "path",
          "name": "intentId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{content-type}",
          "location": "header",
          "name": "content-type",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "requestSchema": {
        "type": "string",
        "description": "Binary image bytes are accepted with the upload content type."
      },
      "retrySafety": "unsafe",
      "summary": "Upload workspace avatar bytes"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/billing'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "method": "GET",
      "operationId": "inspectCommercialBilling",
      "outcomes": [
        {
          "description": "The current subscription, financial records, renewal, credits, and upcoming invoice",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace owner authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/billing",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Inspect the current commercial billing subscription"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialBillingCancellationReviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"idempotencyKey\":\"{idempotencyKey}\",\"mode\":\"period_end\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/billing/cancellation-reviews'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "idempotencyKey": "{idempotencyKey}",
        "mode": "period_end"
      },
      "method": "POST",
      "operationId": "reviewCommercialBillingCancellation",
      "outcomes": [
        {
          "description": "The exact access, financial, export, retention, session, and confirmation effects",
          "status": 200,
          "success": true
        },
        {
          "description": "The cancellation mode or idempotency input is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace owner authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts with a different cancellation mode",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/billing/cancellation-reviews",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 200"
        },
        {
          "example": "period_end",
          "name": "mode",
          "required": true,
          "type": "string",
          "validation": "one of period_end | immediate"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialBillingCancellationReviewRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Review the financial and access effects of commercial billing cancellation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialBillingCancellationConfirmationRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"confirmationToken\":\"{confirmationToken}\",\"idempotencyKey\":\"{idempotencyKey}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/billing/cancellations'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "confirmationToken": "{confirmationToken}",
        "idempotencyKey": "{idempotencyKey}"
      },
      "method": "POST",
      "operationId": "confirmCommercialBillingCancellation",
      "outcomes": [
        {
          "description": "The cancellation was applied or its durable idempotent outcome returned",
          "status": 200,
          "success": true
        },
        {
          "description": "The confirmation token or idempotency input is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace owner authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The confirmation does not match a current actor-bound cancellation review",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/billing/cancellations",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{confirmationToken}",
          "name": "confirmationToken",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 400"
        },
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 200"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialBillingCancellationConfirmationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Confirm a reviewed commercial billing cancellation"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialBillingChangeAuthorizationRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"changeId\":\"{changeId}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/billing/change-authorizations'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "changeId": "{changeId}"
      },
      "method": "POST",
      "operationId": "authorizeCommercialBillingChange",
      "outcomes": [
        {
          "description": "The reviewed change was accepted for secure provider authorization",
          "status": 202,
          "success": true
        },
        {
          "description": "The reviewed change identifier is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace owner authority, subscription, or reviewed change is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/billing/change-authorizations",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{changeId}",
          "name": "changeId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 240"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialBillingChangeAuthorizationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Authorize a reviewed commercial billing change with the provider"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialBillingChangeReviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"idempotencyKey\":\"{idempotencyKey}\",\"period\":\"monthly\",\"planId\":\"launch\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/billing/change-reviews'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "idempotencyKey": "{idempotencyKey}",
        "period": "monthly",
        "planId": "launch"
      },
      "method": "POST",
      "operationId": "reviewCommercialBillingChange",
      "outcomes": [
        {
          "description": "An exact change effect, proration, target, provider change ID, and hard-limit conflict review",
          "status": 200,
          "success": true
        },
        {
          "description": "The target plan, period, quantity, or idempotency input is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace owner authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/billing/change-reviews",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 200"
        },
        {
          "example": "monthly",
          "name": "period",
          "required": true,
          "type": "string",
          "validation": "one of monthly"
        },
        {
          "example": "launch",
          "name": "planId",
          "required": true,
          "type": "string",
          "validation": "one of launch | growth | scale"
        },
        {
          "name": "quantity",
          "required": false,
          "type": "integer",
          "validation": "min 1, max 100"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialBillingChangeReviewRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Review a commercial plan, period, or quantity change"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialBillingRefundRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"amountMicros\":1,\"category\":\"first_purchase_goodwill\",\"consumedOverageMicros\":0,\"idempotencyKey\":\"{idempotencyKey}\",\"invoiceRef\":\"{invoiceRef}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/billing/refund-requests'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "amountMicros": 1,
        "category": "first_purchase_goodwill",
        "consumedOverageMicros": 0,
        "idempotencyKey": "{idempotencyKey}",
        "invoiceRef": "{invoiceRef}"
      },
      "method": "POST",
      "operationId": "requestCommercialBillingRefund",
      "outcomes": [
        {
          "description": "The pending or applied provider refund request and attributable credit-note evidence",
          "status": 200,
          "success": true
        },
        {
          "description": "The refund category, invoice, amount, overage, idempotency, or correction input is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace owner authority, subscription, or invoice is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts or goodwill refund is unavailable",
          "status": 409,
          "success": false
        },
        {
          "description": "The request would refund consumed overages or lacks verified correction authority",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/billing/refund-requests",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": 1,
          "name": "amountMicros",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        },
        {
          "example": "first_purchase_goodwill",
          "name": "category",
          "required": true,
          "type": "string",
          "validation": "one of first_purchase_goodwill | verified_correction"
        },
        {
          "example": 0,
          "name": "consumedOverageMicros",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        },
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 200"
        },
        {
          "example": "{invoiceRef}",
          "name": "invoiceRef",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 240"
        },
        {
          "name": "verifiedCorrection",
          "required": false,
          "type": "boolean",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialBillingRefundRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Request a goodwill refund or verified billing correction"
    },
    {
      "authority": [
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string"
      ],
      "example": "curl --request GET 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/capabilities'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "method": "GET",
      "operationId": "inspectWorkspaceCapabilities",
      "outcomes": [
        {
          "description": "Effective capabilities",
          "status": 200,
          "success": true
        },
        {
          "description": "The credential is invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The workspace is not available to this credential",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/capabilities",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Inspect the caller's effective workspace capabilities"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path planId (required): string, one of launch | growth | scale",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "JSON request body (required): application/json, #/components/schemas/CommercialPurchaseConfirmationRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'content-type: application/json' --data '{\"acceptanceToken\":\"acceptance-example-001\",\"confirmed\":true}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/commercial-purchases/launch/confirmations'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "planId": "launch",
        "idempotency-key": "request-example-001"
      },
      "exampleRequestBody": {
        "acceptanceToken": "acceptance-example-001",
        "confirmed": true
      },
      "method": "POST",
      "operationId": "confirmCommercialPurchase",
      "outcomes": [
        {
          "description": "The accepted purchase is pending secure merchant checkout",
          "status": 202,
          "success": true
        },
        {
          "description": "The plan, acceptance token, or idempotency binding is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace owner authority is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The acceptance, catalogue, legal bundle, or pending purchase state conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "Explicit purchase confirmation is required",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/commercial-purchases/{planId}/confirmations",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "launch",
          "location": "path",
          "name": "planId",
          "required": true,
          "type": "string",
          "validation": "one of launch | growth | scale"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        }
      ],
      "requestBodyFields": [
        {
          "example": "acceptance-example-001",
          "name": "acceptanceToken",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "example": true,
          "name": "confirmed",
          "required": true,
          "type": "boolean",
          "validation": "one of true"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialPurchaseConfirmationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Explicitly confirm a reviewed self-service commercial purchase"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path planId (required): string, one of launch | growth | scale",
        "JSON request body (required): application/json, #/components/schemas/CommercialPurchaseReviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"billingPeriod\":\"monthly\",\"locale\":\"en\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/commercial-purchases/launch/reviews'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "planId": "launch"
      },
      "exampleRequestBody": {
        "billingPeriod": "monthly",
        "locale": "en"
      },
      "method": "POST",
      "operationId": "reviewCommercialPurchase",
      "outcomes": [
        {
          "description": "The exact acceptance, price, usage, support, disclosure, and legal review",
          "status": 200,
          "success": true
        },
        {
          "description": "The plan, billing period, locale, or customer type is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace owner authority or the self-service plan is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/commercial-purchases/{planId}/reviews",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "launch",
          "location": "path",
          "name": "planId",
          "required": true,
          "type": "string",
          "validation": "one of launch | growth | scale"
        }
      ],
      "requestBodyFields": [
        {
          "example": "monthly",
          "name": "billingPeriod",
          "required": true,
          "type": "string",
          "validation": "one of monthly"
        },
        {
          "name": "customerType",
          "required": false,
          "type": "string",
          "validation": "one of b2c | b2b"
        },
        {
          "example": "en",
          "name": "locale",
          "required": true,
          "type": "string",
          "validation": "one of en | ar"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialPurchaseReviewRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Review an exact self-service commercial purchase"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path purchaseId (required): string, minLength 3, maxLength 200"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/commercial-purchases/%7BpurchaseId%7D/receipt'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "purchaseId": "{purchaseId}"
      },
      "method": "GET",
      "operationId": "getCommercialPurchaseReceipt",
      "outcomes": [
        {
          "description": "The accepted purchase, legal, activation, and provider evidence",
          "status": 200,
          "success": true
        },
        {
          "description": "The purchase identifier is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace owner authority, purchase, or activated receipt evidence is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/commercial-purchases/{purchaseId}/receipt",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{purchaseId}",
          "location": "path",
          "name": "purchaseId",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 200"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Inspect durable evidence for an activated commercial purchase"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/commercial-usage'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "method": "GET",
      "operationId": "inspectCommercialUsage",
      "outcomes": [
        {
          "description": "The current billing-period usage, allowances, overages, and operation effects",
          "status": 200,
          "success": true
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Workspace access is unavailable or the authorized workspace has no commercial subscription",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/commercial-usage",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Inspect authoritative commercial usage and next-unit effects"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialOverageConfigurationRequest"
      ],
      "example": "curl --request PATCH -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"enabled\":true,\"idempotencyKey\":\"{idempotencyKey}\",\"monthlySpendCapMicrosSar\":0}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/overages'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "enabled": true,
        "idempotencyKey": "{idempotencyKey}",
        "monthlySpendCapMicrosSar": 0
      },
      "method": "PATCH",
      "operationId": "configureCommercialOverages",
      "outcomes": [
        {
          "description": "The overage policy was configured and complete current usage is returned",
          "status": 200,
          "success": true
        },
        {
          "description": "The configuration request or spend cap is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "Activation review, cap increase, or idempotency state conflicts with this configuration",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/overages",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": true,
          "name": "enabled",
          "required": true,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 0,
          "name": "monthlySpendCapMicrosSar",
          "required": true,
          "type": "integer",
          "validation": "min 0"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialOverageConfigurationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Configure an activated commercial overage policy"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialOverageActivationRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"idempotencyKey\":\"{idempotencyKey}\",\"monthlySpendCapMicrosSar\":1,\"reviewId\":\"{reviewId}\"}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/overages/activations'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "idempotencyKey": "{idempotencyKey}",
        "monthlySpendCapMicrosSar": 1,
        "reviewId": "{reviewId}"
      },
      "method": "POST",
      "operationId": "activateCommercialOverages",
      "outcomes": [
        {
          "description": "Overages were activated and the complete current usage projection is returned",
          "status": 200,
          "success": true
        },
        {
          "description": "The activation request or spend cap is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "Confirmation, idempotency, or the exact reviewed quote conflicts with activation",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/overages/activations",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "name": "confirmed",
          "required": false,
          "type": "boolean",
          "validation": "—"
        },
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": 1,
          "name": "monthlySpendCapMicrosSar",
          "required": true,
          "type": "integer",
          "validation": "—"
        },
        {
          "example": "{reviewId}",
          "name": "reviewId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialOverageActivationRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Activate a reviewed commercial overage configuration"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CommercialOverageReviewRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"idempotencyKey\":\"{idempotencyKey}\",\"monthlySpendCapMicrosSar\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/overages/reviews'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "idempotencyKey": "{idempotencyKey}",
        "monthlySpendCapMicrosSar": 1
      },
      "method": "POST",
      "operationId": "reviewCommercialOverages",
      "outcomes": [
        {
          "description": "An exact catalogue-bound overage review ready for explicit activation",
          "status": 200,
          "success": true
        },
        {
          "description": "The spend cap or request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The platform session is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "Recent workspace-owner authentication is required",
          "status": 403,
          "success": false
        },
        {
          "description": "Workspace authority or the commercial subscription is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key or prior overage review conflicts with this request",
          "status": 409,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/overages/reviews",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "{idempotencyKey}",
          "name": "idempotencyKey",
          "required": true,
          "type": "string",
          "validation": "minLength 3, maxLength 200"
        },
        {
          "example": 1,
          "name": "monthlySpendCapMicrosSar",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CommercialOverageReviewRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Review commercial overage rates and a monthly spend cap"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "method": "GET",
      "operationId": "listWorkspaceServicePrincipals",
      "outcomes": [
        {
          "description": "Workspace service principals",
          "status": 200,
          "success": true
        },
        {
          "description": "The request or resource is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 403,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List workspace service principals"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "JSON request body (required): application/json, #/components/schemas/CreateWorkspaceServicePrincipalRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"name\":\"Example\",\"scopes\":[\"app:read\"],\"restrictions\":{\"appIds\":[],\"environments\":[\"test\"]}}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}"
      },
      "exampleRequestBody": {
        "name": "Example",
        "scopes": [
          "app:read"
        ],
        "restrictions": {
          "appIds": [],
          "environments": [
            "test"
          ]
        }
      },
      "method": "POST",
      "operationId": "createWorkspaceServicePrincipal",
      "outcomes": [
        {
          "description": "The service principal was created",
          "status": 201,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The scope or restriction is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 80"
        },
        {
          "example": [
            "app:read"
          ],
          "name": "scopes",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "example": {
            "appIds": [],
            "environments": [
              "test"
            ]
          },
          "name": "restrictions",
          "required": true,
          "type": "object",
          "validation": "—"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/CreateWorkspaceServicePrincipalRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Create a workspace service principal"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path principalId (required): string"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals/%7BprincipalId%7D'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "principalId": "{principalId}"
      },
      "method": "GET",
      "operationId": "getWorkspaceServicePrincipal",
      "outcomes": [
        {
          "description": "Workspace service principal",
          "status": 200,
          "success": true
        },
        {
          "description": "The request or resource is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 403,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals/{principalId}",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{principalId}",
          "location": "path",
          "name": "principalId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "Get a workspace service principal"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path principalId (required): string"
      ],
      "example": "curl --request GET -H 'cookie: __Host-authless_session={platform_session}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals/%7BprincipalId%7D/credentials'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "principalId": "{principalId}"
      },
      "method": "GET",
      "operationId": "listWorkspaceServiceCredentials",
      "outcomes": [
        {
          "description": "Secret-free credentials",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals/{principalId}/credentials",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{principalId}",
          "location": "path",
          "name": "principalId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [],
      "retrySafety": "safe",
      "summary": "List secret-free workspace service credentials"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path principalId (required): string",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "JSON request body (required): application/json, #/components/schemas/IssueWorkspaceServiceCredentialRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'content-type: application/json' --data '{\"name\":\"Example\",\"scopes\":[\"app:read\"],\"restrictions\":{\"appIds\":[],\"environments\":[\"test\"]}}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals/%7BprincipalId%7D/credentials'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "principalId": "{principalId}",
        "idempotency-key": "request-example-001"
      },
      "exampleRequestBody": {
        "name": "Example",
        "scopes": [
          "app:read"
        ],
        "restrictions": {
          "appIds": [],
          "environments": [
            "test"
          ]
        }
      },
      "method": "POST",
      "operationId": "issueWorkspaceServiceCredential",
      "outcomes": [
        {
          "description": "The idempotency key replayed a previous credential operation",
          "status": 200,
          "success": true
        },
        {
          "description": "The credential and one-time secret were issued",
          "status": 201,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The scope or restriction is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals/{principalId}/credentials",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{principalId}",
          "location": "path",
          "name": "principalId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        }
      ],
      "requestBodyFields": [
        {
          "example": "Example",
          "name": "name",
          "required": true,
          "type": "string",
          "validation": "minLength 1, maxLength 80"
        },
        {
          "example": [
            "app:read"
          ],
          "name": "scopes",
          "required": true,
          "type": "array",
          "validation": "—"
        },
        {
          "example": {
            "appIds": [],
            "environments": [
              "test"
            ]
          },
          "name": "restrictions",
          "required": true,
          "type": "object",
          "validation": "—"
        },
        {
          "name": "expiresAt",
          "required": false,
          "type": "value",
          "validation": "format date-time"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/IssueWorkspaceServiceCredentialRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Issue a workspace service credential with one-time secret disclosure"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path principalId (required): string",
        "path credentialId (required): string",
        "header idempotency-key (optional): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "JSON request body (required): application/json, #/components/schemas/RevokeWorkspaceServiceCredentialRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals/%7BprincipalId%7D/credentials/%7BcredentialId%7D/revoke'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "principalId": "{principalId}",
        "credentialId": "{credentialId}"
      },
      "exampleRequestBody": {},
      "method": "POST",
      "operationId": "revokeWorkspaceServiceCredential",
      "outcomes": [
        {
          "description": "The credential was changed",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The credential version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The request is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals/{principalId}/credentials/{credentialId}/revoke",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{principalId}",
          "location": "path",
          "name": "principalId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{credentialId}",
          "location": "path",
          "name": "credentialId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "location": "header",
          "name": "idempotency-key",
          "required": false,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        }
      ],
      "requestBodyFields": [
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RevokeWorkspaceServiceCredentialRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Revoke a workspace service credential"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path principalId (required): string",
        "path credentialId (required): string",
        "header idempotency-key (required): string, minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$",
        "header if-match (optional): string, pattern ^\"[1-9]\\d*\"$",
        "JSON request body (required): application/json, #/components/schemas/RotateWorkspaceServiceCredentialRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'idempotency-key: request-example-001' -H 'content-type: application/json' --data '{\"overlapSeconds\":0}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals/%7BprincipalId%7D/credentials/%7BcredentialId%7D/rotate'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "principalId": "{principalId}",
        "credentialId": "{credentialId}",
        "idempotency-key": "request-example-001"
      },
      "exampleRequestBody": {
        "overlapSeconds": 0
      },
      "method": "POST",
      "operationId": "rotateWorkspaceServiceCredential",
      "outcomes": [
        {
          "description": "The idempotency key replayed a previous credential operation",
          "status": 200,
          "success": true
        },
        {
          "description": "The request is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "Authentication is unavailable",
          "status": 401,
          "success": false
        },
        {
          "description": "The caller lacks the required authority",
          "status": 403,
          "success": false
        },
        {
          "description": "The resource is unavailable",
          "status": 404,
          "success": false
        },
        {
          "description": "The idempotency key conflicts",
          "status": 409,
          "success": false
        },
        {
          "description": "The credential version is stale",
          "status": 412,
          "success": false
        },
        {
          "description": "The request is invalid",
          "status": 422,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals/{principalId}/credentials/{credentialId}/rotate",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{principalId}",
          "location": "path",
          "name": "principalId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{credentialId}",
          "location": "path",
          "name": "credentialId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "request-example-001",
          "location": "header",
          "name": "idempotency-key",
          "required": true,
          "type": "string",
          "validation": "minLength 8, maxLength 100, pattern ^[A-Za-z0-9._:-]+$"
        },
        {
          "location": "header",
          "name": "if-match",
          "required": false,
          "type": "string",
          "validation": "pattern ^\"[1-9]\\d*\"$"
        }
      ],
      "requestBodyFields": [
        {
          "example": 0,
          "name": "overlapSeconds",
          "required": true,
          "type": "integer",
          "validation": "min 0, max 3600"
        },
        {
          "name": "expiresAt",
          "required": false,
          "type": "value",
          "validation": "format date-time"
        },
        {
          "name": "expectedVersion",
          "required": false,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/RotateWorkspaceServiceCredentialRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Rotate a workspace service credential"
    },
    {
      "authority": [
        "Server-side platform session. Never expose this value to browser bundles or logs.",
        "A workspace service credential. Its scopes and app/environment restrictions are checked for every request."
      ],
      "constraints": [
        "path workspaceId (required): string",
        "path principalId (required): string",
        "JSON request body (required): application/json, #/components/schemas/ChangeWorkspaceServicePrincipalStatusRequest"
      ],
      "example": "curl --request POST -H 'cookie: __Host-authless_session={platform_session}' -H 'content-type: application/json' --data '{\"status\":\"active\",\"expectedVersion\":1}' 'https://api.authle.ss/workspaces/%7BworkspaceId%7D/service-principals/%7BprincipalId%7D/status'",
      "exampleParameters": {
        "workspaceId": "{workspaceId}",
        "principalId": "{principalId}"
      },
      "exampleRequestBody": {
        "status": "active",
        "expectedVersion": 1
      },
      "method": "POST",
      "operationId": "changeWorkspaceServicePrincipalStatus",
      "outcomes": [
        {
          "description": "Updated workspace service principal",
          "status": 200,
          "success": true
        },
        {
          "description": "The request or resource is invalid",
          "status": 400,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 401,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 403,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 404,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 409,
          "success": false
        },
        {
          "description": "The request or resource is invalid",
          "status": 412,
          "success": false
        }
      ],
      "path": "/workspaces/{workspaceId}/service-principals/{principalId}/status",
      "parameters": [
        {
          "example": "{workspaceId}",
          "location": "path",
          "name": "workspaceId",
          "required": true,
          "type": "string",
          "validation": "—"
        },
        {
          "example": "{principalId}",
          "location": "path",
          "name": "principalId",
          "required": true,
          "type": "string",
          "validation": "—"
        }
      ],
      "requestBodyFields": [
        {
          "example": "active",
          "name": "status",
          "required": true,
          "type": "string",
          "validation": "one of active | suspended | revoked"
        },
        {
          "example": 1,
          "name": "expectedVersion",
          "required": true,
          "type": "integer",
          "validation": "min 1"
        }
      ],
      "requestSchema": {
        "$ref": "#/components/schemas/ChangeWorkspaceServicePrincipalStatusRequest"
      },
      "retrySafety": "unsafe",
      "summary": "Change a workspace service principal status"
    }
  ],
  "walkthrough": {
    "operationId": "listWorkspaces",
    "success": "Call GET /workspaces with a server-held platform session and x-correlation-id; inspect the workspaces array and nextCursor.",
    "failure": {
      "status": 401,
      "diagnose": "Repeat without the session only in a test environment. Read the RFC 9457 error code and give support the echoed x-correlation-id; never send the credential."
    }
  },
  "translations": {
    "en": {
      "title": "REST API reference",
      "overview": "Contract-backed operations, safety rules, errors, and lifecycle policy."
    },
    "ar": {
      "title": "مرجع واجهة REST",
      "overview": "عمليات مستندة إلى العقد وقواعد الأمان والأخطاء وسياسة دورة الحياة."
    }
  }
}
```

## مصادر آلية موثوقة

- https://docs.authle.ss/openapi.json
- https://docs.authle.ss/rest-reference.json

نَسب المصدر: وثائق المطورين (https://docs.authle.ss/reference/rest?lang=ar).
