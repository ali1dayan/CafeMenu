
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
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "نام کاربری یا گذرواژه نامعتبر است.";
        case "CallbackRouteError":
            // This can happen on successful login. NextAuth.js throws this error
            // and then redirects. We can safely ignore it, but we need to redirect
            // manually in the happy path.
            break;
        default:
          return "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
      }
    }
    // Re-throw other errors
    throw error;
  }
  // This will only be reached on successful login.
  redirect("/dashboard");
}

export async function logout() {
    await signOut({ redirectTo: '/dashboard/login' });
}
