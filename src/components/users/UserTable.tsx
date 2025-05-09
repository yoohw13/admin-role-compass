
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { UserRoleSelector } from "./UserRoleSelector";
import { User, UserRole } from "@/types/user";
import { users } from "@/data/userData";
import { formatDistanceToNow } from "date-fns";

interface UserTableProps {
  onUserSelect?: (userId: number) => void;
  selectedUserId?: number | null;
  refresh?: number;
}

export function UserTable({ onUserSelect, selectedUserId, refresh = 0 }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [internalRefresh, setInternalRefresh] = useState(0);
  
  // Apply filters
  useEffect(() => {
    let result = [...users];
    
    // Search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(lowerSearchTerm) ||
          user.email.toLowerCase().includes(lowerSearchTerm) ||
          user.department.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Role filter
    if (roleFilter !== "all") {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
  }, [searchTerm, roleFilter, statusFilter, refresh, internalRefresh]);

  const handleRowClick = (id: number) => {
    if (onUserSelect) {
      onUserSelect(id);
    }
  };
  
  const handleRoleUpdated = () => {
    // Trigger a re-render to show updated data
    setInternalRefresh(prev => prev + 1);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Role: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
              <SelectItem value="Guest">Guest</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No users found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow 
                  key={user.id} 
                  className={`cursor-pointer ${selectedUserId === user.id ? 'bg-muted' : ''}`}
                  onClick={(e) => {
                    // Don't navigate if clicking on actions
                    if ((e.target as HTMLElement).closest('button')) return;
                    handleRowClick(user.id);
                  }}
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell><RoleBadge role={user.role} /></TableCell>
                  <TableCell><StatusBadge status={user.status} /></TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-right">
                    <UserRoleSelector 
                      userId={user.id} 
                      currentRole={user.role}
                      onRoleUpdated={handleRoleUpdated}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} users
        </div>
      </div>
    </div>
  );
}
