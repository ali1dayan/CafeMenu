import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} کافه رستوران طعم پارسی. تمامی حقوق محفوظ است.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            درباره ما
          </Link>
          <Link href="/contact" className="text-sm hover:underline underline-offset-4">
            تماس با ما
          </Link>
          <Link href="/dashboard/login" className="text-sm hover:underline underline-offset-4">
            ورود مدیر
          </Link>
        </nav>
      </div>
    </footer>
  );
}
