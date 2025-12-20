"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileSearch2,
  BrainCircuit,
  FlaskConical,
  Github,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/icons";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/eda",
    label: "EDA Studio",
    icon: FileSearch2,
  },
  {
    href: "/playground",
    label: "Playground",
    icon: BrainCircuit,
  },
  {
    href: "/lab",
    label: "Learning Lab",
    icon: FlaskConical,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-6 text-primary" />
          <span className="text-lg font-headline font-semibold">ML Canvas</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                href={item.href}
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              href="https://github.com/satyam2006-cmd/MLCanvas" 
              target="_blank"
              rel="noopener noreferrer"
              tooltip="View on GitHub"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
