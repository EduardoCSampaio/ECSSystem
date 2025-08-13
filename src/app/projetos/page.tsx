
'use client';

import { WebsiteShowcase } from '@/components/website-showcase';
import content from '@/data/content.json';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export default function ProjetosPage() {
  return (
     <>
      <AppHeader />
      <main>
        <WebsiteShowcase content={content.projects.websites} />
      </main>
      <AppFooter />
    </>
  );
}
