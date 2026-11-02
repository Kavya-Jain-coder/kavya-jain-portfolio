import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavya Jain — Quantum Computing & GenAI Engineer",
  description:
    "Portfolio of Kavya Jain — Quantum Computing Researcher, GenAI Engineer, and Full-Stack Builder. B.Tech in AI & ML at Newton School of Technology (Rishihood University). Exploring Qiskit Aer, Mermin-GHZ non-locality, RAG architectures, and 3D web telemetry.",
  keywords: [
    "Kavya Jain",
    "Quantum Computing",
    "Qiskit",
    "Qiskit Aer",
    "Mermin-GHZ",
    "Quantum Algorithms",
    "GenAI Engineer",
    "RAG Pipeline",
    "LangChain",
    "Full Stack Developer",
    "Newton School of Technology",
    "Rishihood University",
    "Three.js",
    "Next.js",
  ],
  authors: [{ name: "Kavya Jain" }],
  openGraph: {
    title: "Kavya Jain — Quantum Computing & GenAI Engineer",
    description:
      "Bridging Quantum Simulation, Non-Local Entanglement, and Generative AI through an interactive cinematic experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavya Jain — Quantum Computing & GenAI Engineer",
    description: "Bridging Quantum Simulation, Non-Local Entanglement, and Generative AI through an interactive cinematic experience.",
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
