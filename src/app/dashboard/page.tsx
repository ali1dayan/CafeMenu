import { FilePlus, MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { menuItems, categories } from "@/lib/data";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">داشبورد محصولات</h1>
          <p className="text-muted-foreground">
            مدیریت محصولات و دسته‌بندی‌ها
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="me-2 h-4 w-4" />
            افزودن محصول
          </Button>
          <Button variant="outline">
            <FilePlus className="me-2 h-4 w-4" />
            خروجی اکسل
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
                        <DropdownMenuItem>
                          <Pencil className="ms-2 h-4 w-4" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="ms-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
