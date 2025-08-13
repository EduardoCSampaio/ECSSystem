'use client';

import { ContactForm } from '@/components/contact-form';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { useState, useEffect } from 'react';
import type { PortfolioContent } from '@/lib/types';
import { getContent } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContatoPage() {
  const [content, setContent] = useState<PortfolioContent | null>(null);

  useEffect(() => {
    async function loadContent() {
      const pageContent = await getContent();
      setContent(pageContent);
    }
    loadContent();
  }, []);

  if (!content) {
    return (
       <>
        <AppHeader />
        <main className='py-16 sm:py-24'>
          <div className="container mx-auto max-w-2xl">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </main>
        <AppFooter />
      </>
    )
  }

  return (
    <>
      <AppHeader />
      <main>
        <ContactForm content={content.contact} />
      </main>
      <AppFooter />
    </>
  );
}