import { redirect } from 'next/navigation';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ML Canvas — Learn Machine Learning by Doing",
  description: "Understand datasets, preprocessing, and ML models transparently.",
  alternates: {
    canonical: "/",
  },
  robots: "index, follow",
};

export default function Home() {
  redirect('/dashboard');
}
