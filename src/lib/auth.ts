import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db"
import { Adapter } from "next-auth/adapters"
import { signIn } from "next-auth/react"




export const authOptions = {
  adapter :PrismaAdapter(prisma) as Adapter,
  providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID! ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

