import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { sql } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // ✅ fetch user
        const users =
          await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
        const user = users[0];
        if (!user) return null;

        // ✅ check password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        // ✅ update last login
        await sql`UPDATE users SET last_login = NOW() WHERE id = ${user.id}`;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};
