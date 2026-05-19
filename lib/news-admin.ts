const devFallbackPassword = "meisindo-admin";

function getAdminPassword() {
  if (process.env.NEWS_ADMIN_PASSWORD) {
    return process.env.NEWS_ADMIN_PASSWORD;
  }

  if (process.env.NODE_ENV !== "production") {
    return devFallbackPassword;
  }

  return "";
}

export function checkAdminRequest(request: Request) {
  const configuredPassword = getAdminPassword();

  if (!configuredPassword) {
    return Response.json(
      {
        error:
          "NEWS_ADMIN_PASSWORD belum diset di environment production.",
      },
      { status: 500 },
    );
  }

  const providedPassword = request.headers.get("x-admin-password")?.trim();

  if (providedPassword !== configuredPassword) {
    return Response.json(
      { error: "Password admin salah." },
      { status: 401 },
    );
  }

  return null;
}
