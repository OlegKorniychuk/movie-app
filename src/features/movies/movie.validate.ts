import z from 'zod';

export const validateCreateMovie = z
  .object({
    title: z.string().trim().nonempty(),
    releaseYear: z.int().min(1900).max(new Date().getFullYear()),
    format: z.enum(['DVD', 'VHS', 'Blu-ray']),
    actors: z
      .array(
        z
          .string()
          .trim()
          .nonempty()
          .regex(/^[A-Za-z.,\-\s]+$/, {
            message:
              'Actor full name can only contain letters, commas, dots, hyphens, and whitespaces',
          })
      )
      .min(1),
  })
  .required();

export const validateUpdateMovie = z.object({
  title: z.string().trim().nonempty().optional(),
  releaseYear: z.int().min(1900).max(new Date().getFullYear()).optional(),
  format: z.enum(['DVD', 'VHS', 'Blu-ray']).optional(),
  actors: z
    .array(
      z
        .string()
        .trim()
        .nonempty()
        .regex(/^[A-Za-z.,\-\s]+$/, {
          message:
            'Actor full name can only contain letters, commas, dots, hyphens, and whitespaces',
        })
    )
    .min(1)
    .optional(),
});
