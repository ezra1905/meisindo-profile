import { getPublishedNews } from "@/lib/news";

export const runtime = "nodejs";

export async function GET() {
  const news = await getPublishedNews();

  return Response.json(
    { news },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
