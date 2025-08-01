
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMenuItems } from '@/app/dashboard/_actions/products';
import { ArrowLeft, ChefHat, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { MenuItem } from '@/lib/types';


const MotionCard = motion(Card);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function Home() {
    const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
    
    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await getMenuItems();
            setFeaturedItems(allItems.filter(item => item.featured));
        }
        fetchItems();
    }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center px-4"
      >
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="z-10">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 120 }}
            className="font-headline text-5xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl"
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)'}}
          >
            طعم پارسی
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl"
          >
            جایی که طعم‌های اصیل ایرانی با هنر مدرن دیدار می‌کنند
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="glass-button w-full sm:w-auto text-base font-bold px-8 py-6 rounded-full">
              <Link href="/menu">کشف منو</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto text-base font-semibold text-foreground/90">
              <Link href="/about">داستان ما</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Items Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center font-headline text-4xl font-bold md:text-5xl"
          >
            پیشنهاد ویژه سرآشپز
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredItems.map((item) => (
              <MotionCard
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card overflow-hidden group"
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
                <CardContent className="p-6">
                  <h3 className="font-headline text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-muted-foreground min-h-[40px]">{item.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="font-semibold text-primary text-lg">{item.price.toLocaleString('fa-IR')} تومان</p>
                     <Button asChild size="sm" className="glass-button rounded-full">
                        <Link href="/menu">سفارش</Link>
                    </Button>
                  </div>
                </CardContent>
              </MotionCard>
            ))}
          </motion.div>
          <motion.div
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true, amount: 0.8 }}
             transition={{ duration: 0.5 }}
             className="mt-16 text-center">
             <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground text-lg">
                <Link href="/menu">
                  <span>مشاهده تمام منو</span>
                  <ArrowLeft className="me-2 h-5 w-5" />
                </Link>
              </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-background/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center font-headline text-4xl font-bold md:text-5xl"
            >
              چرا طعم پارسی؟
            </motion.h2>
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
               className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
                <motion.div variants={itemVariants} className="flex flex-col items-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <ChefHat className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-bold">طعم اصیل</h3>
                    <p className="mt-2 text-muted-foreground">استفاده از دستور پخت‌های سنتی و مواد اولیه درجه یک.</p>
                </motion.div>
                 <motion.div variants={itemVariants} className="flex flex-col items-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-bold">فضای مدرن</h3>
                    <p className="mt-2 text-muted-foreground">محیطی دلنشین و طراحی شده برای آرامش و لذت شما.</p>
                </motion.div>
                 <motion.div variants={itemVariants} className="flex flex-col items-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-bold">مهمان‌نوازی</h3>
                    <p className="mt-2 text-muted-foreground">تجربه‌ای به یادماندنی با سرویس‌دهی گرم و صمیمی.</p>
                </motion.div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
