/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import "@/styles/globals.css";
import { Providers } from "./context/providers";
import { Toaster } from "./components/ui/toast/toaster";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IAWaves",
  description: "Transforme sua gestão com IA avançada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`m-auto p-auto ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex h-screen w-screen">
            <Sidebar />
            <div  className="w-full">
              <Header />
              <div className="p-3">
              {children}

              </div>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
