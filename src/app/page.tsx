import { redirect } from 'next/navigation';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ML Canvas — Learn Machine Learning by Doing",
  description: "Understand datasets, preprocessing, and ML models transparently.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  redirect('/dashboard');
}
