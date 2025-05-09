
import { UserTable } from "@/components/users/UserTable";

const UserManagement = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Role Management</h2>
      </div>
      <p className="text-muted-foreground">
        View and manage user roles across your organization. Click on a user to view detailed information.
      </p>
      <UserTable />
    </div>
  );
};

export default UserManagement;
