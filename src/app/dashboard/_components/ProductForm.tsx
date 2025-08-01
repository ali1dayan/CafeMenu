
"use client";

import { useActionState, useEffect, useState, useRef, useTransition } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { saveProduct, suggestAiHint } from "../_actions/products";
import type { MenuItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, Upload, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";


type ProductFormProps = {
  product?: MenuItem | null;
  categories: { id: string; name: string }[];
  onSuccess: () => void;
};

type FormState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined;

export function ProductForm({ product, categories, onSuccess }: ProductFormProps) {
  const [formState, action] = useActionState<FormState, FormData>(saveProduct, undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const [aiHint, setAiHint] = useState(product?.aiHint || '');
  const [productName, setProductName] = useState(product?.name || '');


  useEffect(() => {
    if (formState?.success) {
      onSuccess();
    }
  }, [formState, onSuccess]);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSuggestHint = () => {
    startTransition(async () => {
        const result = await suggestAiHint(productName);
        if (result.hint) {
            setAiHint(result.hint);
        }
    });
  };


  return (
    <form ref={formRef} action={action} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{product ? "ویرایش محصول" : "افزودن محصول جدید"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input type="hidden" name="id" value={product?.id || ''} />
          <input type="hidden" name="image" value={product?.image || ''} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-2">
              <Label htmlFor="imageFile">تصویر محصول</Label>
               <div className="relative w-full aspect-square border-dashed border-2 rounded-md flex items-center justify-center text-muted-foreground">
                 {imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt="Product preview" 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="rounded-md object-cover"
                    />
                 ) : (
                    <div className="text-center">
                        <Upload className="mx-auto h-8 w-8"/>
                        <p>آپلود تصویر</p>
                    </div>
                 )}
                 <Input 
                    id="imageFile" 
                    name="imageFile" 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    accept="image/*"
                    onChange={handleImageChange}
                 />
               </div>
            </div>
            <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">نام محصول</Label>
                    <Input id="name" name="name" defaultValue={product?.name} onChange={(e) => setProductName(e.target.value)} />
                    {formState?.errors?.name && <FormError message={formState.errors.name[0]} />}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">توضیحات</Label>
                    <Textarea id="description" name="description" defaultValue={product?.description} />
                    {formState?.errors?.description && <FormError message={formState.errors.description[0]} />}
                </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="price">قیمت (تومان)</Label>
                <Input id="price" name="price" type="number" defaultValue={product?.price} />
                {formState?.errors?.price && <FormError message={formState.errors.price[0]} />}
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select name="category" defaultValue={product?.category}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="یک دسته‌بندی انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 {formState?.errors?.category && <FormError message={formState.errors.category[0]} />}
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="aiHint">راهنمای هوش مصنوعی (اختیاری)</Label>
            <div className="flex gap-2">
                <Input id="aiHint" name="aiHint" value={aiHint} onChange={(e) => setAiHint(e.target.value)} placeholder="مثال: kebab platter"/>
                <Button type="button" variant="outline" onClick={handleSuggestHint} disabled={isPending || !productName}>
                    {isPending ? "..." : <Sparkles className="h-4 w-4" />}
                    <span className="hidden sm:inline ms-2">پیشنهاد</span>
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">یک یا دو کلمه انگلیسی برای کمک به پیدا کردن تصویر مناسب توسط هوش مصنوعی.</p>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="featured" name="featured" defaultChecked={product?.featured} />
            <Label htmlFor="featured">محصول ویژه</Label>
          </div>

          {formState?.message && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formState.message}</AlertDescription>
            </Alert>
          )}

        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onSuccess}>انصراف</Button>
            <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "در حال ذخیره..." : "ذخیره تغییرات"}
    </Button>
  );
}

function FormError({ message }: { message: string }) {
    return <p className="text-sm font-medium text-destructive">{message}</p>
}
