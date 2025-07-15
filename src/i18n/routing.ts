import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "id", "ar-PS", "hi-IN"],
  // Used when no locale matches
  defaultLocale: "en",
});
