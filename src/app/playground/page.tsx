import { Metadata } from "next";
import PlaygroundClientPage from "./page-client";

export const metadata: Metadata = {
  title: "ML Playground | ML Canvas",
  description:
    "Interactive playground to preprocess data and train machine learning models.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlaygroundPage() {
  return <PlaygroundClientPage />;
}
