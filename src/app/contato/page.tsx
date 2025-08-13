
'use client';

import { ContactForm } from '@/components/contact-form';
import content from '@/data/content.json';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';


export default function ContatoPage() {
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
