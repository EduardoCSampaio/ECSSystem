
'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { PhotoGallery } from '@/components/photo-gallery';
import content from '@/data/content.json';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export default function SobrePage() {
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
