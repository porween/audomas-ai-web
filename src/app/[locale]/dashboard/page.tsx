/**
 * Localized dashboard route.
 *
 * The next-intl middleware rewrites every request so that the locale is always
 * the first path segment, e.g. /th/dashboard and /en/dashboard both land here.
 *
 * The actual dashboard UI is defined in the shared DashboardPage component so
 * that the non-localized `/dashboard` route (app/dashboard/page.tsx) can also
 * reuse it if needed.
 */
import DashboardPage from "@/app/dashboard/page";

export { default } from "@/app/dashboard/page";

export const metadata = {
  title: "Dashboard | Audomas AI",
  description: "Audomas AI Revenue System — Live Command Center",
};
