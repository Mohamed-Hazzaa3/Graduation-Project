import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { getTranslation } from "../_lib/server-i18n";

async function CabinCard({ cabin }) {
  const t = await getTranslation();
  const { roomId, roomNumber, capacity, price, discount, photoUrls } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="relative flex-1">
        <Image
          src={`http://housing-sys.runasp.net${photoUrls}`}
          fill
          alt={`Cabin ${roomNumber}`}
          className=" object-cover border-r border-primary-800"
        />
      </div>
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            {t?.rooms?.["room-card"]?.room} {roomNumber}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              {t?.rooms?.["room-card"]?.for}{" "}
              <span className="font-bold">{capacity}</span>{" "}
              {t?.rooms?.["room-card"]?.student}
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">${price}</span>
                <span className="line-through font-semibold text-primary-600">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${price}</span>
            )}
            <span className="text-primary-200">
              / {t?.rooms?.["room-card"]?.night}
            </span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${roomId}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            {t?.rooms?.["room-card"]?.details} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
