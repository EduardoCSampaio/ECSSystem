import type { PortfolioContent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface PersonalIntroductionProps {
  content: PortfolioContent['introduction'];
}

export function PersonalIntroduction({ content }: PersonalIntroductionProps) {
  const initials = content.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <section id="introduction" className="container mx-auto py-16 sm:py-24">
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg border-2 border-primary/10 animate-fade-in-up bg-card">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 flex-shrink-0">
               <Image src={content.avatar} alt={content.name} width={128} height={128} className="rounded-full border-4 border-accent" data-ai-hint="logo" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">{content.name}</h2>
              <p className="text-accent text-lg font-semibold mt-1">{content.profession}</p>
              <p className="mt-4 text-lg text-muted-foreground font-body leading-relaxed">
                {content.about}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
