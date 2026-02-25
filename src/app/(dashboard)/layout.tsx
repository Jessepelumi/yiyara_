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
      <section className="w-full">
        <aside>
          <Button
            variant="ghost"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <ListIcon size={20} />
          </Button>

          {children}
        </aside>
      </section>
    </section>
  );
}
