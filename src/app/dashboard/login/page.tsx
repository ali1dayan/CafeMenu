"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
// import { authenticate } from "@/app/dashboard/_actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  // const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ورود به داشبورد</CardTitle>
          <CardDescription>
            برای دسترسی به پنل مدیریت، وارد شوید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">نام کاربری</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="user"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">گذرواژه</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>خطا در ورود</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <LoginButton />
          </form> */}
        </CardContent>
      </Card>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      {pending ? "در حال ورود..." : "ورود"}
    </Button>
  );
}
