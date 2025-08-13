'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { PhotoGallery } from '@/components/photo-gallery';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { useState, useEffect } from 'react';
import type { PortfolioContent } from '@/lib/types';
import { getContent } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';


export default function SobrePage() {
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
        <main className="container mx-auto py-16 sm:py-24 space-y-24">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[500px] w-full" />
        </main>
        <AppFooter />
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <main>
        <PersonalIntroduction content={content.about.introduction} />
        <PhotoGallery content={content.about.gallery} />
      </main>
      <AppFooter />
    </>
  );
}