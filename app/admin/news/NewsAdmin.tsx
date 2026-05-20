"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Edit3,
  Eye,
  ImageIcon,
  Loader2,
  LogOut,
  LogIn,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

type NewsStatus = "draft" | "published";

type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  status: NewsStatus;
  updatedAt: string;
};

type NewsForm = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  status: NewsStatus;
};

const passwordStorageKey = "meisindo-news-admin-password";

const emptyForm: NewsForm = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Company News",
  image: "/Hero.png",
  publishedAt: new Date().toISOString().slice(0, 10),
  status: "published",
};

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 90) || "berita"
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Terbaru" : dateFormatter.format(date);
}

function toDateInput(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? new Date().toISOString().slice(0, 10)
    : date.toISOString().slice(0, 10);
}

function articleToForm(article: NewsArticle): NewsForm {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    image: article.image,
    publishedAt: toDateInput(article.publishedAt),
    status: article.status,
  };
}

async function readJson(response: Response) {
  const body = (await response.json().catch(() => ({}))) as {
    error?: string;
    news?: NewsArticle[];
    article?: NewsArticle;
    url?: string;
  };

  if (!response.ok) {
    throw new Error(body.error || "Request gagal diproses.");
  }

  return body;
}

export default function NewsAdmin() {
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [form, setForm] = useState<NewsForm>(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const selectedArticle = useMemo(
    () => news.find((article) => article.id === form.id),
    [form.id, news],
  );

  function applySavedArticle(savedArticle: NewsArticle) {
    setNews((current) => {
      const exists = current.some((article) => article.id === savedArticle.id);
      const nextNews = exists
        ? current.map((article) =>
            article.id === savedArticle.id ? savedArticle : article,
          )
        : [savedArticle, ...current];

      return nextNews.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      );
    });
    setForm(articleToForm(savedArticle));
  }

  function getFormPayload(imageUrl = form.image) {
    return {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      image: imageUrl,
      publishedAt: form.publishedAt,
      status: form.status,
    };
  }

  async function loadNews(nextPassword = password) {
    if (!nextPassword) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/news", {
        cache: "no-store",
        headers: {
          "x-admin-password": nextPassword,
        },
      });
      const body = await readJson(response);
      setNews(body.news ?? []);
      setIsAuthenticated(true);
      setPassword(nextPassword);
      window.localStorage.setItem(passwordStorageKey, nextPassword);
    } catch (requestError) {
      setIsAuthenticated(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Tidak bisa memuat berita.",
      );
      window.localStorage.removeItem(passwordStorageKey);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const savedPassword = window.localStorage.getItem(passwordStorageKey);

    if (!savedPassword) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadNews(savedPassword);
    }, 0);

    return () => window.clearTimeout(timeoutId);
    // loadNews intentionally reads current component state only when called.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setForm({
      ...emptyForm,
      publishedAt: new Date().toISOString().slice(0, 10),
    });
    setMessage("");
    setError("");
  }

  function handleLogout() {
    window.localStorage.removeItem(passwordStorageKey);
    setPassword("");
    setLoginPassword("");
    setIsAuthenticated(false);
    setNews([]);
    setForm({
      ...emptyForm,
      publishedAt: new Date().toISOString().slice(0, 10),
    });
    setMessage("");
    setError("");
  }

  function updateForm(field: keyof NewsForm, value: string) {
    setForm((current) => {
      if (field === "title" && (!current.slug || current.slug === slugify(current.title))) {
        return {
          ...current,
          title: value,
          slug: slugify(value),
        };
      }

      if (field === "status") {
        return {
          ...current,
          status: value === "draft" ? "draft" : "published",
        };
      }

      if (field === "slug") {
        return {
          ...current,
          slug: slugify(value),
        };
      }

      return {
        ...current,
        [field]: value,
      };
    });
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadNews(loginPassword.trim());
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsUploadingImage(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/news/upload", {
        method: "POST",
        headers: {
          "x-admin-password": password,
        },
        body: formData,
      });
      const body = await readJson(response);

      if (!body.url) {
        throw new Error("Upload berhasil, tapi URL gambar tidak ditemukan.");
      }

      if (!form.id) {
        updateForm("image", body.url);
        setMessage("Gambar berhasil diupload. Simpan berita untuk menerapkan.");
        return;
      }

      const updateResponse = await fetch(`/api/admin/news/${form.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(getFormPayload(body.url)),
      });
      const updateBody = await readJson(updateResponse);

      if (!updateBody.article) {
        throw new Error("Gambar terupload, tapi berita gagal diperbarui.");
      }

      applySavedArticle(updateBody.article);
      setMessage("Gambar berhasil diupload dan berita sudah diperbarui.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Gambar gagal diupload.",
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");

    const payload = getFormPayload();

    try {
      const response = await fetch(
        form.id ? `/api/admin/news/${form.id}` : "/api/admin/news",
        {
          method: form.id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": password,
          },
          body: JSON.stringify(payload),
        },
      );
      const body = await readJson(response);
      const savedArticle = body.article;

      if (!savedArticle) {
        throw new Error("Berita tersimpan, tapi response tidak lengkap.");
      }

      applySavedArticle(savedArticle);
      setMessage("Berita berhasil disimpan.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Berita gagal disimpan.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(article: NewsArticle) {
    const isConfirmed = window.confirm(
      `Hapus berita "${article.title}"? Tindakan ini tidak bisa dibatalkan.`,
    );

    if (!isConfirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/news/${article.id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": password,
        },
      });
      await readJson(response);
      setNews((current) => current.filter((item) => item.id !== article.id));

      if (form.id === article.id) {
        resetForm();
      }

      setMessage("Berita berhasil dihapus.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Berita gagal dihapus.",
      );
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#03143f] px-5 py-16 text-[#fff7ef]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_42px_rgba(237,106,23,0.12)]"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#ed6a17]">
            Admin
          </p>
          <h1 className="font-cinzel mb-6 text-3xl font-bold">
            Kelola Berita
          </h1>

          <label className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
            Password admin
          </label>
          <input
            type="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            className="mb-4 w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
            autoComplete="current-password"
          />

          {error ? (
            <p className="mb-4 rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading || !loginPassword.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ed6a17] px-5 py-3 font-bold text-[#03143f] transition hover:bg-[#ff9a45] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
            Masuk
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03143f] px-4 py-8 text-[#fff7ef] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#ed6a17]">
              Admin
            </p>
            <h1 className="font-cinzel text-3xl font-bold sm:text-4xl">
              Kelola Berita
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/news"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-[#fff7ef]/70 transition hover:border-[#ed6a17] hover:text-[#ed6a17]"
            >
              <Eye size={17} />
              Lihat Publik
            </Link>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-lg bg-[#ed6a17] px-4 py-3 text-sm font-bold text-[#03143f] transition hover:bg-[#ff9a45]"
            >
              <Plus size={17} />
              Berita Baru
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-red-400/25 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-400/10"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.35fr)]">
          <section className="rounded-lg border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="text-lg font-semibold">Daftar Berita</h2>
              <button
                type="button"
                onClick={() => void loadNews()}
                className="text-sm font-semibold text-[#ed6a17] transition hover:text-[#fff7ef]"
              >
                Refresh
              </button>
            </div>

            <div className="max-h-[720px] overflow-y-auto p-3">
              {news.length > 0 ? (
                <div className="space-y-3">
                  {news.map((article) => (
                    <article
                      key={article.id}
                      className={`rounded-lg border p-4 transition ${
                        form.id === article.id
                          ? "border-[#ed6a17]/70 bg-[#ed6a17]/10"
                          : "border-white/10 bg-[#020b26]/20 hover:border-white/25"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#ed6a17]">
                            {article.category}
                          </p>
                          <h3 className="line-clamp-2 font-semibold leading-snug">
                            {article.title}
                          </h3>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            article.status === "published"
                              ? "bg-emerald-400/15 text-emerald-200"
                              : "bg-white/10 text-[#fff7ef]/55"
                          }`}
                        >
                          {article.status === "published" ? "Published" : "Draft"}
                        </span>
                      </div>

                      <div className="mb-4 flex items-center gap-2 text-sm text-[#fff7ef]/45">
                        <Calendar size={14} />
                        {formatDate(article.publishedAt)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setForm(articleToForm(article))}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-[#fff7ef]/70 transition hover:border-[#ed6a17] hover:text-[#ed6a17]"
                        >
                          <Edit3 size={15} />
                          Edit
                        </button>
                        <Link
                          href={`/news/${article.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-[#fff7ef]/70 transition hover:border-[#ed6a17] hover:text-[#ed6a17]"
                        >
                          <Eye size={15} />
                          Preview
                        </Link>
                        <button
                          type="button"
                          onClick={() => void handleDelete(article)}
                          title="Hapus berita"
                          className="ml-auto inline-flex items-center justify-center rounded-lg border border-red-400/25 px-3 py-2 text-red-200 transition hover:bg-red-400/10"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-white/10 bg-[#020b26]/20 p-5 text-sm text-[#fff7ef]/55">
                  Belum ada berita.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.04]">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-lg font-semibold">
                {selectedArticle ? "Edit Berita" : "Tambah Berita"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                    Judul
                  </span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) => updateForm("title", event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                    Slug URL
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(event) => updateForm("slug", event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                    Kategori
                  </span>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      updateForm("category", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                    Tanggal
                  </span>
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(event) =>
                      updateForm("publishedAt", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                    Status
                  </span>
                  <select
                    value={form.status}
                    onChange={(event) => updateForm("status", event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                  Gambar
                </span>
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_190px]">
                  <input
                    type="text"
                    value={form.image}
                    onChange={(event) => updateForm("image", event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                    placeholder="/Hero.png"
                  />
                  <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#ed6a17]/40 px-4 py-3 text-sm font-semibold text-[#ed6a17] transition hover:bg-[#ed6a17]/10">
                    {isUploadingImage ? (
                      <Loader2 className="animate-spin" size={17} />
                    ) : (
                      <Upload size={17} />
                    )}
                    Attachment
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => void handleImageUpload(event)}
                      className="sr-only"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
              </label>

              {form.image ? (
                <div className="overflow-hidden rounded-lg border border-white/10 bg-[#020b26]/30">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-medium text-[#fff7ef]/60">
                    <ImageIcon size={16} />
                    Preview Gambar
                  </div>
                  <div className="relative h-56 w-full">
                    <Image
                      src={form.image}
                      alt="Preview gambar berita"
                      fill
                      sizes="(min-width: 1024px) 760px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                  Ringkasan
                </span>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => updateForm("excerpt", event.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#fff7ef]/70">
                  Isi Berita
                </span>
                <textarea
                  value={form.content}
                  onChange={(event) => updateForm("content", event.target.value)}
                  rows={13}
                  className="w-full resize-y rounded-lg border border-white/10 bg-[#020b26]/50 px-4 py-3 leading-7 text-[#fff7ef] outline-none transition focus:border-[#ed6a17]"
                  required
                />
              </label>

              {message ? (
                <p className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  {message}
                </p>
              ) : null}

              {error ? (
                <p className="rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-[#fff7ef]/70 transition hover:border-[#ed6a17] hover:text-[#ed6a17]"
                >
                  <Plus size={17} />
                  Form Baru
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ed6a17] px-6 py-3 text-sm font-bold text-[#03143f] transition hover:bg-[#ff9a45] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" size={17} />
                  ) : (
                    <Save size={17} />
                  )}
                  Simpan Berita
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
