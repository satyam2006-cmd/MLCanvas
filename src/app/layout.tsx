
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ml-canvas-silk.vercel.app"),
  title: "ML Canvas – Learn Machine Learning Visually",
  description:
    "ML Canvas helps you understand machine learning preprocessing, models, and data pipelines interactively.",
  keywords: [
    "machine learning",
    "data science",
    "ml education",
    "preprocessing",
    "ml visualization",
  ],
  verification: {
    google: "XAsFzvZKkTmjfoYPDoFbwaTrWPiYbfksKmfuo-9LV-8",
  },
  openGraph: {
    title: "ML Canvas",
    description: "Learn ML by understanding data, not black-box training.",
    url: "https://ml-canvas-silk.vercel.app",
    siteName: "ML Canvas",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-body antialiased",
        inter.variable,
        spaceGrotesk.variable
      )}
    >
      <body suppressHydrationWarning className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>{children}</FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

