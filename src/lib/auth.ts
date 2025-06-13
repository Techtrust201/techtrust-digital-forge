
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { emailVerification } from "better-auth/plugins"
import { db } from "./db"
import { sendVerificationEmail } from "./email"

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },
  plugins: [
    emailVerification({
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendVerificationEmail(user.email, url)
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  secret: process.env.AUTH_SECRET!,
  baseURL: process.env.NEXTAUTH_URL!,
})

export type Session = typeof auth.$Infer.Session
