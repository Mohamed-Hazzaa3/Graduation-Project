export async function POST(req) {
  try {
    const body = await req.formData();

    const response = await fetch(
      "https://housing-sys.runasp.net/api/StudentRegistration/request-code",
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
