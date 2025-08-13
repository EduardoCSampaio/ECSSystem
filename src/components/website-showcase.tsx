import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioContent, Website } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface WebsiteShowcaseProps {
  content: PortfolioContent['websites'];
}

const WebsiteCard = ({ item }: { item: Website }) => (
  <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl bg-secondary/30">
    <div className="aspect-video overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        width={600}
        height={400}
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
        data-ai-hint="website screenshot"
      />
    </div>
    <CardHeader>
      <CardTitle className="text-xl">{item.title}</CardTitle>
      <CardDescription className="h-24">{item.description}</CardDescription>
    </CardHeader>
    {item.link !== '#' && (
      <CardFooter className="mt-auto">
        <Button asChild className="w-full bg-primary/90 hover:bg-primary">
          <Link href={item.link}>
            Ver Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    )}
  </Card>
);

export function WebsiteShowcase({ content }: WebsiteShowcaseProps) {
  return (
    <section id="websites" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">{content.title}</h2>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">Conheça alguns dos desafios que transformamos em sucesso para nossos clientes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <WebsiteCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
