import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Providers from "../components/Utils/providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistSans.variable} antialiased transition-colors duration-500`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
