import "easymde/dist/easymde.min.css";

import Search from "@/components/search";
import { Suspense } from "react";

// app/dashboard/layout.tsx
export default function NotePanelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed z-10  overflow-hidden">
        <Suspense>
          {" "}
          <Search />
        </Suspense>
      </div>
      {children}
    </>
  );
}
