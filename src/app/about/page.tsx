import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">درباره ما</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          داستان ما، داستان عشق به طعم و اصالت است
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h2 className="mb-4 font-headline text-3xl font-bold text-primary">
            ریشه در سنت، نگاه به آینده
          </h2>
          <p className="mb-4 text-foreground/80 leading-loose">
            کافه رستوران طعم پارسی در سال ۱۳۹۵ با یک رویای ساده تاسیس شد: ایجاد مکانی که در آن طعم‌های اصیل و فراموش‌شده ایرانی با رویکردی مدرن بازآفرینی شوند. ما معتقدیم که هر غذا داستانی برای گفتن دارد و ما اینجا هستیم تا این داستان‌ها را با شما به اشتراک بگذاریم.
          </p>
          <p className="text-foreground/80 leading-loose">
            تیم ما متشکل از سرآشپزهای با تجربه و جوانان خلاق است که با استفاده از تازه‌ترین مواد اولیه محلی، هر روز بهترین‌ها را برای شما آماده می‌کنند. از کباب‌های سنتی گرفته تا دسرهای نوآورانه، هر آیتم در منوی ما با دقت و عشق فراوان تهیه می‌شود.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="https://placehold.co/600x400.png"
            alt="فضای داخلی کافه رستوران"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
            data-ai-hint="restaurant interior"
          />
        </div>
      </div>
      
      <div className="mt-24 text-center">
        <h2 className="mb-8 font-headline text-3xl font-bold text-primary">
          تعهد ما
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-card p-6">
            <h3 className="mb-2 font-headline text-xl font-semibold">کیفیت برتر</h3>
            <p className="text-muted-foreground">استفاده از بهترین و تازه‌ترین مواد اولیه برای تضمین بهترین طعم.</p>
          </div>
          <div className="rounded-lg bg-card p-6">
            <h3 className="mb-2 font-headline text-xl font-semibold">مهمان‌نوازی ایرانی</h3>
            <p className="text-muted-foreground">ارائه خدماتی گرم و صمیمی تا شما احساس کنید در خانه خود هستید.</p>
          </div>
          <div className="rounded-lg bg-card p-6">
            <h3 className="mb-2 font-headline text-xl font-semibold">فضایی دلنشین</h3>
            <p className="text-muted-foreground">طراحی فضایی آرام و زیبا برای لذت بردن از لحظات شما.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
