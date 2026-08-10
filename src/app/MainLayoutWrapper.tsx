"use client";

import React, { useCallback, useState } from "react";
import { Sidebar, MobileSidebar } from "@/components/custom/sidebar";
import { Button } from "@/components/ui/button";
import { ListIcon } from "@phosphor-icons/react/dist/ssr";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

function getSupportedProfileImage(image?: string | null) {
  if (!image) return null;

  if (image.startsWith("/")) return image;

  try {
    const url = new URL(image);
    return url.protocol === "https:" &&
      url.hostname === "lh3.googleusercontent.com"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [failedProfileImage, setFailedProfileImage] = useState<string | null>(
    null,
  );
  const onClose = useCallback(() => setIsMobileSidebarOpen(false), []);

  // Grab the NextAuth session
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const profileImage = getSupportedProfileImage(session?.user?.image);
  const userName = session?.user?.name || "User";
  const userInitial = userName.trim().charAt(0).toUpperCase() || "U";

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

          <div className="flex gap-2 items-center">
            {isAuthenticated ? (
              <>
                <span>{userName}</span>
                {profileImage && failedProfileImage !== profileImage ? (
                  <div className="border border-blue-400 p-0.5 rounded-full overflow-hidden flex items-center justify-center">
                    <div className="relative overflow-hidden bg-gray-300 w-10 h-10 rounded-full">
                      <Image
                        src={profileImage}
                        alt={`${userName}'s profile picture`}
                        fill
                        sizes="40px"
                        className="object-cover"
                        onError={() => setFailedProfileImage(profileImage)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border border-blue-400 p-0.5 rounded-full">
                    <div className="flex bg-gray-200 w-10 h-10 rounded-full items-center justify-center text-sm font-semibold text-gray-600">
                      {userInitial}
                    </div>
                  </div>
                )}
              </>
            ) : status === "unauthenticated" ? (
              <button
                onClick={() => signIn("google", { callbackUrl: "/home" })}
                className="border border-blue-400 text-sm py-2 px-3 rounded-full hover:bg-blue-50"
              >
                Log In
              </button>
            ) : (
              <div className="h-9 w-24 animate-pulse rounded-full bg-gray-100" />
            )}
          </div>
        </header>
        <main className="flex h-full overflow-hidden px-3 pt-3 min-w-0">
          {children}
        </main>
      </section>
    </section>
  );
}
