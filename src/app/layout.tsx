

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import Provider from "@/components/provider";

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
    <html
      lang="en"
      className="bg-gradient-to-t from-base-200 to-base-300 h-full"
    >
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body >
        <Provider >
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
