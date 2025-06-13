import PasswordForm from "@/app/_components/PasswordForm";

import { getTranslation } from "@/app/_lib/server-i18n";
import { cookies } from "next/headers";

export const metadata = {
  title: "Change-Password",
};
export default async function Page() {
  const t = await getTranslation();
  const cookie = await cookies();
  const token = cookie.get("token");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        {t?.student?.password?.h1}
      </h2>

      <PasswordForm token={token}></PasswordForm>
    </div>
  );
}
