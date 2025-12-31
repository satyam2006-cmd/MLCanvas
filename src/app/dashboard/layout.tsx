'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { CsvDataProvider } from '@/contexts/csv-data-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-background">
        <Header />
        <main className="p-4 lg:p-6">
          <CsvDataProvider>{children}</CsvDataProvider>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

