import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

// In a real-world application, you would fetch user data from a database.
// For this prototype, we'll use a hardcoded user.
async function getUser(username: string): Promise<{ name: string } | undefined> {
  if (username === 'user') {
    return { name: 'User' };
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

          // Hardcoded credentials for this prototype
          const expectedUsername = 'user';
          const expectedPassword = 'test1password';

          const user = await getUser(username);
          if (!user) {
            console.log('Invalid username');
            return null;
          }

          const passwordsMatch = password === expectedPassword;
          if (passwordsMatch) {
            return user;
          }
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
