import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ML Canvas – Learn Machine Learning Visually",
  description: "Learn ML by understanding data, not black-box training.",
  alternates: {
    canonical: "/",
  },
  robots: "index, follow",
};

export default function Home() {
  redirect("/dashboard");
}
