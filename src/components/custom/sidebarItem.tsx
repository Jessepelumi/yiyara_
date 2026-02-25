"use client";

import { IconProps } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: React.ElementType<IconProps>;
  text: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, text, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname == href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${isActive ? "bg-blue-100 " : "hover:bg-blue-50"}`}
      >
        <Icon
          size={20}
          className={`${isActive ? "text-gray-700" : "text-gray-500"}`}
        />
        <p
          className={`text-sm ${isActive ? "text-gray-700" : "text-gray-500"}`}
        >
          {text}
        </p>
      </div>
    </Link>
  );
};
