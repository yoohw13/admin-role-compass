
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/user";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Manager":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Employee":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Guest":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Badge variant="secondary" className={cn(getRoleBadgeStyle(role), "font-medium", className)}>
      {role}
    </Badge>
  );
}
