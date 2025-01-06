import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/fragments/Navbar";
import Footer from "@/components/fragments/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BBC E-Katalog AskhaJaya",
  description: "Created by BBC Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Bagian Header */}
        <header>
          <Navbar />
        </header>
        {children}
        {/* Bagian Footer */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
