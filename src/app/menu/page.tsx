
import { MenuClient } from "@/components/menu/MenuClient";
import { getMenuItems, getCategories } from "@/app/dashboard/_actions/products";

// This tells Next.js to always render this page dynamically,
// ensuring the latest data is fetched on every request.
export const dynamic = 'force-dynamic';

export default async function MenuPage() {
  const menuItems = await getMenuItems();
  const categories = await getCategories();

  return <MenuClient initialMenuItems={menuItems} initialCategories={categories} />;
}
