import z from 'zod';

export const validateCreateUser = z
  .object({
    email: z.email(),
    name: z.string().nonempty(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .required();
