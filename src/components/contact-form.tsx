'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import type { PortfolioContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { handleContactForm } from '@/app/actions';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  message: z.string().min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  content: PortfolioContent['contact'];
}

export function ContactForm({ content }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await handleContactForm(data);
      if (result.success) {
        toast({
          title: 'Mensagem Enviada!',
          description: 'Obrigado por entrar em contato. Retornaremos em breve.',
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possível enviar sua mensagem. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto shadow-lg bg-card border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-foreground">{content.title}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">Pronto para iniciar seu projeto? Entre em contato conosco.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Corporativo</FormLabel>
                      <FormControl>
                        <Input placeholder="seu.email@empresa.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sua Mensagem</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descreva sua necessidade ou projeto..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar Solicitação
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
