
"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import { menuItems, categories } from "@/lib/data";
import type { MenuItem } from "@/lib/types";
import { ai } from "@/ai/genkit";

// In a real app, you'd be reading this from a database.
// For this prototype, we'll just use the in-memory data.
let nextId = Math.max(...menuItems.map(item => item.id)) + 1;

export async function getMenuItems() {
  noStore(); // Opt out of caching
  // Make a copy to avoid mutation issues in dev environments
  return Promise.resolve(JSON.parse(JSON.stringify(menuItems)));
}
export async function getCategories() {
  noStore(); // Opt out of caching
  // Make a copy to avoid mutation issues in dev environments
  return Promise.resolve(JSON.parse(JSON.stringify(categories)));
}
export async function getMenuItem(id: number) {
  noStore(); // Opt out of caching
  return Promise.resolve(menuItems.find((item) => item.id === id));
}

const productSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "نام محصول الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
  price: z.coerce.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  featured: z.preprocess((val) => val === 'on', z.boolean()),
  image: z.string().optional(),
  aiHint: z.string().optional(),
});

export async function saveProduct(prevState: unknown, formData: FormData) {
  const validatedFields = productSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { id, ...data } = validatedFields.data;

  // For image upload, a real app would save the file and get a URL.
  // We'll simulate this by keeping the placeholder or existing image.
  const imageFile = formData.get('imageFile') as File;
  let imageUrl = data.image || 'https://placehold.co/400x300.png';

  if (imageFile && imageFile.size > 0) {
      // In a real app, you'd upload this to a storage service (like Firebase Storage)
      // and get a URL back. For this prototype, we'll use a data URI.
      const buffer = await imageFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageUrl = `data:${imageFile.type};base64,${base64}`;
  }

  const productData = {
    ...data,
    image: imageUrl,
    // Ensure category is of the correct type, not just string
    category: data.category as 'hot-drinks' | 'cold-drinks' | 'meals' | 'desserts'
  };

  if (id) {
    // Update existing product
    const index = menuItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      menuItems[index] = { ...menuItems[index], ...productData, id };
    }
  } else {
    // Add new product
    const newProduct: MenuItem = { ...productData, id: nextId++ };
    menuItems.push(newProduct);
  }

  revalidatePath("/dashboard");
  revalidatePath("/menu");
  revalidatePath("/");
  return { success: true };
}


export async function deleteProduct(id: number) {
    const index = menuItems.findIndex((item) => item.id === id);
    if (index !== -1) {
        menuItems.splice(index, 1);
        revalidatePath("/dashboard");
        revalidatePath("/menu");
        revalidatePath("/");
        return { success: true };
    }
    return { success: false, message: "محصول یافت نشد" };
}

const categorySchema = z.object({
  id: z.string().min(1, "آی‌دی دسته‌بندی الزامی است").regex(/^[a-z-]+$/, "آی‌دی فقط می‌تواند شامل حروف کوچک انگلیسی و خط تیره باشد"),
  name: z.string().min(1, "نام دسته‌بندی الزامی است"),
});

export async function addCategory(prevState: unknown, formData: FormData) {
  const validatedFields = categorySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newCategory = validatedFields.data;

  if (categories.some(cat => cat.id === newCategory.id)) {
    return {
      errors: { id: ["این آی‌دی قبلا استفاده شده است."] }
    }
  }

  categories.push(newCategory as { id: 'hot-drinks' | 'cold-drinks' | 'meals' | 'desserts'; name: string });

  revalidatePath("/dashboard");
  revalidatePath("/menu");
  revalidatePath("/");
  return { success: true };
}

export async function deleteCategory(id: string) {
    const index = categories.findIndex((cat) => cat.id === id);
    if (index !== -1) {
        if (menuItems.some(item => item.category === id)) {
            return { success: false, message: "این دسته‌بندی شامل محصولاتی است و نمی‌توان آن را حذف کرد." };
        }
        categories.splice(index, 1);
        revalidatePath("/dashboard");
        revalidatePath("/menu");
        revalidatePath("/");
        return { success: true };
    }
    return { success: false, message: "دسته‌بندی یافت نشد" };
}

const suggestHintPrompt = ai.definePrompt({
    name: 'suggestHintPrompt',
    input: { schema: z.string() },
    output: { schema: z.string() },
    prompt: `Based on the product name '{{input}}', suggest one or two English keywords suitable for an image search hint (like for Unsplash). The output should be lowercase and space-separated. For example, for 'کیک شکلاتی', the output could be 'chocolate cake'.`,
});

export async function suggestAiHint(productName: string) {
    if (!productName) {
        return { error: "Product name is required." };
    }
    try {
        const { output } = await suggestHintPrompt(productName);
        return { hint: output };
    } catch (e) {
        console.error(e);
        return { error: "Failed to generate suggestion." };
    }
}
