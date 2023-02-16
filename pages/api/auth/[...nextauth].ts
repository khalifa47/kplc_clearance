import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        staff_id: { label: "Username", type: "text", placeholder: "12345" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { staff_id, password } = credentials as {
          staff_id: string;
          password: string;
        };
        const user = await prisma.user.findFirst({
          where: {
            id: staff_id,
            password: password,
          },
        });
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = { ...token };
      return session;
    },
  },
});