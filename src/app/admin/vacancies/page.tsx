
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
import { PlusCircle, Edit, Trash2, Loader2, Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import content from '@/data/content.json';
import type { Vacancy } from '@/lib/types';
import { handleSaveContent } from '@/app/actions';

export default function AdminVacanciesPage() {
  const { toast } = useToast();
  const [vacancies, setVacancies] = useState<Vacancy[]>(content.vacancies.items);
  const [isSaving, setIsSaving] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveVacancy = (newVacancy: Vacancy) => {
    let updatedVacancies;
    if (editingVacancy) {
      updatedVacancies = vacancies.map((v) =>
        v.id === newVacancy.id ? newVacancy : v
      );
    } else {
      updatedVacancies = [...vacancies, { ...newVacancy, id: `vaga${Date.now()}` }];
    }
    setVacancies(updatedVacancies);
    toast({
      title: `Vaga ${editingVacancy ? 'Atualizada' : 'Adicionada'}!`,
      description: 'Lembre-se de salvar todas as alterações para persistir os dados.',
    });
    setIsDialogOpen(false);
    setEditingVacancy(null);
  };

  const handleDelete = (idToDelete: string) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      setVacancies((currentVacancies) => 
        currentVacancies.filter((vacancy) => vacancy.id !== idToDelete)
      );
      toast({
        title: 'Vaga Removida!',
        description: 'A vaga foi removida da lista. Clique em "Salvar Alterações" para confirmar.',
      });
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    const newContent = {
      ...content,
      vacancies: {
        ...content.vacancies,
        items: vacancies,
      },
    };

    try {
      const result = await handleSaveContent(newContent);
      if (result.success) {
        toast({
          title: 'Vagas Salvas!',
          description: 'Suas alterações nas vagas foram salvas com sucesso.',
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

  const openEditDialog = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingVacancy(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gerenciar Vagas</CardTitle>
              <CardDescription>
                Adicione, edite ou remova as vagas de emprego do seu site.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={openNewDialog}>
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Vaga
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
                <TableHead>Título</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancies.map((vacancy) => (
                <TableRow key={vacancy.id}>
                  <TableCell className="font-medium">{vacancy.title}</TableCell>
                  <TableCell className="text-muted-foreground">{vacancy.location}</TableCell>
                  <TableCell className="text-muted-foreground">{vacancy.type}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(vacancy)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(vacancy.id)}
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
      <VacancyDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        vacancy={editingVacancy}
        onSave={handleSaveVacancy}
      />
    </div>
  );
}

interface VacancyDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  vacancy: Vacancy | null;
  onSave: (vacancy: Vacancy) => void;
}

function VacancyDialog({ isOpen, setIsOpen, vacancy, onSave }: VacancyDialogProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (vacancy) {
        setTitle(vacancy.title);
        setLocation(vacancy.location);
        setType(vacancy.type);
        setDescription(vacancy.description);
      } else {
        setTitle('');
        setLocation('');
        setType('');
        setDescription('');
      }
    }
  }, [vacancy, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: vacancy?.id || '',
      title,
      location,
      type,
      description,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {vacancy ? 'Editar Vaga' : 'Adicionar Nova Vaga'}
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
              <Label htmlFor="location" className="text-right">
                Localização
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
                required
                placeholder='Ex: Remoto, São Paulo, etc.'
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="col-span-3"
                required
                placeholder='Ex: Tempo Integral, Meio Período'
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">
              Salvar no Rascunho
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
