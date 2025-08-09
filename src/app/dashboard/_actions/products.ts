export async function getMenuItems() {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_SITE_URL || ""
        : "";

    const res = await fetch(`${baseUrl}/api/menu`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

    const data = await res.json();
    return data.map((item: any) => ({
      id: item._id,
      name: item.title,
      price: item.price,
      description: item.description,
      image: item.imageUrl,
      category: item.category?.titleEn,
      isSpecial: item.isSpecial,
    }));
  } catch (err) {
    console.error("Error fetching menu items:", err);
    return [];
  }
}

export async function getCategories() {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        : "";

    const res = await fetch(`${baseUrl}/api/categories`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

    const data = await res.json();
    return data.map((cat: any) => ({
      id: cat.titleEn,
      name: cat.titleFa,
    }));
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
