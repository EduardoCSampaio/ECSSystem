'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { WebsiteShowcase } from '@/components/website-showcase';
import { PhotoGallery } from '@/components/photo-gallery';
import content from '@/data/content.json';


export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <PersonalIntroduction content={content.home.introduction} />
      <WebsiteShowcase content={content.home.websites} />
      <PhotoGallery content={content.home.gallery} />
    </div>
  );
}
