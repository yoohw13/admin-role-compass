
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AppHeaderProps {
  title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-8" 
          />
        </div>
        <div className="relative">
          <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
            2
          </span>
        </div>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
          <span className="text-sm font-medium text-accent-foreground">JD</span>
        </div>
      </div>
    </div>
  );
}
