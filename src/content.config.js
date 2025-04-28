import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const ideas = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/idea" }),
  schema: z.object({
    title: z.string().optional(),
    tags : z.array(z.string()).optional()
  })
});

export const collections = {
  ideas
}