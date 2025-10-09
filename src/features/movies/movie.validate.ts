import z from 'zod';

export const validateCreateMovie = z
  .object({
    title: z.string().nonempty(),
    releaseYear: z.int().min(1900).max(new Date().getFullYear()),
    format: z.enum(['DVD', 'VHS', 'Blu-ray']),
    actors: z.array(z.string().nonempty()).min(1),
  })
  .required();

export const validateUpdateMovie = z.object({
  title: z.string().nonempty().optional(),
  releaseYear: z.int().min(1900).max(new Date().getFullYear()).optional(),
  format: z.enum(['DVD', 'VHS', 'Blu-ray']).optional(),
  actors: z.array(z.string().nonempty()).min(1).optional(),
});
