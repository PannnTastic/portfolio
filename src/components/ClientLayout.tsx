"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Dynamic imports untuk komponen yang butuh client-side only
const LoadingScreen = dynamic(() => import("./LoadingScreen"), { ssr: false });
const ScrollProgress = dynamic(() => import("./ScrollProgress"), { ssr: false });
const BackToTop = dynamic(() => import("./BackToTop"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider>
      {mounted && <LoadingScreen />}
      {mounted && <CustomCursor />}
      {mounted && <ScrollProgress />}
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      {mounted && <BackToTop />}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            color: "#fff",
          },
        }}
      />
    </ThemeProvider>
  );
}
