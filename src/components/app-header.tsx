'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/contato', label: 'Contato' },
  { href: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="ECS Logo" width={40} height={40} className="rounded-md" />
          <span className="text-xl font-bold text-foreground">ECS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] bg-background">
               <div className="flex flex-col gap-6 p-6">
                 <Link href="/" className="flex items-center gap-3 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="/logo.png" alt="ECS Logo" width={32} height={32} className="rounded-md" />
                    <span className="font-bold text-foreground">ECS Business & Software</span>
                 </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
