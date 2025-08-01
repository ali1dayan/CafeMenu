"use client";

import { useActionState, useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, Pencil, Trash2, FilePlus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

import { ProductForm } from "./ProductForm";
import { CategoryForm } from "./CategoryForm";
import { deleteProduct, deleteCategory, getCategories, getMenuItems } from "../_actions/products";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "@/lib/types";

type ProductTableProps = {
  menuItems: MenuItem[];
  categories: { id: string; name: string }[];
};

export function ProductTable({ menuItems: initialMenuItems, categories: initialCategories }: ProductTableProps) {
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    setMenuItems(initialMenuItems);
    setCategories(initialCategories);
  }, [initialMenuItems, initialCategories]);


  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductFormOpen(true);
  };
  
  const handleAddCategory = () => {
    setIsCategoryFormOpen(true);
  };

  const handleEditProduct = (product: MenuItem) => {
    setSelectedProduct(product);
    setIsProductFormOpen(true);
  };

  const refreshData = async () => {
    const [newMenuItems, newCategories] = await Promise.all([
      getMenuItems(),
      getCategories(),
    ]);
    setMenuItems(newMenuItems);
    setCategories(newCategories);
  };


  const handleDeleteProduct = async (id: number) => {
    const result = await deleteProduct(id);
    if (result.success) {
      toast({
        title: "موفق",
        description: "محصول با موفقیت حذف شد.",
      });
      await refreshData();
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: result.message || "خطا در حذف محصول.",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteCategory(id);
    if (result.success) {
      toast({
        title: "موفق",
        description: "دسته‌بندی با موفقیت حذف شد.",
      });
      await refreshData();
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: result.message || "خطا در حذف دسته‌بندی.",
      });
    }
  }
  
  const handleSuccess = async () => {
    setIsProductFormOpen(false);
    setIsCategoryFormOpen(false);
    setSelectedProduct(null);
    toast({
        title: "موفق",
        description: "عملیات با موفقیت انجام شد.",
    });
    await refreshData();
  };


  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">داشبورد</h1>
          <p className="text-muted-foreground">
            مدیریت محصولات و دسته‌بندی‌ها
          </p>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>محصولات</CardTitle>
                <CardDescription>
                    در اینجا می‌توانید لیست محصولات خود را مشاهده و مدیریت کنید.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">تصویر</span>
                        </TableHead>
                        <TableHead>نام محصول</TableHead>
                        <TableHead className="hidden md:table-cell">دسته‌بندی</TableHead>
                        <TableHead className="hidden md:table-cell">قیمت</TableHead>
                        <TableHead className="hidden sm:table-cell">ویژه</TableHead>
                        <TableHead>
                        <span className="sr-only">عملیات</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {menuItems.map((item) => (
                        <TableRow key={item.id}>
                        <TableCell className="hidden sm:table-cell">
                            <Image
                            alt={item.name}
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={item.image || "https://placehold.co/64x64.png"}
                            width="64"
                            />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            {categories.find((c) => c.id === item.category)?.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{item.price.toLocaleString("fa-IR")} تومان</TableCell>
                        <TableCell className="hidden sm:table-cell">{item.featured ? "بله" : "خیر"}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditProduct(item)}>
                                <Pencil className="ms-2 h-4 w-4" />
                                ویرایش
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                    <div className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive outline-none transition-colors hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                        <Trash2 className="ms-2 h-4 w-4" />
                                        حذف
                                    </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            این عمل قابل بازگشت نیست. این محصول برای همیشه حذف خواهد شد.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>انصراف</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteProduct(item.id)}>
                                            بله، حذف کن
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleAddProduct}>
                        <PlusCircle className="me-2 h-4 w-4" />
                        افزودن محصول جدید
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                <CardTitle>دسته‌بندی‌ها</CardTitle>
                <CardDescription>
                    دسته‌بندی‌های موجود را مدیریت کنید.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between rounded-md border p-3">
                                <span className="text-sm font-medium">{cat.name}</span>
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>حذف دسته‌بندی</AlertDialogTitle>
                                            <AlertDialogDescription>
                                            آیا از حذف دسته‌بندی "{cat.name}" مطمئن هستید؟ این عمل قابل بازگشت نیست.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>انصراف</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteCategory(cat.id)}>
                                            بله، حذف کن
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                     <Button onClick={handleAddCategory} className="w-full">
                        <FilePlus className="me-2 h-4 w-4" />
                        افزودن دسته‌بندی
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>

      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}</DialogTitle>
            <DialogDescription>
              اطلاعات محصول را در اینجا وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <ProductForm product={selectedProduct} categories={categories} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryFormOpen} onOpenChange={setIsCategoryFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <CategoryForm onSuccess={handleSuccess} />
          </DialogContent>
      </Dialog>
    </>
  );
}
