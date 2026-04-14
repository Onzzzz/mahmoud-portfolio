import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono, EB_Garamond } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const heading = Outfit({ variable: "--font-heading", subsets: ["latin"], weight: ["300", "500", "600", "700", "800"], display: "swap" });
const serif = EB_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoudabdallah.com"),
  title: "Mahmoud Abdallah | Procurement & Supply Chain Manager",
  description: "Strategic Procurement & Supply Chain Manager based in Dubai. AED 450K+ documented savings, 30+ major events procured, 7+ years across UAE, KSA & Egypt. Specializing in sourcing, ERP implementation, tender management, and cost optimization.",
  keywords: ["procurement", "supply chain", "Dubai", "UAE", "tender management", "ERP", "vendor management", "Odoo", "strategic sourcing"],
  authors: [{ name: "Mahmoud Abdallah" }],
  openGraph: {
    title: "Mahmoud Abdallah | Procurement, Supply Chain & Operations Manager",
    description: "Procurement, Supply Chain & Operations Manager across the GCC & MENA — strategic sourcing, tender management & vendor management.",
    type: "website",
    url: "https://mahmoudabdallah.com",
    siteName: "Mahmoud Abdallah",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Abdallah | Procurement, Supply Chain & Operations Manager",
    description: "Procurement, Supply Chain & Operations Manager across the GCC & MENA — strategic sourcing, tender management & vendor management.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${serif.variable} ${body.variable} ${mono.variable} antialiased`} suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            name: "Mahmoud Abdallah", jobTitle: "Procurement & Supply Chain Operations Manager",
            url: "https://mahmoudabdallah.com", email: "mahmoudf.abdallah@outlook.com",
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
