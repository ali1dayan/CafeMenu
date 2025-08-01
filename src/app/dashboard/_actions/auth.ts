
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
    // NextAuth throws a 'CallbackRouteError' on successful sign in.
    // We can't handle it here, so we'll let the middleware handle the redirect.
    // If signIn doesn't throw, we redirect manually, just in case.
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "نام کاربری یا گذرواژه نامعتبر است.";
        case "CallbackRouteError":
            // This can happen on successful login. NextAuth.js throws this error
            // and then redirects. We can catch this and redirect explicitly.
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
