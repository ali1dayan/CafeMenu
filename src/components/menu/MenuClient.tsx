"use client";

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { Category as CategoryType, MenuItem } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion";


interface MenuClientProps {
  initialMenuItems: MenuItem[];
  initialCategories: { id: string; name: string }[];
}

export function MenuClient({ initialMenuItems, initialCategories }: MenuClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMenuItems = useMemo(() => {
    let items = initialMenuItems;
    
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  }, [searchTerm, selectedCategory, initialMenuItems]);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline"
        >
            منوی ما
        </motion.h1>
        <motion.p 
             initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
        >
          نگاهی به غذاها، نوشیدنی ها و دسرهای خوشمزه ما بیندازید.
        </motion.p>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="جستجو در منو..."
            className="w-full rounded-full bg-background/80 glassmorphism pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className='mb-12'>
        <Carousel
            opts={{
                align: "start",
                loop: false,
                direction: 'rtl',
            }}
            className="w-full"
            >
            <CarouselContent className="-ml-2">
                 <CarouselItem className="basis-auto pl-2">
                    <Button 
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => handleCategorySelect('all')}
                        className="rounded-full"
                    >
                        همه
                    </Button>
                </CarouselItem>
                {initialCategories.map(cat => (
                 <CarouselItem key={cat.id} className="basis-auto pl-2">
                    <Button 
                        variant={selectedCategory === cat.id ? 'default' : 'outline'}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="rounded-full"
                    >
                        {cat.name}
                    </Button>
                 </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex"/>
            <CarouselNext className="hidden md:flex"/>
        </Carousel>
      </div>

       <motion.div 
         layout
         className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8"
       >
            {filteredMenuItems.map((item, index) => (
                <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <Card className="overflow-hidden glassmorphism h-full flex flex-col">
                        <Image
                        src={item.image}
                        alt={item.name}
                        width={400}
                        height={225}
                        className="aspect-video w-full object-cover"
                        data-ai-hint={item.aiHint}
                        />
                        <CardContent className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p className="mt-2 text-sm text-muted-foreground flex-grow">{item.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-semibold">{item.price.toLocaleString('fa-IR')} تومان</span>
                                <Button size="sm">سفارش</Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>

       {filteredMenuItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">هیچ موردی با جستجوی شما یافت نشد.</p>
          </div>
        )}
    </div>
  );
}
