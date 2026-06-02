import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { getDictionary, getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "HardenPath",
  description: "Bilingual open source cybersecurity learning platform."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <html data-scroll-behavior="smooth" lang={locale}>
      <body>
        <Navbar locale={locale} dictionary={dictionary.nav} />
        <main>{children}</main>
      </body>
    </html>
  );
}
