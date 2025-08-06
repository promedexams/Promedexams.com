export async function GET(request: Request) {
  const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

  return new Response(JSON.stringify(availableTimes), {
    headers: { "Content-Type": "application/json" },
  });
}
