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
        className={`flex items-center gap-3 rounded-lg p-2 ${isActive ? "bg-blue-200 text-white" : "hover:bg-blue-200 group hover:text-white"}`}
      >
        <Icon
          size={20}
          className={`${isActive ? "text-white" : "text-gray-500 group-hover:text-white"}`}
        />
        <p
          className={`text-mm ${isActive ? "text-white" : "text-gray-500 group-hover:text-white]:"}`}
        >
          {text}
        </p>
      </div>
    </Link>
  );
};
