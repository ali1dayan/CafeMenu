import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";

async function getUser(username: string): Promise<{ name: string; } | undefined> {
  if (username === process.env.ADMIN_USERNAME) {
    return { name: "Admin" };
  }
  return undefined;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);
          if (!user) return null;

          const passwordsMatch = password === process.env.ADMIN_PASSWORD;
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
