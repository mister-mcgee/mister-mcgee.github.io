import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const ideas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/idea" }),
  schema: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
    tags : z.array(z.string()).optional()
  })
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/glossary"}),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    related: z.array(z.string()).optional()
  })
});

export const collections = {
  ideas, glossary
}