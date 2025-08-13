'use client';

import { WebsiteShowcase } from '@/components/website-showcase';
import content from '@/data/content.json';

export default function ProjetosPage() {
  return (
    <div>
      <WebsiteShowcase content={content.projects.websites} />
    </div>
  );
}
