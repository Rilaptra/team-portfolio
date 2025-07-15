import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Providers from "@/components/Utils/providers";

// i18n support
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Home",
  description: "Team Portfolio",
  metadataBase: new URL("https://80ab-140-213-168-209.ngrok-free.app"),
  openGraph: {
    title: "Portfolio | Home",
    description: "Team Portfolio",
    images: "/images/Logo/SHR_logo.png",
    type: "website",
    url: "https://80ab-140-213-168-209.ngrok-free.app",
    siteName: "Portfolio",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${geistSans.variable} antialiased transition-colors duration-500`}
      >
        <NextIntlClientProvider>
          <Providers>
            <Header />
            {children}
            <Chatbot />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
