"use client";

import React, { useCallback, useState } from "react";
import { Sidebar, MobileSidebar } from "@/components/custom/sidebar";
import { Button } from "@/components/ui/button";
import { ListIcon } from "@phosphor-icons/react/dist/ssr";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const onClose = useCallback(() => setIsMobileSidebarOpen(false), []);

  return (
    <section className="flex h-dvh overflow-hidden">
      <Sidebar />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={onClose} />
      <section className="flex flex-col flex-1 min-w-0 h-full">
        <header className="flex justify-between px-3 py-5 shrink-0">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="block lg:hidden"
              aria-label="Open navigation"
            >
              <ListIcon size={20} />
            </Button>
            <h1>Yiyara</h1>
          </div>
        </header>
        <main className="flex h-full overflow-hidden px-3 pt-3 min-w-0">
          {children}
        </main>
      </section>
    </section>
  );
}
