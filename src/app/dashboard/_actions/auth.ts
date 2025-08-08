
// "use server";

// import { signIn, signOut } from "@/../auth";
// import { AuthError } from "next-auth";
// import { redirect } from "next/navigation";

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn("credentials", formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       if (error.cause?.err instanceof Error && error.cause.err.message === 'NEXT_REDIRECT') {
//         // This is a redirect error, which is expected on successful login.
//         // We can re-throw it to be handled by Next.js.
//         throw error;
//       }
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "نام کاربری یا گذرواژه نامعتبر است.";
//         default:
//           return "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
//       }
//     }
//     // Re-throw other errors to be handled by the framework
//     throw error;
//   }
//   // After a successful sign-in, NextAuth.js throws a NEXT_REDIRECT error. 
//   // We need to redirect to the dashboard page manually.
//   redirect('/dashboard');
// }

// export async function logout() {
//     await signOut({ redirectTo: '/dashboard/login' });
// }
