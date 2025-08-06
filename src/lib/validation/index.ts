import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "A senha deve ter ao menos seis caracteres." }),
  name: z.string().min(2, { message: "O nome deve ter ao menos dois caracteres." }),
  age: z.number().min(0, { message: "A idade deve ser maior que zero." }),
  goal: z.string().min(2, { message: "O objetivo deve ter ao menos dois caracteres." }),
  image: z.custom<File>(),
  strength: z.number().min(0, { message: "A forca deve ser maior que zero." }).max(100, { message: "A forca deve ser menor que 100." }),
  stealthiness: z.number().min(0, { message: "A furtividade deve ser maior que zero." }).max(100, { message: "A furtividade deve ser menor que 100." }),
  intelligence: z.number().min(0, { message: "A inteligencia deve ser maior que zero." }).max(100, { message: "A inteligencia deve ser menor que 100." }),
  moral: z.number().min(0, { message: "A moral deve ser maior que zero." }).max(100, { message: "A moral deve ser menor que 100." }),
  resilience: z.number().min(0, { message: "A resilencia deve ser maior que zero." }).max(100, { message: "A resilencia deve ser menor que 100." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});