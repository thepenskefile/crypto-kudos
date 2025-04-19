import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { Web3Provider } from "./providers/Web3Provider";
import { Footer } from "./components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Crypto Kudos",
  description: "Send and receive crypto-powered appreciation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} font-sans min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
