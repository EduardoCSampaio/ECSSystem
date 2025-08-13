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
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2, Loader2, Skeleton } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Website } from '@/lib/types';
import Image from 'next/image';
import { handleSaveContent, getContent } from '@/app/actions';

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Website[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Website | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      const content = await getContent();
      if (content) {
        setProjects(content.projects.websites.items);
      }
      setIsLoading(false);
    }
    loadContent();
  }, []);

  // Função para salvar um único projeto (adicionar ou editar) no estado local
  const handleSaveProject = (newProject: Website) => {
    let updatedProjects;
    if (editingProject) {
      // Editando um projeto existente
      updatedProjects = projects.map((p) =>
        p.id === newProject.id ? newProject : p
      );
    } else {
      // Adicionando um novo projeto
      updatedProjects = [...projects, { ...newProject, id: `site${Date.now()}` }];
    }
    setProjects(updatedProjects);
    toast({
      title: `Projeto ${editingProject ? 'Atualizado' : 'Adicionado'}!`,
      description: 'Lembre-se de salvar todas as alterações para persistir os dados.',
    });
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto? Esta ação é temporária até você salvar.')) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);
       toast({
        title: 'Projeto Removido!',
        description: 'O projeto foi removido da lista. Clique em "Salvar Alterações" para confirmar.',
       });
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    // Estrutura do novo conteúdo a ser salvo
    const newContent = {
      projects: {
        websites: {
          items: projects,
        },
      },
      // Sincroniza os 3 primeiros projetos com a página inicial
      home: {
        websites: {
          items: projects.slice(0, 3),
        }
      }
    };

    try {
      const result = await handleSaveContent(newContent);
      if (result.success) {
        toast({
          title: 'Projetos Salvos!',
          description: 'Suas alterações nos projetos foram salvas com sucesso.',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Erro ao Salvar',
        description: 'Não foi possível salvar as alterações no servidor.',
      });
    } finally {
      setIsSaving(false);
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

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
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
                {[...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-[60px] w-[100px] rounded-md" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-64" /></TableCell>
                    <TableCell className="text-right space-x-2">
                       <Skeleton className="h-8 w-8 inline-block" />
                       <Skeleton className="h-8 w-8 inline-block" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div className="flex items-center gap-4">
              <Button onClick={openNewDialog}>
                <PlusCircle className="mr-2 h-4 w-4" /> Novo Projeto
              </Button>
               <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Salvar Alterações
              </Button>
            </div>
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
        onSave={handleSaveProject}
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
}

function ProjectDialog({ isOpen, setIsOpen, project, onSave }: ProjectDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Armazenará a imagem como data URI
  const [isSaving, setIsSaving] = useState(false);

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
    // Apenas chama onSave para atualizar o estado local. A persistência é feita em "handleSaveChanges"
    onSave({
      id: project?.id || '',
      title,
      description,
      image,
      link: '#', 
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
              {isSaving ? 'Salvando...' : 'Salvar no Rascunho'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}