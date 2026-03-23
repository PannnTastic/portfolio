import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PannnTastic | Full Stack Developer",
  description: "Portfolio of PannnTastic - Full Stack Developer specializing in modern web technologies",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "PannnTastic" }],
  openGraph: {
    title: "PannnTastic | Full Stack Developer",
    description: "Portfolio of PannnTastic - Full Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
