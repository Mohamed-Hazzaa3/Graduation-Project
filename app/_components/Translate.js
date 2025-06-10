"use client";

import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import i18next from "i18next";
import "../_lib/i18n.js";

export default function Translate() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const direction = i18next.dir(i18n.language);
    document.documentElement.dir = direction;
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      Cookies.set("i18next", lang, { path: "/" });
      router.refresh();
    }
  };

  if (!mounted) return null;

  return (
    <li className="border border-gray-300 rounded-full px-3 py-1 bg-slate-500 ">
      <button
        onClick={() => changeLanguage("ar")}
        className="hover:text-accent-100 text-slate-100 transition-colors text-xs"
      >
        AR
      </button>
      <span>/</span>
      <button
        onClick={() => changeLanguage("en")}
        className="hover:text-accent-100 text-slate-100 transition-colors text-xs"
      >
        EN
      </button>
    </li>
  );
}
