export async function POST(req) {
  try {
    const body = await req.formData(); // لأنك بتستخدم FormData

    const response = await fetch(
      "http://housing-sys.runasp.net/api/StudentRegistration/request-code",
      {
        method: "POST",
        body: body,
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
