import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Course Companion | Panaversity High-Fidelity Education",
  description: "Advanced AI learning companion for technical courses. Engineered for deep understanding and autonomous skill acquisition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body className="font-inter antialiased bg-bg-base text-text-primary min-h-screen selection:bg-accent/10">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          forcedTheme="light"
          enableSystem={false}
        >
          <div className="flex h-screen overflow-hidden bg-bg-base">
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
            theme="light"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}


