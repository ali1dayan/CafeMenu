import { MenuClient } from "@/components/menu/MenuClient";
import { getMenuItems, getCategories } from "@/app/dashboard/_actions/products";

export default async function MenuPage() {
  // Fetch data on the server
  const menuItems = await getMenuItems();
  const categories = await getCategories();

  return <MenuClient initialMenuItems={menuItems} initialCategories={categories} />;
}
