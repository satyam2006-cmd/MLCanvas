import { Metadata } from "next";
import PlaygroundClientPage from "./page-client";

export const metadata: Metadata = {
  title: "ML Playground | ML Canvas",
  description: "Interactive playground to preprocess data and train machine learning models.",
  alternates: {
    canonical: "/playground",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PlaygroundPage() {
  return <PlaygroundClientPage />;
}
