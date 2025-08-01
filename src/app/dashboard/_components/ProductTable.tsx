"use client";

import { useActionState, useState } from "react";
import { PlusCircle, MoreHorizontal, Pencil, Trash2, FilePlus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogFooter,
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
import { addCategory, deleteProduct } from "../_actions/products";
import { useToast } from "@/hooks/use-toast";
import type { MenuItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProductTableProps = {
  menuItems: MenuItem[];
  categories: { id: string; name: string }[];
  onDataChange: () => void;
};

type CategoryFormState = {
  errors?: {
    id?: string[];
    name?: string[];
  };
  success?: boolean;
} | undefined;

function AddCategoryForm({ onSuccess }: { onSuccess: () => void }) {
  const [formState, action] = useActionState<CategoryFormState, FormData>(addCategory, undefined);
  
  if (formState?.success) {
    onSuccess();
  }

  return (
      <form action={action}>
        <DialogHeader>
            <DialogTitle>افزودن دسته‌بندی جدید</DialogTitle>
            <DialogDescription>
                یک دسته‌بندی جدید برای محصولات خود ایجاد کنید.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">نام دسته‌بندی</Label>
                <Input id="name" name="name" className="col-span-3" />
                {formState?.errors?.name && <p className="col-span-4 text-sm font-medium text-destructive">{formState.errors.name[0]}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">آی‌دی انگلیسی</Label>
                <Input id="id" name="id" placeholder="e.g. new-drinks" className="col-span-3" />
                {formState?.errors?.id && <p className="col-span-4 text-sm font-medium text-destructive">{formState.errors.id[0]}</p>}
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">افزودن</Button>
        </DialogFooter>
    </form>
  )
}

export function ProductTable({ menuItems, categories, onDataChange }: ProductTableProps) {
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const { toast } = useToast();

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

  const handleDeleteProduct = async (id: number) => {
    const result = await deleteProduct(id);
    if (result.success) {
      toast({
        title: "موفق",
        description: "محصول با موفقیت حذف شد.",
      });
      onDataChange();
    } else {
      toast({
        variant: "destructive",
        title: "خطا",
        description: result.message || "خطا در حذف محصول.",
      });
    }
  };
  
  const handleProductFormSuccess = () => {
    setIsProductFormOpen(false);
    setSelectedProduct(null);
    toast({
        title: "موفق",
        description: "عملیات محصول با موفقیت انجام شد.",
      });
    onDataChange();
  };

  const handleCategoryFormSuccess = () => {
    setIsCategoryFormOpen(false);
     toast({
        title: "موفق",
        description: "دسته‌بندی جدید اضافه شد.",
      });
    onDataChange();
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">داشبورد محصولات</h1>
          <p className="text-muted-foreground">
            مدیریت محصولات و دسته‌بندی‌ها
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddCategory} variant="outline">
            <FilePlus className="me-2 h-4 w-4" />
            افزودن دسته‌بندی
          </Button>
          <Button onClick={handleAddProduct}>
            <PlusCircle className="me-2 h-4 w-4" />
            افزودن محصول
          </Button>
        </div>
      </div>
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
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>ویژه</TableHead>
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
                  <TableCell>
                    {categories.find((c) => c.id === item.category)?.name}
                  </TableCell>
                  <TableCell>{item.price.toLocaleString("fa-IR")} تومان</TableCell>
                  <TableCell>{item.featured ? "بله" : "خیر"}</TableCell>
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
      </Card>

      <Dialog open={isProductFormOpen} onOpenChange={setIsProductFormOpen}>
        <DialogContent className="sm:max-w-[725px]">
            <ProductForm product={selectedProduct} categories={categories} onSuccess={handleProductFormSuccess} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryFormOpen} onOpenChange={setIsCategoryFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <AddCategoryForm onSuccess={handleCategoryFormSuccess} />
          </DialogContent>
      </Dialog>
    </>
  );
}
