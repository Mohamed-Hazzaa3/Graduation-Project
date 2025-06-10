import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import {
  getCabin,
  getCabins,
  getColleges,
  getCountry,
  getGovernorates,
  getSchools,
} from "@/app/_lib/data-service";
import { getTranslation } from "@/app/_lib/server-i18n";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Room ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}
export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  const country = await getCountry();
  const governorates = await getGovernorates();
  const schools = await getSchools();
  const colleges = await getColleges();

  const t = await getTranslation();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          {t?.room?.header?.reserve} {cabin.name} {t?.room?.header?.today}
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation
            country={country}
            governorates={governorates}
            schools={schools}
            colleges={colleges}
            cabin={cabin}
          />
        </Suspense>
      </div>
    </div>
  );
}
