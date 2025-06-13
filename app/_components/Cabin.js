import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";
import {
  BuildingOffice2Icon,
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { getTranslation } from "../_lib/server-i18n";

async function Cabin({ cabin }) {
  const t = await getTranslation();
  const { roomId, roomNumber, capacity, buildingId, photoUrls } = cabin;
  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative scale-[1.15] -translate-x-3">
        <Image
          fill
          className="object-cover"
          src={`http://housing-sys.runasp.net${photoUrls}`}
          alt={`Cabin ${roomNumber}`}
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
          {t?.room?.h1} {roomNumber}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{t?.room?.description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <BuildingOffice2Icon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              {t?.room?.building}{" "}
              <span className="font-bold">{buildingId}</span>
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              {t?.room?.for} <span className="font-bold">{capacity}</span>{" "}
              {t?.room?.guests}
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              {t?.room?.located}{" "}
              <span className="font-bold">{t?.room?.uni}</span>
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              {t?.room?.privacy}{" "}
              <span className="font-bold">{t?.room?.hun}</span>{" "}
              {t?.room?.guaranteed}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
