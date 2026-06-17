import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavya Jain — GenAI Engineer & Full-Stack Builder",
  description:
    "Cinematic portfolio of Kavya Jain — GenAI Engineer, RAG Pipeline Architect, and Full-Stack Builder. B.Tech AI & ML at Newton School of Technology. Explore projects in AI, LangChain, Three.js, and more.",
  keywords: [
    "Kavya Jain",
    "GenAI Engineer",
    "RAG Pipeline",
    "LangChain",
    "Full Stack Developer",
    "AI Portfolio",
    "Newton School of Technology",
    "Three.js",
    "Next.js",
  ],
  authors: [{ name: "Kavya Jain" }],
  openGraph: {
    title: "Kavya Jain — GenAI Engineer & Full-Stack Builder",
    description:
      "Enter the world of AI through an immersive cinematic portfolio experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavya Jain — GenAI Engineer & Full-Stack Builder",
    description: "Enter the world of AI through an immersive cinematic portfolio experience.",
  },
};

import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-inter antialiased bg-base-dark text-text-primary">
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
