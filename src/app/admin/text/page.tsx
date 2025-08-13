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
import { useToast } from '@/components/ui/use-toast';
import content from '@/data/content.json';
import { handleEnhanceText } from '@/app/actions';

// Simulação de API para salvar o conteúdo.
const api = {
  updateContent: async (newContent: any) => {
    console.log('Salvando conteúdo:', newContent);
    // Em um cenário real, você faria um POST para uma API route que atualizaria o content.json
    // Por enquanto, as alterações não persistirão ao recarregar.
    return { success: true };
  },
};

export default function AdminTextPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Estados para os textos da página "Início"
  const [homeProfession, setHomeProfession] = useState(content.home.introduction.profession);
  const [homeName, setHomeName] = useState(content.home.introduction.name);
  const [homeAbout, setHomeAbout] = useState(content.home.introduction.about);

  // Estados para os textos da página "Sobre"
  const [aboutProfession, setAboutProfession] = useState(content.about.introduction.profession);
  const [aboutName, setAboutName] = useState(content.about.introduction.name);
  const [aboutAbout, setAboutAbout] = useState(content.about.introduction.about);

  const handleSave = async () => {
    setIsSaving(true);
    const newContent = {
      ...content,
      home: {
        ...content.home,
        introduction: {
          ...content.home.introduction,
          profession: homeProfession,
          name: homeName,
          about: homeAbout,
        },
      },
      about: {
        ...content.about,
        introduction: {
          ...content.about.introduction,
          profession: aboutProfession,
          name: aboutName,
          about: aboutAbout,
        },
      },
    };

    try {
      await api.updateContent(newContent);
      toast({
        title: 'Textos Salvos!',
        description: 'Os textos do site foram atualizados com sucesso.',
      });
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
