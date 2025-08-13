
'use client';

import { Building, Users, BrainCircuit, MapPin, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import content from '@/data/content.json';
import type { Vacancy } from '@/lib/types';


const features = [
  {
    icon: <BrainCircuit className="w-12 h-12 text-primary" />,
    title: 'Projetos Inovadores',
    description: 'Trabalhe com tecnologias de ponta e resolva desafios complexos para clientes de diversos setores.',
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: 'Cultura Colaborativa',
    description: 'Faça parte de um time diverso e talentoso, onde o conhecimento é compartilhado e todos crescem juntos.',
  },
  {
    icon: <Building className="w-12 h-12 text-primary" />,
    title: 'Crescimento Profissional',
    description: 'Oferecemos planos de carreira, treinamentos e oportunidades para você se desenvolver e alcançar seu potencial.',
  },
];

const VacancyCard = ({ vacancy }: { vacancy: Vacancy }) => (
  <Card className="flex flex-col bg-card border-border/50 text-left">
    <CardHeader>
      <CardTitle>{vacancy.title}</CardTitle>
      <CardDescription className="pt-2 flex items-center gap-4 text-muted-foreground">
        <span className='flex items-center gap-1.5'><MapPin className="w-4 h-4" /> {vacancy.location}</span>
        <span className='flex items-center gap-1.5'><Clock className="w-4 h-4" /> {vacancy.type}</span>
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground">{vacancy.description}</p>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full">
        <a href={`mailto:carreiras@ecs-software.com?subject=Aplicação para a vaga: ${vacancy.title}`}>
          Candidatar-se
        </a>
      </Button>
    </CardFooter>
  </Card>
);

export default function TrabalheConoscoPage() {
  const { vacancies } = content;

  return (
    <>
      <AppHeader />
      <main className="container mx-auto py-16 sm:py-24">
        <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
            Faça Parte da Nossa Equipe
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">
            Na ECS, buscamos pessoas apaixonadas por tecnologia e inovação para nos ajudar a construir o futuro. Se você é criativo, proativo e gosta de desafios, aqui é o seu lugar.
            </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border/50 text-center">
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{vacancies.title}</h2>
          {vacancies.items.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vacancies.items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No momento, não temos vagas em aberto. Volte em breve ou nos envie seu currículo para o banco de talentos.
              <br/>
               <Button size="lg" asChild className="mt-8">
                <a href="mailto:carreiras@ecs-software.com?subject=Banco de Talentos">
                    Enviar Currículo
                </a>
               </Button>
            </p>
          )}
        </div>
      </main>
      <AppFooter />
    </>
  );
}
