import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/*.md',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        title: z.string(),
        short_description: z.string(),
        published_at: z.string().date().nullable(),
        tags: z.array(z.string()),
        cover_image: z.string().nullable(),
      }),
    }),
    projects: defineCollection({
      source: 'projects/*.md',
      type: 'page',
      // Define custom schema for docs collection
      schema: z.object({
        title: z.string(),
        description: z.string(),
        state: z.enum(['ACTIVE', 'INACTIVE']),
        cover_image: z.string().nullable(),
        visuals: z.array(z.string()),
        tech: z.array(z.string()),
        wdid: z.array(z.string()),
        links: z.array(z.string()).nullable(),
      }),
    }),
  },
})
