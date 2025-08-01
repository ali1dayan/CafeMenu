
import { MenuClient } from "@/components/menu/MenuClient";
import { getMenuItems, getCategories } from "@/app/dashboard/_actions/products";

export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const [menuItems, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  return <MenuClient initialMenuItems={menuItems} initialCategories={categories} />;
}
