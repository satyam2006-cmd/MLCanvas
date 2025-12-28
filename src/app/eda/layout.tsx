'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exploratory Data Analysis | ML Canvas",
  description: "Explore and analyze your datasets with interactive visualizations and statistical insights.",
  alternates: {
    canonical: "/eda",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EdaLayout({
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
