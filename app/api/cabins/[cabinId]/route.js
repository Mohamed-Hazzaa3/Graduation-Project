import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  console.log("Params:", params);
  console.log("Cabin ID:", cabinId);
  if (!cabinId) {
    return Response.json({ message: "Cabin ID is required" }, { status: 400 });
  }
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    console.log("Cabin:", cabin);
    console.log("Booked Dates:", bookedDates);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
// export async function POST(){

// }
