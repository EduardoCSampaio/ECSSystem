'use client';

import { ContactForm } from '@/components/contact-form';

const contactContent = {
  contact: {
    title: 'Fale Conosco',
  },
};

export default function ContatoPage() {
  return (
    <div>
      <ContactForm content={contactContent.contact} />
    </div>
  );
}
