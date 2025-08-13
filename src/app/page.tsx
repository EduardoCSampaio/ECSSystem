
'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { WebsiteShowcase } from '@/components/website-showcase';
import { PhotoGallery } from '@/components/photo-gallery';
import content from '@/data/content.json';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';


export default function Home() {
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
