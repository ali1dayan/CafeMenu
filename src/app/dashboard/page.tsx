"use client"

import { ProductTable } from "./_components/ProductTable";
import { getMenuItems, getCategories } from "./_actions/products";


export default async function Dashboard() {
  const menuItems = await getMenuItems();
  const categories = await getCategories();

  return (
    <div className="container mx-auto py-10">
      <ProductTable menuItems={menuItems} categories={categories} />
    </div>
  );
}
