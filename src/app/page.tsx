'use client';

import { useState } from 'react';
import { type PortfolioContent } from '@/lib/types';

import { AppHeader } from '@/components/app-header';
import { PersonalIntroduction } from '@/components/personal-introduction';
import { WebsiteShowcase } from '@/components/website-showcase';
import { PhotoGallery } from '@/components/photo-gallery';
import { ContactForm } from '@/components/contact-form';
import { AppFooter } from '@/components/app-footer';

const initialContent: PortfolioContent = {
  header: {
    title: 'E&S Business and Software',
  },
  introduction: {
    name: 'E&S Business and Software',
    profession: 'Soluções em Software e Consultoria de Negócios',
    about:
      'Olá! Nós somos a E&S, uma empresa apaixonada por transformar ideias em realidade, seja através de linhas de código ou de estratégias de negócio. Explore nosso trabalho e vamos criar algo incrível juntos.',
    avatar: '/logo.png',
  },
  websites: {
    title: 'Nossos Projetos',
    items: [
      {
        id: 'site1',
        title: 'E-commerce de Moda',
        description:
          'Uma plataforma de e-commerce moderna e responsiva construída com Next.js e Shopify, focada na experiência do usuário.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site2',
        title: 'Blog de Viagens',
        description:
          'Um blog pessoal para compartilhar histórias e fotos de viagens, com um design limpo e focado em conteúdo.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site3',
        title: 'Landing Page para App',
        description:
          'Página de captura para um aplicativo móvel, projetada para maximizar conversões e apresentar o produto de forma eficaz.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
    ],
  },
  gallery: {
    title: 'Galeria',
    photos: [
      {
        id: 'photo1',
        src: 'https://placehold.co/600x400.png',
        alt: 'Descrição da foto 1',
        hint: 'nature landscape',
      },
      {
        id: 'photo2',
        src: 'https://placehold.co/600x400.png',
        alt: 'Descrição da foto 2',
        hint: 'city architecture',
      },
      {
        id: 'photo3',
        src: 'https://placehold.co/600x400.png',
        alt: 'Descrição da foto 3',
        hint: 'abstract texture',
      },
      {
        id: 'photo4',
        src: 'https://placehold.co/600x400.png',
        alt: 'Descrição da foto 4',
        hint: 'portrait person',
      },
      {
        id: 'photo5',
        src: 'https://placehold.co/600x400.png',
        alt: 'Descrição da foto 5',
        hint: 'animal wildlife',
      },
      {
        id: 'photo6',
        src: 'https://placehold.co/600x400.png',
        alt: 'Descrição da foto 6',
        hint: 'food delicious',
      },
    ],
  },
  contact: {
    title: 'Contato',
  },
};

export default function Home() {
  const [content, setContent] = useState<PortfolioContent>(initialContent);

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <AppHeader
        content={content}
        setContent={setContent}
        initialContent={initialContent}
      />
      <main className="flex-1">
        <PersonalIntroduction content={content.introduction} />
        <WebsiteShowcase content={content.websites} />
        <PhotoGallery content={content.gallery} />
        <ContactForm content={content.contact} />
      </main>
      <AppFooter />
    </div>
  );
}
