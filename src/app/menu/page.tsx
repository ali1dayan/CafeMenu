"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { menuItems, categories } from '@/lib/data';
import type { Category } from '@/lib/types';
import { Search } from 'lucide-react';

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const groupedMenuItems = useMemo(() => {
    const groups: { [key in Category]?: typeof menuItems } = {};
    for (const item of filteredMenuItems) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category]?.push(item);
    }
    return groups;
  }, [filteredMenuItems]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">منوی ما</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          مجموعه ای از بهترین طعم ها، آماده شده با عشق و مواد اولیه تازه
        </p>
      </div>

      <div className="my-12 flex flex-col items-center gap-4 md:flex-row">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="جستجوی غذا..."
            className="h-12 pe-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            همه
          </Button>
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {Object.entries(groupedMenuItems).length > 0 ? (
          Object.entries(groupedMenuItems).map(([categoryId, items]) => (
            <div key={categoryId}>
              <h2 className="mb-8 font-headline text-3xl font-bold text-primary">
                {categories.find(c => c.id === categoryId)?.name}
              </h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items?.map(item => (
                  <Card key={item.id} className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <CardHeader className="p-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={item.aiHint}
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="truncate font-headline">{item.name}</CardTitle>
                      <p className="mt-2 h-12 text-sm text-muted-foreground overflow-hidden text-ellipsis">
                        {item.description}
                      </p>
                      <p className="mt-4 text-lg font-semibold text-primary">
                        {item.price.toLocaleString('fa-IR')} تومان
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">هیچ موردی با جستجوی شما یافت نشد.</p>
          </div>
        )}
      </div>
    </div>
  );
}
