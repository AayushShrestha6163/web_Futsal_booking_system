import { z } from "zod";


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;



export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

   
  })
  
export type RegisterData = z.infer<typeof registerSchema>;
