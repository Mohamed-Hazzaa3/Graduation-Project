import ReservationContent from "./ReservationContent";

export default async function Reservation({
  cabin,
  country,
  governorates,
  schools,
  colleges,
}) {
  // const [settings, bookedDates] = await Promise.all([
  //   // getSettings(),
  //   // getBookedDatesByCabinId(cabin.id),
  // ]);
  // const session = await auth();

  return (
    <ReservationContent
      country={country}
      governorates={governorates}
      schools={schools}
      colleges={colleges}
      cabin={cabin}
      // session={session}
    />
  );
}
