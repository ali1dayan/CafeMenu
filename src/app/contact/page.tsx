import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">تماس با ما</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          ما همیشه برای شنیدن صدای شما آماده‌ایم.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">آدرس</h3>
              <p className="text-muted-foreground">تهران، خیابان ولیعصر، نرسیده به میدان تجریش، پلاک ۱۲۳۴</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
             <div className="mt-1 flex-shrink-0">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">تلفن</h3>
              <p className="text-muted-foreground" style={{direction: 'ltr'}}>+۹۸ ۲۱ ۲۳۴۵ ۶۷۸۹</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
             <div className="mt-1 flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">ایمیل</h3>
              <p className="text-muted-foreground">info@tasteofpersia.com</p>
            </div>
          </div>
           <div className="flex items-start gap-4">
             <div className="mt-1 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div>
              <h3 className="font-headline text-xl font-semibold">ساعات کاری</h3>
              <p className="text-muted-foreground">شنبه تا پنجشنبه: ۱۲ ظهر تا ۱۱ شب</p>
              <p className="text-muted-foreground">جمعه‌ها و ایام تعطیل: ۱۲ ظهر تا ۱۲ شب</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Image
            src="https://placehold.co/600x450.png"
            alt="نقشه موقعیت رستوران"
            width={600}
            height={450}
            className="h-full w-full object-cover"
            data-ai-hint="city map"
          />
        </div>
      </div>
    </div>
  );
}
