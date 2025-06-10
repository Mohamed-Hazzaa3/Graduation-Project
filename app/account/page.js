import { getTranslation } from "../_lib/server-i18n";
import { cookies } from "next/headers";

export const metadata = {
  title: "Guest area",
};
export default async function Page() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  const user = cookie
    .get("user")
    ?.value.split("@")[0]
    .split(/[^a-zA-Z]/)[0];
  const name = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
  const formData = new FormData();
  formData.append("AccessToken", token);
  const res = await fetch(
    "http://housing-sys.runasp.net/api/v1/authentication/validateToken",
    {
      method: "POST",
      body: formData,
    }
  );

  const t = await getTranslation();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      {t?.student?.home?.h1},{name}
    </h2>
  );
}
