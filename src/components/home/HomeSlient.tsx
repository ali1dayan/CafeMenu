"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMenuItems } from "@/app/dashboard/_actions/products";
import { ArrowLeft, Utensils, Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomeSlient() {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const allItems = await getMenuItems();
        setFeaturedItems(allItems.filter((item: any) => item.isSpecial));
      } catch (error) {
        console.error("Failed to fetch featured items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (featuredItems.length === 0) return <p>محصول ویژه‌ای موجود نیست.</p>;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
            پیشنهاد ویژه
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            پیشنهادهای ویژه ما
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            منتخبی از محبوب ترین غذاها و نوشیدنی های ما که توسط سرآشپزمان آماده
            شده است.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {featuredItems.map((item: any) => (
            <Card key={item.id} className="overflow-hidden glassmorphism">
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
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {item.price.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/menu">
              <span>مشاهده کل منو</span>
              <ArrowLeft className="me-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
