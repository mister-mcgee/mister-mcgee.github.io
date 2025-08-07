import { defineCollection, z } from "astro:content"
import { glob                } from "astro/loaders"

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/learn" }),
  schema: z.object({
    draft  : z.boolean().optional(),
    title  : z.string ().optional(),
    author : z.string ().optional(),
    pubDate: z.date   ().optional(),
    tags   : z.array(z.string()).optional()
  })
});

export const collections = {
  lessons
}