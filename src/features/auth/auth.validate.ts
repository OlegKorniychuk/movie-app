import z from 'zod';

export const validateLogin = z
  .object({
    email: z.email(),
    password: z.string().nonempty(),
  })
  .required();
