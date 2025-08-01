import { logout } from "./_actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-card border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">داشبورد مدیریت</h1>
          <form action={logout}>
            <Button variant="ghost" size="icon" aria-label="خروج">
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
