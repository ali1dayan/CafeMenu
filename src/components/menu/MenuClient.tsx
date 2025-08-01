"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { Category as CategoryType, MenuItem } from '@/lib/types';


interface MenuClientProps {
  initialMenuItems: MenuItem[];
  initialCategories: { id: string; name: string }[];
}

export function MenuClient({ initialMenuItems, initialCategories }: MenuClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuItems = useMemo(() => {
    return initialMenuItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialMenuItems]);

  const menuByCategory = (category: CategoryType) => {
    return filteredMenuItems.filter(item => item.category === category);
  };


  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">منوی ما</h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          نگاهی به غذاها، نوشیدنی ها و دسرهای خوشمزه ما بیندازید.
        </p>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="جستجو در منو..."
            className="w-full rounded-full bg-background pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">همه</TabsTrigger>
          {initialCategories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {filteredMenuItems.map(item => (
                    <Card key={item.id} className="overflow-hidden">
                        <Image
                        src={item.image}
                        alt={item.name}
                        width={400}
                        height={225}
                        className="aspect-video w-full object-cover"
                        data-ai-hint={item.aiHint}
                        />
                        <CardContent className="p-4">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-semibold">{item.price.toLocaleString('fa-IR')} تومان</span>
                            <Button size="sm">سفارش</Button>
                        </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>

        {initialCategories.map(cat => (
            <TabsContent key={cat.id} value={cat.id} className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                    {menuByCategory(cat.id as CategoryType).map(item => (
                        <Card key={item.id} className="overflow-hidden">
                            <Image
                            src={item.image}
                            alt={item.name}
                            width={400}
                            height={225}
                            className="aspect-video w-full object-cover"
                            data-ai-hint={item.aiHint}
                            />
                            <CardContent className="p-4">
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-semibold">{item.price.toLocaleString('fa-IR')} تومان</span>
                                <Button size="sm">سفارش</Button>
                            </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
       {filteredMenuItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">هیچ موردی با جستجوی شما یافت نشد.</p>
          </div>
        )}
    </div>
  );
}
