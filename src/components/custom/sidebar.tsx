"use client";

import {
  MagnifyingGlassIcon,
  NetworkIcon,
  SidebarSimpleIcon,
  SparkleIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarItem } from "./sidebarItem";

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

export const MobileSidebar = () => {
  return (
    <section>
      <div></div>
    </section>
  );
};
