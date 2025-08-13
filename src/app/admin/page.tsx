import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
          Painel Administrativo
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Gerencie o conteúdo do seu site de forma fácil e rápida.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Projetos</CardTitle>
            <CardDescription>Adicione, edite ou remova os projetos exibidos no site.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/projects">Acessar</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Galeria</CardTitle>
            <CardDescription>Atualize as fotos da galeria de imagens.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild>
              <Link href="/admin/gallery">Acessar</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Textos do Site</CardTitle>
            <CardDescription>Edite os textos das seções "Início" e "Sobre".</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild>
              <Link href="/admin/text">Acessar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
