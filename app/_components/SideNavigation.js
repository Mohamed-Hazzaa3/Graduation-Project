"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function SideNavigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const navLinks = [
    {
      name: mounted ? t("student.home.name") : "Home",
      href: "/account",
      icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
    },
    {
      name: mounted ? t("student.events.name") : "Events",
      href: "/account/newEvents",
      icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
    },
    {
      name: mounted ? t("student.profile.name") : "P  rofile",
      href: "/account/profile",
      icon: <UserIcon className="h-5 w-5 text-primary-600" />,
    },
  ];
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
