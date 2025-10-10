import z from 'zod';

export const validateCreateUser = z
  .object({
    email: z.email(),
    name: z.string().trim().nonempty(),
    password: z.string().trim().nonempty(),
    confirmPassword: z.string().trim().nonempty(),
  })
  .required();
