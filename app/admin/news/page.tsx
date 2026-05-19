import type { Metadata } from "next";
import NewsAdmin from "./NewsAdmin";

export const metadata: Metadata = {
  title: "Admin Berita | Meisindo Karya Semesta",
};

export default function AdminNewsPage() {
  return <NewsAdmin />;
}
