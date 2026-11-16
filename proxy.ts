import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the `middleware.ts` convention to `proxy.ts`. This handles locale
// detection, the "/" redirect and the NEXT_LOCALE cookie.
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and anything with a file extension (images, sitemap.xml, ...).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
