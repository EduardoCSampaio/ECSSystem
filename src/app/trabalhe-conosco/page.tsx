
import { Building, Users, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

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

export default function TrabalheConoscoPage() {
  return (
    <>
      <AppHeader />
      <main className="container mx-auto py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
          Faça Parte da Nossa Equipe
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">
          Na ECS, buscamos pessoas apaixonadas por tecnologia e inovação para nos ajudar a construir o futuro. Se você é criativo, proativo e gosta de desafios, aqui é o seu lugar.
        </p>
        
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Vagas em Aberto</h2>
          <p className="text-muted-foreground mb-8">
            Confira nossas oportunidades e envie seu currículo. Estamos ansiosos para conhecer você!
          </p>
          <Button size="lg" asChild>
            <a href="mailto:carreiras@ecs-software.com?subject=Vaga de [Nome da Vaga]">
              Ver Vagas e Enviar Currículo
            </a>
          </Button>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
