'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { PhotoGallery } from '@/components/photo-gallery';
import content from '@/data/content.json';

export default function SobrePage() {
  return (
    <div>
      <PersonalIntroduction content={content.about.introduction} />
      <PhotoGallery content={content.about.gallery} />
    </div>
  );
}
