import { Metadata } from "next";
import EdaClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Exploratory Data Analysis | ML Canvas",
  description:
    "Explore and analyze your datasets with interactive visualizations and statistical insights.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EdaPage() {
  return <EdaClientPage />;
}
