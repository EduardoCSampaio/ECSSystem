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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import content from '@/data/content.json';
import type { Website } from '@/lib/types';
import Image from 'next/image';

// Esta é uma simulação. Em uma aplicação real, você faria chamadas para uma API.
const api = {
  updateContent: async (newContent: any) => {
    console.log('Salvando conteúdo:', newContent);
    // Simula uma chamada de API que pode falhar
    if (Math.random() < 0.1) {
      throw new Error('Falha ao salvar no servidor.');
    }
    // Em um cenário real, você enviaria `newContent` para o seu backend para salvar no arquivo JSON.
    // Por enquanto, as alterações não serão persistidas ao recarregar a página.
    return true;
  },
};

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Website[]>(content.projects.websites.items);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Website | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async (newProject: Website) => {
    setIsSaving(true);
    let updatedProjects;
    if (editingProject) {
      updatedProjects = projects.map((p) =>
        p.id === newProject.id ? newProject : p
      );
    } else {
      updatedProjects = [...projects, { ...newProject, id: `site${Date.now()}` }];
    }

    try {
      // Em uma aplicação real, você atualizaria o arquivo JSON no servidor.
      // Aqui estamos apenas atualizando o estado local.
      setProjects(updatedProjects);
      toast({
        title: 'Projeto Salvo!',
        description: 'Seu projeto foi salvo com sucesso.',
      });
      setIsDialogOpen(false);
      setEditingProject(null);
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

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);
       toast({
        title: 'Projeto Excluído!',
        description: 'O projeto foi excluído com sucesso.',
      });
    }
  };

  const openEditDialog = (project: Website) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gerenciar Projetos</CardTitle>
              <CardDescription>
                Adicione, edite ou remova os projetos do seu site.
              </CardDescription>
            </div>
            <Button onClick={openNewDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Novo Projeto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={100}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {project.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ProjectDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        project={editingProject}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}

// Componente do formulário em um Dialog
interface ProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: Website | null;
  onSave: (project: Website) => void;
  isSaving: boolean;
}

function ProjectDialog({ isOpen, setIsOpen, project, onSave, isSaving }: ProjectDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Armazenará a imagem como data URI

  useEffect(() => {
    if (isOpen) {
      if (project) {
        setTitle(project.title);
        setDescription(project.description);
        setImage(project.image);
      } else {
        // Limpa o formulário para um novo projeto
        setTitle('');
        setDescription('');
        setImage('');
      }
    }
  }, [project, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Por favor, faça o upload de uma imagem.');
      return;
    }
    onSave({
      id: project?.id || '', // ID será definido na função onSave se for novo
      title,
      description,
      image,
      link: '#', // O link pode ser adicionado aqui se necessário
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {project ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="image-upload" className="text-right pt-2">
                Imagem
              </Label>
              <div className="col-span-3 space-y-2">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="col-span-3"
                />
                {image && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">Pré-visualização:</p>
                    <Image
                      src={image}
                      alt="Pré-visualização da imagem"
                      width={200}
                      height={120}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}