
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const signUpSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse e-mail invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export type SignInData = z.infer<typeof signInSchema>
export type SignUpData = z.infer<typeof signUpSchema>
export type ContactData = z.infer<typeof contactSchema>
