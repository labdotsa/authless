# Agent access

Authorize a bounded management agent with private_key_jwt and call management MCP without turning agent authority into human sign-in.

Use owner-created delegation, exact resource binding, and short-lived client_credentials tokens for management agents.

Canonical: https://docs.authle.ss/agents
Alternate language: https://docs.authle.ss/agents?lang=ar
Language: en
Last reviewed: 2026-10-09
Owner: Developer documentation
Stage: available

> Warning: This read-only public documentation does not grant authority to inspect or mutate a tenant. Never place credentials or tenant data in examples, prompts, logs, or support messages.

## Agent access

Use owner-created delegation, exact resource binding, and short-lived client_credentials tokens for management agents.

## Human sign-in

Use owner-created delegation, exact resource binding, and short-lived client_credentials tokens for management agents.

## Management agent exchange

Use owner-created delegation, exact resource binding, and short-lived client_credentials tokens for management agents.

## Call management MCP

Use owner-created delegation, exact resource binding, and short-lived client_credentials tokens for management agents.

## Boundaries

Use owner-created delegation, exact resource binding, and short-lived client_credentials tokens for management agents.

## Safe interface example

```ts
import { createAuthless } from "@authless/browser";

const auth = createAuthless({ issuer: AUTHLESS_ISSUER });
```

## Authoritative structured context

The following checked projection is shared with the human-rendered guide and preserves exact examples, failures, warnings, compatibility, and lifecycle data. Localized prose remains authoritative at the canonical URL.

