import { Metadata } from "next";
import EdaClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Exploratory Data Analysis | ML Canvas",
  description:
    "Explore and analyze your datasets with interactive visualizations and statistical insights.",
  alternates: {
    canonical: "/eda",
  },
  robots: "index, follow",
};

export default function EdaPage() {
  return <EdaClientPage />;
}
