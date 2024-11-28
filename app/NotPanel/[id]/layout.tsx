import Analytics from "@/app/google-analytics";
import "easymde/dist/easymde.min.css";

// app/dashboard/layout.tsx
export default function NotePanelPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
