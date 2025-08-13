import type { PortfolioContent } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface PersonalIntroductionProps {
  content: PortfolioContent['introduction'];
}

export function PersonalIntroduction({ content }: PersonalIntroductionProps) {
  return (
    <section id="introduction" className="container mx-auto py-16 sm:py-24">
      <div className="grid md:grid-cols-2 items-center gap-12">
        <div className="animate-fade-in-up">
           <Image 
             src={content.avatar} 
             alt={content.name} 
             width={500} 
             height={500} 
             className="rounded-lg shadow-2xl mx-auto" 
             data-ai-hint="logo"
             priority
            />
        </div>
        <div className="text-center md:text-left animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p className="text-primary text-lg font-semibold mb-2">{content.profession}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{content.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {content.about}
          </p>
        </div>
      </div>
    </section>
  );
}
