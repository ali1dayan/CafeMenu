import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMenuItems } from '@/app/dashboard/_actions/products';
import { ArrowLeft, Utensils, Award } from 'lucide-react';
import type { MenuItem } from '@/lib/types';


export default async function Home() {
    const allItems = await getMenuItems();
    const featuredItems = allItems.filter(item => item.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-grid">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                  کافه رستوران طعم پارسی
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  تجربه ای بی نظیر از طعم های اصیل ایرانی در فضایی دلنشین و مدرن. ما بهترین ها را برای شما آماده کرده ایم.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/menu">
                      مشاهده منو
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="غذای اصلی"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                data-ai-hint="persian food plate"
              />
            </div>
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">پیشنهاد ویژه</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">پیشنهادهای ویژه ما</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    منتخبی از محبوب ترین غذاها و نوشیدنی های ما که توسط سرآشپزمان آماده شده است.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
              {featuredItems.map((item) => (
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
                        <Button asChild variant="outline">
                           <Link href="/menu">سفارش</Link>
                        </Button>
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

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">چرا ما را انتخاب کنید؟</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    ما به کیفیت، طعم و رضایت شما اهمیت می دهیم.
                </p>
                </div>
                <div className="mx-auto w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                    <div className="flex flex-col items-center space-y-3">
                        <Utensils className="h-12 w-12 text-primary" />
                        <h3 className="font-bold text-xl">طعم اصیل</h3>
                        <p className="text-sm text-muted-foreground">استفاده از مواد اولیه تازه و دستور پخت های سنتی برای ارائه بهترین طعم ایرانی.</p>
                    </div>
                     <div className="flex flex-col items-center space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                        <h3 className="font-bold text-xl">کیفیت بالا</h3>
                        <p className="text-sm text-muted-foreground">تعهد به کیفیت در تمام مراحل، از انتخاب مواد اولیه تا پخت و سرو غذا.</p>
                    </div>
                     <div className="flex flex-col items-center space-y-3">
                        <Award className="h-12 w-12 text-primary" />
                        <h3 className="font-bold text-xl">فضای دلنشین</h3>
                        <p className="text-sm text-muted-foreground">محیطی آرام و زیبا برای لذت بردن از غذای خود به همراه خانواده و دوستان.</p>
                    </div>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
