'use server';

import { z } from 'zod';
import { enhanceText, type EnhanceTextInput } from '@/ai/flows/text-enhancement';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

// Caminho para o arquivo de conteúdo
const contentFilePath = path.join(process.cwd(), 'src', 'data', 'content.json');

export async function handleContactForm(data: z.infer<typeof contactFormSchema>) {
  // In a real application, you would process the form data here,
  // e.g., send an email, save to a database, etc.
  console.log('New contact form submission:', data);

  // For this example, we'll just return a success response.
  return { success: true, message: 'Mensagem enviada com sucesso!' };
}


export async function handleEnhanceText(input: EnhanceTextInput) {
  try {
    const output = await enhanceText(input);
    if (!output || !output.enhancedTitle || !output.enhancedSectionDescriptions) {
        throw new Error('Invalid response from AI service.');
    }
    return output;
  } catch(error) {
    console.error('Error enhancing text:', error);
    // In a real application, you might want to return a more user-friendly error
    return { error: 'Failed to enhance text.' };
  }
}

export async function handleSaveContent(newContent: any) {
  try {
    // Escreve o conteúdo atualizado no arquivo JSON
    await fs.writeFile(contentFilePath, JSON.stringify(newContent, null, 2), 'utf8');
    
    // Invalida o cache das páginas para que elas sejam recarregadas com o novo conteúdo
    revalidatePath('/');
    revalidatePath('/sobre');
    revalidatePath('/projetos');
    revalidatePath('/admin/text');
    revalidatePath('/admin/projects');
    revalidatePath('/admin/gallery');

    return { success: true };
  } catch (error) {
    console.error('Error saving content:', error);
    return { success: false, message: 'Falha ao salvar o conteúdo no servidor.' };
  }
}
