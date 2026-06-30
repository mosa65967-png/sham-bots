import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      userId: string
      role: string
      phone?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  interface User {
    role?: string
    phone?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    role: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  session: { strategy: 'jwt', maxAge: 86400 },
  pages: { signIn: '/auth/login' },
  providers: [
    CredentialsProvider({
      id: 'phone-otp',
      name: 'Phone OTP',
      credentials: {
        phone: { label: 'Phone', type: 'tel' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) return null
        const phone = credentials.phone.replace(/[^0-9]/g, '')
        if (phone.length < 9) return null

        const user = await prisma.user.findUnique({ where: { phone } })
        if (!user || !user.otpCode || !user.otpExpires) return null
        if (user.otpCode !== credentials.otp || user.otpExpires < new Date()) return null

        await prisma.user.update({
          where: { id: user.id },
          data: { otpCode: null, otpExpires: null, otpAttempts: { increment: 1 } },
        })

        return { id: user.id, name: user.nameAr || user.phone, role: user.role, phone: user.phone || undefined }
      },
    }),
    CredentialsProvider({
      id: 'password',
      name: 'Password',
      credentials: {
        phone: { label: 'Phone', type: 'tel' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null
        const phone = credentials.phone.replace(/[^0-9]/g, '')
        const user = await prisma.user.findUnique({ where: { phone } })
        if (!user || !user.passwordHash) return null
        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, name: user.nameAr || user.phone, role: user.role, phone: user.phone || undefined }
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id
        token.role = (user as unknown as Record<string, unknown>).role as string || 'user'
      }
      return token
    },
    async session({ session, token }) {
      session.user.userId = token.userId
      session.user.id = token.userId
      session.user.role = token.role
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const existing = await prisma.user.findUnique({ where: { email: user.email } })
        if (existing) {
          user.id = existing.id
          if (user.name && !existing.nameAr) {
            await prisma.user.update({ where: { id: existing.id }, data: { nameAr: user.name } })
          }
          user.role = existing.role
        }
      }
      return true
    },
  },
}
