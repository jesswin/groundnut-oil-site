# Groundnut Oil Website

Multilingual (English, Hindi, Gujarati) marketing and enquiry website for a groundnut oil manufacturer. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui and next-intl.

## Setup

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Command          | What it does                                 |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Development server                           |
| `npm run build`  | Production build (all pages are prerendered) |
| `npm run start`  | Serve the production build                   |
| `npm run lint`   | ESLint                                       |
| `npm run format` | Format every file with Prettier              |

## Environment variables

| Variable               | Required           | Purpose                                                                                                                                                                                                                   |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | For email          | API key from [resend.com](https://resend.com). Without it, form submissions are logged to the server console in development. In production a missing key makes forms show an error, so enquiries are never silently lost. |
| `CONTACT_TO_EMAIL`     | No                 | Inbox that receives enquiries. Defaults to `emails.sales` in `lib/site-config.ts`.                                                                                                                                        |
| `NEXT_PUBLIC_SITE_URL` | Yes in production  | Public URL without a trailing slash. Used for canonical URLs, hreflang, sitemap and Open Graph. Defaults to `siteUrl` in `lib/site-config.ts`.                                                                            |
| `EMAIL_FROM`           | Yes for real email | Sender, e.g. `Brand <enquiries@yourdomain.com>`. The domain must be verified in Resend. The default `onboarding@resend.dev` can only send to your own Resend account address.                                             |

## Editing content: `lib/site-config.ts`

All business details and page content live in this one file: brand, contact, certifications, stats, products, FAQs, testimonials, process steps, team, timeline, quality page, benefits, form options and legal text.

- Every placeholder is marked `// TODO: replace`.
- Text shown to visitors is written per language:
  ```ts
  tagline: { en: "Pure by tradition", hi: "परंपरा से शुद्ध", gu: "પરંપરાથી શુદ્ધ" },
  ```
- Phone numbers, emails, numbers and URLs are single values.
- To add a product, copy an entry in the `products` array and give it a new `slug` (English, lowercase, hyphens). Its page, sitemap entry and form option are created automatically.
- Images: put files in `public/images/` and change the paths in the config. Every image currently points to a labelled SVG in `public/images/placeholders/`.
- The logo mark is an inline SVG in `components/layout/header.tsx`; the favicon is `app/icon.svg`.

## Editing translations: `/messages`

Interface text (navigation, buttons, headings, form labels, validation errors, toasts, email auto-reply) is in `messages/en.json`, `messages/hi.json` and `messages/gu.json`. The three files have identical keys; change the values only. Text in `{braces}` is a variable and must be kept as is.

## Adding a new language

Example: Marathi (`mr`).

1. `i18n/locales.ts`: add `"mr"` to `locales`, and add entries to `localeNames` and `localeTags`.
2. Copy `messages/en.json` to `messages/mr.json` and translate the values.
3. `lib/fonts.ts`: add a font for the script if needed and return it from `fontClasses`. Marathi uses Devanagari, so it can reuse the Hindi font. If the script needs the Indic font stack, add its `html[lang^="mr"]` selector next to the Hindi and Gujarati ones in `app/globals.css`.
4. `lib/site-config.ts`: run `npm run build`. TypeScript lists every text field missing the new `mr` value.
5. Optional: add posts in `content/blog/mr/`. Missing posts fall back to English with a notice.

## Adding blog posts

Create one `.mdx` file per language with the same file name; the file name is the URL slug.

```
content/blog/en/my-new-post.mdx
content/blog/hi/my-new-post.mdx
content/blog/gu/my-new-post.mdx
```

```mdx
---
title: "Post title"
description: "One-sentence summary for listings and search results."
date: "2026-04-01"
image: "/images/blog/my-new-post.jpg"
---

Post content in Markdown. Tables are supported.
```

If a language file is missing, that language shows the English post with a short notice.

## Forms and email

Contact, bulk order, distributor and quote forms share one component (`components/forms/enquiry-form.tsx`), one set of Zod schemas (`lib/validations.ts`, used in the browser and on the server) and one server action (`app/actions/enquiry.ts`).

Each submission passes a honeypot check and a rate limit (5 per 10 minutes per IP), then sends:

1. an email to the business inbox in English, with the customer's language noted and reply-to set to the customer;
2. an auto-reply to the customer in their language.

The rate limit is held in memory, so on serverless hosting it is per server instance. It stops bursts but is not a strict limit.

## Project structure

```
app/[locale]/        Pages, layout, not-found, opengraph-image
app/actions/         Server action for forms
app/sitemap.ts, robots.ts
components/ui/       shadcn/ui components
components/layout/   Header, mobile menu, language switcher, footer, floating buttons
components/sections/ Page sections
components/forms/    Enquiry form
lib/                 site-config, seo, email, validations, rate-limit, blog, fonts
i18n/                Locales, routing, navigation, request config
messages/            en.json, hi.json, gu.json
content/blog/        MDX posts per language
proxy.ts             Locale detection and redirects
```

Notes on choices that differ from older Next.js projects:

- `proxy.ts` is the Next.js 16 name for `middleware.ts`.
- `remark-gfm` is included so blog posts can contain tables.
- The share image (`app/[locale]/opengraph-image.tsx`) shows the English brand name and tagline in every language, because the image renderer cannot draw Hindi and Gujarati conjunct letters correctly. Titles and descriptions in the share metadata are localized.
- The localized 404 page returns a 404 status and a noindex tag; its content is rendered in the browser.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. The defaults are correct.
3. Add the environment variables from the table above under **Settings → Environment Variables**.
4. Deploy, then add your domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it. Redeploy after changing it.
5. In Resend, verify your sending domain and set `EMAIL_FROM` to an address on it.
6. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

---

## Checklist before launch

### Placeholders in `lib/site-config.ts`

Brand and contact (`siteConfig`):

- [ ] `brandName`, `tagline`, `description`
- [ ] `establishedYear`
- [ ] `location` (city, state)
- [ ] `address` (line1, line2, city, state, pincode)
- [ ] `mapEmbedUrl` (Google Maps → Share → Embed a map → copy the `src` URL)
- [ ] `phone`, `whatsapp`, `whatsappMessage`
- [ ] `emails.info`, `emails.sales`
- [ ] `businessHours`
- [ ] `certifications.fssai`, `certifications.gst`, `certifications.others`
- [ ] `stats` (4 values)
- [ ] `social` (instagram, facebook, youtube, linkedin)
- [ ] `b2b.moq`, `b2b.delivery`
- [ ] `siteUrl`

Content:

- [ ] `products`: names, descriptions, pack sizes, `nutrition` (use your lab report values), uses, shelf life, storage, images
- [ ] `heroImage`
- [ ] `whyChooseUs`
- [ ] `processSteps` (text and images)
- [ ] `about`: `story`, `storyImage`, `mission`, `vision`, `factory`
- [ ] `team` (3 founders: name, role, bio, photo)
- [ ] `timeline` (5 milestones)
- [ ] `quality`: `intro`, `fssaiInfo`, `labTests`, `labImage`
- [ ] `bulkBenefits`, `distributorBenefits`
- [ ] `faqs` (check answers against your actual products and policies)
- [ ] `testimonials` (use real customer testimonials only)
- [ ] `orderFrequencies`, `investmentRanges`
- [ ] `legal.privacy`, `legal.terms`, `legal.lastUpdated` (have these reviewed by a legal professional)

Elsewhere:

- [ ] Logo mark in `components/layout/header.tsx` and favicon `app/icon.svg`
- [ ] All images in `public/images/placeholders/`
- [ ] Three blog posts in `content/blog/{en,hi,gu}/`
- [ ] Brand colours in `app/globals.css` and the share image `app/[locale]/opengraph-image.tsx`, if your brand colours differ
- [ ] Environment variables in Vercel

### Translations to get proofread

All Hindi and Gujarati text was written for this project and has not been reviewed by a native-speaking proofreader.

- [ ] TODO: review translation: `messages/hi.json`
- [ ] TODO: review translation: `messages/gu.json`
- [ ] TODO: review translation: every `hi:` and `gu:` value in `lib/site-config.ts`
- [ ] TODO: review translation: `content/blog/hi/*.mdx`
- [ ] TODO: review translation: `content/blog/gu/*.mdx`

Terms worth a decision from you: the Gujarati text uses સીંગતેલ for groundnut oil and સીંગખોળ for oil cake; the Hindi text uses मूंगफली तेल and खली. Change them if your market uses other words (for example મગફળીનું તેલ).
