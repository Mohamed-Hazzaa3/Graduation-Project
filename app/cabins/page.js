import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
import { getTranslation } from "../_lib/server-i18n";

export const metadata = {
  title: "Rooms",
};

export const revalidate = 3600;

export default async function Page({ searchParams }) {
  const t = await getTranslation();
  const { capacity } = await searchParams;
  const filter = capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        {t?.rooms?.header?.h1}
      </h1>
      <p className="text-primary-200 text-lg mb-10">{t?.rooms?.header?.p}</p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
