import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";
import { getTranslation } from "../_lib/server-i18n";

export const metadata = {
  title: "About",
};

export const revalidate = 86400;

export default async function Page() {
  const t = await getTranslation();
  const cabins = await getCabins();
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          {t?.about?.first?.h1}
        </h1>

        <div className="space-y-8">
          <p>{t?.about?.first?.p}</p>
        </div>
      </div>

      <div className=" relative aspect-square col-span-2">
        <Image
          fill
          className="object-cover"
          placeholder="blur"
          quality={80}
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className=" relative aspect-square col-span-2">
        <Image
          fill
          className="object-cover"
          placeholder="blur"
          quality={80}
          src={image2}
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          {t?.about?.second?.h1}
        </h1>

        <div className="space-y-8">
          <p>{t?.about?.second?.p}</p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              {t?.about?.second?.button}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
