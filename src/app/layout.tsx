import type { Metadata } from "next";
import "./globals.css";

import Provider from "@/components/provider";
import React from "react";
import MainApp from "@/components/MainApp";

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
      <body>
        <Provider>
          <MainApp >
            {children}
          </MainApp>
        </Provider>
      </body>
    </html>
  );
}
