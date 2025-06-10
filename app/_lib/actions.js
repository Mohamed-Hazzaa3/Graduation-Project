"use server";

// import { revalidatePath } from "next/cache";
// import { auth, signIn, signOut } from "./auth";
// import { supabase } from "./supabase";
// import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// export async function updateProfile(formData) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   const nationalID = formData.get("nationalID");
//   const [nationality, countryFlag] = formData.get("nationality").split("%");

//   if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
//     throw new Error("Please Provide a valid national ID");

//   const updateData = { nationality, countryFlag, nationalID };

//   const { data, error } = await supabase
//     .from("guests")
//     .update(updateData)
//     .eq("id", session.user.guestId);

//   if (error) throw new Error("Guest could not be updated");

//   revalidatePath("/account/profile"); //to make data fresh
// }

// export async function createBooking(bookingData, formData) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   const newBooking = {
//     ...bookingData,
//     guestId: session.user.guestId,
//     numGuests: Number(formData.get("numGuests")),
//     observations: formData.get("observations").slice(0, 1000),
//     extraPrice: 0,
//     totalPrice: bookingData.cabinPrice,
//     isPaid: false,
//     hasBreakfast: false,
//     status: "unconfirmed",
//   };

//   const { error } = await supabase.from("bookings").insert([newBooking]);

//   if (error) throw new Error("Booking could not be created");

//    revalidatePath(`/cabins/${bookingData.cabinId}`);

//   redirect("/cabins/thankYou");
// }
// export async function deleteBooking(bookingId) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   // check if the user who delete
//   const guestBookings = await getBookings(session.user.guestId);
//   const guestBookingIds = guestBookings.map((booking) => bookingId);

//   if (!guestBookingIds.includes(bookingId))
//     throw new Error("You are not allowd to delete this booking");

//   const { error } = await supabase
//     .from("bookings")
//     .delete()
//     .eq("id", bookingId);

//   if (error) throw new Error("Booking could not be deleted");

//   revalidatePath("account/reservations");
// }
// export async function updateBooking(formData) {
//   const bookingId = Number(formData.get("bookingId"));
//   //authentication
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   //authorization
//   // check if the user who delete
//   const guestBookings = await getBookings(session.user.guestId);
//   const guestBookingIds = guestBookings.map((booking) => bookingId);

//   if (!guestBookingIds.includes(bookingId))
//     throw new Error("You are not allowd to update this booking");

//   //building update data
//   const updateData = {
//     numGuests: Number(formData.get("numGuests")),
//     observations: formData.get("observations").slice(0, 1000),
//   };

//   //mutate
//   const { error } = await supabase
//     .from("bookings")
//     .update(updateData)
//     .eq("id", bookingId)
//     .select()
//     .single();

//   if (error) throw new Error("Booking could not be updated");

//   //revalidation
//   revalidatePath("/account/reservations");
//   revalidatePath(`/account/reservations/edit/${bookingId}`);

//   //redirecting
//   redirect(`/account/reservations`);
// }
// export async function signInAction() {
//   await signIn("google", { redirectTo: "/account" }); //لو كذا بروفايدر بعمل لوب عليهم
// }
export async function signOutAction() {
  cookies().delete("token");
  redirect("/login");
}
