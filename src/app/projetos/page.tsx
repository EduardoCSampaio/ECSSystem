'use client';

import { WebsiteShowcase } from '@/components/website-showcase';

const projectsContent = {
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
      {
        id: 'site4',
        title: 'Dashboard de Business Intelligence',
        description:
          'Implementação de uma solução de BI que centraliza dados de diversas fontes para fornecer insights acionáveis à diretoria.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site5',
        title: 'Portal do Cliente com IA',
        description:
          'Desenvolvimento de um portal self-service para clientes, utilizando IA para suporte e recomendações personalizadas.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
      {
        id: 'site6',
        title: 'Automação de Processos Robóticos (RPA)',
        description:
          'Automação de tarefas manuais e repetitivas no setor financeiro, reduzindo erros e liberando a equipe para atividades estratégicas.',
        link: '#',
        image: 'https://placehold.co/600x400.png',
      },
    ],
  },
};

export default function ProjetosPage() {
  return (
    <div>
      <WebsiteShowcase content={projectsContent.websites} />
    </div>
  );
}
