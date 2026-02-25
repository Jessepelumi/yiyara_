"use client";

import { Sidebar, MobileSidebar } from "@/components/custom/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-dvh">
      <Sidebar />
      <MobileSidebar />
      <section className="flex flex-col w-full">
        <header></header>
        <aside>{children}</aside>
      </section>
    </section>
  );
}
