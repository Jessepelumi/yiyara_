"use client";

import {
  MagnifyingGlassIcon,
  NetworkIcon,
  SidebarSimpleIcon,
  SparkleIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarItem } from "./sidebarItem";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  return (
    <section className="hidden h-dvh w-1/5 border-r px-3.5 py-5 lg:flex flex-col justify-between">
      <div className="flex flex-col gap-7">
        <div className="flex justify-between items-center">
          <SidebarSimpleIcon size={20} />

          <MagnifyingGlassIcon size={18} />
        </div>

        <nav className="flex flex-col gap-3">
          <SidebarItem icon={SparkleIcon} text="New Prompt" href="/home" />
          <SidebarItem icon={TargetIcon} text="Objectives" href="/goals" />
          <SidebarItem icon={NetworkIcon} text="Goal Connections" href="" />
        </nav>
      </div>

      <div></div>
    </section>
  );
};

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <section
      ref={sidebarRef}
      className={`block z-10 fixed bg-white border-r px-7 py-12 h-dvh w-4/5 max-w-xs lg:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transform transition-transform duration-300`}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <div className="flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <SidebarSimpleIcon size={20} />

            <MagnifyingGlassIcon size={18} />
          </div>

          <nav className="flex flex-col gap-3">
            <SidebarItem icon={SparkleIcon} text="New Prompt" href="/home" />
            <SidebarItem icon={TargetIcon} text="Objectives" href="/goals" />
            <SidebarItem icon={NetworkIcon} text="Goal Connections" href="" />
          </nav>
        </div>

        <div></div>
      </div>
    </section>
  );
};
