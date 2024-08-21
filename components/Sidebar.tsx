"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link className="mb-12 flex cursor-pointer items-center gap-2" href="/">
          <Image
            src="icons/logo.svg"
            alt="logo"
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              href={item.route}
              key={item.label}
            >
              <div className="relative size-6">
                <Image src={item.imgURL} alt={item.label} fill className={cn({'brightness-[3] invert-0': isActive})} />
              </div>
              <p className={cn('sidebar-label', {'!text-white':isActive})}>{item.label}</p>
            </Link>
          );
        })}

        {/* USER */}
      </nav>
      {/* FOOTER */}
    </section>
  );
};

export default Sidebar;
