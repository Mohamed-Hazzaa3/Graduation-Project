import { getTranslation } from "@/app/_lib/server-i18n";
import Image from "next/image";
import image from "@/public/events2.jpg";
import { getEvents } from "@/app/_lib/data-service";

export const metadata = {
  title: "Events",
};

export default async function Page() {
  const t = await getTranslation();
  const events = await getEvents();
  console.log(events);

  return (
    <div>
      <div className="flex border-primary-800 border">
        <div className="relative flex-1">
          <Image
            src={image}
            fill
            alt="Events"
            className=" object-cover border-r border-primary-800"
          />
        </div>
        <div className="flex-grow">
          <div className="pt-5 pb-4 px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold text-2xl mb-3">
              {t?.student?.events?.card1?.name}
            </h3>

            <p className="flex gap-3 justify-end items-baseline">
              <>
                <span className="text-xl font-semibold text-primary-600">
                  15/6/2025
                </span>
              </>
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-primary-800 border my-7">
        <div className="relative flex-1">
          <Image
            src={image}
            fill
            alt="Events"
            className=" object-cover border-r border-primary-800"
          />
        </div>
        <div className="flex-grow">
          <div className="pt-5 pb-4 px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold text-2xl mb-3">
              {t?.student?.events?.card2?.name}
            </h3>

            <p className="flex gap-3 justify-end items-baseline">
              <>
                <span className="text-xl font-semibold text-primary-600">
                  30/7/2025
                </span>
              </>
            </p>
          </div>
        </div>
      </div>
      {events.map((event) => (
        <div
          key={event.eventId}
          className="flex border-primary-800 border my-7"
        >
          <div className="relative flex-1">
            <Image
              src={image}
              fill
              alt="Events"
              className=" object-cover border-r border-primary-800"
            />
          </div>
          <div className="flex-grow">
            <div className="pt-5 pb-4 px-7 bg-primary-950">
              <h3 className="text-accent-500 font-semibold text-2xl mb-3">
                {event.title}
              </h3>

              <p className="flex gap-3 justify-end items-baseline">
                <>
                  <span className="text-xl font-semibold text-primary-600">
                    {event.date}
                  </span>
                </>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
