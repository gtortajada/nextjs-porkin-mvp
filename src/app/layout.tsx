import NavbarWrapper from "@/components/navbar/navbarWrapper";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Porkin",
  description: "Ajudando você, a cuidar das duas finanças.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({
  primaryColor: "blue",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -50,
          }}>
          <Image
            src="/images/background.jpg"
            alt="Background"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="top-right" zIndex={1000} />
          <SessionProvider>
            <NavbarWrapper />
            {children}
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}