
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserRole } from "@/types/user";
import { updateUserRole } from "@/data/userData";

interface UserRoleSelectorProps {
  userId: number;
  currentRole: UserRole;
  onRoleUpdated?: () => void;
}

export function UserRoleSelector({ userId, currentRole, onRoleUpdated }: UserRoleSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [reason, setReason] = useState("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form when dialog is closed
      setSelectedRole(undefined);
      setReason("");
    }
    setOpen(open);
  };

  const handleSubmit = () => {
    if (!selectedRole) return;
    
    // In a real app, you'd get the current admin ID from an auth context
    const currentAdminId = 1;
    
    // Update the user role
    const success = updateUserRole(userId, selectedRole, currentAdminId, reason);
    
    if (success) {
      toast.success(`Role updated to ${selectedRole}`);
      if (onRoleUpdated) {
        onRoleUpdated();
      }
    } else {
      toast.error("Failed to update role");
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Role</DialogTitle>
          <DialogDescription>
            Change the user&apos;s role in the system. This action will be logged.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-role" className="text-right">
              Current Role
            </Label>
            <div className="col-span-3">
              <span className="font-medium">{currentRole}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-role" className="text-right">
              New Role
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Guest">Guest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              Reason
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide a reason for this change"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedRole}>
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
