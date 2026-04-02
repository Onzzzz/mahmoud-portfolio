import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const heading = Outfit({ variable: "--font-heading", subsets: ["latin"], weight: ["300", "500", "600", "700", "800"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoudabdallah.cloud"),
  title: "Mahmoud Abdallah | Procurement & Supply Chain Professional",
  description: "Strategic Procurement & Supply Chain Manager based in Dubai. AED 450K+ documented savings, 30+ major events procured, 7+ years across UAE, KSA & Egypt. Specializing in sourcing, ERP implementation, tender management, and cost optimization.",
  keywords: ["procurement", "supply chain", "Dubai", "UAE", "tender management", "ERP", "vendor management", "Odoo", "strategic sourcing"],
  authors: [{ name: "Mahmoud Abdallah" }],
  openGraph: {
    title: "Mahmoud Abdallah — Procurement & Supply Chain",
    description: "AED 450K+ saved. 30+ world-class events procured. 7+ years turning spend into strategy.",
    type: "website",
    url: "https://mahmoudabdallah.cloud",
    siteName: "Mahmoud Abdallah",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Abdallah — Procurement & Supply Chain",
    description: "AED 450K+ saved. 30+ world-class events procured. 7+ years turning spend into strategy.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mono.variable} antialiased`} suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            name: "Mahmoud Abdallah", jobTitle: "Supply Chain & Operations Manager",
            url: "https://mahmoudabdallah.cloud", email: "mahmoudf.abdallah@outlook.com",
            telephone: "+971544720857",
            address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
            sameAs: ["https://www.linkedin.com/in/mahmoudf-abdallah"],
          })}}
        />
      </head>
      <body style={{ fontFamily: "var(--font-body), 'Inter', sans-serif" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
