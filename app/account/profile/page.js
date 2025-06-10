import IssueForm from "@/app/_components/IssueForm";
import { getIssueType } from "@/app/_lib/data-service";

import { getTranslation } from "@/app/_lib/server-i18n";
import { cookies } from "next/headers";

export const metadata = {
  title: "Update profile",
};
export default async function Page() {
  const t = await getTranslation();
  const issueTypes = await getIssueType();
  const cookie = await cookies();

  const token = cookie.get("token");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        {t?.student?.profile?.h1}
      </h2>

      <p className="text-lg mb-8 text-primary-200">{t?.student?.profile?.p}</p>

      <IssueForm issueTypes={issueTypes} token={token}></IssueForm>
    </div>
  );
}
