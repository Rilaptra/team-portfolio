import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "../components/Utils/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  }
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
        className={`${geistSans.variable} antialiased transition-colors duration-500`}
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