```json
{
  "schema": "authless.developer-documentation/v1",
  "browserLoadingBoundary": {
    "en": "Loading or importing a helper never identifies a visitor, reads cross-origin Authless identity, creates an Authless or application session, or sends a network request. Only an explicit visitor action may begin authorization.",
    "ar": "لا يؤدي تحميل المساعد أو استيراده إلى تعريف الزائر أو قراءة هوية Authless عبر أصل آخر أو إنشاء جلسة Authless أو جلسة تطبيق أو إرسال طلب شبكة. يبدأ التفويض فقط بإجراء صريح من الزائر."
  },
  "packageReferences": [
    {
      "package": "@authless/browser",
      "symbols": [
        "createAuthorizationRequest",
        "startAuthorization",
        "consumeAuthorizationResponse"
      ]
    },
    {
      "package": "@authless/sveltekit",
      "symbols": [
        "exchangeAuthorizationCode",
        "validateIdToken",
        "createSessionHandle",
        "logoutResponse",
        "revokeToken",
        "verifyWebhook"
      ]
    },
    {
      "package": "@authless/server",
      "symbols": [
        "createAuthlessServerClient"
      ]
    }
  ],
  "paths": [
    {
      "id": "hosted-sign-in",
      "title": {
        "en": "Hosted sign-in",
        "ar": "تسجيل الدخول المستضاف"
      },
      "description": {
        "en": "Explicit Authorization Code with PKCE and an application-owned session.",
        "ar": "رمز تفويض صريح مع PKCE وجلسة يملكها التطبيق."
      },
      "install": "git clone https://github.com/labdotsa/authless.git && cd authless/examples/sveltekit-hosted-sign-in && bun install --frozen-lockfile",
      "firstAction": "import { createAuthorizationRequest } from \"@authless/browser\";",
      "successSignal": "SIGNED_IN protected_data_ok logout_ok revoked_access_denied",
      "negativeChecks": [
        "denial",
        "expired transaction",
        "state mismatch",
        "revoked access"
      ],
      "authoritativeGuide": "/build/sveltekit",
      "stage": "available"
    },
    {
      "id": "browser-helper",
      "title": {
        "en": "Browser helper",
        "ar": "مساعد المتصفح"
      },
      "description": {
        "en": "Create a PKCE request only after an explicit visitor action.",
        "ar": "أنشئ طلب PKCE فقط بعد إجراء صريح من الزائر."
      },
      "install": "git clone https://github.com/labdotsa/authless.git && cd authless/examples/sveltekit-hosted-sign-in && bun install --frozen-lockfile",
      "firstAction": "import { createAuthorizationRequest } from \"@authless/browser\";",
      "successSignal": "authorization URL created; no identity or session on import",
      "negativeChecks": [
        "invalid HTTPS endpoint",
        "expired state",
        "callback replay"
      ],
      "authoritativeGuide": "/build/sveltekit",
      "stage": "available"
    },
    {
      "id": "sveltekit-helper",
      "title": {
        "en": "SvelteKit server helper",
        "ar": "مساعد خادم SvelteKit"
      },
      "description": {
        "en": "Validate the callback and project an application-owned server session.",
        "ar": "تحقق من الاستدعاء واعرض جلسة خادم يملكها التطبيق."
      },
      "install": "git clone https://github.com/labdotsa/authless.git && cd authless/examples/sveltekit-hosted-sign-in && bun install --frozen-lockfile",
      "firstAction": "import { exchangeAuthorizationCode, createSessionHandle } from \"@authless/sveltekit\";",
      "successSignal": "validated tokens; protected server request succeeds",
      "negativeChecks": [
        "issuer mismatch",
        "audience mismatch",
        "nonce mismatch",
        "key rotation"
      ],
      "authoritativeGuide": "/build/sveltekit",
      "stage": "available"
    },
    {
      "id": "direct-oidc",
      "title": {
        "en": "Direct OIDC",
        "ar": "OIDC المباشر"
      },
      "description": {
        "en": "Integrate discovery and Authorization Code with PKCE without a framework helper.",
        "ar": "نفّذ الاكتشاف ورمز التفويض مع PKCE من دون مساعد إطار عمل."
      },
      "install": "bun add jose",
      "firstAction": "import { createRemoteJWKSet, jwtVerify } from \"jose\";",
      "successSignal": "discovery_ok token_valid session_owned_by_app",
      "negativeChecks": [
        "stale key",
        "code replay",
        "redirect mismatch",
        "token expiry"
      ],
      "authoritativeGuide": "/build/oidc",
      "stage": "available"
    },
    {
      "id": "server-client",
      "title": {
        "en": "Node.js server client",
        "ar": "عميل خادم Node.js"
      },
      "description": {
        "en": "Call typed management operations from trusted Node.js server code.",
        "ar": "استدعِ عمليات الإدارة المعرّفة من خادم Node.js موثوق."
      },
      "install": "git clone https://github.com/labdotsa/authless.git && cd authless && bun install --frozen-lockfile",
      "firstAction": "import { createAuthlessServerClient } from \"@authless/server\";",
      "successSignal": "server_request_ok credential_boundary_preserved",
      "negativeChecks": [
        "browser import",
        "missing credential",
        "wrong authority",
        "unsafe retry"
      ],
      "authoritativeGuide": "/build/rest",
      "stage": "available"
    },
    {
      "id": "cli",
      "title": {
        "en": "Authless CLI",
        "ar": "واجهة Authless الطرفية"
      },
      "description": {
        "en": "Manage Authless resources with native PKCE login or a bounded machine credential.",
        "ar": "أدر موارد Authless عبر تسجيل دخول PKCE أصلي أو بيانات اعتماد آلية محدودة."
      },
      "install": "git clone https://github.com/labdotsa/authless.git && cd authless && bun install --frozen-lockfile",
      "firstAction": "packages/cli/dist/cli.js auth login",
      "successSignal": "native_pkce_grant workspace_read json_output",
      "negativeChecks": [
        "credential on argv",
        "browser cookie extraction",
        "unconfirmed mutation",
        "token in output"
      ],
      "authoritativeGuide": "/build/rest",
      "stage": "available"
    },
    {
      "id": "signed-webhook",
      "title": {
        "en": "Signed webhook",
        "ar": "Webhook موقّع"
      },
      "description": {
        "en": "Verify exact bytes, timestamp, rotating signatures, and an atomic replay claim before dispatch.",
        "ar": "تحقق من البايتات الدقيقة والطابع الزمني والتوقيع المتناوب ومنع الإعادة الذري قبل المعالجة."
      },
      "install": "git clone https://github.com/labdotsa/authless.git && cd authless/examples/signed-webhook && bun install --frozen-lockfile",
      "firstAction": "import { verifyAndConsume } from \"./src/consumer\";",
      "successSignal": "signature_valid event_claimed_once handler_idempotent",
      "negativeChecks": [
        "bad signature",
        "stale timestamp",
        "event replay",
        "handler retry"
      ],
      "authoritativeGuide": "/build/webhooks",
      "stage": "available"
    }
  ],
  "authority": [
    {
      "authority": "identity",
      "owner": "Authless",
      "explanation": {
        "en": "Authless verifies and represents a person within the disclosed identity boundary; it does not own your customer record.",
        "ar": "يتحقق Authless من الشخص ويمثله ضمن حدود الهوية المعلنة، ولا يملك سجل العميل في تطبيقك."
      }
    },
    {
      "authority": "consent",
      "owner": "Authless",
      "explanation": {
        "en": "Authless records explicit grants for requested identity claims and access; consent is not product authorization.",
        "ar": "يسجل Authless الموافقات الصريحة لمطالبات الهوية والوصول المطلوبة؛ والموافقة ليست تفويضاً لمنتجك."
      }
    },
    {
      "authority": "app-session",
      "owner": "Your application",
      "explanation": {
        "en": "Your server creates, protects, rotates, and ends its own application session after validating Authless tokens.",
        "ar": "ينشئ خادمك جلسة التطبيق الخاصة به ويحميها ويدورها وينهيها بعد التحقق من رموز Authless."
      }
    },
    {
      "authority": "product-data",
      "owner": "Your application",
      "explanation": {
        "en": "Your application owns customer records, resources, retention, and every product-data access decision.",
        "ar": "يملك تطبيقك سجلات العملاء والموارد والاحتفاظ وكل قرار للوصول إلى بيانات المنتج."
      }
    },
    {
      "authority": "role-entitlement",
      "owner": "Your application",
      "explanation": {
        "en": "Your application defines the product meaning of roles and entitlements and authorizes each request.",
        "ar": "يحدد تطبيقك معنى الأدوار والاستحقاقات في المنتج ويفوض كل طلب."
      }
    },
    {
      "authority": "payment",
      "owner": "Your application",
      "explanation": {
        "en": "Your commerce system owns payment collection, refunds, disputes, and financial records.",
        "ar": "يملك نظام التجارة لديك تحصيل المدفوعات والاسترداد والنزاعات والسجلات المالية."
      }
    },
    {
      "authority": "subscription",
      "owner": "Your application",
      "explanation": {
        "en": "Your application owns subscription lifecycle and maps commercial state to product access.",
        "ar": "يملك تطبيقك دورة حياة الاشتراك ويربط الحالة التجارية بالوصول إلى المنتج."
      }
    }
  ],
  "security": [
    {
      "id": "endpoint-registration",
      "action": {
        "en": "Register exact HTTPS origins, callbacks, logout destinations, webhook endpoints, and audience resources; never use wildcard endpoints.",
        "ar": "سجّل أصول HTTPS وعناوين الاستدعاء والخروج وwebhook وموارد الجمهور بدقة؛ لا تستخدم عناوين بدل."
      }
    },
    {
      "id": "pkce",
      "action": {
        "en": "Use Authorization Code with S256 PKCE, one-time state, and nonce; reject missing or mismatched values.",
        "ar": "استخدم رمز التفويض مع S256 PKCE وحالة لمرة واحدة وnonce، وارفض القيم المفقودة أو غير المتطابقة."
      }
    },
    {
      "id": "token-validation",
      "action": {
        "en": "Validate signature, advertised key and algorithm, exact issuer, audience, nonce, subject, issued-at, and expiry before creating an app session.",
        "ar": "تحقق من التوقيع والمفتاح والخوارزمية والمُصدر والجمهور وnonce والموضوع ووقت الإصدار والانتهاء قبل إنشاء جلسة التطبيق."
      }
    },
    {
      "id": "credentials",
      "action": {
        "en": "Give each server credential minimum authority; rotate and revoke it from a controlled server boundary.",
        "ar": "امنح كل بيانات اعتماد للخادم أقل صلاحية، ودوّرها وألغها من حدود خادم مضبوطة."
      }
    },
    {
      "id": "secrets",
      "action": {
        "en": "Inject secrets at runtime from server custody; never place them in source, browser bundles, URLs, logs, diagnostics, or examples.",
        "ar": "احقن الأسرار وقت التشغيل من حفظ الخادم؛ ولا تضعها في المصدر أو حزم المتصفح أو العناوين أو السجلات أو الأمثلة."
      }
    },
    {
      "id": "key-rotation",
      "action": {
        "en": "Cache discovery and JWKS for a bounded time, refresh once for an unknown advertised key, and fail closed if rotation cannot be verified.",
        "ar": "خزّن الاكتشاف وJWKS لمدة محدودة وحدّث مرة لمفتاح معلن غير معروف، وافشل بأمان إذا تعذر التحقق من التدوير."
      }
    },
    {
      "id": "webhook-verification-idempotency",
      "action": {
        "en": "Verify the signature over exact raw bytes and timestamp, atomically claim the event ID, then make the handler idempotent before returning success.",
        "ar": "تحقق من التوقيع على البايتات الخام والطابع الزمني، واحجز معرف الحدث ذرياً، واجعل المعالج متكرراً بأمان قبل النجاح."
      }
    },
    {
      "id": "logout",
      "action": {
        "en": "Destroy the application session and server-held tokens first; then clear the local cookie and use the registered Authless end-session path where applicable.",
        "ar": "أتلف جلسة التطبيق ورموز الخادم أولاً، ثم امسح ملف الارتباط المحلي واستخدم مسار إنهاء جلسة Authless المسجل عند الحاجة."
      }
    },
    {
      "id": "revocation",
      "action": {
        "en": "Treat revocation and suspension as authoritative immediately; deny app data even when notification delivery or cleanup is delayed.",
        "ar": "اعتبر الإلغاء والتعليق نافذين فوراً؛ وارفض بيانات التطبيق حتى عند تأخر الإشعار أو التنظيف."
      }
    }
  ],
  "operations": [
    {
      "id": "resend-degradation",
      "action": {
        "en": "When Resend is degraded, disable affected email methods, expire bounded challenges, surface only a policy-eligible password alternative, and never imply delivery succeeded.",
        "ar": "عند تدهور Resend عطّل طرق البريد المتأثرة وأنهِ التحديات المحدودة واعرض فقط بديل كلمة مرور تسمح به السياسة ولا تدّع نجاح التسليم."
      }
    },
    {
      "id": "retry-reconciliation",
      "action": {
        "en": "Retry only contract-classified safe work with the same idempotency and correlation references; reconcile unknown outcomes before issuing a new mutation.",
        "ar": "أعد فقط العمل المصنف آمناً في العقد مع مفاتيح التكرار والارتباط نفسها، وطابق النتائج المجهولة قبل طفرة جديدة."
      }
    },
    {
      "id": "correlation-references",
      "action": {
        "en": "Propagate bounded opaque request and correlation references across app logs, support, webhook handling, and operations without recording tokens or tenant payloads.",
        "ar": "مرّر مراجع طلب وارتباط مبهمة ومحدودة عبر سجلات التطبيق والدعم وwebhook والتشغيل من دون رموز أو حمولة مستأجر."
      }
    },
    {
      "id": "production-promotion",
      "action": {
        "en": "Promote the exact reviewed configuration only after production credentials, endpoints, policy version, rollback owner, and evidence are bound to the target environment.",
        "ar": "رقِّ الإعداد المراجع نفسه فقط بعد ربط بيانات اعتماد الإنتاج والعناوين ونسخة السياسة ومالك التراجع والأدلة بالبيئة المستهدفة."
      }
    },
    {
      "id": "readiness-checks",
      "action": {
        "en": "Prove discovery, keys, callbacks, negative protocol cases, revocation, webhook replay, provider failure, retry bounds, reconciliation, alerts, support ownership, and rollback before activation.",
        "ar": "أثبت الاكتشاف والمفاتيح والاستدعاءات والحالات السلبية والإلغاء ومنع إعادة webhook وفشل المزود وحدود الإعادة والمطابقة والتنبيهات وملكية الدعم والتراجع قبل التفعيل."
      }
    }
  ]
}
```

## Authoritative machine sources

- https://docs.authle.ss/content-index.json

Source attribution: Developer documentation (https://docs.authle.ss/agents).
