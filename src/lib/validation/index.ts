import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "A senha deve ter ao menos oito caracteres." }),
  name: z.string().min(2, { message: "O nome deve ter ao menos dois caracteres." }),
  age: z.number().min(0, { message: "A idade deve ser maior que zero." }),
  goal: z.string().min(2, { message: "O objetivo deve ter ao menos dois caracteres." }),
  image: z.custom<File>(),
  strength: z.number().min(0, { message: "A forca deve ser maior que zero." }).max(100, { message: "A forca deve ser menor que 100." }),
  agility: z.number().min(0, { message: "A agilidade deve ser maior que zero." }).max(100, { message: "A agilidade deve ser menor que 100." }),
  intelligence: z.number().min(0, { message: "A inteligencia deve ser maior que zero." }).max(100, { message: "A inteligencia deve ser menor que 100." }),
  moral: z.number().min(0, { message: "A moral deve ser maior que zero." }).max(100, { message: "A moral deve ser menor que 100." }),
  resilience: z.number().min(0, { message: "A resilencia deve ser maior que zero." }).max(100, { message: "A resilencia deve ser menor que 100." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "A senha deve ter ao menos oito caracteres." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Nome deve ter ao menos dois caracteres." }),
  username: z.string().min(2, { message: "Username deve ter ao menos dois caracteres." }),
  email: z.string().email(),
  bio: z.string(),
});