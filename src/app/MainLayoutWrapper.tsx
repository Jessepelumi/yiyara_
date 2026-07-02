"use client";

import React from "react";
import { Sidebar, MobileSidebar } from "@/components/custom/sidebar";
import { Button } from "@/components/ui/button";
import { ListIcon } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const onClose = useCallback(() => setIsMobileSidebarOpen(false), []);

  // Grab the NextAuth session
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

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
            >
              <ListIcon size={20} />
            </Button>
            <h1>Zimna</h1>
          </div>

          <div className="flex gap-2 items-center">
            {isAuthenticated ? (
              <>
                <span>{session?.user?.name || "User"}</span>
                {session?.user?.image ? (
                  <div className="border border-blue-400 p-0.5 rounded-full overflow-hidden flex items-center justify-center">
                    <div className="relative overflow-hidden bg-gray-300 w-10 h-10 rounded-full">
                      <Image
                        src={session.user.image}
                        alt={
                          `${session?.user?.name}'s Profile Picture` ||
                          "User's Profile Picture"
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-blue-400 p-0.5 rounded-full">
                    <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="border border-blue-400 text-sm py-2 px-3 rounded-full hover:bg-blue-50"
              >
                Log In
              </button>
            )}
          </div>
        </header>
        <aside className="flex h-full overflow-hidden px-3 pt-3 min-w-0">
          {children}
        </aside>
      </section>
    </section>
  );
}
