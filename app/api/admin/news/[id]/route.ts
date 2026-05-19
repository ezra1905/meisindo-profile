import { checkAdminRequest } from "@/lib/news-admin";
import {
  deleteNewsArticle,
  NewsNotFoundError,
  NewsValidationError,
  updateNewsArticle,
} from "@/lib/news";

export const runtime = "nodejs";

function parseJson(request: Request) {
  return request.json().catch(() => null);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const unauthorized = checkAdminRequest(request);

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;

  try {
    const article = await updateNewsArticle(id, await parseJson(request));
    return Response.json({ article });
  } catch (error) {
    if (error instanceof NewsValidationError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof NewsNotFoundError) {
      return Response.json({ error: error.message }, { status: 404 });
    }

    throw error;
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const unauthorized = checkAdminRequest(request);

  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;

  try {
    await deleteNewsArticle(id);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof NewsNotFoundError) {
      return Response.json({ error: error.message }, { status: 404 });
    }

    throw error;
  }
}
