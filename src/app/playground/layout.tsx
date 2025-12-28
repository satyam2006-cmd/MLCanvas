'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Metadata } from "next";

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

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-background">
        <Header />
        <main className="p-4 lg:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
