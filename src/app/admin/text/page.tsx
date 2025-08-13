
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Wand2, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { handleEnhanceText, handleSaveContent, getContent } from '@/app/actions';

export default function AdminTextPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para os textos da página "Início"
  const [homeProfession, setHomeProfession] = useState('');
  const [homeName, setHomeName] = useState('');
  const [homeAbout, setHomeAbout] = useState('');

  // Estados para os textos da página "Sobre"
  const [aboutProfession, setAboutProfession] = useState('');
  const [aboutName, setAboutName] = useState('');
  const [aboutAbout, setAboutAbout] = useState('');

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      const content = await getContent();
      if (content) {
        setHomeProfession(content.home.introduction.profession);
        setHomeName(content.home.introduction.name);
        setHomeAbout(content.home.introduction.about);
        setAboutProfession(content.about.introduction.profession);
        setAboutName(content.about.introduction.name);
        setAboutAbout(content.about.introduction.about);
      }
      setIsLoading(false);
    }
    loadContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const currentContent = await getContent();
    if (!currentContent) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível carregar o conteúdo existente.' });
        setIsSaving(false);
        return;
    }
    
    const newContent = {
      ...currentContent,
      home: {
        ...currentContent.home,
        introduction: {
          ...currentContent.home.introduction,
          profession: homeProfession,
          name: homeName,
          about: homeAbout,
        },
      },
      about: {
        ...currentContent.about,
        introduction: {
          ...currentContent.about.introduction,
          profession: aboutProfession,
          name: aboutName,
          about: aboutAbout,
        },
      },
    };

    try {
      const result = await handleSaveContent(newContent);
      if (result.success) {
        toast({
          title: 'Textos Salvos!',
          description: 'Os textos do site foram atualizados com sucesso.',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar as alterações.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const enhanceTexts = async () => {
    setIsEnhancing(true);
    try {
        const input = {
            pageTitle: 'Textos do Site',
            sectionDescriptions: [homeProfession, homeName, homeAbout, aboutProfession, aboutName, aboutAbout]
        };
        const result = await handleEnhanceText(input);

        if (result.error) {
          throw new Error(result.error);
        }

        const [
          enhancedHomeProfession, 
          enhancedHomeName, 
          enhancedHomeAbout, 
          enhancedAboutProfession, 
          enhancedAboutName, 
          enhancedAboutAbout
        ] = result.enhancedSectionDescriptions;

        setHomeProfession(enhancedHomeProfession);
        setHomeName(enhancedHomeName);
        setHomeAbout(enhancedHomeAbout);
        setAboutProfession(enhancedAboutProfession);
        setAboutName(enhancedAboutName);
        setAboutAbout(enhancedAboutAbout);

        toast({
            title: 'Textos Aprimorados!',
            description: 'As sugestões da IA foram aplicadas. Revise e salve.',
        });

    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Erro na IA',
            description: 'Não foi possível aprimorar os textos. Tente novamente.',
        });
    } finally {
        setIsEnhancing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4 p-6 border rounded-lg">
              <Skeleton className="h-6 w-1/4" />
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Gerenciar Textos do Site</CardTitle>
              <CardDescription>
                Edite os textos das seções de introdução das páginas "Início" e "Sobre".
              </CardDescription>
            </div>
            <Button onClick={enhanceTexts} disabled={isEnhancing || isSaving}>
              {isEnhancing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Aprimorar com IA
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Seção "Início" */}
          <div className="space-y-4 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold text-foreground">Página Inicial</h3>
            <div className="grid gap-2">
              <Label htmlFor="home-profession">Título (Profissão)</Label>
              <Input
                id="home-profession"
                value={homeProfession}
                onChange={(e) => setHomeProfession(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="home-name">Nome (Empresa)</Label>
              <Input id="home-name" value={homeName} onChange={(e) => setHomeName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="home-about">Sobre (Descrição)</Label>
              <Textarea
                id="home-about"
                value={homeAbout}
                onChange={(e) => setHomeAbout(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>

          {/* Seção "Sobre" */}
          <div className="space-y-4 p-6 border rounded-lg">
            <h3 className="text-xl font-semibold text-foreground">Página Sobre</h3>
            <div className="grid gap-2">
              <Label htmlFor="about-profession">Título (Profissão)</Label>
              <Input
                id="about-profession"
                value={aboutProfession}
                onChange={(e) => setAboutProfession(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="about-name">Nome (Empresa)</Label>
              <Input id="about-name" value={aboutName} onChange={(e) => setAboutName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="about-about">Sobre (Descrição)</Label>
              <Textarea
                id="about-about"
                value={aboutAbout}
                onChange={(e) => setAboutAbout(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving || isEnhancing}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    