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
    profession: 'Inovação em Software e Estratégia de Negócios',
    about:
      'Na E&S, unimos tecnologia de ponta e consultoria especializada para impulsionar o crescimento do seu negócio. Transformamos ideias em soluções digitais robustas e estratégias de mercado eficazes.',
    avatar: '/logo.png',
  },
  websites: {
    title: 'Nossos Projetos de Destaque',
    items: [
      {
        id: 'site1',
        title: 'Plataforma E-commerce Enterprise',
        description:
          'Solução de e-commerce escalável com integração a múltiplos sistemas de ERP e CRM, otimizada para alta performance e conversão.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site2',
        title: 'Sistema de Gestão (SaaS)',
        description:
          'Desenvolvimento de uma plataforma SaaS para gestão de processos internos, resultando em um aumento de 30% na eficiência operacional.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site3',
        title: 'Aplicativo Mobile B2B',
        description:
          'Criação de um aplicativo móvel para otimização da força de vendas, com funcionalidades offline e sincronização em tempo real.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
    ],
  },
  gallery: {
    title: 'Nossa Cultura e Espaço',
    photos: [
      {
        id: 'photo1',
        src: 'https://placehold.co/600x400.png',
        alt: 'Equipe em colaboração',
        hint: 'team meeting',
      },
      {
        id: 'photo2',
        src: 'https://placehold.co/600x400.png',
        alt: 'Escritório moderno',
        hint: 'modern office',
      },
      {
        id: 'photo3',
        src: 'https://placehold.co/600x400.png',
        alt: 'Evento da empresa',
        hint: 'corporate event',
      },
      {
        id: 'photo4',
        src: 'https://placehold.co/600x400.png',
        alt: 'Sessão de brainstorming',
        hint: 'whiteboard brainstorming',
      },
      {
        id: 'photo5',
        src: 'https://placehold.co/600x400.png',
        alt: 'Detalhe da arquitetura do escritório',
        hint: 'office architecture',
      },
      {
        id: 'photo6',
        src: 'https://placehold.co/600x400.png',
        alt: 'Momentos de descontração da equipe',
        hint: 'team coffee',
      },
    ],
  },
  contact: {
    title: 'Fale Conosco',
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
