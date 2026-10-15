// Content collections. The schemas below validate the YAML files in src/content/ —
// if a value is mistyped (e.g. size: "big"), `npm run build` stops and says where.
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const status = z.enum(['available', 'reserved', 'sold']);

const residences = defineCollection({
  loader: file('src/content/residences.yaml'),
  schema: z.object({
    name: z.string(),
    size: z.number().positive(),
    bedrooms: z.number().int().min(1),
    bathrooms: z.number().positive().nullable(),
    priceFrom: z.number().positive().nullable(),
    status,
    summary: z.string(),
    rooms: z.array(z.string()),
  }),
});

const amenities = defineCollection({
  loader: file('src/content/amenities.yaml'),
  schema: z.object({
    name: z.string(),
    icon: z.string().default('check_circle'),
    order: z.number(),
    confirmed: z.boolean(),
    summary: z.string(),
  }),
});

const commercial = defineCollection({
  loader: file('src/content/commercial.yaml'),
  schema: z.object({
    name: z.string(),
    size: z.number().positive(),
    suggestedUse: z.string(),
    priceFrom: z.number().positive().nullable(),
    status,
  }),
});

export const collections = { residences, amenities, commercial };
