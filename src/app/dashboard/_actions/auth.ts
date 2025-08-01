
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
        default:
          return "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
      }
    }
    throw error;
  }
}

export async function logout() {
    await signOut({ redirectTo: '/dashboard/login' });
}
