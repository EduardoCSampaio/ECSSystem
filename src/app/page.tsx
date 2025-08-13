'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { WebsiteShowcase } from '@/components/website-showcase';
import { PhotoGallery } from '@/components/photo-gallery';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { useState, useEffect } from 'react';
import type { PortfolioContent } from '@/lib/types';
import { getContent } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
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
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <AppHeader />
        <main className="flex-1 container mx-auto py-16 sm:py-24 space-y-24">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[600px] w-full" />
          <Skeleton className="h-[500px] w-full" />
        </main>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <PersonalIntroduction content={content.home.introduction} />
        <WebsiteShowcase content={content.home.websites} />
        <PhotoGallery content={content.home.gallery} />
      </main>
      <AppFooter />
    </div>
  );
}