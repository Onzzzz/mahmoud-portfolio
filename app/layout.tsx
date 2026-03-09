import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahmoudabdallah.com"),
  title: "Mahmoud Abdallah — Supply Chain & Operations Manager | Dubai",
  description:
    "Senior Supply Chain & Operations professional with 5+ years across UAE, KSA & Egypt. Procurement, ERP implementation, process automation & tender management. AED 450K+ in savings.",
  keywords: [
    "supply chain manager dubai",
    "procurement specialist UAE",
    "ERP implementation consultant",
    "operations manager middle east",
    "tender management GCC",
    "process automation procurement",
    "Odoo implementation",
    "Oracle procurement",
    "SAP procurement specialist",
    "supply chain optimization",
    "procurement consulting dubai",
    "n8n automation",
  ],
  authors: [{ name: "Mahmoud Abdallah" }],
  creator: "Mahmoud Abdallah",
  publisher: "Mahmoud Abdallah",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mahmoud Abdallah — Supply Chain & Operations Manager",
    description:
      "5+ years transforming procurement & supply chains across UAE, KSA & Egypt. AED 450K+ in savings through strategic sourcing, ERP systems & automation.",
    type: "website",
    locale: "en_US",
    siteName: "Mahmoud Abdallah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Abdallah — Supply Chain & Operations Manager",
    description:
      "5+ years transforming procurement & supply chains across UAE, KSA & Egypt. AED 450K+ in savings.",
    creator: "@mahmoud_abdallah",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mahmoud Abdallah",
  jobTitle: "Supply Chain & Operations Manager",
  description:
    "Senior Supply Chain & Operations professional with 5+ years across UAE, KSA & Egypt. Procurement, ERP implementation, process automation & tender management.",
  url: "https://mahmoudabdallah.com",
  sameAs: ["https://www.linkedin.com/in/mahmoudf-abdallah"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Assiut University — Faculty of Commerce",
  },
  knowsAbout: [
    "Supply Chain Management",
    "Procurement",
    "ERP Implementation",
    "Oracle",
    "SAP",
    "Odoo",
    "Process Automation",
    "Tender Management",
    "n8n Workflows",
    "Digital Transformation",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Golden Sparrow Trading LLC",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrains.variable} antialiased`}
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
