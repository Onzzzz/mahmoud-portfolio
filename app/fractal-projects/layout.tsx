import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fractal Projects Review",
  description: "Internal project review tool",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function FractalProjectsLayout({ children }: { readonly children: React.ReactNode }) {
  return children;
}
