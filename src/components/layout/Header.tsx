"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, UtensilsCrossed, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navLinks = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/menu', label: 'منو' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full">
       <div className="absolute top-0 left-0 w-full h-full bg-background/30 backdrop-blur-xl border-b border-border/20"></div>
       <div className="container mx-auto flex h-20 items-center justify-between px-4 relative z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-7 w-7 text-primary" />
            <span className="font-headline text-2xl font-bold">طعم پارسی</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 rounded-full bg-background/20 p-2 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  pathname === link.href ? 'text-secondary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">باز کردن منو</span>
            </Button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
              onClick={toggleMobileMenu}
            >
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background/80 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex h-full flex-col p-6">
                        <div className="flex items-center justify-between mb-8">
                             <Link href="/" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                                <UtensilsCrossed className="h-6 w-6 text-primary" />
                                <span className="font-headline text-xl font-bold">طعم پارسی</span>
                            </Link>
                            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i + 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={toggleMobileMenu}
                                        className={cn(
                                        'text-xl font-medium transition-colors hover:text-primary py-2 block',
                                        pathname === link.href ? 'text-primary' : 'text-foreground'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>
                </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
