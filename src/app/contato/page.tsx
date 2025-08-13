'use client';

import { ContactForm } from '@/components/contact-form';
import content from '@/data/content.json';


export default function ContatoPage() {
  return (
    <div>
      <ContactForm content={content.contact} />
    </div>
  );
}
