'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import content from '@/data/content.json';
import type { Photo } from '@/lib/types';
import { handleSaveContent } from '@/app/actions';

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const [homePhotos, setHomePhotos] = useState<Photo[]>(content.home.gallery.photos);
  const [aboutPhotos, setAboutPhotos] = useState<Photo[]>(content.about.gallery.photos);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddPhoto = (section: 'home' | 'about', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: `photo${Date.now()}`,
          src: reader.result as string,
          alt: 'Nova imagem da galeria',
          hint: 'new image', // Um hint genérico
        };

        if (section === 'home') {
          setHomePhotos((prev) => [...prev, newPhoto]);
        } else {
          setAboutPhotos((prev) => [...prev, newPhoto]);
        }

        toast({
          title: 'Foto Adicionada!',
          description: 'A nova foto foi adicionada à galeria. Lembre-se de salvar as alterações.',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (section: 'home' | 'about', id: string) => {
     if (confirm('Tem certeza que deseja excluir esta foto?')) {
        if (section === 'home') {
            setHomePhotos((prev) => prev.filter((p) => p.id !== id));
        } else {
            setAboutPhotos((prev) => prev.filter((p) => p.id !== id));
        }
        toast({
            title: 'Foto Excluída!',
            description: 'A foto foi removida da galeria. Lembre-se de salvar para persistir a exclusão.',
        });
     }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    // Cria a nova estrutura do conteúdo com as fotos atualizadas
    const newContent = {
      ...content,
      home: {
        ...content.home,
        gallery: {
          ...content.home.gallery,
          photos: homePhotos,
        },
      },
      about: {
        ...content.about,
        gallery: {
          ...content.about.gallery,
          photos: aboutPhotos,
        },
      },
    };

    try {
      const result = await handleSaveContent(newContent);
      if (result.success) {
        toast({
          title: 'Galeria Salva!',
          description: 'As alterações na galeria foram salvas com sucesso.',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar as alterações na galeria.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Galeria - Página Inicial</CardTitle>
          <CardDescription>Adicione ou remova fotos da galeria exibida na página "Início".</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="home-photo-upload" className="cursor-pointer">
               <Button asChild>
                <div>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Foto na Inicial
                </div>
              </Button>
            </Label>
            <Input
              id="home-photo-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleAddPhoto('home', e)}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {homePhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={200}
                  height={150}
                  className="rounded-md object-cover w-full aspect-[4/3]"
                />
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeletePhoto('home', photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Galeria - Página Sobre</CardTitle>
          <CardDescription>Adicione ou remova fotos da galeria exibida na página "Sobre".</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="mb-6">
             <Label htmlFor="about-photo-upload" className="cursor-pointer">
               <Button asChild>
                <div>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Foto na "Sobre"
                </div>
              </Button>
            </Label>
            <Input
              id="about-photo-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleAddPhoto('about', e)}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {aboutPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={200}
                  height={150}
                  className="rounded-md object-cover w-full aspect-[4/3]"
                />
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeletePhoto('about', photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

       <div className="flex justify-end mt-4">
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Salvar Alterações
          </Button>
        </div>
    </div>
  );
}
