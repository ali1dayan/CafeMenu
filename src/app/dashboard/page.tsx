"use client"

import { useEffect, useState, useCallback } from 'react';
import { ProductTable } from "./_components/ProductTable";
import { getMenuItems, getCategories } from "./_actions/products";
import type { MenuItem } from '@/lib/types';

export default function Dashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [items, cats] = await Promise.all([
      getMenuItems(),
      getCategories(),
    ]);
    setMenuItems(items);
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <ProductTable 
        menuItems={menuItems} 
        categories={categories}
        onDataChange={fetchData} 
      />
    </div>
  );
}
