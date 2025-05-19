import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
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
    <html lang="pt-BR">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundImage: 'url(/images/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        }}
      >
        <MantineProvider 
          theme={theme}
          defaultColorScheme="dark"
          
          >
          <Notifications position="top-right" zIndex={1000} />
          <SessionProvider>{children}</SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
