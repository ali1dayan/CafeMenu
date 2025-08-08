// import { ProductTable } from "./_components/ProductTable";
import { getMenuItems, getCategories } from "./_actions/products";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [menuItems, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  return (
    // <div className="container mx-auto py-10">
    //   <ProductTable
    //     menuItems={menuItems}
    //     categories={categories}
    //   />
    // </div>
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">مدیریت منو</h1>
      <p className="mb-4 text-muted-foreground">
        در این بخش می‌توانید اقلام منوی خود را مدیریت کنید.
      </p>
      {/* Add your product management components here */}
      <p className="text-muted-foreground">
        {" "}
        در حال حاضر، این بخش در دست توسعه است. به زودی قابلیت‌های بیشتری اضافه
        خواهد شد.
      </p>
    </div>
  );
}
