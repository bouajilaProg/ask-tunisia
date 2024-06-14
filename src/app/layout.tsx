import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "Ask Tunisia",
  description: "where tunisian talk about everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gradient-to-t from-base-200 to-base-300 h-full">
      <body  >
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
