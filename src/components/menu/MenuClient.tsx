"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Category as CategoryType, MenuItem } from '@/lib/types';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionCard = motion(Card);

interface MenuClientProps {
  initialMenuItems: MenuItem[];
  initialCategories: { id: string; name: string }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export function MenuClient({ initialMenuItems, initialCategories }: MenuClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  const filteredMenuItems = useMemo(() => {
    return initialMenuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, initialMenuItems]);


  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="font-headline text-5xl font-black text-foreground md:text-7xl">منوی ما</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          مجموعه ای از بهترین طعم ها، آماده شده با عشق و مواد اولیه تازه
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.2 }}
         className="my-12 flex flex-col items-center gap-8"
      >
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="جستجو در منو..."
            className="h-14 pe-12 text-lg rounded-full border-2 border-border/20 bg-background/50 backdrop-blur-sm focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
            <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="rounded-full px-6 py-3 text-base glass-button border-0"
            >
                همه
            </Button>
            {initialCategories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className="rounded-full px-6 py-3 text-base glass-button border-0"
              >
                {cat.name}
              </Button>
            ))}
        </div>
      </motion.div>

      {/* Menu Grid */}
      <motion.div
        key={selectedCategory} // Re-trigger animation when category changes
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence>
            {filteredMenuItems.length > 0 ? (
                filteredMenuItems.map(item => (
                <MotionCard 
                    key={item.id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    whileHover={{ y: -10 }}
                    className="group glass-card overflow-hidden"
                >
                    <div className="overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={400}
                        height={300}
                        className="h-60 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={item.aiHint}
                    />
                    </div>
                    <CardContent className="p-4">
                    <h3 className="truncate font-headline text-xl font-bold">{item.name}</h3>
                    <p className="mt-2 h-12 text-sm text-muted-foreground overflow-hidden text-ellipsis">
                        {item.description}
                    </p>
                    <p className="mt-4 text-lg font-semibold text-primary">
                        {item.price.toLocaleString('fa-IR')} تومان
                    </p>
                    </CardContent>
                </MotionCard>
                ))
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 col-span-full"
                >
                    <p className="text-xl text-muted-foreground">هیچ موردی با جستجوی شما یافت نشد.</p>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
