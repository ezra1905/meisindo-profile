import { checkAdminRequest } from "@/lib/news-admin";
import {
  createNewsArticle,
  getAllNews,
  NewsValidationError,
} from "@/lib/news";

export const runtime = "nodejs";

function parseJson(request: Request) {
  return request.json().catch(() => null);
}

export async function GET(request: Request) {
  const unauthorized = checkAdminRequest(request);

  if (unauthorized) {
    return unauthorized;
  }

  const news = await getAllNews();

  return Response.json(
    { news },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  const unauthorized = checkAdminRequest(request);

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const article = await createNewsArticle(await parseJson(request));
    return Response.json({ article }, { status: 201 });
  } catch (error) {
    if (error instanceof NewsValidationError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    throw error;
  }
}
