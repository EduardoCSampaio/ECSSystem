// Text Enhancement flow to suggest improvements and fix grammatical errors in portfolio texts.

'use server';

/**
 * @fileOverview An AI agent to enhance text on a portfolio page.
 *
 * - enhanceText - A function that handles the text enhancement process.
 * - EnhanceTextInput - The input type for the enhanceText function.
 * - EnhanceTextOutput - The return type for the enhanceText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceTextInputSchema = z.object({
  pageTitle: z.string().describe('The title of the portfolio page.'),
  sectionDescriptions: z
    .array(z.string())
    .describe('An array of descriptions for each section of the portfolio.'),
});
export type EnhanceTextInput = z.infer<typeof EnhanceTextInputSchema>;

const EnhanceTextOutputSchema = z.object({
  enhancedTitle: z
    .string()
    .describe('The enhanced title of the portfolio page.'),
  enhancedSectionDescriptions: z
    .array(z.string())
    .describe('An array of enhanced descriptions for each section of the portfolio.'),
});
export type EnhanceTextOutput = z.infer<typeof EnhanceTextOutputSchema>;

export async function enhanceText(input: EnhanceTextInput): Promise<EnhanceTextOutput> {
  return enhanceTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceTextPrompt',
  input: {schema: EnhanceTextInputSchema},
  output: {schema: EnhanceTextOutputSchema},
  prompt: `You are an AI assistant specialized in enhancing text for online portfolios.
  Carefully review the following title and section descriptions from a user's portfolio page.
  Suggest improvements to make the text more appealing, clear, and grammatically correct.
  Provide the enhanced title and descriptions in the output format.

  Page Title: {{{pageTitle}}}
  Section Descriptions:
  {{#each sectionDescriptions}}
  - {{{this}}}
  {{/each}}`,
});

const enhanceTextFlow = ai.defineFlow(
  {
    name: 'enhanceTextFlow',
    inputSchema: EnhanceTextInputSchema,
    outputSchema: EnhanceTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
