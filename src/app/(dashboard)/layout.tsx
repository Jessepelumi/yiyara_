"use client";

import { Sidebar, MobileSidebar } from "@/components/custom/sidebar";
import { Button } from "@/components/ui/button";
import { ListIcon } from "@phosphor-icons/react/dist/ssr";
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
        <header className="flex justify-between px-3 py-5">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="block lg:hidden"
            >
              <ListIcon size={20} />
            </Button>
            <h1>Zimna</h1>
          </div>

          <div>User</div>
        </header>
        <aside className="flex h-full overflow-hidden px-3 pt-3">
          {children}
        </aside>
      </section>
    </section>
  );
}
