import Link from "next/link";

import Translate from "./Translate";
import { getTranslation } from "../_lib/server-i18n";

export default async function Navigation() {
  const t = await getTranslation();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <Translate />
        <li>
          <Link
            href="/payment"
            className="hover:text-accent-400 transition-colors"
          >
            {t?.nav?.pay}
          </Link>
        </li>
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            {t?.nav?.rooms}
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            {t?.nav?.about}
          </Link>
        </li>
        <li>
          {/* {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>{t?.nav?.student}</span>
            </Link>
          ) : ( */}
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            {t?.nav?.student}
          </Link>
          {/* )} */}
        </li>
      </ul>
    </nav>
  );
}
