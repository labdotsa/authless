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
  "updatedAt": "2026-10-25",
  "compatibility": [
    {
      "component": "REST API",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-10-14-version-precondition-transport-fallback",
      "version": "0.1.0",
      "stability": "stable",
      "contract": "unversioned default (0.1.0)",
      "testedAt": "2026-10-14",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "tests/app-routes.test.ts",
        "tests/policy-draft-routes.test.ts",
        "tests/rest-api-reference.test.ts"
      ]
    },
    {
      "component": "@authless/browser",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-10-17-valid-session-actions",
      "version": "0.0.0",
      "stability": "source-only",
      "contract": "0.1.0",
      "browser": "Codex built-in browser",
      "testedAt": "2026-10-17",
      "evidence": [
        "packages/browser/package.json",
        "packages/browser/src/index.test.ts",
        "tests/oidc-core.test.ts",
        "tests/browser-capability-entrypoints.test.ts",
        "tests/relying-app-helpers.test.ts",
        "playwright.config.ts"
      ]
    },
    {
      "component": "@authless/server",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-10-14-version-precondition-transport-fallback",
      "version": "0.1.0",
      "stability": "source-only",
      "contract": "0.1.0",
      "runtime": "Node 24.x",
      "testedAt": "2026-10-14",
      "evidence": [
        "packages/server/package.json",
        "packages/server/src/index.ts",
        "packages/server/src/apps.ts",
        "packages/server/src/policies.ts",
        "packages/server/tests/server.node.mjs"
      ]
    },
    {
      "component": "@authless/cli",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-10-14-workspace-creation-terms-removal",
      "version": "0.1.0",
      "stability": "source-only",
      "contract": "0.1.0",
      "runtime": "Bun 1.3.10",
      "testedAt": "2026-10-14",
      "evidence": [
        "packages/cli/package.json",
        "packages/cli/src/cli.ts",
        "packages/cli/test/cli.test.ts"
      ]
    },
    {
      "component": "@authless/sveltekit",
      "deprecation": "current",
      "releaseNotes": "/changes#2026-10-14-workspace-creation-terms-removal",
      "version": "0.0.0",
      "stability": "source-only",
      "contract": "0.1.0",
      "runtime": "SvelteKit 2.70.2 / Node 24.x",
      "framework": "Svelte 5.56.8",
      "testedAt": "2026-10-14",
      "evidence": [
        "packages/sveltekit/package.json",
        "packages/sveltekit/src/index.test.ts",
        "docs/evidence/2026-10-16-sveltekit-jwt-claim-fixture.md",
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
      "id": "2026-10-25-authless-m12-passkey-sign-in",
      "publishedAt": "2026-10-25",
      "title": {
        "en": "Authless M-12 passkey sign-in policy",
        "ar": "سياسة تسجيل الدخول بمفتاح المرور M-12 في Authless"
      },
      "summary": {
        "en": "Authless now models passkeys as the M-12 sign-in method. A relying app can opt into a signed OAuth handoff while M-06 email-code sign-in remains available for email-only policies.",
        "ar": "تمثل Authless الآن مفاتيح المرور كطريقة تسجيل الدخول M-12. ويمكن للتطبيق المعتمد تفعيل تسليم OAuth موقع، بينما يظل تسجيل الدخول برمز البريد M-06 متاحاً للسياسات المعتمدة على البريد فقط."
      },
      "categories": [
        "api",
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference",
        "evaluator"
      ],
      "impact": "additive",
      "migration": {
        "en": "Private preview, source-only. Authless owns passkey credentials, ceremonies, and sign-in UX; relying apps select M-12 in their policy and handle the signed callback. Keep M-06 for email-code sign-in, and verify the local Node 24 and PostgreSQL proof before any hosted rollout.",
        "ar": "معاينة خاصة ومصدر فقط. تملك Authless بيانات اعتماد مفاتيح المرور وطقوسها وتجربة تسجيل الدخول؛ وتختار التطبيقات المعتمدة M-12 في سياستها وتعالج الاستدعاء الموقع. حافظ على M-06 لتسجيل الدخول برمز البريد، وتحقق من إثبات Node 24 وPostgreSQL المحلي قبل أي طرح مستضاف."
      },
      "announcement": {
        "en": "The checked policy contract, database migration, passkey verifier, OAuth interaction snapshot, Sign handoff, dashboard policy fields, and CLI or machine-readable projections agree on M-12. Local tests cover registration, authentication, origin and challenge binding, counter replay, signed OAuth handoff, and Arabic locale continuity. No hosted deployment or GA availability is claimed.",
        "ar": "يتوافق عقد السياسة والتحقق من ترحيل قاعدة البيانات ومدقق مفتاح المرور ولقطة تفاعل OAuth وتسليم Sign وحقول سياسة لوحة التحكم وإسقاطات CLI والوثائق المقروءة آلياً على M-12. تغطي الاختبارات المحلية التسجيل والمصادقة وربط الأصل والتحدي وإعادة استخدام العداد وتسليم OAuth الموقع واستمرارية اللغة العربية. لا يُدّعى وجود نشر مستضاف أو إتاحة عامة."
      },
      "replacement": null,
      "supportWindow": "Private preview pending hosted provider verification and release approval.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/core/src/policy/domain.ts",
        "packages/db/drizzle/0124_passkey_policy_method_up.sql",
        "packages/identity-node/src/passkey-verifier.ts",
        "packages/oidc/src/interactions.ts",
        "apps/sign/src/routes/+page.svelte",
        "apps/dash/src/lib/AuthenticationPolicyFields.svelte",
        "tests/passkey-verifier.test.ts",
        "tests/oidc-passkey.test.ts",
        "tests/integration/policy-active-use-postgres.integration.ts",
        "docs/plans/external-accounts-spec.md"
      ],
      "permalink": "/changes#2026-10-25-authless-m12-passkey-sign-in"
    },
    {
      "id": "2026-10-21-managed-media-pipeline",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Bounded managed media pipeline",
        "ar": "مسار الوسائط المُدارة المقيّدة"
      },
      "summary": {
        "en": "Authless processes bounded PNG, JPEG, and WebP uploads into owner-scoped WebP variants for private profile, workspace, and app assets.",
        "ar": "تعالج Authless عمليات رفع PNG وJPEG وWebP المقيّدة إلى نسخ WebP ضمن نطاق المالك لملفات التعريف ومساحات العمل وموارد التطبيقات الخاصة."
      },
      "categories": [
        "api",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Create a single-use media intent, upload a supported raster within the size limits, and use only the processed variants returned by the media contract.",
        "ar": "أنشئ نية وسائط أحادية الاستخدام، وارفع صورة نقطية مدعومة ضمن حدود الحجم، واستخدم النسخ المعالجة التي يعيدها عقد الوسائط فقط."
      },
      "announcement": {
        "en": "The processor strips metadata, applies orientation, and refuses unsupported, oversized, animated, malformed, expired, or revoked assets.",
        "ar": "يزيل المعالج البيانات الوصفية ويطبق الاتجاه ويرفض الموارد غير المدعومة أو الكبيرة أو المتحركة أو التالفة أو المنتهية أو الملغاة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/core/src/media/service.ts",
        "packages/db/src/media-store.ts",
        "apps/api/src/media-processor.ts",
        "tests/integration/media-postgres.integration.ts",
        "docs/plans/identity-slices/H-M01-qa.md"
      ],
      "permalink": "/changes#2026-10-21-managed-media-pipeline"
    },
    {
      "id": "2026-10-21-anonymous-guest-authority",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Bounded anonymous guest authority",
        "ar": "صلاحية الضيف المجهول المقيّدة"
      },
      "summary": {
        "en": "Guest authority uses a separate anonymous principal with bounded capabilities, app and environment audience checks, and finite session lifetimes.",
        "ar": "تستخدم صلاحية الضيف مبدأً مجهولاً منفصلاً مع إمكانات مقيّدة وفحوصات لجمهور التطبيق والبيئة وأعمار جلسات محدودة."
      },
      "categories": [
        "api",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Treat guest grants as app-scoped anonymous authority. Request only the permitted guest capabilities and never rely on person claims, refresh tokens, or offline access.",
        "ar": "تعامل مع منح الضيف باعتبارها صلاحية مجهولة ضمن نطاق التطبيق. اطلب إمكانات الضيف المسموحة فقط ولا تعتمد على مطالبات الشخص أو رموز التحديث أو الوصول دون اتصال."
      },
      "announcement": {
        "en": "Authority validation checks the active visitor, app guest, session, generation, audience, policy version, and bounded expiry before issuing anonymous claims.",
        "ar": "يتحقق فحص الصلاحية من الزائر والضيف والتطبيق والجلسة والجيل والجمهور ونسخة السياسة والانتهاء المقيّد قبل إصدار المطالبات المجهولة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/core/src/policy/guest-authority.ts",
        "packages/db/src/guest-authority-store.ts",
        "packages/oidc/src/claim-projection.ts",
        "tests/integration/guest-authority-qa.integration.ts",
        "docs/plans/identity-slices/H-G01-qa.md"
      ],
      "permalink": "/changes#2026-10-21-anonymous-guest-authority"
    },
    {
      "id": "2026-10-21-workspace-avatar",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Workspace avatar management",
        "ar": "إدارة الصورة الرمزية لمساحة العمل"
      },
      "summary": {
        "en": "Workspace owners and admins can attach processed avatars with versioned writes, while members receive private same-origin variants when they have current view access.",
        "ar": "يمكن لمالكي مساحات العمل ومديريها إرفاق صور رمزية معالجة بكتابات ذات إصدارات، بينما يتلقى الأعضاء نسخاً خاصة من الأصل نفسه عند امتلاكهم صلاحية العرض الحالية."
      },
      "categories": [
        "api",
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use the workspace avatar operations from the canonical contract. Send the expected workspace version for replacement or removal and render only the private processed variant returned for the current viewer.",
        "ar": "استخدم عمليات الصورة الرمزية لمساحة العمل من العقد الأساسي. أرسل إصدار مساحة العمل المتوقع عند الاستبدال أو الإزالة واعرض النسخة المعالجة الخاصة التي تعاد للمشاهد الحالي فقط."
      },
      "announcement": {
        "en": "Workspace list, switcher, shell, overview, API projections, and SDKs expose safe avatar metadata with initials or an icon fallback when media is unavailable.",
        "ar": "تعرض قائمة مساحات العمل ومبدّلها والغلاف والنظرة العامة وإسقاطات API وحزم SDK بيانات الصورة الرمزية الآمنة مع بديل الأحرف الأولى أو الأيقونة عند عدم توفر الوسائط."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/workspace-routes.ts",
        "packages/core/src/workspace/avatar-service.ts",
        "packages/db/src/workspace-store.ts",
        "packages/server/src/workspaces.ts",
        "tests/integration/workspace-avatar-postgres.integration.ts",
        "docs/plans/identity-slices/V-W01-qa.md"
      ],
      "permalink": "/changes#2026-10-21-workspace-avatar"
    },
    {
      "id": "2026-10-21-backend-custom-sign-in",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Backend custom sign-in client",
        "ar": "عميل تسجيل الدخول المخصص من الخادم"
      },
      "summary": {
        "en": "Server applications can run guest and email-code sign-in through a typed client that keeps backend credentials, OAuth tokens, PKCE material, and app sessions on the server.",
        "ar": "يمكن لتطبيقات الخادم تشغيل تسجيل دخول الضيف ورمز البريد عبر عميل موجه يحافظ على بيانات اعتماد الخادم ورموز OAuth ومواد PKCE وجلسات التطبيق على الخادم."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use the server custom-auth client for transaction start, challenge, verification, completion, cancellation, logout, and account switching. Keep the backend credential and token state server-side.",
        "ar": "استخدم عميل المصادقة المخصصة من الخادم لبدء المعاملة والتحدي والتحقق والإكمال والإلغاء وتسجيل الخروج وتبديل الحساب. حافظ على بيانات اعتماد الخادم وحالة الرموز على الخادم."
      },
      "announcement": {
        "en": "The runnable SvelteKit example keeps the browser on an app-owned session boundary and rejects origin, CSRF, state, binding, callback, and replay mismatches.",
        "ar": "يحافظ مثال SvelteKit القابل للتشغيل على المتصفح ضمن حدود جلسة يملكها التطبيق ويرفض حالات عدم تطابق الأصل وCSRF والحالة والربط والاستدعاء وإعادة الاستخدام."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/server/src/custom-authentication.ts",
        "apps/api/src/custom-authentication-management-routes.ts",
        "examples/sveltekit-custom-sign-in/src/lib/server/custom-auth.ts",
        "tests/integration/custom-authentication-postgres.integration.ts",
        "docs/plans/identity-slices/V-C01-runtime-qa.md"
      ],
      "permalink": "/changes#2026-10-21-backend-custom-sign-in"
    },
    {
      "id": "2026-10-21-browser-custom-sign-in",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Browser custom sign-in SDK",
        "ar": "حزمة تسجيل الدخول المخصص للمتصفح"
      },
      "summary": {
        "en": "Registered browser apps can start guest or email-code sign-in, validate the callback, exchange a PKCE code, use DPoP-bound tokens, and call UserInfo without exposing private transaction material.",
        "ar": "يمكن لتطبيقات المتصفح المسجلة بدء تسجيل دخول الضيف أو رمز البريد والتحقق من الاستدعاء وتبادل رمز PKCE واستخدام رموز مرتبطة بـ DPoP واستدعاء UserInfo دون كشف مواد المعاملة الخاصة."
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
        "en": "Install the browser package and provide the registered HTTPS origin, redirect, client, app, environment, and endpoint metadata. Keep guest refresh disabled and handle logout or account-switch uncertainty as a recoverable state.",
        "ar": "ثبّت حزمة المتصفح وقدم بيانات الأصل HTTPS وعنوان إعادة التوجيه والعميل والتطبيق والبيئة ونقاط النهاية المسجلة. أبقِ تحديث الضيف معطلاً وتعامل مع عدم اليقين عند تسجيل الخروج أو تبديل الحساب كحالة قابلة للاسترداد."
      },
      "announcement": {
        "en": "The public example provides a custom sign-in popup flow for guest and email-code methods with origin binding, one-use continuation, callback validation, and safe recovery states.",
        "ar": "يوفر المثال العام مسار نافذة منبثقة لتسجيل الدخول المخصص بطريقتي الضيف ورمز البريد مع ربط الأصل والاستمرار أحادي الاستخدام والتحقق من الاستدعاء وحالات استرداد آمنة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/browser/src/custom-auth.ts",
        "packages/browser/package.json",
        "examples/custom-browser-sign-in/src/sign-in.ts",
        "tests/integration/public-custom-browser.integration.ts",
        "docs/plans/identity-slices/V-C02-runtime-qa.md"
      ],
      "permalink": "/changes#2026-10-21-browser-custom-sign-in"
    },
    {
      "id": "2026-10-20-app-icon-delivery",
      "publishedAt": "2026-10-20",
      "title": {
        "en": "App icon delivery and captured sign-in branding",
        "ar": "تسليم أيقونة التطبيق والعلامة الملتقطة لتسجيل الدخول"
      },
      "summary": {
        "en": "Apps can publish bounded WebP icons for dashboard and hosted sign-in surfaces. Public delivery accepts only the current published binding or an exact live transaction snapshot.",
        "ar": "يمكن للتطبيقات نشر أيقونات WebP محدودة لواجهات لوحة التحكم وتسجيل الدخول المستضاف. لا يقبل التسليم العام إلا الربط المنشور الحالي أو لقطة المعاملة الحية المطابقة."
      },
      "categories": [
        "api",
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use GET /media/public/app-icons/{appId}/{assetId}/{size}. Treat 404 as unavailable or unpublished, pass transaction only for the exact live sign-in request, and keep clients prepared for a bounded 60-second public cache.",
        "ar": "استخدم GET /media/public/app-icons/{appId}/{assetId}/{size}. تعامل مع 404 باعتباره غير متاح أو غير منشور، وأرسل transaction فقط لطلب تسجيل الدخول الحي المطابق، وجهز العملاء لذاكرة تخزين عامة محدودة بستين ثانية."
      },
      "announcement": {
        "en": "Dashboard and Sign render the same published or transaction-captured app icon through same-origin, no-cookie, MIME-sniffing-protected delivery.",
        "ar": "تعرض لوحة التحكم وSign أيقونة التطبيق المنشورة أو الملتقطة للمعاملة نفسها عبر تسليم من الأصل نفسه وبدون ملفات تعريف ارتباط ومع حماية من تخمين نوع MIME."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/app-routes.ts",
        "apps/sign/src/routes/media/public/app-icons/[appId]/[assetId]/[size]/+server.ts",
        "packages/core/src/app/branding-service.ts",
        "packages/db/src/app-branding-store.ts",
        "tests/integration/app-branding-postgres.integration.ts"
      ],
      "permalink": "/changes#2026-10-20-app-icon-delivery"
    },
    {
      "id": "2026-10-20-personal-profile-and-picture-claims",
      "publishedAt": "2026-10-20",
      "title": {
        "en": "Personal profile and consented picture claims",
        "ar": "الملف الشخصي ومطالبات الصورة بموافقة المستخدم"
      },
      "summary": {
        "en": "People can manage their display name and avatar. Registered apps can request consented name and picture claims; picture delivery uses a short-lived opaque capability bound to the current grant and avatar.",
        "ar": "يمكن للأشخاص إدارة اسم العرض والصورة الرمزية. ويمكن للتطبيقات المسجلة طلب مطالبات الاسم والصورة بموافقة المستخدم، مع تسليم الصورة عبر قدرة مبهمة قصيرة العمر مرتبطة بالمنحة والصورة الحالية."
      },
      "categories": [
        "api",
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Add the six personal profile operations from the canonical OpenAPI contract. Request name and picture only after profile consent; treat picture URLs as short-lived private capabilities and do not persist or share them.",
        "ar": "أضف عمليات الملف الشخصي الست من عقد OpenAPI canonical. اطلب الاسم والصورة بعد موافقة الملف الشخصي فقط، وتعامل مع روابط الصورة كقدرات خاصة قصيرة العمر ولا تخزنها أو تشاركها."
      },
      "announcement": {
        "en": "The dashboard shows the current personal name and avatar, while UserInfo emits only consented profile claims and a current-avatar picture capability.",
        "ar": "تعرض لوحة التحكم الاسم والصورة الحاليين، بينما تصدر UserInfo مطالبات الملف الشخصي التي وافق عليها المستخدم فقط وقدرة صورة مرتبطة بالصورة الحالية."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/personal-routes.ts",
        "apps/sign/src/oidc/claims.ts",
        "packages/oidc/src/interactions.ts",
        "packages/core/src/identity/personal-profile-service.ts",
        "packages/db/src/identity/personal-profile-store.ts",
        "tests/integration/personal-picture-oidc.integration.ts",
        "tests/integration/personal-profile-postgres.integration.ts",
        "tests/oidc-core.test.ts",
        "apps/docs/src/lib/release-catalogue.ts"
      ],
      "permalink": "/changes#2026-10-20-personal-profile-and-picture-claims"
    },
    {
      "id": "2026-10-20-custom-authentication-transactions",
      "publishedAt": "2026-10-20",
      "title": {
        "en": "Bound custom sign-in transactions",
        "ar": "معاملات تسجيل الدخول المخصص المقيدة"
      },
      "summary": {
        "en": "Explicitly registered clients can create guest and email-code transactions bound to their app, environment, origin, redirect, policy, and browser proof. Completion issues no personal platform session.",
        "ar": "يمكن للعملاء المسجلين صراحة إنشاء معاملات للضيف ورمز البريد مرتبطة بالتطبيق والبيئة والأصل وإعادة التوجيه والسياسة وإثبات المتصفح. لا ينشئ الإكمال جلسة شخصية على المنصة."
      },
      "categories": [
        "api",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Keep custom authentication disabled until the client has an explicit mode, method allowlist, origin, and redirect registration. Use the six custom transaction operations and preserve their exact state, nonce, PKCE, and browser bindings.",
        "ar": "أبقِ المصادقة المخصصة معطلة حتى يُسجل للعميل وضع صريح وقائمة بالطرق المسموحة وأصل وعنوان لإعادة التوجيه. استخدم عمليات المعاملات المخصصة الست وحافظ على الارتباط الدقيق للحالة والرمز العشوائي وPKCE والمتصفح."
      },
      "announcement": {
        "en": "The shared protocol checks current authority, one-use proof, consent, and code exchange. App-owned forms and session custody are configured by their separate integrations.",
        "ar": "يفحص البروتوكول المشترك الصلاحية الحالية والإثبات أحادي الاستخدام والموافقة وتبادل الرمز. تُهيأ النماذج التي يملكها التطبيق وحفظ الجلسات من خلال تكاملاتها المنفصلة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/custom-authentication-routes.ts",
        "packages/core/src/identity/custom-authentication.ts",
        "packages/db/src/custom-authentication-store.ts",
        "packages/oidc/src/authorization-code-binder.ts",
        "tests/integration/custom-oidc-handoff.integration.ts",
        "docs/reference/custom-authentication.md"
      ],
      "permalink": "/changes#2026-10-20-custom-authentication-transactions"
    },
    {
      "id": "2026-10-20-hosted-guest-admission",
      "publishedAt": "2026-10-20",
      "title": {
        "en": "Explicit hosted guest admission",
        "ar": "دخول الزوار الصريح عبر صفحة تسجيل الدخول"
      },
      "summary": {
        "en": "An environment can explicitly enable bounded guest access and show Continue as guest on hosted sign-in. Guest sessions remain separate from registered personal sign-in.",
        "ar": "يمكن للبيئة تفعيل دخول الزوار المحدود صراحة وإظهار المتابعة كضيف في صفحة تسجيل الدخول. تبقى جلسات الزوار منفصلة عن تسجيل الدخول الشخصي المسجل."
      },
      "categories": [
        "api",
        "product",
        "sdk",
        "security"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Guest admission is disabled by default. Configure each environment's admission policy and limits before enabling it. Validate current guest authority and enforce the app's permitted guest capabilities.",
        "ar": "دخول الزوار معطل افتراضيًا. اضبط سياسة الدخول وحدوده لكل بيئة قبل تفعيله. تحقق من صلاحية الضيف الحالية وطبّق إمكانات الضيف المسموحة داخل التطبيق."
      },
      "announcement": {
        "en": "Guest authorization uses PKCE, DPoP, bounded token and session lifetimes, and current policy checks. It does not create a personal platform session or issue a refresh token.",
        "ar": "يستخدم تفويض الزائر PKCE وDPoP وأعمارًا محدودة للرموز والجلسات وفحص السياسة الحالية. ولا ينشئ جلسة شخصية على المنصة أو يصدر رمز تحديث."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/guest-admission-routes.ts",
        "packages/core/src/policy/guest-admission.ts",
        "packages/db/src/guest-admission-store.ts",
        "packages/server/src/guest-admission.ts",
        "tests/hosted-guest-admission.node.test.mjs",
        "docs/plans/identity-slices/V-A01-qa.md"
      ],
      "permalink": "/changes#2026-10-20-hosted-guest-admission"
    },
    {
      "id": "2026-10-21-returning-guest-continuity",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Returning-browser guest continuity",
        "ar": "استمرارية ضيف المتصفح العائد"
      },
      "summary": {
        "en": "Authless can retain a bounded browser guest relationship, reuse the app-scoped guest across tabs and visits, and require explicit consent before network continuity joins another app.",
        "ar": "يمكن لـ Authless الاحتفاظ بعلاقة ضيف محدودة للمتصفح وإعادة استخدام ضيف التطبيق عبر علامات التبويب والزيارات، مع طلب موافقة صريحة قبل انضمام تطبيق آخر إلى الاستمرارية الشبكية."
      },
      "categories": [
        "api",
        "product",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use the browser continuity helper with an Authless issuer and registered guest transaction. Keep isolated app-only mode as the default, treat network mode as an explicit user choice, and never persist or expose the visitor secret or visitor ID.",
        "ar": "استخدم مساعد استمرارية المتصفح مع مُصدر Authless ومعاملة ضيف مسجلة. أبقِ وضع التطبيق المعزول هو الافتراضي، وتعامل مع الوضع الشبكي كموافقة صريحة من المستخدم، ولا تخزن سر الزائر أو معرفه ولا تعرضهما."
      },
      "announcement": {
        "en": "The host-only visitor cookie is rotated and revocable. App guests keep pairwise subjects, one-use browser handoffs bind origin and proof, and retention cleanup removes expired guest state without exposing cross-app activity.",
        "ar": "يُدار ملف تعريف الزائر الخاص بالمضيف بالتدوير والإلغاء. يحتفظ ضيوف التطبيقات بمعرفات مقترنة، وترتبط عمليات التسليم أحادية الاستخدام بالأصل وإثبات المتصفح، وينظف الاحتفاظ حالة الضيوف المنتهية دون كشف نشاط بين التطبيقات."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/browser/src/guest-continuity.ts",
        "packages/core/src/policy/guest-continuity.ts",
        "packages/db/src/guest-continuity-store.ts",
        "apps/sign/src/oidc-runtime.ts",
        "packages/oidc/src/guest-continuity-renderer.ts",
        "docs/plans/identity-slices/V-A03-qa.md"
      ],
      "permalink": "/changes#2026-10-21-returning-guest-continuity"
    },
    {
      "id": "2026-10-21-app-local-profiles",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "App-local profiles for people and guests",
        "ar": "الملفات الشخصية المحلية للتطبيق للأشخاص والزوار"
      },
      "summary": {
        "en": "Apps can maintain a scoped display name and avatar for a registered person or returning guest without changing the platform profile. Profile writes, avatar uploads, publishing, removal, and effective reads are authorized by the current app grant and policy.",
        "ar": "يمكن للتطبيقات إدارة اسم عرض وصورة رمزية ضمن نطاق التطبيق للشخص المسجل أو الزائر العائد دون تغيير الملف الشخصي للمنصة. وتخضع عمليات الكتابة ورفع الصورة ونشرها وإزالتها والقراءة الفعالة لمنحة التطبيق والسياسة الحالية."
      },
      "categories": [
        "api",
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use the app-profile operations from the canonical OpenAPI contract. Keep profile consent and current grant checks in place for personal fallback, treat avatar URLs as short-lived opaque capabilities, and use If-Match plus idempotency keys for writes.",
        "ar": "استخدم عمليات الملف المحلي للتطبيق من عقد OpenAPI الأساسي. حافظ على فحوصات موافقة الملف والمنحة الحالية عند استخدام بيانات الشخص الاحتياطية، وتعامل مع روابط الصور كقدرات مبهمة قصيرة العمر، واستخدم If-Match ومفاتيح منع التكرار للكتابات."
      },
      "announcement": {
        "en": "The dashboard and hosted sign-in can show the effective app profile for a person or guest. Reset tombstones, stale-version conflicts, media publication, and retention cleanup keep app data isolated and reversible.",
        "ar": "يمكن للوحة التحكم وتسجيل الدخول المستضاف عرض الملف المحلي الفعال للتطبيق للشخص أو الزائر. وتحافظ علامات إعادة الضبط وتعارض الإصدارات القديمة ونشر الوسائط وتنظيف الاحتفاظ على عزل بيانات التطبيق وقابليتها للعكس."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/app-profile-routes.ts",
        "packages/core/src/identity/app-profile-service.ts",
        "packages/db/src/app-profile-store.ts",
        "packages/db/src/app-profile-authority.ts",
        "apps/sign/src/oidc/claims.ts",
        "tests/integration/app-profile-delivery-postgres.integration.ts",
        "tests/integration/app-profile-lifecycle-postgres.integration.ts",
        "tests/integration/app-profile-oidc.integration.ts",
        "docs/plans/identity-slices/V-P02.md",
        "docs/plans/identity-slices/V-P02-qa.md"
      ],
      "permalink": "/changes#2026-10-21-app-local-profiles"
    },
    {
      "id": "2026-10-21-explicit-guest-conversion",
      "publishedAt": "2026-10-21",
      "title": {
        "en": "Explicit hosted guest conversion",
        "ar": "التحويل الصريح للضيف عبر الاستضافة"
      },
      "summary": {
        "en": "A guest can start a one-use hosted conversion, complete fresh email verification, and explicitly confirm conversion into a person account.",
        "ar": "يمكن للضيف بدء تحويل مستضاف أحادي الاستخدام وإكمال التحقق الجديد عبر البريد ثم تأكيد التحويل صراحة إلى حساب شخصي."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Use the three guest-conversion operations from the canonical REST contract. Send the guest Bearer token with its DPoP proof, origin, CSRF token, and browser binding when beginning an intent. Confirm only with convert_guest and an optional keep_person or keep_guest choice after hosted sign-in.",
        "ar": "استخدم عمليات تحويل الضيف الثلاث من عقد REST الأساسي. أرسل رمز Bearer للضيف مع إثبات DPoP والأصل ورمز CSRF وربط المتصفح عند بدء النية. أكد باستخدام convert_guest فقط مع اختيار اختياري keep_person أو keep_guest بعد تسجيل الدخول المستضاف."
      },
      "announcement": {
        "en": "The server derives guest and person identifiers from the bound, one-use intent. Exact idempotent replays return 200; a changed replay returns 409. Revoked or expired guest authority cannot convert.",
        "ar": "يشتق الخادم معرفات الضيف والشخص من النية المقيدة أحادية الاستخدام. تعيد إعادة المحاولة المطابقة تمامًا 200، بينما تعيد إعادة المحاولة المختلفة 409. لا يمكن لصلاحية ضيف ملغاة أو منتهية تنفيذ التحويل."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "apps/api/src/guest-conversion-routes.ts",
        "packages/server/src/guest-conversion.ts",
        "apps/sign/src/routes/guest-conversion/[intent]/confirm/+page.server.ts",
        "packages/db/src/guest-conversion-intent-store.ts",
        "tests/integration/guest-conversion-postgres.integration.ts",
        "docs/plans/identity-slices/V-A02.md"
      ],
      "permalink": "/changes#2026-10-21-explicit-guest-conversion"
    },
    {
      "id": "2026-10-17-valid-session-actions",
      "publishedAt": "2026-10-17",
      "title": {
        "en": "Valid sessions authorize permitted actions",
        "ar": "الجلسات الصالحة تتيح الإجراءات المسموح بها"
      },
      "summary": {
        "en": "A valid session can perform actions allowed by its role and scopes. Actions no longer require an additional sign-in based on authentication age.",
        "ar": "تتيح الجلسة الصالحة تنفيذ الإجراءات التي يسمح بها دور المستخدم ونطاقات صلاحياته. لم تعد الإجراءات تتطلب تسجيل دخول إضافيًا بسبب وقت التحقق السابق."
      },
      "categories": [
        "product",
        "api",
        "sdk",
        "security"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "breaking",
      "migration": {
        "en": "Remove creationReadiness, sensitiveMutationReadiness, sensitiveActionSeconds, and reauthentication failure handling from clients. Keep normal unauthorized and permission-denied handling. Existing sessions retain their expiry, revocation, and permission checks.",
        "ar": "أزل creationReadiness وsensitiveMutationReadiness وsensitiveActionSeconds ومعالجة أخطاء إعادة التحقق من العملاء. احتفظ بمعالجة عدم تسجيل الدخول ورفض الصلاحيات المعتادة. تبقى فحوصات انتهاء الجلسات وإلغائها وصلاحياتها سارية."
      },
      "announcement": {
        "en": "Workspace, account, policy, billing, and credential actions use the current valid session and granted permissions.",
        "ar": "تعتمد إجراءات مساحات العمل والحساب والسياسات والفوترة والمفاتيح على الجلسة الصالحة الحالية والصلاحيات الممنوحة."
      },
      "replacement": "/reference/rest",
      "supportWindow": "Existing valid sessions continue until expiry or revocation.",
      "sunsetAt": "2026-10-17",
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/browser/package.json",
        "packages/browser/src/index.test.ts",
        "tests/integration/identity-postgres.integration.ts",
        "tests/integration/workspace-credentials-postgres.integration.ts",
        "tests/integration/policy-postgres.integration.ts"
      ],
      "permalink": "/changes#2026-10-17-valid-session-actions"
    },
    {
      "id": "2026-10-16-explicit-production-activation",
      "publishedAt": "2026-10-16",
      "title": {
        "en": "Explicit production activation for workspace automation",
        "ar": "تفعيل الإنتاج الصريح لأتمتة مساحة العمل"
      },
      "summary": {
        "en": "A workspace key with the separately granted app:activate scope can activate a configured production draft. Activation requires confirmation, the current environment version, an active policy, a usable HTTPS redirect, and a valid OIDC profile. Production app allowance and commercial suspension rules apply.",
        "ar": "يمكن لمفتاح مساحة العمل الذي مُنح نطاق app:activate بشكل مستقل تفعيل مسودة إنتاج مهيأة. يتطلب التفعيل التأكيد وإصدار البيئة الحالي وسياسة نشطة وعنوان إعادة توجيه HTTPS صالحًا وملف OIDC صالحًا. تسري حدود تطبيقات الإنتاج وقواعد التعليق التجاري."
      },
      "categories": [
        "api",
        "sdk",
        "product",
        "security"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Issue a new principal and key with the complete provisioning grant and explicitly enable production activation. Rotation preserves existing grants. Send action activate with confirmed true, expectedVersion, and matching If-Match. Reconcile uncertain delivery with an environment read.",
        "ar": "أنشئ كيان خدمة ومفتاحًا جديدين بصلاحيات التهيئة الكاملة وفعّل صلاحية تفعيل الإنتاج صراحة. يحافظ التدوير على الصلاحيات الحالية. أرسل action بقيمة activate مع confirmed بقيمة true وexpectedVersion وترويسة If-Match المطابقة. تحقّق من النتيجة غير المؤكدة بقراءة البيئة."
      },
      "announcement": {
        "en": "Human activation and resume remain separate operations. A valid authenticated session can perform each operation when its permissions, confirmation, and current-version checks pass. Service keys can activate permitted production drafts and cannot resume suspended environments.",
        "ar": "يبقى تفعيل الإنسان واستئناف البيئة عمليتين منفصلتين. يمكن للجلسة الموثقة الصالحة تنفيذ كل عملية عند اجتياز الصلاحيات والتأكيد وفحوصات الإصدار الحالي. يمكن لمفاتيح الخدمة تفعيل مسودات الإنتاج المسموح بها ولا يمكنها استئناف البيئات المعلّقة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/core/src/app/environment-service.ts",
        "packages/db/src/app-store.ts",
        "tests/app-service.test.ts",
        "tests/integration/machine-app-postgres.integration.ts",
        "tests/server-app-family.test.ts"
      ],
      "permalink": "/changes#2026-10-16-explicit-production-activation"
    },
    {
      "id": "2026-10-16-workspace-capability-diagnostics",
      "publishedAt": "2026-10-16",
      "title": {
        "en": "Inspect effective workspace-key capabilities",
        "ar": "فحص الصلاحيات الفعلية لمفتاح مساحة العمل"
      },
      "summary": {
        "en": "Workspace keys can inspect their own effective scopes and app and environment restrictions without credential:write. Authentication intersects the principal and credential grants and denies disjoint restrictions.",
        "ar": "يمكن لمفاتيح مساحة العمل فحص نطاقاتها الفعلية وقيود التطبيقات والبيئات دون credential:write. تستخدم المصادقة تقاطع صلاحيات كيان الخدمة والمفتاح وترفض القيود التي لا تتقاطع."
      },
      "categories": [
        "api",
        "sdk",
        "security"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Read GET /workspaces/{workspaceId}/capabilities when connecting a provisioning key. Treat invalid authentication, insufficient_scope, concealed inaccessible targets, readiness errors, and version conflicts separately. The response contains no credential secret.",
        "ar": "اقرأ GET /workspaces/{workspaceId}/capabilities عند ربط مفتاح التهيئة. تعامل مع المصادقة غير الصالحة وinsufficient_scope والأهداف غير المتاحة وأخطاء الجاهزية وتعارض الإصدارات بشكل منفصل. لا تتضمن الاستجابة سر المفتاح."
      },
      "announcement": {
        "en": "Capability inspection requires a valid key for the requested workspace and reports only that caller's authority. Provisioning grants now include endpoint:write and oidc-profile:write.",
        "ar": "يتطلب فحص الصلاحيات مفتاحًا صالحًا لمساحة العمل المطلوبة ويعرض صلاحيات المتصل فقط. تتضمن صلاحيات التهيئة الآن endpoint:write وoidc-profile:write."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/api/src/capability-routes.ts",
        "packages/db/src/workspace-service-credential-store.ts",
        "tests/integration/workspace-credentials-postgres.integration.ts",
        "tests/server-workspace-family.test.ts"
      ],
      "permalink": "/changes#2026-10-16-workspace-capability-diagnostics"
    },
    {
      "id": "2026-10-16-production-lifecycle-retained-sessions",
      "publishedAt": "2026-10-16",
      "title": {
        "en": "Production lifecycle guards and retained OIDC sessions",
        "ar": "ضوابط دورة حياة الإنتاج وجلسات OIDC المحتفظ بها"
      },
      "summary": {
        "en": "Production environments expose separate activate, resume, suspend, and retire commands with explicit confirmation and version checks. Retained Authless sessions can complete a new OIDC consent transaction, while persisted transaction and grant-expiry boundaries remain authoritative.",
        "ar": "تعرض بيئات الإنتاج أوامر منفصلة للتفعيل والاستئناف والتعليق والتقاعد مع تأكيد صريح وفحوص للإصدار. يمكن لجلسات Authless المحتفظ بها إكمال معاملة موافقة OIDC جديدة، بينما تظل حدود انتهاء صلاحية المعاملة والمنحة المحفوظة هي المرجع المعتمد."
      },
      "categories": [
        "api",
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "additive",
      "migration": {
        "en": "Send activate and resume as separate lifecycle actions with confirmed true, expectedVersion, and a matching If-Match value. Keep retained-session clients on the existing consent flow and treat persisted transaction or grant expiry as authoritative. Verify the returned state after an uncertain lifecycle response.",
        "ar": "أرسل التفعيل والاستئناف كإجرائي دورة حياة منفصلين مع confirmed بقيمة true وexpectedVersion وقيمة If-Match مطابقة. أبقِ عملاء الجلسات المحتفظ بها على مسار الموافقة الحالي وتعامل مع انتهاء صلاحية المعاملة أو المنحة المحفوظة باعتباره المرجع المعتمد. تحقّق من الحالة المعادة بعد استجابة غير مؤكدة لدورة الحياة."
      },
      "announcement": {
        "en": "Operators can activate a ready production draft and resume suspended authorization with version-bound confirmation. Relying parties can continue through consent using a retained Authless session, with each transaction and grant subject to its persisted expiry.",
        "ar": "يمكن للمشغلين تفعيل مسودة إنتاج جاهزة واستئناف التفويض المعلق مع تأكيد مرتبط بالإصدار. ويمكن للأطراف المعتمدة متابعة الموافقة باستخدام جلسة Authless محتفظ بها، مع خضوع كل معاملة ومنحة لتاريخ انتهاء صلاحيتها المحفوظ."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/server/src/generated.ts",
        "apps/dash/src/routes/workspaces/[workspace]/apps/[app]/[environment]/endpoints/+page.svelte",
        "tests/environment-lifecycle-contract.test.ts",
        "tests/integration/oidc-postgres.integration.ts",
        "tests/oidc-core.test.ts",
        "docs/evidence/auth05-qa-retest.md",
        "docs/evidence/auth06-provider-qa.md"
      ],
      "permalink": "/changes#2026-10-16-production-lifecycle-retained-sessions"
    },
    {
      "id": "2026-10-14-workspace-auth-experience-audit",
      "publishedAt": "2026-10-14",
      "title": {
        "en": "Workspace authentication experience audit",
        "ar": "تدقيق تجربة مصادقة مساحة العمل"
      },
      "summary": {
        "en": "The source audit records workspace key, app, environment, policy, access, audit, profile, session, and error-flow findings. It standardizes reuse of the existing shell, fields, resource rows, status, dialog, secret, and async-state components. Workspace keys default to manual revocation with optional temporary expiry in the candidate source.",
        "ar": "يسجل تدقيق المصدر نتائج مسارات مفاتيح مساحة العمل والتطبيق والبيئة والسياسة والوصول والتدقيق والملف الشخصي والجلسة والخطأ. ويوحد إعادة استخدام مكونات الغلاف والحقول وصفوف الموارد والحالة والحوار والسر والعمليات غير المتزامنة الموجودة. تعتمد مفاتيح مساحة العمل على الإلغاء اليدوي مع مدة مؤقتة اختيارية في المصدر المرشح."
      },
      "categories": [
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "operator",
        "reference",
        "evaluator"
      ],
      "impact": "additive",
      "migration": {
        "en": "Source-only audit. Add Workspace keys to canonical workspace navigation, use shared field and resource-state components, and verify nullable key expiry and next-request or refresh policy enforcement before deployment.",
        "ar": "تدقيق مصدري فقط. أضف مفاتيح مساحة العمل إلى تنقل مساحة العمل المعياري، واستخدم مكونات الحقول وحالات الموارد المشتركة، وتحقق من مدة صلاحية المفتاح القابلة للقيمة الفارغة ومن فرض السياسة عند الطلب التالي أو تحديث الرمز قبل النشر."
      },
      "announcement": {
        "en": "The audit separates supplied screenshots, current Zen production observations, candidate source, and browser-pending states. It makes no hosted deployment or full accessibility claim.",
        "ar": "يفصل التدقيق بين لقطات الشاشة المقدمة وملاحظات Zen الحالية في الإنتاج والمصدر المرشح والحالات المعلقة في المتصفح. ولا يقدم ادعاءً عن نشر مستضاف أو امتثال كامل لإمكانية الوصول."
      },
      "replacement": null,
      "supportWindow": "Source-only audit pending release and live verification.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "docs/audits/2026-10-14-workspace-auth-experience.md",
        "apps/dash/src/routes/workspaces/[workspace]/credentials/+page.svelte",
        "apps/dash/src/routes/workspaces/[workspace]/+page.svelte",
        "packages/ui/src/dash-navigation.ts",
        "packages/ui/src/components/Field.svelte",
        "packages/ui/src/components/ResourceRow.svelte",
        "packages/ui/src/components/StatePanel.svelte",
        "packages/ui/src/components/TaskDialog.svelte",
        "packages/ui/src/tokens.ts"
      ],
      "permalink": "/changes#2026-10-14-workspace-auth-experience-audit"
    },
    {
      "id": "2026-10-14-credential-confirmation-ux",
      "publishedAt": "2026-10-14",
      "title": {
        "en": "Credential creation removes duplicate confirmation gates",
        "ar": "إزالة بوابات التأكيد المكررة من إنشاء بيانات الاعتماد"
      },
      "summary": {
        "en": "The candidate credential flow removes duplicate prechecks before one-time secret disclosure while retaining the API authorization, one-time secret, and storage acknowledgement semantics.",
        "ar": "يزيل مسار بيانات الاعتماد المرشح التأكيدات المسبقة المكررة قبل عرض السر لمرة واحدة مع الحفاظ على صلاحيات API وسر المرة الواحدة وإقرار التخزين."
      },
      "categories": [
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "operator",
        "reference",
        "evaluator"
      ],
      "impact": "additive",
      "migration": {
        "en": "Source-only UX change. Review credential scope before creation and keep one-time secret storage acknowledgement. No hosted deployment is claimed.",
        "ar": "تغيير تجربة مستخدم في المصدر فقط. راجع نطاق بيانات الاعتماد قبل الإنشاء وحافظ على إقرار تخزين السر لمرة واحدة. لا يُدّعى وجود نشر مستضاف."
      },
      "announcement": {
        "en": "Source pages and UI tests cover the streamlined creation confirmation and preserved secret acknowledgement. Release verification remains pending.",
        "ar": "تغطي صفحات المصدر واختبارات واجهة المستخدم تأكيد الإنشاء المبسط وإقرار تخزين السر المحفوظ. ولا يزال تحقق الإصدار معلقاً."
      },
      "replacement": null,
      "supportWindow": "Source-only UX change pending release verification.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/dash/src/routes/workspaces/[workspace]/credentials/+page.svelte",
        "tests/ui/workspace-credentials.ui.ts",
        "apps/api/src/workspace-credential-routes.ts"
      ],
      "permalink": "/changes#2026-10-14-credential-confirmation-ux"
    },
    {
      "id": "2026-10-14-auth-experience-followups",
      "publishedAt": "2026-10-14",
      "title": {
        "en": "Workspace auth experience follow-ups",
        "ar": "متابعات تجربة مصادقة مساحة العمل"
      },
      "summary": {
        "en": "Records candidate-only responsive form, dashboard bridge, and bodyless OIDC preflight fixes while deployed b3d6 remains the current receipt.",
        "ar": "يسجل إصلاحات مرشحة فقط لتخطيط النموذج وجسر لوحة التحكم وفحص OIDC التمهيدي بلا جسم، بينما يظل b3d6 المنشور هو الإيصال الحالي."
      },
      "categories": [
        "product",
        "security",
        "docs"
      ],
      "audiences": [
        "operator",
        "reference",
        "evaluator"
      ],
      "impact": "additive",
      "migration": {
        "en": "No migration. Verify the candidate at 320px, 768px, and 1280px in English and Arabic, then rerun hosted OIDC policy-migration checks before release.",
        "ar": "لا يلزم ترحيل. تحقق من المرشح عند 320 و768 و1280 بكسل بالإنجليزية والعربية، ثم أعد فحوص ترحيل سياسة OIDC المستضافة قبل الإصدار."
      },
      "announcement": {
        "en": "Candidate source only; deployed b3d6 does not include these follow-ups.",
        "ar": "المصدر المرشح فقط؛ لا يتضمن b3d6 المنشور هذه المتابعات."
      },
      "replacement": null,
      "supportWindow": "Candidate follow-up pending canonical release receipt.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "docs/audits/2026-10-14-workspace-auth-experience.md",
        "apps/dash/src/lib/AuthenticationPolicyFields.svelte",
        "apps/dash/src/lib/PolicyEditor.svelte"
      ],
      "permalink": "/changes#2026-10-14-auth-experience-followups"
    },
    {
      "id": "2026-10-14-auth-proof-reuse-and-relay",
      "publishedAt": "2026-10-14",
      "title": {
        "en": "Workspace auth proof reuse and relay repairs",
        "ar": "إصلاحات إعادة استخدام إثبات المصادقة وترحيل وظائف مساحة العمل"
      },
      "summary": {
        "en": "Adds candidate workspace parent/child navigation, eligible-session proof reuse, expired-proof restart, authorize resume routing, and a 12-job auth relay from the shared registry.",
        "ar": "يضيف المرشح تنقل مساحة العمل الأب والفرع وإعادة استخدام إثبات الجلسة المؤهلة وإعادة تشغيل الإثبات المنتهي وتوجيه استئناف التفويض وترحيل مصادقة من 12 وظيفة من السجل المشترك."
      },
      "categories": [
        "product",
        "security",
        "operations"
      ],
      "audiences": [
        "operator",
        "integrator",
        "evaluator"
      ],
      "impact": "security",
      "migration": {
        "en": "No DDL migration. Reuse the original proof within its allowed time, honor explicit prompt and max_age, restart expired proof, and verify authorize resume before deployment.",
        "ar": "لا يوجد ترحيل DDL. أعد استخدام الإثبات الأصلي ضمن مدته المسموحة، واحترم prompt وmax_age الصريحين، وأعد تشغيل الإثبات المنتهي، وتحقق من استئناف التفويض قبل النشر."
      },
      "announcement": {
        "en": "Candidate source only; these follow-ups await a new 23-gate receipt. Bee391 already covers non-expiring keys, full-width forms, and OAuth 204 transport.",
        "ar": "المصدر المرشح فقط؛ تنتظر هذه المتابعات إيصالاً جديداً من 23 فحصاً. يغطي bee391 بالفعل المفاتيح بلا انتهاء والنماذج بعرض كامل ونقل OAuth 204."
      },
      "replacement": null,
      "supportWindow": "Candidate auth repairs pending release receipt and resume verification.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/core/src/identity/transaction-authentication-service.ts",
        "packages/db/src/identity/transaction-authentication-store.ts",
        "apps/sign/src/oidc/interaction-adapters.ts",
        "apps/sign/netlify/functions/oidc.ts",
        "packages/config/src/scheduled-job-registry.ts",
        "apps/api/src/scheduled-job-runner.ts",
        "tests/website-scheduled-relay.test.ts"
      ],
      "permalink": "/changes#2026-10-14-auth-proof-reuse-and-relay"
    },
    {
      "id": "2026-10-14-workspace-creation-terms-removal",
      "publishedAt": "2026-10-14",
      "title": {
        "en": "Workspace creation removes duplicate terms acceptance",
        "ar": "إزالة قبول الشروط المكرر من إنشاء مساحة العمل"
      },
      "summary": {
        "en": "Workspace creation now relies on the valid authenticated session instead of a second terms checkbox. Legacy input remains optional for compatibility, and historical timestamps stay nullable without fabricated values.",
        "ar": "يعتمد إنشاء مساحة العمل الآن على الجلسة الموثقة الحاكمة بدلاً من مربع قبول شروط ثانٍ. يظل الإدخال القديم اختيارياً للتوافق، وتبقى الطوابع الزمنية التاريخية قابلة للقيمة الفارغة دون اصطناع قيم."
      },
      "categories": [
        "product",
        "api",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference",
        "evaluator"
      ],
      "impact": "security",
      "migration": {
        "en": "Migrate clients to omit duplicate terms acceptance and rely on the authenticated session flow. Review migration 0112 before deployment; preserve NULL historical timestamps and rollback guards.",
        "ar": "رحّل العملاء لحذف قبول الشروط المكرر والاعتماد على مسار الجلسة الموثقة. راجع الترحيل 0112 قبل النشر، وحافظ على الطوابع الزمنية التاريخية NULL وحواجز التراجع."
      },
      "announcement": {
        "en": "Source checks cover valid session creation, optional legacy input, actual timestamps only, nullable historical fields, and rollback safety. This entry describes source state only; no hosted deployment is claimed.",
        "ar": "تغطي فحوص المصدر إنشاء الجلسة الصحيح والإدخال القديم الاختياري والطوابع الزمنية الفعلية فقط والحقول التاريخية القابلة للقيمة الفارغة وسلامة التراجع. يصف هذا الإدخال حالة المصدر فقط، ولا يُدّعى نشر مستضاف."
      },
      "replacement": "/reference/rest",
      "supportWindow": "Source-only migration 0112 pending deployment review.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/db/drizzle/0112_workspace_terms_nullable_up.sql",
        "packages/db/drizzle/0112_workspace_terms_nullable_down.sql",
        "packages/db/src/schema/workspace.ts",
        "packages/db/src/workspace-store.ts",
        "packages/core/src/workspace/service.ts",
        "tests/workspace-terms-migration.test.ts",
        "tests/workspace-service.test.ts"
      ],
      "permalink": "/changes#2026-10-14-workspace-creation-terms-removal"
    },
    {
      "id": "2026-10-14-version-precondition-transport-fallback",
      "publishedAt": "2026-10-14",
      "title": {
        "en": "Version preconditions survive hosted transport",
        "ar": "استمرار شروط الإصدار عبر النقل المستضاف"
      },
      "summary": {
        "en": "Versioned management mutations accept a validated JSON version when the hosted forwarding path drops If-Match. App, policy, membership, access, and credential updates retain mandatory concurrency checks and reject mismatches.",
        "ar": "تقبل عمليات الإدارة ذات الإصدار نسخة JSON متحققة عندما يسقط مسار التوجيه المستضاف If-Match. تحافظ تحديثات التطبيق والسياسة والعضوية والوصول وبيانات الاعتماد على فحوص التزامن الإلزامية وترفض حالات عدم التطابق."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference"
      ],
      "impact": "security",
      "migration": {
        "en": "Source-only compatibility improvement. Continue sending If-Match and the operation's documented JSON version field. Missing, malformed, conflicting, and stale versions remain rejected. Policy drafts also support version zero.",
        "ar": "تحسين توافق متاح في المصدر فقط. استمر في إرسال If-Match وحقل إصدار JSON الموثق للعملية. تظل الإصدارات المفقودة وغير الصالحة والمتعارضة والقديمة مرفوضة. تدعم مسودات السياسة الإصدار صفر أيضاً."
      },
      "announcement": {
        "en": "The API routes, server client, dashboard commands, OpenAPI contract, REST reference, and machine-readable documentation now describe the same bounded fallback. No hosted deployment is claimed.",
        "ar": "تصف مسارات API وعميل الخادم وأوامر لوحة التحكم وعقد OpenAPI ومرجع REST والوثائق المقروءة آلياً نفس البديل المحدود. لا يُدّعى وجود نشر مستضاف."
      },
      "replacement": "/reference/rest",
      "supportWindow": "Source-only compatibility capability pending hosted release.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/api/src/api-contract.ts",
        "apps/api/src/app-routes.ts",
        "apps/api/src/app-membership-transport.ts",
        "apps/api/src/policy-transport.ts",
        "apps/api/src/policy-draft-routes.ts",
        "apps/dash/src/lib/environment-resource-commands.ts",
        "apps/dash/src/lib/policy-resource.ts",
        "packages/contracts/openapi/authless.openapi.json",
        "packages/server/src/apps.ts",
        "packages/server/src/policies.ts",
        "tests/app-routes.test.ts",
        "tests/api-transport-codec.test.ts",
        "tests/policy-draft-routes.test.ts",
        "tests/environment-resource-commands.test.ts"
      ],
      "permalink": "/changes#2026-10-14-version-precondition-transport-fallback"
    },
    {
      "id": "2026-10-13-workspace-keys-active-policy",
      "publishedAt": "2026-10-13",
      "title": {
        "en": "Workspace service keys and active policy migration",
        "ar": "مفاتيح خدمة مساحة العمل وترحيل السياسة النشطة"
      },
      "summary": {
        "en": "The source contract now covers workspace service credentials, environment isolation, app metadata administration, policy history, and online session validation. Existing users are re-evaluated on the next authenticated request or token refresh.",
        "ar": "يغطي عقد المصدر الآن بيانات اعتماد خدمة مساحة العمل وعزل البيئات وإدارة بيانات التطبيق وسجل السياسات والتحقق الفوري من الجلسات. يُعاد تقييم المستخدمين الحاليين عند أول طلب موثق أو تحديث للرمز."
      },
      "categories": [
        "api",
        "sdk",
        "security",
        "docs",
        "operations"
      ],
      "audiences": [
        "integrator",
        "operator",
        "reference",
        "evaluator"
      ],
      "impact": "security",
      "migration": {
        "en": "Migrations 0102 through 0107 remain source-only and require legacy review before deployment. Integrators must handle policy status, consent or proof interaction, bounded service-key scopes, revision history, and online validation on every protected request or token refresh.",
        "ar": "تبقى الترحيلات من 0106 إلى 0111 في المصدر فقط وتحتاج إلى مراجعة قديمة قبل النشر. يجب على المدمجين التعامل مع حالة السياسة وتفاعل الموافقة أو الإثبات ونطاقات مفاتيح الخدمة المحددة وسجل المراجعات والتحقق الفوري في كل طلب محمي أو تحديث للرمز."
      },
      "announcement": {
        "en": "The checked OpenAPI contract, generated server client, CLI-facing metadata, SvelteKit evidence, REST reference, machine documentation, and Docs MCP describe the same source-only capability. No hosted deployment is claimed.",
        "ar": "يصف عقد OpenAPI المتحقق منه والعميل المولّد للخادم وبيانات CLI وأدلة SvelteKit ومرجع REST والوثائق المقروءة آلياً وDocs MCP القدرة المصدرية نفسها. لا يُدّعى وجود نشر مستضاف."
      },
      "replacement": "/reference/rest",
      "supportWindow": "Source-only capability pending legacy migration review.",
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/openapi/authless.compatibility.json",
        "packages/server/src/generated.ts",
        "packages/server/src/online-sessions.ts",
        "packages/sveltekit/package.json",
        "packages/db/drizzle/0106_environment_customer_authority_up.sql",
        "packages/db/drizzle/0107_oidc_grant_policy_authority_up.sql",
        "packages/db/drizzle/0108_workspace_service_credentials_up.sql",
        "packages/db/drizzle/0109_policy_publication_service_actor_up.sql",
        "packages/db/drizzle/0110_app_machine_idempotency_up.sql",
        "packages/db/drizzle/0111_app_metadata_version_up.sql",
        "tests/server-generation.test.ts",
        "tests/server-contract-compatibility.test.ts"
      ],
      "permalink": "/changes#2026-10-13-workspace-keys-active-policy"
    },
    {
      "id": "2026-10-11-six-digit-authentication",
      "publishedAt": "2026-10-11",
      "title": {
        "en": "Six-digit authentication and a simpler sign-in journey",
        "ar": "مصادقة من ستة أرقام ومسار تسجيل دخول أبسط"
      },
      "summary": {
        "en": "Hosted sign-in and identity-continuation codes now use six numeric digits. Generated clients and public references share the same contract, while Sign, the landing page, and confirmation email use shorter focused copy.",
        "ar": "تستخدم رموز تسجيل الدخول المستضاف واستمرارية الهوية الآن ستة أرقام فقط. تستخدم العملاء المولّدة والمراجع العامة العقد نفسه، بينما تستخدم Sign والصفحة الرئيسية ورسالة التأكيد نصاً أقصر وأكثر تركيزاً."
      },
      "categories": [
        "product",
        "api",
        "sdk",
        "security",
        "docs"
      ],
      "audiences": [
        "integrator",
        "reference",
        "evaluator"
      ],
      "impact": "breaking",
      "migration": {
        "en": "Update verification inputs, integrations, and test fixtures to send exactly six ASCII digits. Preserve leading zeros as part of the code.",
        "ar": "حدّث مدخلات التحقق والتكاملات وبيانات الاختبار لإرسال ستة أرقام ASCII بالضبط. حافظ على الأصفار البادئة باعتبارها جزءاً من الرمز."
      },
      "announcement": {
        "en": "The canonical OpenAPI schema, runtime codecs, generated clients, REST reference, machine-readable docs, and Docs MCP now enforce the same six-digit rule.",
        "ar": "يفرض مخطط OpenAPI المعياري ومحلّلات التشغيل والعملاء المولّدون ومرجع REST والوثائق المقروءة آلياً وDocs MCP القاعدة نفسها المكوّنة من ستة أرقام."
      },
      "replacement": "/reference/rest",
      "supportWindow": "Current six-digit contract.",
      "sunsetAt": "2026-10-11",
      "status": "available",
      "support": "/support",
      "evidence": [
        "packages/contracts/openapi/authless.openapi.json",
        "packages/contracts/src/identity-wire.generated.ts",
        "packages/server/src/generated.ts",
        "packages/identity-node/src/secret-protection.ts",
        "packages/jobs/src/identity-verification.ts",
        "packages/oidc/src/interactions.ts",
        "apps/docs/src/lib/machine-assets/openapi.json",
        "apps/docs/src/lib/machine-assets/rest-reference.json",
        "apps/docs/machine-readable/llms-full.txt",
        "packages/docs-mcp/src/corpus.generated.json",
        "tests/identity-contract-codec.test.ts",
        "tests/identity-verification-job.test.ts"
      ],
      "permalink": "/changes#2026-10-11-six-digit-authentication"
    },
    {
      "id": "2026-10-10-native-cli-and-docs-navigation",
      "publishedAt": "2026-10-10",
      "title": {
        "en": "Native CLI login and shared Docs navigation",
        "ar": "تسجيل دخول CLI والتنقّل المشترك للوثائق"
      },
      "summary": {
        "en": "CLI login uses browser consent and PKCE for workspace reads. Docs and API reference share full-width footer controls, active navigation styling, and wrapping technical tables.",
        "ar": "يستخدم تسجيل دخول CLI موافقة المتصفح وPKCE لقراءة مساحات العمل. تشترك الوثائق ومرجع API في عناصر تذييل بعرض كامل، وتمييز التنقّل النشط، وجداول تقنية تلتف محتوياتها."
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
        "en": "Native login supports workspace list and get with workspace:read. Other platform commands require AUTHLESS_SESSION_TOKEN; app administration requires AUTHLESS_APP_CREDENTIAL. Use the public repository until npm publication.",
        "ar": "يدعم تسجيل الدخول الأصلي عرض مساحات العمل وقراءتها بصلاحية workspace:read. تتطلب أوامر المنصة الأخرى AUTHLESS_SESSION_TOKEN، وتتطلب إدارة التطبيقات AUTHLESS_APP_CREDENTIAL. استخدم المستودع العام حتى النشر على npm."
      },
      "announcement": {
        "en": "The checked contract now declares native OAuth only for its supported workspace reads. Broader mutations remain protected by their required scopes.",
        "ar": "يعلن العقد المتحقق منه OAuth الأصلي لعمليات قراءة مساحات العمل المدعومة فقط. تبقى عمليات التغيير الأوسع محمية بالصلاحيات المطلوبة."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/docs/src/lib/DocsFrame.svelte",
        "apps/docs/src/lib/DocsSidebarNavigation.svelte",
        "apps/docs/src/lib/DocsTechnicalTable.svelte",
        "apps/sign/src/management-oauth.ts",
        "packages/contracts/openapi/authless.openapi.json",
        "packages/cli/README.md",
        "scripts/generate-server-client.ts",
        "tests/management-oauth-native-http.test.ts",
        "tests/integration/native-management-api-postgres.integration.ts",
        "tests/ui/docs-content-system.ui.ts"
      ],
      "permalink": "/changes#2026-10-10-native-cli-and-docs-navigation"
    },
    {
      "id": "2026-10-09-developer-docs-boundaries",
      "publishedAt": "2026-10-09",
      "title": {
        "en": "Developer guides and public examples",
        "ar": "أدلة المطورين والأمثلة العامة"
      },
      "summary": {
        "en": "Guides and API reference have separate navigation, highlighted code, and icon copy controls. Examples, SDK sources, and a read-only Docs MCP are public under labdotsa/authless.",
        "ar": "للأدلة ومرجع API تنقّل منفصل، مع تمييز الكود وأزرار نسخ بأيقونات. تتوفر الأمثلة ومصادر SDK وخادم Docs MCP للقراءة فقط في labdotsa/authless."
      },
      "categories": [
        "docs",
        "sdk"
      ],
      "audiences": [
        "integrator",
        "reference",
        "evaluator"
      ],
      "impact": "additive",
      "migration": {
        "en": "No API migration is required. Use @authless/server or @authless/cli from the public repository until npm publication. Management-agent OAuth remains preview-only; follow the readiness report before connecting a live deployment.",
        "ar": "لا يلزم ترحيل لواجهة API. استخدم ‎@authless/server‎ أو ‎@authless/cli‎ من المستودع العام حتى نشرها على npm. يبقى OAuth لوكلاء الإدارة في المعاينة؛ راجع تقرير الجاهزية قبل الاتصال بنشر حي."
      },
      "announcement": {
        "en": "Use the public examples, server facade, CLI, and agent documentation. Package publication and live OAuth availability remain unchanged.",
        "ar": "استخدم الأمثلة العامة وواجهة الخادم وCLI ووثائق الوكلاء. تبقى حالة نشر الحزم وإتاحة OAuth الحي دون تغيير."
      },
      "replacement": null,
      "supportWindow": null,
      "sunsetAt": null,
      "status": "available",
      "support": "/support",
      "evidence": [
        "apps/docs/src/lib/AgentGuideBody.svelte",
        "apps/docs/src/lib/DocsCodeBlock.svelte",
        "apps/docs/src/lib/DocsFrame.svelte",
        "apps/docs/src/lib/docs-body-registry.ts",
        "apps/docs/src/lib/release-docs-mcp-projection.ts",
        "apps/docs/static/developer-documentation.json",
        "packages/docs-mcp/src/corpus.generated.json",
        "packages/server/README.md",
        "packages/server/package.json",
        "tests/docs-mcp.test.ts",
        "tests/ui/developer-documentation.ui.ts"
      ],
      "permalink": "/changes#2026-10-09-developer-docs-boundaries"
    },
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
        "en": "Retires action-level authentication readiness fields so clients rely on the authenticated session and its permissions.",
        "ar": "يلغي حقول جاهزية المصادقة على مستوى الإجراء كي تعتمد التطبيقات على الجلسة الموثقة وصلاحياتها."
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
        "en": "Clients should stop reading the retired readiness fields and submit authorized actions with the valid session token.",
        "ar": "ينبغي للتطبيقات التوقف عن قراءة حقول الجاهزية الملغاة وإرسال الإجراءات المسموح بها باستخدام رمز الجلسة الصالح."
      },
      "announcement": {
        "en": "Username and workspace creation now use the authenticated session and permission contract without a product-level recent-auth precheck.",
        "ar": "يعتمد إنشاء اسم المستخدم ومساحة العمل الآن على عقد الجلسة الموثقة والصلاحيات من دون فحص مصادقة حديثة على مستوى المنتج."
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
        "en": "No migration is required. The path, confirmation and expected-version input, correlation header, 200 split/version response, private not-found, authorization, confirmation, and version-conflict outcomes remain unchanged.",
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
        "en": "No migration is required. The path, confirmation input, 200 reservation response, correlation header, and authorization, confirmation, conflict, and availability outcomes remain unchanged.",
        "ar": "لا يلزم ترحيل. يظل المسار ومدخل التأكيد واستجابة الحجز 200 وترويسة الارتباط ونتائج التفويض والتأكيد والتعارض والتوفر دون تغيير."
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
    "api": "Stable REST operations remain on the current contract. A breaking contract requires a new major path; additive changes require compatibility and changelog review.",
    "events": "Events retain their type and schemaVersion. A breaking payload change requires a new schemaVersion and a dual-consumption migration window.",
    "deprecation": "A deprecation is not actionable until its announcement names a replacement, migration guide, support window, approved Sunset date, status, and support contact."
  }
}
```

## Authoritative machine sources

- https://docs.authle.ss/release-center.json
- https://docs.authle.ss/changes.json

Source attribution: Developer documentation (https://docs.authle.ss/changes).
