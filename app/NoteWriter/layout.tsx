import type { Metadata } from "next";
import "easymde/dist/easymde.min.css";
import Provider from "@/components/provider";
import Search from "@/components/search";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// app/dashboard/layout.tsx
export default function NotePanelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed z-10  overflow-hidden">
        <Search />
      </div>
      {children}
    </>
  );
}
