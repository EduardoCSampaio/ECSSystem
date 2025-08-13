import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Inter } from 'next/font/google';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ECS Business and Software',
  description: 'Portfólio corporativo da ECS Business and Software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AppHeader />
        <main className="flex-1">{children}</main>
        <AppFooter />
        <Toaster />
      </body>
    </html>
  );
}
