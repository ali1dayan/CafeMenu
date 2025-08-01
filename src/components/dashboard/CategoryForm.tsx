"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { addCategory } from "@/app/dashboard/_actions/products";

type CategoryFormProps = {
  onSuccess: () => void;
};

type FormState = {
  errors?: {
    id?: string[];
    name?: string[];
  };
  success?: boolean;
} | undefined;


export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [formState, action] = useActionState<FormState, FormData>(addCategory, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState?.success) {
      onSuccess();
    }
  }, [formState, onSuccess]);

  return (
    <form ref={formRef} action={action}>
      <DialogHeader>
        <DialogTitle>افزودن دسته‌بندی جدید</DialogTitle>
        <DialogDescription>
          یک دسته‌بندی جدید برای محصولات خود ایجاد کنید.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
            <Label htmlFor="name">نام دسته‌بندی</Label>
            <Input id="name" name="name" />
            {formState?.errors?.name && <p className="text-sm font-medium text-destructive">{formState.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="id">آی‌دی انگلیسی (ID)</Label>
            <Input id="id" name="id" placeholder="e.g. new-drinks" />
            {formState?.errors?.id && <p className="text-sm font-medium text-destructive">{formState.errors.id[0]}</p>}
            <p className="text-xs text-muted-foreground">فقط حروف کوچک انگلیسی و خط تیره (-). مثال: cold-drinks</p>
        </div>
      </div>
      <DialogFooter>
        <SubmitButton />
      </DialogFooter>
    </form>
  )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? "در حال افزودن..." : "افزودن دسته‌بندی"}
      </Button>
    );
  }
