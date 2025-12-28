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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold">ML Canvas</h1>
        <p className="text-xl text-slate-300">
          Learn Machine Learning by understanding data, not black-box training.
        </p>
        <p className="text-lg text-slate-400">
          Explore datasets, visualize patterns, and build ML models
          interactively.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <a
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
            Get Started
          </a>
          <a
            href="/lab"
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
