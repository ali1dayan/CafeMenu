import { ProductTable } from "./_components/ProductTable";
import { getMenuItems, getCategories } from "./_actions/products";

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  
  const [menuItems, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto py-10">
      <ProductTable 
        menuItems={menuItems} 
        categories={categories}
      />
    </div>
  );
}
