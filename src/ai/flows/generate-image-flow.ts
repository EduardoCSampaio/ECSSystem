// Flow to generate an image based on a text prompt.

'use server';

/**
 * @fileOverview An AI agent to generate images from text descriptions.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
    dataUri: z.string().describe("The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Create a compelling and professional image for a software project portfolio.
      The image needs to be a conceptual or abstract representation of the following idea: "${input.prompt}".
      Think about dynamic visuals, such as data flows, network connections, or innovative architectural designs.
      The style should be modern, clean, and professional, suitable for a corporate tech website. Avoid including text or human figures.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed to produce an output.');
    }

    return { dataUri: media.url };
  }
);
