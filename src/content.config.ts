import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    section: z.enum(['products-solutions', 'news-companies']),
    subcategory: z.string(),
    author: z.string().default('Whale Team'),
    featured: z.boolean().default(false),
    coverImage: z.string().url(),
    externalUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
