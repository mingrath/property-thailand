import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Property Thailand | Premium Real Estate Portal",
  description:
    "Discover premium properties across Thailand. Luxury condos, villas, and houses in Bangkok, Phuket, Pattaya, and Koh Samui. No registration required.",
  openGraph: {
    title: "Property Thailand | Premium Real Estate Portal",
    description:
      "Discover premium properties across Thailand's most sought-after destinations.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "th" | "zh")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
