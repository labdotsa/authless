# Changes and migration

Track releases, compatibility, deprecations, and migration paths.

Understand what changed and what action an integration owner must take.

Canonical: https://docs.authle.ss/changes
Alternate language: https://docs.authle.ss/changes?lang=ar
Language: en
Last reviewed: 2026-08-21
Owner: Developer documentation
Stage: available

> Warning: This read-only public documentation does not grant authority to inspect or mutate a tenant. Never place credentials or tenant data in examples, prompts, logs, or support messages.

## Compatibility

Understand what changed and what action an integration owner must take.

## Releases

Understand what changed and what action an integration owner must take.

## Migration guides

Understand what changed and what action an integration owner must take.

## Deprecations

Understand what changed and what action an integration owner must take.

## Machine output

Understand what changed and what action an integration owner must take.

## Safe interface example

```ts
import { createAuthless } from "@authless/browser";

const auth = createAuthless({ issuer: AUTHLESS_ISSUER });
```

## Authoritative structured context

The following checked projection is shared with the human-rendered guide and preserves exact examples, failures, warnings, compatibility, and lifecycle data. Localized prose remains authoritative at the canonical URL.

```json
{
  "schema": "authless.release-center/v1",
  "updatedAt": "2026-09-07",
  "compatibility": [
    {
      "component": "REST API",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-08-22-identity-continuation-terminal-reasons",
      "version": "0.1.0",
      "stability": "stable",
      "contract": "/v1 (0.1.0)",
      "testedAt": "2026-08-22",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "tests/rest-api-reference.test.ts"
      ]
    },
    {
      "component": "@authless/api-client",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-08-22-sensitive-mutation-readiness",
      "version": "0.2.0",
      "stability": "stable",
      "contract": "0.1.0",
      "runtime": "Node 24.x",
      "testedAt": "2026-08-22",
      "evidence": [
        "packages/api-client/package.json",
        "packages/api-client/src/index.ts",
        "packages/api-client/src/transport.ts",
        "packages/api-client/src/workspaces.ts",
        "tests/api-client-workspace-family.test.ts",
        "tests/docs-compatibility.test.ts",
        "packages/api-client/tests/api-client.node.mjs"
      ]
    },
    {
      "component": "@authless/browser",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-09-07-sdk-callback-query",
      "version": "0.0.0",
      "stability": "source-only",
      "contract": "0.1.0",
      "browser": "Chromium via Playwright 1.62.0",
      "testedAt": "2026-09-07",
      "evidence": [
        "packages/browser/package.json",
        "tests/sdk-callback-query.test.ts",
        "tests/oidc-core.test.ts",
        "tests/browser-capability-entrypoints.test.ts",
        "tests/relying-app-helpers.test.ts",
        "playwright.config.ts"
      ]
    },
    {
      "component": "@authless/sveltekit",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-09-07-sdk-callback-query",
      "version": "0.0.0",
      "stability": "source-only",
      "contract": "0.1.0",
      "runtime": "SvelteKit 2.70.2 / Node 24.x",
      "framework": "Svelte 5.56.8",
      "testedAt": "2026-09-07",
      "evidence": [
        "packages/sveltekit/package.json",
        "tests/sdk-callback-query.test.ts",
        "tests/oidc-core.test.ts",
        "packages/sveltekit/src/oidc.ts",
        "packages/sveltekit/src/session.ts",
        "packages/sveltekit/src/webhook.ts",
        "tests/sveltekit-boundaries.test.ts",
        "tests/sveltekit-golden-path-clean-room.test.ts"
      ]
    }
  ],
  "changes": [
    {
      "id": "2026-09-07-sdk-callback-query",
      "publishedAt": "2026-09-07",
      "title": {
        "en": "SDK callbacks preserve registered query parameters",
        "ar": "تحافظ استدعاءات SDK الراجعة على معلمات الاستعلام المسجلة"
      },
      "summary": {
        "en": "Browser and SvelteKit helpers share fixed-query validation while retaining the original redirect URI for token exchange. The browser bundle budget is now 6 KB to include the additional validation.",
        "ar": "تشترك مساعدات المتصفح وSvelteKit في التحقق من الاستعلام الثابت مع الاحتفاظ بعنوان إعادة التوجيه الأصلي لتبادل الرموز. أصبحت ميزانية حزمة المتصفح 6 كيلوبايت لتشمل التحقق الإضافي."
      },
      "categories": [
        "sdk",
        "security"
      ],
      "audiences": [
        "integrator"
      ],
      "impact": "security",
      "migration": {
        "en": "Query keys may reorder; equivalent URL encoding and empty values are accepted. Repeated values must retain order and count. Remove extra callback parameters and do not register code, state, error, error_description, error_uri, iss, or session_state as fixed query keys. Duplicate response parameters and combined code/error responses are rejected.",
        "ar": "يمكن تغيير ترتيب مفاتيح الاستعلام، ويُقبل ترميز URL المكافئ والقيم الفارغة. يجب الحفاظ على ترتيب القيم المتكررة وعددها. أزل معلمات الاستدعاء الراجع الإضافية، ولا تسجل code أو state أو error أو error_description أو error_uri أو iss أو session_state كمفاتيح استعلام ثابتة. تُرفض معلمات الاستجابة المكررة والاستجابات التي تجمع code وerror."
      },
      "announcement": {
        "en": "Registered query-bearing redirects now complete authorization through both SDKs.",
        "ar": "أصبحت عناوين إعادة التوجيه المسجلة التي تحتوي على استعلام تكمل التفويض عبر مساعدات SDK في المتصفح وSvelteKit."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/src/oidc-callback.ts",
        "tests/sdk-callback-query.test.ts",
        "tests/oidc-core.test.ts",
        "tests/helper-packages-conformance.test.ts"
      ],
      "permalink": "/changes#2026-09-07-sdk-callback-query"
    },
    {
      "id": "2026-08-25-personal-session-contracts",
      "publishedAt": "2026-08-25",
      "title": {
        "en": "Canonical personal session contracts",
        "ar": "عقود معيارية للجلسات الشخصية"
      },
      "summary": {
        "en": "Publishes personal session inventory, security activity, revocation, sign-out, and risk-reporting operations from canonical OpenAPI with generated request and response validation.",
        "ar": "ينشر عمليات مخزون الجلسات الشخصية والنشاط الأمني والإلغاء وتسجيل الخروج والإبلاغ عن المخاطر من OpenAPI المعياري مع تحقق مولد للطلبات والاستجابات."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing personal session routes retain their authorization, status, correlation, and cookie behavior.",
        "ar": "لا يلزم ترحيل. تحتفظ مسارات الجلسات الشخصية الحالية بسلوك التفويض والحالة والارتباط وملفات تعريف الارتباط."
      },
      "announcement": {
        "en": "Personal session management now uses the canonical contract shared by the API runtime, generated client, dashboard, and reference documentation.",
        "ar": "تستخدم إدارة الجلسات الشخصية الآن العقد المعياري المشترك بين واجهة API وعميلها المولد ولوحة التحكم والوثائق المرجعية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/api-client/package.json",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-routes.ts",
        "apps/dash/src/lib/personal-journey.ts",
        "tests/personal-contract-codec.test.ts",
        "tests/personal-routes.test.ts",
        "tests/api-client-generation.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-25-personal-session-contracts"
    },
    {
      "id": "2026-08-22-billing-destination-availability",
      "publishedAt": "2026-08-22",
      "title": {
        "en": "Capability-truthful billing destinations",
        "ar": "وجهات فوترة مطابقة للإمكانات المتاحة"
      },
      "summary": {
        "en": "Stops advertising self-service purchase and overage management while commercial authorization is deferred, and gives direct URLs a localized product-owned boundary.",
        "ar": "يوقف الإعلان عن الشراء الذاتي وإدارة الاستخدام الزائد ما دام التفويض التجاري مؤجلاً، ويمنح الروابط المباشرة حدًا محليًا مملوكًا للمنتج."
      },
      "categories": [
        "product",
        "security",
        "operations"
      ],
      "audiences": [
        "operator",
        "evaluator"
      ],
      "impact": "security",
      "migration": {
        "en": "No integration migration. Use the billing parent for current plan and invoice management; Launch purchase and Overages links return when their deployment and commercial capabilities are authorized.",
        "ar": "لا يلزم ترحيل للتكامل. استخدم صفحة الفوترة الرئيسية لإدارة الخطة الحالية والفواتير؛ وتعود روابط شراء Launch والاستخدام الزائد عند تفويض إمكانات النشر والتجارة الخاصة بها."
      },
      "announcement": {
        "en": "Dashboard and Website now agree that self-service commercial mutations are unavailable; direct authenticated URLs explain the boundary instead of returning a framework 404.",
        "ar": "تتفق لوحة التحكم والموقع الآن على عدم توفر التعديلات التجارية الذاتية؛ وتشرح الروابط المباشرة الموثقة هذا الحد بدلاً من إرجاع صفحة 404 من إطار العمل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/dash/src/lib/billing-destination-authority.ts",
        "apps/dash/src/lib/billing-context.ts",
        "apps/website/src/lib/public-commercial-journey.ts",
        "tests/commercial-capability-consistency.test.ts",
        "tests/ui/commercial-billing.ui.ts"
      ],
      "permalink": "/changes#2026-08-22-billing-destination-availability"
    },
    {
      "id": "2026-08-22-sensitive-mutation-readiness",
      "publishedAt": "2026-08-22",
      "title": {
        "en": "Sensitive mutation readiness projection",
        "ar": "إسقاط جاهزية التعديلات الحساسة"
      },
      "summary": {
        "en": "Adds compatible readiness fields for personal username and workspace creation so clients can reveal reauthentication before submission.",
        "ar": "يضيف حقول جاهزية متوافقة لاسم المستخدم الشخصي وإنشاء مساحة العمل كي تعرض التطبيقات إعادة المصادقة قبل الإرسال."
      },
      "categories": [
        "api",
        "sdk",
        "security"
      ],
      "audiences": [
        "integrator",
        "operator"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Clients may consume the optional readiness fields; existing clients that ignore additive response fields remain compatible.",
        "ar": "لا يلزم ترحيل. يمكن للتطبيقات استخدام حقول الجاهزية الاختيارية؛ وتظل التطبيقات الحالية التي تتجاهل حقول الاستجابة الإضافية متوافقة."
      },
      "announcement": {
        "en": "Username and workspace creation readiness is now projected from authoritative authentication time and preserved by the generated TypeScript client contract.",
        "ar": "تُسقط جاهزية اسم المستخدم وإنشاء مساحة العمل الآن من وقت المصادقة الموثوق ويحفظها عقد عميل TypeScript المولد."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/sensitive-mutation.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-routes.ts",
        "apps/api/src/workspace-routes.ts",
        "apps/dash/src/lib/sensitive-mutation.ts"
      ],
      "permalink": "/changes#2026-08-22-sensitive-mutation-readiness"
    },
    {
      "id": "2026-08-22-identity-continuation-terminal-reasons",
      "publishedAt": "2026-08-22",
      "title": {
        "en": "Explicit identity continuation terminal reasons",
        "ar": "أسباب صريحة لانتهاء متابعة الهوية"
      },
      "summary": {
        "en": "Adds bounded continuation failure reasons and attempt-limit evidence so clients can distinguish expiry from exhaustion without inferring from HTTP status.",
        "ar": "يضيف أسبابًا محدودة لفشل المتابعة ودليل حد المحاولات كي تميز التطبيقات انتهاء الوقت من نفاد المحاولات دون الاستنتاج من حالة HTTP."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Clients should consume the typed reason on continuation verification failures and stop treating every 410 response as expiry. Existing clients that ignore additional response fields remain compatible.",
        "ar": "ينبغي للتطبيقات استخدام السبب المعرّف في فشل تحقق المتابعة والتوقف عن اعتبار كل استجابة 410 انتهاءً للوقت. تظل التطبيقات الحالية التي تتجاهل حقول الاستجابة الإضافية متوافقة."
      },
      "announcement": {
        "en": "Continuation verification now reports expired, attempts exhausted, consumed, superseded, malformed, missing, invalid, and unavailable outcomes explicitly; exhaustion alone may include the configured attempt limit.",
        "ar": "يبلغ تحقق المتابعة الآن صراحة عن انتهاء الوقت ونفاد المحاولات والاستخدام والاستبدال وسوء الصياغة والفقدان وعدم الصحة وعدم التوفر؛ وقد يتضمن نفاد المحاولات وحده حد المحاولات المضبوط."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-continuation-failure.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-routes.test.ts"
      ],
      "permalink": "/changes#2026-08-22-identity-continuation-terminal-reasons"
    },
    {
      "id": "2026-08-21-commercial-billing-refund-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial billing refund contract",
        "ar": "عقد معياري لاسترداد الفوترة التجارية"
      },
      "summary": {
        "en": "Publishes validated refund input, complete provider and credit-note evidence, and stable safe denial outcomes.",
        "ar": "ينشر مدخلات استرداد متحققاً منها وأدلة كاملة للمزود وإشعار الائتمان ونتائج رفض آمنة ومستقرة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound refund path, request fields, 200 refund envelope, recent-owner requirement, and customer-facing provider references remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل مسار الاسترداد المرتبط بالجلسة وحقول الطلب وغلاف الاسترداد 200 ومتطلب المالك حديث المصادقة ومراجع المزود الظاهرة للعميل دون تغيير."
      },
      "announcement": {
        "en": "Refund requests now use generated decoding and projection so hostile authority input plus internal actor and idempotency state cannot cross the transport boundary; provider denials have stable safe outcomes.",
        "ar": "تستخدم طلبات الاسترداد الآن فك ترميز وإسقاطاً مولدين لمنع مدخلات السلطة العدائية وحالة الممثل والمفتاح الداخليين من عبور حدود النقل؛ ولرفض المزود نتائج آمنة ومستقرة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "apps/api/src/runtime/http-use-cases/commercial-billing.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-billing-refund-contract"
    },
    {
      "id": "2026-08-21-commercial-purchase-confirmation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial purchase confirmation contract",
        "ar": "عقد معياري لتأكيد الشراء التجاري"
      },
      "summary": {
        "en": "Publishes generated explicit acceptance input, exact idempotency binding, and a safe pending-checkout authorization projection.",
        "ar": "ينشر مدخل القبول الصريح المولد وربط هوية التكرار الدقيق وإسقاط تفويض آمن للدفع المعلق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound plan path, explicit confirmation and acceptance token, matching idempotency header, 202 pending checkout response, private not-found behavior, and safe acceptance conflict remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل مسار الخطة المرتبط بالجلسة والتأكيد الصريح ورمز القبول وترويسة هوية التكرار المطابقة واستجابة الدفع المعلق 202 وسلوك عدم العثور الخاص وتعارض القبول الآمن دون تغيير."
      },
      "announcement": {
        "en": "Purchase confirmation now uses generated request and response projection so hostile actor input, accepted actor identity, and provider transaction references cannot cross the transport boundary; stale catalogue and legal reviews share the safe acceptance conflict.",
        "ar": "يستخدم تأكيد الشراء الآن إسقاطاً مولداً للطلب والاستجابة لمنع عبور مدخل الممثل العدائي وهوية الممثل المقبول ومراجع معاملة المزود لحدود النقل؛ وتشترك مراجعات الكتالوج والحزمة القانونية القديمة في تعارض القبول الآمن."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-purchase-routes.ts",
        "apps/api/src/runtime/http-use-cases/commercial-purchase.ts",
        "tests/commercial-purchase-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-purchase-confirmation-contract"
    },
    {
      "id": "2026-08-21-commercial-purchase-review-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial purchase review contract",
        "ar": "عقد معياري لمراجعة الشراء التجاري"
      },
      "summary": {
        "en": "Publishes generated purchase intent and a complete acceptance, price, allowance, support, disclosure, and legal-document projection.",
        "ar": "ينشر نية الشراء المولدة وإسقاطاً كاملاً للقبول والسعر والمخصصات والدعم والإفصاحات والمستندات القانونية."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound plan path, billing period, locale and optional customer-type input, direct 200 review, default B2C behavior, and private not-found response remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل مسار الخطة المرتبط بالجلسة ومدخل فترة الفوترة واللغة ونوع العميل الاختياري ومراجعة 200 المباشرة والسلوك الافتراضي B2C واستجابة عدم العثور الخاصة دون تغيير."
      },
      "announcement": {
        "en": "Purchase review now uses generated request and recursive response projection so caller actor input, internal purchase identity, legal attestation state, extra document metadata, and support escalation rosters cannot cross the transport boundary.",
        "ar": "تستخدم مراجعة الشراء الآن إسقاطاً مولداً للطلب والاستجابة التكرارية لمنع عبور مدخل ممثل المتصل وهوية الشراء الداخلية وحالة التصديقات القانونية وبيانات المستندات الإضافية وقوائم تصعيد الدعم لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-purchase-routes.ts",
        "tests/commercial-purchase-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-purchase-review-contract"
    },
    {
      "id": "2026-08-21-commercial-billing-cancellation-confirmation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial billing cancellation confirmation contract",
        "ar": "عقد معياري لتأكيد إلغاء الفوترة التجارية"
      },
      "summary": {
        "en": "Publishes generated confirmation input and the durable applied-or-duplicate cancellation outcome with its effective time.",
        "ar": "ينشر مدخل التأكيد المولد ونتيجة الإلغاء الدائمة المطبقة أو المكررة مع وقت سريانها."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, confirmation token and idempotency input, 200 cancellation envelope, recent-owner requirement, private not-found behavior, and safe invalid-confirmation conflict remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة ومدخل رمز التأكيد وهوية التكرار وغلاف الإلغاء 200 ومتطلب المالك حديث المصادقة وسلوك عدم العثور الخاص وتعارض التأكيد غير الصالح الآمن دون تغيير."
      },
      "announcement": {
        "en": "Cancellation confirmation now uses generated request and response projection so actor identity, confirmation credentials, and idempotency bookkeeping cannot cross the response boundary; missing, expired, and actor-mismatched reviews share one private-safe 409 alias.",
        "ar": "يستخدم تأكيد الإلغاء الآن إسقاطاً مولداً للطلب والاستجابة لمنع عبور هوية الممثل وبيانات اعتماد التأكيد وسجلات هوية التكرار لحدود الاستجابة؛ وتشترك المراجعات المفقودة والمنتهية وغير المطابقة للممثل في اسم مستعار آمن وخاص واحد 409."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "apps/api/src/runtime/http-use-cases/commercial-billing.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-billing-cancellation-confirmation-contract"
    },
    {
      "id": "2026-08-21-commercial-billing-cancellation-review-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial billing cancellation review contract",
        "ar": "عقد معياري لمراجعة إلغاء الفوترة التجارية"
      },
      "summary": {
        "en": "Publishes generated cancellation intent and an exact access, financial, export, retention, session, and confirmation-effects projection.",
        "ar": "ينشر نية الإلغاء المولدة وإسقاطاً دقيقاً لتأثيرات الوصول والمالية والتصدير والاحتفاظ والجلسة والتأكيد."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, cancellation mode and idempotency input, 200 review envelope, recent-owner requirement, private not-found behavior, and idempotency conflict remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة ومدخل وضع الإلغاء وهوية التكرار وغلاف المراجعة 200 ومتطلب المالك حديث المصادقة وسلوك عدم العثور الخاص وتعارض هوية التكرار دون تغيير."
      },
      "announcement": {
        "en": "Cancellation review now uses generated request and response projection so actor identity, internal idempotency state, and creation bookkeeping cannot cross the transport boundary; mode conflicts return a stable safe 409.",
        "ar": "تستخدم مراجعة الإلغاء الآن إسقاطاً مولداً للطلب والاستجابة لمنع عبور هوية الممثل وحالة التكرار الداخلية وسجلات الإنشاء لحدود النقل؛ وتعيد تعارضات الوضع استجابة 409 آمنة وثابتة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "apps/api/src/runtime/http-use-cases/commercial-billing.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-billing-cancellation-review-contract"
    },
    {
      "id": "2026-08-21-commercial-billing-change-authorization-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial billing change authorization contract",
        "ar": "عقد معياري لتفويض تغيير الفوترة التجارية"
      },
      "summary": {
        "en": "Publishes generated reviewed-change input and a safe checkout URL projection for provider authorization.",
        "ar": "ينشر مدخل التغيير المراجع المولد وإسقاطاً آمناً لرابط الدفع لتفويض المزود."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, change ID input, 202 checkout response, recent-owner requirement, and private not-found behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة ومدخل معرّف التغيير واستجابة الدفع 202 ومتطلب المالك حديث المصادقة وسلوك عدم العثور الخاص دون تغيير."
      },
      "announcement": {
        "en": "Billing change authorization now uses generated request and response projection so hostile actor input, internal authorization state, provider session material, and workspace authority cannot cross the transport boundary.",
        "ar": "يستخدم تفويض تغيير الفوترة الآن إسقاطاً مولداً للطلب والاستجابة لمنع عبور مدخلات الممثل العدائية وحالة التفويض الداخلية ومواد جلسة المزود وصلاحية مساحة العمل لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "apps/api/src/runtime/http-use-cases/commercial-billing.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-billing-change-authorization-contract"
    },
    {
      "id": "2026-08-21-commercial-billing-change-review-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial billing change review contract",
        "ar": "عقد معياري لمراجعة تغيير الفوترة التجارية"
      },
      "summary": {
        "en": "Publishes generated target-plan input and an actionable effect, proration, provider change, and hard-limit conflict review.",
        "ar": "ينشر مدخل الخطة المستهدفة المولد ومراجعة قابلة للتنفيذ للتأثير والتوزيع النسبي وتغيير المزود وتعارضات الحدود الصارمة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, target plan/period/quantity and idempotency input, 200 review envelope, recent-owner requirement, and private not-found behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة ومدخل الخطة والفترة والكمية المستهدفة وهوية التكرار وغلاف المراجعة 200 ومتطلب المالك حديث المصادقة وسلوك عدم العثور الخاص دون تغيير."
      },
      "announcement": {
        "en": "Billing change review now uses generated request and recursive response projection so actor state, idempotency bookkeeping, and provider workspace authority cannot cross the transport boundary.",
        "ar": "تستخدم مراجعة تغيير الفوترة الآن طلباً مولداً وإسقاط استجابة تكرارياً لمنع عبور حالة الممثل وسجلات هوية التكرار وصلاحية مساحة عمل المزود لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-billing-change-review-contract"
    },
    {
      "id": "2026-08-21-commercial-billing-inspection-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial billing inspection contract",
        "ar": "عقد معياري لفحص الفوترة التجارية"
      },
      "summary": {
        "en": "Publishes the supported subscription, financial-record, renewal, credit, cancellation, and upcoming-invoice projection from one generated contract.",
        "ar": "ينشر إسقاط الاشتراك والسجلات المالية والتجديد والرصيد والإلغاء والفاتورة القادمة المدعوم من عقد مولد واحد."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, 200 billing envelope, renewal and issue dates, nullable cancellation date, and private not-found behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة وغلاف الفوترة 200 وتواريخ التجديد والإصدار وتاريخ الإلغاء القابل للفراغ وسلوك عدم العثور الخاص دون تغيير."
      },
      "announcement": {
        "en": "Billing inspection now uses generated recursive projection so audit actors, refund authority, scheduled-change internals, and provider subscription state cannot cross the transport boundary.",
        "ar": "يستخدم فحص الفوترة الآن إسقاطاً تكرارياً مولداً لمنع عبور ممثلي التدقيق وصلاحية الاسترداد وتفاصيل التغيير المجدول وحالة اشتراك المزود لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-billing-inspection-contract"
    },
    {
      "id": "2026-08-21-commercial-overage-configuration-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial overage configuration contract",
        "ar": "عقد معياري لإعداد التجاوز التجاري"
      },
      "summary": {
        "en": "Publishes generated enabled-state, spend-cap, and idempotency input with the complete resulting commercial usage projection.",
        "ar": "ينشر مدخل حالة التمكين وحد الإنفاق وهوية التكرار المولد مع إسقاط الاستخدام التجاري الكامل الناتج."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound PATCH path, enabled/cap/idempotency input, 200 usage envelope, and existing validation, authority, review, cap, and conflict failures remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل مسار PATCH المرتبط بالجلسة ومدخل التمكين والحد وهوية التكرار وغلاف الاستخدام 200 وإخفاقات التحقق والصلاحية والمراجعة والحد والتعارض الحالية دون تغيير."
      },
      "announcement": {
        "en": "Commercial overage configuration now uses generated request decoding and the shared recursive usage projection so undeclared authority and provider state cannot cross the transport boundary.",
        "ar": "يستخدم إعداد التجاوز التجاري الآن فك ترميز الطلب المولد وإسقاط الاستخدام التكراري المشترك لمنع عبور الصلاحيات وحالة المزود غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-allowance-routes.ts",
        "tests/commercial-allowance-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-overage-configuration-contract"
    },
    {
      "id": "2026-08-21-commercial-overage-activation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial overage activation contract",
        "ar": "عقد معياري لتفعيل التجاوز التجاري"
      },
      "summary": {
        "en": "Publishes generated reviewed-quote activation input and the complete post-activation commercial usage projection.",
        "ar": "ينشر مدخل تفعيل عرض الأسعار المراجع المولد وإسقاط الاستخدام التجاري الكامل بعد التفعيل."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, optional explicit confirmation behavior, review/cap/idempotency input, 200 usage envelope, and existing safe failures remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة وسلوك التأكيد الصريح الاختياري ومدخل المراجعة والحد وهوية التكرار وغلاف الاستخدام 200 والإخفاقات الآمنة الحالية دون تغيير."
      },
      "announcement": {
        "en": "Commercial overage activation now uses generated request decoding and the shared recursive usage projection so undeclared authority and provider state cannot cross the transport boundary.",
        "ar": "يستخدم تفعيل التجاوز التجاري الآن فك ترميز الطلب المولد وإسقاط الاستخدام التكراري المشترك لمنع عبور الصلاحيات وحالة المزود غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-allowance-routes.ts",
        "tests/commercial-allowance-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-overage-activation-contract"
    },
    {
      "id": "2026-08-21-commercial-overage-review-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial overage review contract",
        "ar": "عقد معياري لمراجعة التجاوز التجاري"
      },
      "summary": {
        "en": "Publishes generated spend-cap and idempotency input with an exact catalogue-bound overage-rate review projection.",
        "ar": "ينشر مدخل حد الإنفاق وهوية التكرار المولد مع إسقاط دقيق لمراجعة أسعار التجاوز المرتبطة بالدليل."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, body idempotency key and spend cap, recent-owner requirement, 200 review, and existing safe failure aliases remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة ومفتاح التكرار وحد الإنفاق في النص ومتطلب المالك حديث المصادقة ومراجعة 200 وأسماء الإخفاق الآمنة الحالية دون تغيير."
      },
      "announcement": {
        "en": "Commercial overage review now uses generated request and recursive response projection so undeclared owner and provider-rate state cannot cross the transport boundary.",
        "ar": "تستخدم مراجعة التجاوز التجاري الآن مدخلات مولدة وإسقاط استجابة تكرارياً لمنع عبور حالة المالك وسعر المزود غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-allowance-routes.ts",
        "tests/commercial-allowance-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-overage-review-contract"
    },
    {
      "id": "2026-08-21-commercial-usage-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial usage contract",
        "ar": "عقد معياري للاستخدام التجاري"
      },
      "summary": {
        "en": "Publishes the complete billing-period allowance, overage, and next-operation effect projection from one generated wire contract.",
        "ar": "ينشر إسقاط فترة الفوترة الكامل للبدلات والتجاوزات وتأثير العملية التالية من عقد نقل مولد واحد."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The session-bound path, ISO billing dates, usage envelope, and private workspace or subscription not-found outcomes remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار المرتبط بالجلسة وتواريخ الفوترة بصيغة ISO وغلاف الاستخدام ونتائج عدم العثور الخاصة بمساحة العمل أو الاشتراك دون تغيير."
      },
      "announcement": {
        "en": "Commercial usage inspection now uses generated recursive projection so undeclared subscription and provider state cannot cross the transport boundary.",
        "ar": "يستخدم فحص الاستخدام التجاري الآن إسقاطاً تكرارياً مولداً لمنع عبور حالة الاشتراك والمزود غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-allowance-routes.ts",
        "tests/commercial-allowance-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-usage-contract"
    },
    {
      "id": "2026-08-21-commercial-provider-event-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical commercial provider-event contract",
        "ar": "عقد معياري لحدث المزود التجاري"
      },
      "summary": {
        "en": "Publishes the signed raw merchant event boundary and generated applied-or-duplicate outcome projection.",
        "ar": "ينشر حدود حدث التاجر الخام الموقع وإسقاط النتيجة المولدة بين التطبيق والتكرار."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The provider path, merchant-signature header, exact raw body, 202 outcome, and invalid signature/event response remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل مسار المزود وترويسة توقيع التاجر والنص الخام الدقيق ونتيجة 202 واستجابة التوقيع أو الحدث غير الصالح دون تغيير."
      },
      "announcement": {
        "en": "Merchant billing-event reconciliation now uses canonical generated projection so undeclared provider authority cannot cross the transport boundary.",
        "ar": "تستخدم مصالحة حدث فوترة التاجر الآن إسقاطاً معيارياً مولداً لمنع عبور صلاحيات المزود غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/commercial-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/commercial-billing-routes.ts",
        "tests/commercial-billing-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-commercial-provider-event-contract"
    },
    {
      "id": "2026-08-21-personal-workspace-correlation-split-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical personal workspace-correlation split contract",
        "ar": "عقد معياري لفصل ارتباط مساحة العمل الشخصية"
      },
      "summary": {
        "en": "Publishes generated confirmation/version input and validated split-version output, completing personal-family contract coverage.",
        "ar": "ينشر مدخل التأكيد والإصدار المولد ومخرج إصدار الفصل المتحقق منه، ويكمل تغطية عقود العائلة الشخصية."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The path, confirmation and expected-version input, correlation header, 200 split/version response, private not-found, authorization, recent-authentication, confirmation, and version-conflict outcomes remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخلا التأكيد والإصدار المتوقع وترويسة الارتباط واستجابة الفصل والإصدار 200 ونتائج الإخفاء وعدم التفويض والمصادقة الحديثة والتأكيد وتعارض الإصدار دون تغيير."
      },
      "announcement": {
        "en": "Personal workspace-correlation splitting now uses canonical generated decoding and fail-closed projection, completing all six required personal operations.",
        "ar": "يستخدم فصل ارتباط مساحة العمل الشخصية الآن فك الترميز المعياري المولد والإسقاط المغلق عند الفشل، لتكتمل العمليات الشخصية الست المطلوبة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/contracts/src/identity.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-correlation-routes.ts",
        "tests/workspace-correlation-api.test.ts",
        "tests/personal-correlation-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-personal-workspace-correlation-split-contract"
    },
    {
      "id": "2026-08-21-personal-workspace-correlation-list-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical personal workspace-correlation list contract",
        "ar": "عقد معياري لقائمة ارتباطات مساحات العمل الشخصية"
      },
      "summary": {
        "en": "Publishes generated workspace, app-name, and version disclosures with session-bound authorization and exact safe projection.",
        "ar": "ينشر إفصاحات مساحة العمل وأسماء التطبيقات والإصدار المولدة مع تفويض مرتبط بالجلسة وإسقاط آمن دقيق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The path, session authorization, correlation list, workspace fields, app names, version, and unauthorized outcome remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار وتفويض الجلسة وقائمة الارتباطات وحقول مساحة العمل وأسماء التطبيقات والإصدار ونتيجة عدم التفويض دون تغيير."
      },
      "announcement": {
        "en": "Personal workspace-correlation listing now uses canonical recursive projection so undeclared identity authority cannot cross the transport boundary.",
        "ar": "تستخدم قائمة ارتباطات مساحات العمل الشخصية الآن إسقاطاً معيارياً متكرراً لمنع عبور صلاحيات الهوية غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-correlation-routes.ts",
        "tests/personal-correlation-api.test.ts",
        "tests/workspace-correlation-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-personal-workspace-correlation-list-contract"
    },
    {
      "id": "2026-08-21-personal-username-removal-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical personal username removal contract",
        "ar": "عقد معياري لإزالة اسم المستخدم الشخصي"
      },
      "summary": {
        "en": "Publishes generated confirmation input and validated previous-name reservation output with stable safe outcomes.",
        "ar": "ينشر مدخل التأكيد المولد ومخرج حجز الاسم السابق المتحقق منه مع نتائج آمنة مستقرة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The path, confirmation input, 200 reservation response, correlation header, and authorization, recent-authentication, confirmation, conflict, and availability outcomes remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخل التأكيد واستجابة الحجز 200 وترويسة الارتباط ونتائج التفويض والمصادقة الحديثة والتأكيد والتعارض والتوفر دون تغيير."
      },
      "announcement": {
        "en": "Username removal now uses canonical generated confirmation decoding and fails closed before publishing a malformed reservation projection.",
        "ar": "تستخدم إزالة اسم المستخدم الآن فك ترميز التأكيد المعياري المولد وتغلق عند الفشل قبل نشر إسقاط حجز غير صالح."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-routes.ts",
        "tests/personal-routes.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-personal-username-removal-contract"
    },
    {
      "id": "2026-08-21-personal-username-change-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical personal username change contract",
        "ar": "عقد معياري لتغيير اسم المستخدم الشخصي"
      },
      "summary": {
        "en": "Publishes generated username-change input and validated cooldown and previous-name reservation output with stable safe outcomes.",
        "ar": "ينشر مدخل تغيير اسم المستخدم المولد ومخرج فترة الانتظار وحجز الاسم السابق المتحقق منهما مع نتائج آمنة مستقرة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The path, username input, 200 response, correlation header, reservation and cooldown fields, and authorization, validation, collision, and availability outcomes remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخل اسم المستخدم واستجابة 200 وترويسة الارتباط وحقول الحجز وفترة الانتظار ونتائج التفويض والتحقق والتعارض والتوفر دون تغيير."
      },
      "announcement": {
        "en": "Username change now uses canonical generated request decoding and fails closed before publishing a malformed reservation projection.",
        "ar": "يستخدم تغيير اسم المستخدم الآن فك ترميز الطلب المعياري المولد ويغلق عند الفشل قبل نشر إسقاط حجز غير صالح."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-routes.ts",
        "tests/personal-routes.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-personal-username-change-contract"
    },
    {
      "id": "2026-08-21-personal-username-enrollment-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical personal username enrollment contract",
        "ar": "عقد معياري لتسجيل اسم المستخدم الشخصي"
      },
      "summary": {
        "en": "Publishes generated username enrollment input and validated username and cooldown output with stable safe outcomes.",
        "ar": "ينشر مدخل تسجيل اسم المستخدم المولد ومخرج اسم المستخدم وفترة الانتظار المتحقق منهما مع نتائج آمنة مستقرة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The path, username input, 201 response, correlation header, and authorization, validation, collision, recovery, and availability outcomes remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخل اسم المستخدم واستجابة 201 وترويسة الارتباط ونتائج التفويض والتحقق والتعارض والاسترداد والتوفر دون تغيير."
      },
      "announcement": {
        "en": "Username enrollment now uses canonical generated request decoding and fails closed before publishing a malformed success projection.",
        "ar": "يستخدم تسجيل اسم المستخدم الآن فك ترميز الطلب المعياري المولد ويغلق عند الفشل قبل نشر إسقاط نجاح غير صالح."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-routes.ts",
        "tests/personal-routes.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-personal-username-enrollment-contract"
    },
    {
      "id": "2026-08-21-personal-overview-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical personal overview contract",
        "ar": "عقد معياري للنظرة العامة الشخصية"
      },
      "summary": {
        "en": "Publishes the session-bound personal overview and connected-app projections from the canonical OpenAPI contract.",
        "ar": "ينشر النظرة العامة الشخصية المرتبطة بالجلسة وإسقاطات التطبيقات المتصلة من عقد OpenAPI المعياري."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. The path, session cookie, response fields, refreshed cookie, and existing failure aliases remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار وملف تعريف ارتباط الجلسة وحقول الاستجابة وتجديد الملف وأسماء الإخفاقات الحالية دون تغيير."
      },
      "announcement": {
        "en": "Personal overview now uses generated fail-closed projection so undeclared connected-app authority cannot cross the transport boundary.",
        "ar": "تستخدم النظرة العامة الشخصية الآن إسقاطاً مولداً مغلقاً عند الفشل لمنع عبور صلاحيات التطبيقات المتصلة غير المعلنة لحدود النقل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/personal-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/personal-routes.ts",
        "tests/personal-routes.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-personal-overview-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-reconciliation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical webhook reconciliation contract",
        "ar": "عقد معياري لمصالحة خطافات الويب"
      },
      "summary": {
        "en": "Publishes generated reconciliation input, validated inserted-count and operation envelopes, no-store behavior, durable replay, and safe failure contracts.",
        "ar": "ينشر عقوداً مولدة لمدخل المصالحة وعدد الإدخالات المتحقق منه ومغلفات العمليات وسلوك منع التخزين وإعادة التشغيل الدائمة والإخفاقات الآمنة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, confirmation and idempotency input, 202 status, inserted count, no-store header, replay semantics, operation fields, and failure aliases remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخلا التأكيد وعدم التكرار والحالة 202 وعدد الإدخالات وترويسة منع التخزين ودلالات إعادة التشغيل وحقول العملية وأسماء الإخفاقات دون تغيير."
      },
      "announcement": {
        "en": "Webhook reconciliation now uses canonical generated decoding and fail-closed projection for applied and replayed outcomes, completing integration-family contract coverage.",
        "ar": "تستخدم مصالحة خطافات الويب الآن فك الترميز المعياري المولد والإسقاط المغلق عند الفشل لنتائج التطبيق وإعادة التشغيل، لتكتمل تغطية عقود عائلة التكامل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/contracts/src/integration.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-reconciliation-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-delivery-replay-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical webhook delivery-replay contract",
        "ar": "عقد معياري لإعادة تشغيل تسليم خطاف الويب"
      },
      "summary": {
        "en": "Publishes generated delivery-replay input, exact secret-free delivery and operation envelopes, no-store behavior, and safe failure contracts.",
        "ar": "ينشر عقوداً مولدة لمدخل إعادة تشغيل التسليم وتسليم دقيق خالٍ من الأسرار ومغلفات العمليات وسلوك منع التخزين والإخفاقات الآمنة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, confirmation and idempotency input, 202 status, no-store header, replay semantics, operation fields, and failure aliases remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخلا التأكيد وعدم التكرار والحالة 202 وترويسة منع التخزين ودلالات إعادة التشغيل وحقول العملية وأسماء الإخفاقات دون تغيير."
      },
      "announcement": {
        "en": "Webhook delivery replay now uses canonical generated decoding and projection for both applied and replayed outcomes without exposing payload or signing-secret state.",
        "ar": "تستخدم إعادة تشغيل تسليم خطاف الويب الآن فك الترميز والإسقاط المعياريين المولدين لنتائج التطبيق وإعادة التشغيل دون كشف الحمولة أو حالة سر التوقيع."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/contracts/src/integration.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-delivery-replay-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-delivery-list-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical webhook delivery-list contract",
        "ar": "عقد معياري لقائمة تسليمات خطاف الويب"
      },
      "summary": {
        "en": "Publishes generated cursor-paginated webhook delivery projections with explicit authorization, invalid-page, and private not-found outcomes.",
        "ar": "ينشر إسقاطات مولدة ومقسمة بالمؤشر لتسليمات خطاف الويب مع نتائج صريحة للتفويض والصفحة غير الصالحة وعدم العثور الخاص."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, session authorization, pagination, delivery fields, statuses, and private not-found behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار وتفويض الجلسة والترقيم وحقول التسليم والحالات وسلوك عدم العثور الخاص دون تغيير."
      },
      "announcement": {
        "en": "Webhook delivery listing now uses the canonical generated projection and strips undeclared payload or signing-secret state from every delivery.",
        "ar": "تستخدم قائمة تسليمات خطاف الويب الآن الإسقاط المعياري المولد وتحذف الحمولة غير المعلنة أو حالة سر التوقيع من كل تسليم."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-delivery-list-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-disablement-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical webhook disablement contract",
        "ar": "عقد معياري لتعطيل خطاف الويب"
      },
      "summary": {
        "en": "Publishes generated webhook-disablement input, applied/replay operation envelopes, secret-free current state, and failure contracts.",
        "ar": "ينشر عقوداً مولدة لمدخل تعطيل خطاف الويب ومغلفات عمليات التطبيق وإعادة التشغيل والحالة الراهنة الخالية من الأسرار والإخفاق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, confirmation input, version/idempotency preconditions, statuses, no-store headers, and replay behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخل التأكيد وشروط الإصدار وعدم التكرار والحالات وترويسات منع التخزين وسلوك إعادة التشغيل دون تغيير."
      },
      "announcement": {
        "en": "Webhook disablement now uses canonical generated projections and cannot expose stored signing-secret state on applied or replayed outcomes.",
        "ar": "يستخدم تعطيل خطاف الويب الآن إسقاطات معيارية مولدة ولا يمكنه كشف حالة سر التوقيع المخزنة في نتائج التطبيق أو إعادة التشغيل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-disablement-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-secret-rotation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical webhook signing-secret rotation contract",
        "ar": "عقد معياري لتدوير سر توقيع خطاف الويب"
      },
      "summary": {
        "en": "Publishes generated signing-secret rotation input, one-time disclosure, secret-free replay, operation-envelope, and failure contracts.",
        "ar": "ينشر عقوداً مولدة لمدخل تدوير سر التوقيع والكشف لمرة واحدة وإعادة التشغيل الخالية من السر ومغلف العملية والإخفاق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, overlap and confirmation input, version/idempotency preconditions, statuses, no-store headers, one-time signing secret, and replay behavior remain unchanged. Changed input under a claimed idempotency key now consistently returns 409 instead of an internal error.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخلا مدة التداخل والتأكيد وشروط الإصدار وعدم التكرار والحالات وترويسات منع التخزين وسر التوقيع لمرة واحدة وسلوك إعادة التشغيل دون تغيير. يعيد الإدخال المتغير تحت مفتاح عدم تكرار مستخدم الآن الحالة 409 باتساق بدلاً من خطأ داخلي."
      },
      "announcement": {
        "en": "Webhook signing-secret rotation now uses canonical generated projections and stable conflict handling without exposing stored secret state.",
        "ar": "يستخدم تدوير سر توقيع خطاف الويب الآن إسقاطات معيارية مولدة ومعالجة ثابتة للتعارض دون كشف حالة السر المخزنة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-secret-rotation-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-subscriptions-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical webhook subscription-replacement contract",
        "ar": "عقد معياري لاستبدال اشتراكات خطاف الويب"
      },
      "summary": {
        "en": "Publishes generated subscription-replacement request, applied/replay operation envelopes, secret-free webhook projections, and failure contracts.",
        "ar": "ينشر عقوداً مولدة لطلب استبدال الاشتراكات ومغلفات عمليات التطبيق وإعادة التشغيل وإسقاطات خطاف الويب الخالية من الأسرار والإخفاق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, subscription validation, confirmation, version/idempotency preconditions, statuses, no-store headers, replay, and stale-version error behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار والتحقق من الاشتراكات والتأكيد وشروط الإصدار وعدم التكرار والحالات وترويسات منع التخزين وإعادة التشغيل وسلوك خطأ الإصدار القديم دون تغيير."
      },
      "announcement": {
        "en": "Webhook subscription replacement now uses canonical generated projections without exposing internal signing-secret state.",
        "ar": "يستخدم استبدال اشتراكات خطاف الويب الآن إسقاطات معيارية مولدة دون كشف حالة سر التوقيع الداخلية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-subscriptions-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-list-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical integration webhook-list contract",
        "ar": "عقد معياري لقائمة خطافات ويب التكامل"
      },
      "summary": {
        "en": "Publishes cursor-paginated webhook inventory with generated recursive projection for signing-secret-free endpoint state.",
        "ar": "ينشر مخزون خطافات الويب المقسّم بالمؤشر مع إسقاط مولد متكرر لحالة نقاط النهاية الخالية من أسرار التوقيع."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, session authorization, pagination, statuses, private not-found behavior, and public webhook fields remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار وتفويض الجلسة والترقيم والحالات وسلوك عدم العثور الخاص وحقول خطاف الويب العامة دون تغيير."
      },
      "announcement": {
        "en": "Integration webhook listing now uses the canonical contract and recursively strips internal signing-secret state.",
        "ar": "تستخدم قائمة خطافات ويب التكامل الآن العقد المعياري وتحذف حالة أسرار التوقيع الداخلية بصورة متكررة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-list-contract"
    },
    {
      "id": "2026-08-21-integration-webhook-registration-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical integration webhook-registration contract",
        "ar": "عقد معياري لتسجيل خطاف ويب للتكامل"
      },
      "summary": {
        "en": "Publishes generated webhook registration request, one-time signing-secret success, secret-free replay, operation-envelope, and failure contracts.",
        "ar": "ينشر عقوداً مولدة لطلب تسجيل خطاف الويب ونجاح سر التوقيع لمرة واحدة وإعادة التشغيل الخالية من السر ومغلف العملية والإخفاق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, URL/subscription validation, confirmation, idempotency, statuses, no-store headers, one-time signing secret, and replay behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار والتحقق من الرابط والاشتراكات والتأكيد وعدم التكرار والحالات وترويسات منع التخزين وسر التوقيع لمرة واحدة وسلوك إعادة التشغيل دون تغيير."
      },
      "announcement": {
        "en": "Integration webhook registration now uses canonical generated projections without exposing internal signing-secret state.",
        "ar": "يستخدم تسجيل خطاف ويب للتكامل الآن إسقاطات معيارية مولدة دون كشف حالة سر التوقيع الداخلية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/webhook-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-webhook-registration-contract"
    },
    {
      "id": "2026-08-21-integration-credential-revocation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical integration credential-revocation contract",
        "ar": "عقد معياري لإلغاء بيانات اعتماد التكامل"
      },
      "summary": {
        "en": "Publishes generated revocation request, applied, replay, stale-version, operation-envelope, and secret-free response contracts.",
        "ar": "ينشر عقوداً مولدة لطلب الإلغاء والتطبيق وإعادة التشغيل والإصدار القديم ومغلف العملية والاستجابة الخالية من الأسرار."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, compromised and confirmation input, version and idempotency preconditions, statuses, no-store headers, replay, and stale-version behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخلا الاختراق والتأكيد وشروط الإصدار وعدم التكرار والحالات وترويسات منع التخزين وإعادة التشغيل وسلوك الإصدار القديم دون تغيير."
      },
      "announcement": {
        "en": "Integration credential revocation now uses canonical generated projections and cannot disclose secret or internal credential state.",
        "ar": "يستخدم إلغاء بيانات اعتماد التكامل الآن إسقاطات معيارية مولدة ولا يمكنه كشف السر أو حالة بيانات الاعتماد الداخلية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/credential-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-credential-revocation-contract"
    },
    {
      "id": "2026-08-21-integration-credential-rotation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical integration credential-rotation contract",
        "ar": "عقد معياري لتدوير بيانات اعتماد التكامل"
      },
      "summary": {
        "en": "Publishes generated rotation request, one-time-secret success, secret-free replay, stale-version refresh, and failure contracts.",
        "ar": "ينشر عقوداً مولدة لطلب التدوير ونجاح السر لمرة واحدة وإعادة التشغيل الخالية من السر وتحديث الإصدار القديم والإخفاق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, version and idempotency preconditions, overlap input, statuses, no-store headers, one-time secret, replay, and stale-version behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار وشروط الإصدار وعدم التكرار ومدخل التداخل والحالات وترويسات منع التخزين والسر لمرة واحدة وإعادة التشغيل وسلوك الإصدار القديم دون تغيير."
      },
      "announcement": {
        "en": "Integration credential rotation now uses canonical generated projections without exposing internal credential state on success, replay, or conflict.",
        "ar": "يستخدم تدوير بيانات اعتماد التكامل الآن إسقاطات معيارية مولدة دون كشف حالة بيانات الاعتماد الداخلية عند النجاح أو إعادة التشغيل أو التعارض."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/credential-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-credential-rotation-contract"
    },
    {
      "id": "2026-08-21-integration-credential-create-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical integration credential-creation contract",
        "ar": "عقد معياري لإنشاء بيانات اعتماد التكامل"
      },
      "summary": {
        "en": "Publishes generated request, one-time-secret success, secret-free replay, operation-envelope, and failure contracts for credential creation.",
        "ar": "ينشر عقوداً مولدة للطلب ونجاح السر لمرة واحدة وإعادة التشغيل الخالية من السر ومغلف العملية والإخفاق لإنشاء بيانات الاعتماد."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, session authorization, idempotency key, no-store headers, statuses, one-time secret, and replay behavior remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار وتفويض الجلسة ومفتاح عدم التكرار وترويسات منع التخزين والحالات والسر لمرة واحدة وسلوك إعادة التشغيل دون تغيير."
      },
      "announcement": {
        "en": "Integration credential creation now uses canonical generated projections and strips non-contract authority and internal credential state.",
        "ar": "يستخدم إنشاء بيانات اعتماد التكامل الآن إسقاطات معيارية مولدة ويحذف السلطة غير التعاقدية وحالة بيانات الاعتماد الداخلية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/credential-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-credential-create-contract"
    },
    {
      "id": "2026-08-21-integration-credential-list-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical integration credential-list contract",
        "ar": "عقد معياري لقائمة بيانات اعتماد التكامل"
      },
      "summary": {
        "en": "Publishes cursor-paginated integration credential inventory with generated, recursively secret-free response projection.",
        "ar": "ينشر مخزون بيانات اعتماد التكامل المقسّم بالمؤشر مع إسقاط استجابة مولد ومتكرر وخالٍ من الأسرار."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing path, pagination, session authorization, statuses, and public credential fields remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار والترقيم وتفويض الجلسة والحالات وحقول بيانات الاعتماد العامة دون تغيير."
      },
      "announcement": {
        "en": "Integration credential listing now uses the canonical contract shared by the API runtime, generated client, and reference documentation.",
        "ar": "تستخدم قائمة بيانات اعتماد التكامل الآن العقد المعياري المشترك بين واجهة API وعميلها المولد ووثائقها المرجعية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/integration-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/integration/credential-routes.ts",
        "tests/integration-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-integration-credential-list-contract"
    },
    {
      "id": "2026-08-21-recovery-email-verification-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical recovery email-verification contract",
        "ar": "عقد معياري للتحقق من بريد الاسترداد"
      },
      "summary": {
        "en": "Publishes independent recovery email proof with generated request, generic denial, containment-success, and recovery-authority projections.",
        "ar": "ينشر إثبات بريد الاسترداد المستقل مع إسقاطات مولدة للطلب والرفض العام ونجاح الاحتواء وسلطة الاسترداد."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing token and locale input, generic denial, statuses, correlation, platform-session containment, and recovery authority remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل إدخال الرمز واللغة والرفض العام والحالات والارتباط واحتواء جلسة المنصة وسلطة الاسترداد دون تغيير."
      },
      "announcement": {
        "en": "Recovery email verification now uses canonical DTOs and completes authoritative coverage of the identity operation family.",
        "ar": "يستخدم التحقق من بريد الاسترداد الآن كائنات معيارية ويكمل التغطية المعيارية لعائلة عمليات الهوية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.authority.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-recovery-email-verification-contract"
    },
    {
      "id": "2026-08-21-recovery-email-request-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical recovery email-replacement request contract",
        "ar": "عقد معياري لطلب استبدال بريد الاسترداد"
      },
      "summary": {
        "en": "Publishes recovery-authorized email-replacement staging with generated confirmation, validation, private collision, accepted-next-action, and unavailable projections.",
        "ar": "ينشر تهيئة استبدال البريد المصرح بها عبر الاسترداد مع إسقاطات مولدة للتأكيد والتحقق والتعارض الخاص والقبول والخطوة التالية وعدم التوفر."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing email normalization, independent proof, collision privacy, statuses, correlation, and no-cookie accepted response remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل تطبيع البريد والإثبات المستقل وخصوصية التعارض والحالات والارتباط واستجابة القبول بلا ملف ارتباط دون تغيير."
      },
      "announcement": {
        "en": "Recovery email-replacement requests now use canonical DTOs without exposing replacement or conflict-case state.",
        "ar": "تستخدم طلبات استبدال بريد الاسترداد الآن كائنات معيارية دون كشف حالة الاستبدال أو حالة التعارض."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-recovery-email-request-contract"
    },
    {
      "id": "2026-08-21-recovery-username-replacement-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical recovery username replacement contract",
        "ar": "عقد معياري لاستبدال اسم مستخدم الاسترداد"
      },
      "summary": {
        "en": "Publishes recovery-authorized username replacement with generated confirmation, validation, private collision, and containment projections.",
        "ar": "ينشر استبدال اسم المستخدم المصرح به عبر الاسترداد مع إسقاطات مولدة للتأكيد والتحقق والتعارض الخاص والاحتواء."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing username input normalization, confirmation, collision privacy, statuses, correlation, and session containment remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل تطبيع اسم المستخدم والتأكيد وخصوصية التعارض والحالات والارتباط واحتواء الجلسات دون تغيير."
      },
      "announcement": {
        "en": "Recovery username replacement now uses canonical request and response DTOs without exposing identifier or conflict-case state.",
        "ar": "يستخدم استبدال اسم مستخدم الاسترداد الآن كائنات طلب واستجابة معيارية دون كشف حالة المعرف أو حالة التعارض."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-recovery-username-replacement-contract"
    },
    {
      "id": "2026-08-21-recovery-password-revocation-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical recovery password revocation contract",
        "ar": "عقد معياري لإلغاء كلمة مرور الاسترداد"
      },
      "summary": {
        "en": "Publishes recovery-authorized password revocation with generated confirmation, containment, last-factor, and not-found projections.",
        "ar": "ينشر إلغاء كلمة المرور المصرح به عبر الاسترداد مع إسقاطات مولدة للتأكيد والاحتواء وآخر عامل وعدم العثور."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing confirmation, last-factor protection, status codes, correlation, and compromised-session containment remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل التأكيد وحماية آخر عامل ورموز الحالة والارتباط واحتواء الجلسات المخترقة دون تغيير."
      },
      "announcement": {
        "en": "Recovery password revocation now uses canonical request and response DTOs while keeping recovery authority active after platform-session containment.",
        "ar": "يستخدم إلغاء كلمة مرور الاسترداد الآن كائنات طلب واستجابة معيارية مع إبقاء سلطة الاسترداد فعالة بعد احتواء جلسة المنصة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-recovery-password-revocation-contract"
    },
    {
      "id": "2026-08-21-identity-recovery-factors-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical recovery factor inventory contract",
        "ar": "عقد معياري لمخزون عوامل الاسترداد"
      },
      "summary": {
        "en": "Publishes the recovery-authorized factor inventory with recursive generated projection for secret-free nested identifiers and authenticators.",
        "ar": "ينشر مخزون عوامل الاسترداد المصرح به مع إسقاط مولد متكرر للمعرفات ووسائل المصادقة المتداخلة والخالية من الأسرار."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing factor inventory fields, date serialization, 200/401/503 outcomes, and recovery-cookie authority remain unchanged.",
        "ar": "لا يلزم ترحيل. تظل حقول مخزون العوامل وتسلسل التواريخ ونتائج 200 و401 و503 وسلطة ملف الاسترداد دون تغيير."
      },
      "announcement": {
        "en": "Recovery-factor inventory now uses an explicit recovery authorization mode and recursively enforced canonical response DTOs.",
        "ar": "يستخدم مخزون عوامل الاسترداد الآن وضع تفويض استرداد صريحاً وكائنات استجابة معيارية مفروضة بصورة متكررة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/contracts/src/wire-codec.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-client-generation.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-identity-recovery-factors-contract"
    },
    {
      "id": "2026-08-21-identity-recovery-proof-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical identity recovery proof contract",
        "ar": "عقد معياري لإثبات استرداد الهوية"
      },
      "summary": {
        "en": "Publishes recovery-proof consumption from canonical OpenAPI with generated request decoding and generic denial projection.",
        "ar": "ينشر استهلاك إثبات الاسترداد من OpenAPI المعياري مع فك الطلب المولد وإسقاط الرفض العام."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing recovery proofs retain their 204 recovery-cookie boundary, generic 400 denial, throttled 429 response, and unavailable 503 behavior.",
        "ar": "لا يلزم ترحيل. تحتفظ إثباتات الاسترداد الحالية بحد ملف استرداد 204 والرفض العام 400 واستجابة التقييد 429 وسلوك عدم التوفر 503."
      },
      "announcement": {
        "en": "Recovery-proof requests and denials now use the canonical contract shared by the API runtime, generated client, and reference documentation.",
        "ar": "تستخدم طلبات إثبات الاسترداد ورفضها الآن العقد المعياري المشترك بين واجهة API وعميلها المولد ووثائقها المرجعية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-identity-recovery-proof-contract"
    },
    {
      "id": "2026-08-21-identity-recovery-request-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical identity recovery request contract",
        "ar": "عقد معياري لطلب استرداد الهوية"
      },
      "summary": {
        "en": "Publishes enumeration-safe identity recovery requests from canonical OpenAPI with generated request and response projection.",
        "ar": "ينشر طلبات استرداد الهوية الآمنة من كشف الحساب من OpenAPI المعياري مع إسقاط مولد للطلب والاستجابة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing recovery requests retain their path, payload, enumeration-safe 202 response, correlation header, and failure behavior.",
        "ar": "لا يلزم ترحيل. تحتفظ طلبات الاسترداد الحالية بالمسار والحمولة واستجابة 202 الآمنة من كشف الحساب ومعرّف الارتباط وسلوك الإخفاق."
      },
      "announcement": {
        "en": "Identity recovery requests now use the canonical contract shared by the API runtime, generated client, and reference documentation.",
        "ar": "تستخدم طلبات استرداد الهوية الآن العقد المعياري المشترك بين واجهة API وعميلها المولد ووثائقها المرجعية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-api.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-identity-recovery-request-contract"
    },
    {
      "id": "2026-08-21-identity-verification-contract",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Canonical identity verification contract",
        "ar": "عقد معياري للتحقق من الهوية"
      },
      "summary": {
        "en": "Publishes platform email verification from canonical OpenAPI, including generated request decoding and explicit success and failure responses.",
        "ar": "ينشر التحقق من بريد المنصة من OpenAPI المعياري، بما يشمل فك الطلب المولد واستجابات النجاح والإخفاق الصريحة."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration is required. Existing verification requests retain their status, cookie, correlation, and compatibility behavior.",
        "ar": "لا يلزم ترحيل. تحتفظ طلبات التحقق الحالية بحالة الاستجابة وملف الارتباط ومعرّف الارتباط وسلوك التوافق."
      },
      "announcement": {
        "en": "Platform email verification is now represented by the same canonical contract used by the API runtime, generated client, and reference documentation.",
        "ar": "أصبح التحقق من بريد المنصة ممثلاً بالعقد المعياري نفسه الذي تستخدمه واجهة API وعميلها المولد ووثائقها المرجعية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/api-client/src/generated.ts",
        "apps/api/src/identity-routes.ts",
        "tests/identity-contract-codec.test.ts",
        "tests/api-contract-authority.test.ts"
      ],
      "permalink": "/changes#2026-08-21-identity-verification-contract"
    },
    {
      "id": "2026-08-21-sveltekit-server-boundaries",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Focused SvelteKit server boundaries",
        "ar": "حدود خادم SvelteKit مركزة"
      },
      "summary": {
        "en": "Publishes focused OIDC/token, application-session, and webhook verification modules while retaining the aggregate server facade.",
        "ar": "تنشر وحدات مركزة لـ OIDC والرموز وجلسة التطبيق والتحقق من الويب هوك مع الإبقاء على واجهة الخادم المجمعة."
      },
      "categories": [
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Existing root imports remain supported. New server integrations may import @authless/sveltekit/oidc, /session, or /webhook independently.",
        "ar": "تظل استيرادات الجذر الحالية مدعومة. يمكن لتكاملات الخادم الجديدة استيراد وحدات OIDC أو الجلسة أو الويب هوك بشكل مستقل."
      },
      "announcement": {
        "en": "SvelteKit protocol and lifecycle helpers now have explicit independently testable server boundaries.",
        "ar": "أصبحت مساعدات بروتوكول SvelteKit ودورة الحياة ضمن حدود خادم صريحة قابلة للاختبار بصورة مستقلة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/sveltekit/package.json",
        "packages/sveltekit/src/oidc.ts",
        "packages/sveltekit/src/session.ts",
        "packages/sveltekit/src/webhook.ts",
        "tests/sveltekit-boundaries.test.ts",
        "tests/sveltekit-golden-path-clean-room.test.ts"
      ],
      "permalink": "/changes#2026-08-21-sveltekit-server-boundaries"
    },
    {
      "id": "2026-08-21-api-client-resource-families",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Focused API client resource families",
        "ar": "عائلات موارد مركزة لعميل API"
      },
      "summary": {
        "en": "Publishes independently composable transport, workspace, app, membership, access, bulk-access, and audit clients while retaining the aggregate facade.",
        "ar": "تنشر عميل نقل وعملاء مستقلين قابلين للتركيب لمساحات العمل والتطبيقات والعضويات والوصول والوصول الجماعي والتدقيق مع الإبقاء على الواجهة المجمعة."
      },
      "categories": [
        "api",
        "sdk",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Existing createAuthlessApiClient usage remains supported. New integrations may compose createAuthlessTransport with one focused resource client to reduce dependencies.",
        "ar": "يظل استخدام createAuthlessApiClient الحالي مدعوماً. يمكن للتكاملات الجديدة تركيب createAuthlessTransport مع عميل موارد مركز واحد لتقليل التبعيات."
      },
      "announcement": {
        "en": "API-client transport policy and resource families now have explicit independently testable boundaries.",
        "ar": "أصبحت سياسة نقل عميل API وعائلات الموارد ضمن حدود صريحة قابلة للاختبار بصورة مستقلة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/api-client/package.json",
        "packages/api-client/src/transport.ts",
        "packages/api-client/src/workspaces.ts",
        "packages/api-client/src/apps.ts",
        "packages/api-client/src/memberships.ts",
        "packages/api-client/src/bulk-access.ts",
        "packages/api-client/src/audit.ts",
        "tests/api-client-workspace-family.test.ts",
        "tests/api-client-app-family.test.ts",
        "tests/api-client-membership-family.test.ts",
        "tests/api-client-bulk-access-family.test.ts",
        "tests/api-client-audit-family.test.ts"
      ],
      "permalink": "/changes#2026-08-21-api-client-resource-families"
    },
    {
      "id": "2026-08-21-browser-capability-subpaths",
      "publishedAt": "2026-08-21",
      "title": {
        "en": "Focused Browser capability imports",
        "ar": "استيرادات مركزة لقدرات المتصفح"
      },
      "summary": {
        "en": "Published independent failure-classification and authorization-state entry points while retaining the existing Browser package facade.",
        "ar": "نُشرت نقاط دخول مستقلة لتصنيف الإخفاقات وحالة التفويض مع الإبقاء على واجهة حزمة المتصفح الحالية."
      },
      "categories": [
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Existing @authless/browser imports remain supported. New consumers may import transport failures from @authless/browser/failures and PKCE authorization state from @authless/browser/authorization to keep capability bundles independent.",
        "ar": "تظل استيرادات @authless/browser الحالية مدعومة. يمكن للمستهلكين الجدد استيراد إخفاقات النقل من @authless/browser/failures وحالة تفويض PKCE من @authless/browser/authorization لإبقاء حزم القدرات مستقلة."
      },
      "announcement": {
        "en": "Browser failure handling and authorization state now have explicit, independently testable package boundaries.",
        "ar": "أصبحت معالجة إخفاقات المتصفح وحالة التفويض ضمن حدود حزمة صريحة يمكن اختبارها بصورة مستقلة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/browser/package.json",
        "packages/browser/src/authorization.ts",
        "packages/browser/src/failures.ts",
        "tests/browser-capability-entrypoints.test.ts",
        "tests/helper-packages-conformance.test.ts"
      ],
      "permalink": "/changes#2026-08-21-browser-capability-subpaths"
    },
    {
      "id": "2026-08-15-cookie-mutation-origin-session-cache-policy",
      "publishedAt": "2026-08-15",
      "title": {
        "en": "Cookie mutation trust boundary",
        "ar": "حدود الثقة لتعديلات ملفات الارتباط"
      },
      "summary": {
        "en": "Enforced exact Origin, deployment-derived session cookies, private cache defaults, and security headers across browser-authenticated mutation surfaces.",
        "ar": "فُرض الأصل الدقيق وملفات الجلسات المشتقة من النشر وافتراضات التخزين الخاص ورؤوس الأمان عبر أسطح التعديل المصادق عليها للمتصفح."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "operations"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "security",
      "migration": {
        "en": "No source migration for browser journeys. Server-side API clients must use the documented api-client transport marker when making session-cookie mutations without an Origin.",
        "ar": "لا يلزم ترحيل لمسارات المتصفح. يجب على عملاء API من جهة الخادم استخدام وسم النقل الموثق لعميل API عند تنفيذ تعديلات تعتمد على ملف جلسة من دون Origin."
      },
      "announcement": {
        "en": "The browser trust boundary and response privacy policy are now explicit across Sign, Dash, API, and integration surfaces.",
        "ar": "أصبحت حدود ثقة المتصفح وسياسة خصوصية الاستجابات صريحة عبر أسطح Sign وDash وAPI والتكاملات."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "4f0c0a1",
        "apps/api/src/app.ts",
        "packages/api-client/src/index.ts",
        "packages/ui/package.json",
        "tests/identity-runtime-cors.test.ts",
        "tests/environment-contract.test.ts",
        "tests/docs-compatibility.test.ts"
      ],
      "permalink": "/changes#2026-08-15-cookie-mutation-origin-session-cache-policy"
    },
    {
      "id": "2026-08-15-api-client-contracts-dependency",
      "publishedAt": "2026-08-15",
      "title": {
        "en": "API client canonical contracts dependency",
        "ar": "تبعية العقود المعيارية لعميل API"
      },
      "summary": {
        "en": "Declared @authless/contracts as a runtime workspace dependency so clean installs resolve the canonical API failure and correlation types.",
        "ar": "أُعلنت ‎@authless/contracts‎ كتَبعية تشغيلية لمساحة العمل حتى تحل التثبيتات النظيفة أنواع فشل API ومعرّف الارتباط المعيارية."
      },
      "categories": [
        "api",
        "sdk",
        "operations"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No source migration. Reinstall workspace dependencies; clean installs now link @authless/contracts for @authless/api-client.",
        "ar": "لا يلزم ترحيل للمصدر. أعد تثبيت تبعيات مساحة العمل؛ إذ تربط التثبيتات النظيفة الآن ‎@authless/contracts‎ مع ‎@authless/api-client‎."
      },
      "announcement": {
        "en": "The API client workspace dependency graph now includes its canonical contracts package.",
        "ar": "يتضمن مخطط تبعيات مساحة عمل عميل API الآن حزمة العقود المعيارية الخاصة به."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "32b9b58",
        "packages/api-client/package.json",
        "bun.lock",
        "tests/api-client-workspace-dependency.test.ts"
      ],
      "permalink": "/changes#2026-08-15-api-client-contracts-dependency"
    },
    {
      "id": "2026-08-15-api-client-self-contained-package",
      "publishedAt": "2026-08-15",
      "title": {
        "en": "Self-contained API client package",
        "ar": "حزمة عميل API ذاتية الاكتفاء"
      },
      "summary": {
        "en": "Bundles the canonical failure and correlation classifier while keeping @authless/contracts out of runtime dependencies in the public tarball.",
        "ar": "تضمّن حزمة عميل API مصنف الفشل والارتباط المعياري وتحافظ على إبعاد ‎@authless/contracts‎ عن تبعيات التشغيل في الحزمة العامة."
      },
      "categories": [
        "api",
        "sdk",
        "operations"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No source migration. Reinstall or repack @authless/api-client 0.1.0; clean-room installs no longer require the private contracts package.",
        "ar": "لا يلزم ترحيل للمصدر. أعد تثبيت أو حزم ‎@authless/api-client 0.1.0‎؛ فلم تعد التثبيتات النظيفة تتطلب حزمة العقود الخاصة."
      },
      "announcement": {
        "en": "The public tarball is self-contained; @authless/contracts remains a workspace-only build input.",
        "ar": "الحزمة العامة ذاتية الاكتفاء؛ وتبقى ‎@authless/contracts‎ مدخلاً للبناء داخل مساحة العمل فقط."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/api-client/package.json",
        "bun.lock",
        "packages/api-client/src/index.ts",
        "tests/rest-management-guide-clean-room.test.ts"
      ],
      "permalink": "/changes#2026-08-15-api-client-self-contained-package"
    },
    {
      "id": "2026-08-14-dash-sign-rename",
      "publishedAt": "2026-08-14",
      "title": {
        "en": "Dash and Sign application rename",
        "ar": "إعادة تسمية تطبيقي Dash وSign"
      },
      "summary": {
        "en": "Renamed the Dashboard deployable to Dash and the Auth deployable to Sign across packages, origins, and deployment branches.",
        "ar": "أُعيدت تسمية تطبيق Dashboard القابل للنشر إلى Dash وتطبيق Auth إلى Sign عبر الحزم والأصول وفروع النشر."
      },
      "categories": [
        "product",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use the dash and sign application names, origins, environment variables, build commands, and deployment branches. Protocol behavior is unchanged.",
        "ar": "استخدم أسماء تطبيقي dash وsign وأصولهما ومتغيرات البيئة وأوامر البناء وفروع النشر الجديدة. لم يتغير سلوك البروتوكول."
      },
      "announcement": {
        "en": "The renamed deployables are available from the same monorepo revision.",
        "ar": "التطبيقات المعاد تسميتها متاحة من مراجعة المستودع نفسها."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/dash/package.json",
        "apps/sign/package.json",
        ".github/workflows/netlify-branches.yml"
      ],
      "permalink": "/changes#2026-08-14-dash-sign-rename"
    },
    {
      "id": "2026-08-14-docs-reference",
      "publishedAt": "2026-08-14",
      "title": {
        "en": "Contract-backed REST reference",
        "ar": "مرجع REST مستند إلى العقد"
      },
      "summary": {
        "en": "Published generated REST reference and clean-room integration guides.",
        "ar": "نُشر مرجع REST مولّد وأدلة تكامل قابلة للتنفيذ من بيئة نظيفة."
      },
      "categories": [
        "api",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration. Use /reference/rest for exact operations and /build for supported guides.",
        "ar": "لا يلزم ترحيل. استخدم ‎/reference/rest‎ للعمليات الدقيقة و‎/build‎ للأدلة المدعومة."
      },
      "announcement": {
        "en": "Available in Developer Docs.",
        "ar": "متاح في وثائق المطورين."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "dbe5364",
        "9f8fa91",
        "5198e2e",
        "64dbf7a"
      ],
      "permalink": "/changes#2026-08-14-docs-reference"
    },
    {
      "id": "2026-08-14-relying-app-helpers",
      "publishedAt": "2026-08-14",
      "title": {
        "en": "Browser and SvelteKit helper source",
        "ar": "مصدر مساعدي المتصفح وSvelteKit"
      },
      "summary": {
        "en": "Added tested PKCE browser mechanics and server-side callback, session, lifecycle, and webhook mechanics.",
        "ar": "أضيفت آليات PKCE للمتصفح وآليات الاستدعاء والجلسة ودورة الحياة وwebhook على الخادم."
      },
      "categories": [
        "sdk",
        "security",
        "events"
      ],
      "audiences": [
        "integrator"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration. These workspace packages are private source-only components and are not a published release.",
        "ar": "لا يلزم ترحيل. هذه حزم مساحة عمل خاصة متاحة كمصدر فقط وليست إصداراً منشوراً."
      },
      "announcement": {
        "en": "Source is available in this repository; package publication is not claimed.",
        "ar": "المصدر متاح في هذا المستودع؛ ولا يُدّعى نشر الحزم."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "be5ea42",
        "issues/0030-ship-browser-and-sveltekit-helpers-with-conformance-tooling.md"
      ],
      "permalink": "/changes#2026-08-14-relying-app-helpers"
    },
    {
      "id": "2026-08-13-typescript-rest-client",
      "publishedAt": "2026-08-13",
      "title": {
        "en": "TypeScript REST client 0.1.0",
        "ar": "عميل TypeScript لواجهة REST إصدار 0.1.0"
      },
      "summary": {
        "en": "Published the generated Node client with contract checks, safe retry classification, and correlation-safe errors.",
        "ar": "نُشر عميل Node المولّد مع فحوص العقد وتصنيف إعادة المحاولة الآمنة وأخطاء تحافظ على معرف الارتباط."
      },
      "categories": [
        "api",
        "sdk",
        "operations"
      ],
      "audiences": [
        "integrator",
        "operator"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration. New server integrations may pin @authless/api-client 0.1.0 and Node 24.x.",
        "ar": "لا يلزم ترحيل. يمكن لتكاملات الخادم الجديدة تثبيت ‎@authless/api-client 0.1.0‎ وNode 24.x."
      },
      "announcement": {
        "en": "Stable package metadata is present in the repository.",
        "ar": "بيانات الحزمة المستقرة موجودة في المستودع."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "53f6bb4",
        "packages/api-client/package.json"
      ],
      "permalink": "/changes#2026-08-13-typescript-rest-client"
    },
    {
      "id": "2026-08-13-commercial-catalogue",
      "publishedAt": "2026-08-13",
      "title": {
        "en": "Commercial catalogue boundary",
        "ar": "حدود الكتالوج التجاري"
      },
      "summary": {
        "en": "Added one fail-closed catalogue for product surfaces; commercial activation remains gated.",
        "ar": "أضيف كتالوج واحد مغلق افتراضياً لواجهات المنتج؛ ويبقى التفعيل التجاري مشروطاً."
      },
      "categories": [
        "product"
      ],
      "audiences": [
        "evaluator",
        "operator"
      ],
      "impact": "additive",
      "migration": {
        "en": "No integration migration. Do not treat catalogue presence as general-availability authorization.",
        "ar": "لا يلزم ترحيل للتكامل. لا تعتبر وجود الكتالوج تفويضاً للتوفر العام."
      },
      "announcement": {
        "en": "Repository capability only; activation remains gated.",
        "ar": "إمكان في المستودع فقط؛ ويبقى التفعيل مشروطاً."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "f8f244b",
        "issues/0061-define-the-commercial-product-and-plan-catalogue.md"
      ],
      "permalink": "/changes#2026-08-13-commercial-catalogue"
    }
  ],
  "migrationTemplate": {
    "owner": "Integration owner",
    "steps": [
      {
        "id": "inventory",
        "prompt": {
          "en": "Inventory every API path, event schema, package, runtime, framework, and deployed consumer.",
          "ar": "احصر كل مسار API ومخطط حدث وحزمة وبيئة تشغيل وإطار عمل ومستهلك منشور."
        }
      },
      {
        "id": "owners",
        "prompt": {
          "en": "Assign an accountable owner and support contact to each consumer and deadline.",
          "ar": "عيّن مالكاً مسؤولاً وجهة مساندة لكل مستهلك وموعد نهائي."
        }
      },
      {
        "id": "dual-run",
        "prompt": {
          "en": "Run old and replacement paths side by side with isolated credentials and compare safe outcomes.",
          "ar": "شغّل المسار القديم والبديل بالتوازي ببيانات اعتماد معزولة وقارن النتائج الآمنة."
        }
      },
      {
        "id": "rollback",
        "prompt": {
          "en": "Record the rollback trigger, exact version or route, authority, and maximum rollback time.",
          "ar": "سجّل محفز التراجع والنسخة أو المسار الدقيق والصلاحية وأقصى زمن للتراجع."
        }
      },
      {
        "id": "validate",
        "prompt": {
          "en": "Validate success, denial, expiry, replay, observability, and recovery before retiring the old path.",
          "ar": "تحقق من النجاح والرفض والانتهاء وإعادة التشغيل والمراقبة والاسترداد قبل إيقاف المسار القديم."
        }
      }
    ]
  },
  "policy": {
    "semver": "Published packages use SemVer. A breaking public package API requires a major version; additive API is minor; compatible fixes are patch releases.",
    "api": "Stable REST operations remain on /v1. A breaking contract requires a new major path; additive changes require compatibility and changelog review.",
    "events": "Events retain their type and schemaVersion. A breaking payload change requires a new schemaVersion and a dual-consumption migration window.",
    "deprecation": "A deprecation is not actionable until its announcement names a replacement, migration guide, support window, approved Sunset date, status, and support contact."
  }
}
```

## Authoritative machine sources

- https://docs.authle.ss/release-center.json
- https://docs.authle.ss/changes.json

Source attribution: Developer documentation (https://docs.authle.ss/changes).
