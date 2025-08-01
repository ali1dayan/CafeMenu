"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { menuItems, categories } from "@/lib/data";
import type { MenuItem } from "@/lib/types";

// In a real app, you'd be reading this from a database.
// For this prototype, we'll just use the in-memory data.
let nextId = Math.max(...menuItems.map(item => item.id)) + 1;

export async function getMenuItems() {
  return Promise.resolve(menuItems);
}
export async function getCategories() {
  return Promise.resolve(categories);
}
export async function getMenuItem(id: number) {
  return Promise.resolve(menuItems.find((item) => item.id === id));
}

const productSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "نام محصول الزامی است"),
  description: z.string().min(1, "توضیحات الزامی است"),
  price: z.coerce.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  category: z.enum(["hot-drinks", "cold-drinks", "meals", "desserts"]),
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


  if (id) {
    // Update existing product
    const index = menuItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      menuItems[index] = { ...menuItems[index], ...data, image: imageUrl, id };
    }
  } else {
    // Add new product
    const newProduct: MenuItem = { ...data, image: imageUrl, id: nextId++ };
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
