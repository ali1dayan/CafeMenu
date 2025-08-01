
"use server";

import { signIn, signOut } from "@/../auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
    // NextAuth.js throws a `CallbackRouteError` on successful sign in which is handled by the `authorized` callback in `auth.config.ts`.
    // If it doesn't throw, we'll redirect manually just in case as a fallback.
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "نام کاربری یا گذرواژه نامعتبر است.";
        case "CallbackRouteError":
            // This error is expected on a successful login.
            // The middleware will handle the redirect via the `authorized` callback.
            // We can explicitly redirect here as well.
            redirect("/dashboard");
        default:
          return "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
      }
    }
    // Re-throw other errors for debugging
    throw error;
  }
}

export async function logout() {
    await signOut({ redirectTo: '/dashboard/login' });
}
