'use client';

import * as React from 'react';
import { Loader2, Sparkles, History } from 'lucide-react';

import type { PortfolioContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { handleEnhanceText } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface AppHeaderProps {
  content: PortfolioContent;
  setContent: React.Dispatch<React.SetStateAction<PortfolioContent>>;
  initialContent: PortfolioContent;
}

export function AppHeader({ content, setContent, initialContent }: AppHeaderProps) {
  const [isEnhancing, setIsEnhancing] = React.useState(false);
  const [enhancedContent, setEnhancedContent] = React.useState<PortfolioContent | null>(null);
  const { toast } = useToast();

  const onEnhance = async () => {
    setIsEnhancing(true);
    setEnhancedContent(null);
    try {
      const textsToEnhance = {
        pageTitle: content.header.title,
        sectionDescriptions: [
          content.introduction.about,
          ...content.websites.items.map(item => item.description),
        ],
      };

      const result = await handleEnhanceText(textsToEnhance);
      
      if (result.enhancedTitle && result.enhancedSectionDescriptions) {
        const newContent = JSON.parse(JSON.stringify(content));
        newContent.header.title = result.enhancedTitle;
        newContent.introduction.about = result.enhancedSectionDescriptions[0];
        content.websites.items.forEach((_, index) => {
          newContent.websites.items[index].description = result.enhancedSectionDescriptions[index + 1];
        });
        setEnhancedContent(newContent);
      } else {
        throw new Error('Failed to get enhancement suggestions.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro de IA',
        description: 'Não foi possível obter as sugestões de melhoria.',
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const applyChanges = () => {
    if (enhancedContent) {
      setContent(enhancedContent);
      toast({
        title: 'Sucesso!',
        description: 'As melhorias de texto foram aplicadas.',
      });
    }
  };
  
  const resetChanges = () => {
    setContent(initialContent);
    setEnhancedContent(null);
    toast({
      title: 'Texto Restaurado',
      description: 'O texto original foi restaurado.',
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <h1 className="text-xl font-bold text-foreground">{content.header.title}</h1>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" onClick={resetChanges}>
            <History className="mr-2 h-4 w-4" />
            Restaurar Original
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Sparkles className="mr-2 h-5 w-5" />
                Melhorar com IA
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Melhorar Textos com IA</SheetTitle>
                <SheetDescription>
                  Deixe a inteligência artificial revisar e aprimorar os textos do seu portfólio para torná-los mais claros e profissionais.
                </SheetDescription>
              </SheetHeader>
              <div className="my-8">
                <Button onClick={onEnhance} disabled={isEnhancing} className="w-full">
                  {isEnhancing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analisando...
                    </>
                  ) : (
                    'Sugerir Melhorias'
                  )}
                </Button>
              </div>

              {enhancedContent && (
                 <div className="space-y-6 rounded-lg border bg-card p-4 text-sm">
                  <div>
                    <h3 className="font-bold text-primary">Título Sugerido</h3>
                    <p className="text-muted-foreground">{enhancedContent.header.title}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Introdução Sugerida</h3>
                    <p className="text-muted-foreground">{enhancedContent.introduction.about}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Descrições de Projetos Sugeridas</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {enhancedContent.websites.items.map(item => (
                        <li key={item.id}>{item.description}</li>
                      ))}
                    </ul>
                  </div>
                 </div>
              )}
              
              <SheetFooter className="mt-8">
                <Button disabled={!enhancedContent} onClick={applyChanges} className="w-full">
                  Aplicar Melhorias
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
