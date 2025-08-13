'use client';

import { PersonalIntroduction } from '@/components/personal-introduction';
import { WebsiteShowcase } from '@/components/website-showcase';
import { PhotoGallery } from '@/components/photo-gallery';

const homeContent = {
  introduction: {
    name: 'ECS Business and Software',
    profession: 'Inovação em Software e Estratégia de Negócios',
    about:
      'Na ECS, unimos tecnologia de ponta e consultoria especializada para impulsionar o crescimento do seu negócio. Transformamos ideias em soluções digitais robustas e estratégias de mercado eficazes.',
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
        link: '/projetos',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site2',
        title: 'Sistema de Gestão (SaaS)',
        description:
          'Desenvolvimento de uma plataforma SaaS para gestão de processos internos, resultando em um aumento de 30% na eficiência operacional.',
        link: '/projetos',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site3',
        title: 'Aplicativo Mobile B2B',
        description:
          'Criação de um aplicativo móvel para otimização da força de vendas, com funcionalidades offline e sincronização em tempo real.',
        link: '/projetos',
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
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <PersonalIntroduction content={homeContent.introduction} />
      <WebsiteShowcase content={homeContent.websites} />
      <PhotoGallery content={homeContent.gallery} />
    </div>
  );
}
