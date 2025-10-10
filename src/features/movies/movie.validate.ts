import z from 'zod';

const EXPECTED_FORMATS = ['DVD', 'VHS', 'Blu-Ray'];

export const validateCreateMovie = z
  .object({
    title: z.string().trim().nonempty(),
    releaseYear: z.int().min(1900).max(new Date().getFullYear()),
    format: z.enum(EXPECTED_FORMATS),
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
  format: z.enum(EXPECTED_FORMATS).optional(),
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

export const validateBulkCreateMovie = z
  .array(
    z
      .object({
        title: z.string().trim().nonempty(),
        releaseYear: z
          .string()
          .trim()
          .transform((val) => Number(val))
          .refine((val) => val >= 1900 && val <= new Date().getFullYear(), {
            message: 'Year out of range',
          }),
        format: z.enum(EXPECTED_FORMATS),
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
      .required()
  )
  .min(1);
