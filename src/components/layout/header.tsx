'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sun, Moon, Github } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import Link from 'next/link';

const contributors = [
  {
    name: 'Satyam',
    avatar: 'https://avatars.githubusercontent.com/u/188743121?v=4',
    github: 'https://github.com/satyam2006-cmd'
  }
  // Add more contributors here when needed
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="font-headline text-lg font-semibold">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground hidden md:inline">Contributors</span>
        {contributors.map((contributor, index) => (
          <Link 
            key={index}
            href={contributor.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
            title={contributor.name}
          >
            <Avatar className="h-8 w-8 border-2 border-background hover:border-primary transition-colors">
              <AvatarImage
                src={contributor.avatar}
                alt={contributor.name}
              />
              <AvatarFallback>
                {contributor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </div>
    </header>
  );
}
