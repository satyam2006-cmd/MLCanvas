import { Metadata } from "next";
import PlaygroundClientPage from "./page-client";

export const metadata: Metadata = {
  title: "ML Playground | ML Canvas",
  description:
    "Interactive playground to preprocess data and train machine learning models.",
  alternates: {
    canonical: "/playground",
  },
  robots: "noindex, follow",
};

export default function PlaygroundPage() {
  return <PlaygroundClientPage />;
}
