import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import Navbar from "@/components/navbar";
import Provider from "@/components/provider";
import { sanityFetch } from "@/sanity/lib/live";
import { getNotes } from "@/sanity/lib/queries";
import Search from "@/components/search";
import Footer from "@/components/footer";

interface note {
  _id: string;
  title: string;
  content: string;
  _createdAt: string;
}

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
  title: "BIT STACK",
  description:
    "Empower Your Ideas With Bits | Explore The Universe Through Bits",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col bg-bg1`}
        >
          <div className="z-0">{children}</div>
        </body>
      </Provider>
    </html>
  );
}
