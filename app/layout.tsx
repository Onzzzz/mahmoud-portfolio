import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const heading = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"], weight: ["300", "500", "600", "700"], display: "swap" });
const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Mahmoud Abdallah — Procurement & Supply Chain Professional",
  description: "Strategic Procurement & Tender Specialist based in Dubai with 7+ years across UAE, KSA & Egypt. Specializing in sourcing, ERP systems, tender management, and cost optimization.",
  keywords: ["procurement", "supply chain", "Dubai", "UAE", "tender management", "ERP", "vendor management"],
  authors: [{ name: "Mahmoud Abdallah" }],
  openGraph: {
    title: "Mahmoud Abdallah — Procurement & Supply Chain",
    description: "Strategic procurement professional with 7+ years across the Gulf.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            name: "Mahmoud Abdallah", jobTitle: "Procurement & Tender Expert",
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
