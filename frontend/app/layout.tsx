import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Course Companion — Panaversity",
  description: "Advanced AI learning companion for technical courses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <div className="flex h-screen overflow-hidden bg-[var(--bg-base)]">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden relative">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-6 relative z-0">
                <div className="max-w-7xl mx-auto w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster 
            position="bottom-right" 
            richColors 
            theme="dark"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
