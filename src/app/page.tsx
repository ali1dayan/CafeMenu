
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMenuItems } from '@/app/dashboard/_actions/products';
import { ArrowLeft } from 'lucide-react';

export default async function Home() {
  const menuItems = await getMenuItems();
  const featuredItems = menuItems.filter(item => item.featured);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl">
            به کافه رستوران طعم پارسی خوش آمدید
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground md:text-xl">
            تجربه ای بی نظیر از طعم های اصیل و مدرن ایرانی در فضایی گرم و دلنشین
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/menu">مشاهده منو</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">تماس با ما</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
            غذاهای ویژه ما
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="h-60 w-full object-cover"
                    data-ai-hint={item.aiHint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                  <p className="mt-4 font-semibold text-primary">{item.price.toLocaleString('fa-IR')} تومان</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
             <Button asChild variant="ghost" className="text-primary hover:text-primary">
                <Link href="/menu">
                  <span>مشاهده همه موارد</span>
                  <ArrowLeft className="me-2 h-4 w-4" />
                </Link>
              </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
