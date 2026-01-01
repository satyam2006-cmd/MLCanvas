'use client';
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-background min-w-0">
        <Header />
        <main className="p-4 lg:p-6 min-w-0 overflow-x-hidden">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
