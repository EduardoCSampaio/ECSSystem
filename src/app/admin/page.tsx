
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-left mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
          Bem-vindo ao Painel
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Use a navegação à esquerda para gerenciar o conteúdo do seu site.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/admin/text">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Textos do Site
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Edite os textos das seções de introdução.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/projects">
           <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Gerenciar Projetos
                 <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Adicione, edite ou remova projetos.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/gallery">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Gerenciar Galeria
                 <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Adicione ou remova fotos das galerias.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/vacancies">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Gerenciar Vagas
                 <Briefcase className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>Adicione ou remova vagas de emprego.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
