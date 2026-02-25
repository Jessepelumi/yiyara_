"use client";

import { Sidebar, MobileSidebar } from "@/components/custom/sidebar";
import { useCallback, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const onClose = useCallback(() => setIsMobileSidebarOpen(false), []);

  return (
    <section className="flex h-dvh">
      <Sidebar />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={onClose} />
      <section className="flex flex-col w-full">
        <header></header>
        <aside>{children}</aside>
      </section>
    </section>
  );
}
