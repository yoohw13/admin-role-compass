
import { useState } from "react";
import { UserTable } from "@/components/users/UserTable";
import { User } from "@/types/user";
import { getUserById, getUserRoleHistory } from "@/data/userData";
import { UserDetailPanel } from "@/components/users/UserDetailPanel";

const UserManagement = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(0);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    const user = getUserById(userId);
    if (user) {
      setSelectedUser(user);
    }
  };
  
  const handleRoleUpdated = () => {
    setRefresh(prev => prev + 1);
    // Refresh the selected user data
    if (selectedUserId) {
      const updatedUser = getUserById(selectedUserId);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Role Management</h2>
      </div>
      <p className="text-muted-foreground">
        View and manage user roles across your organization. Select a user to view detailed information.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserTable 
            onUserSelect={handleUserSelect} 
            selectedUserId={selectedUserId}
            refresh={refresh}
          />
        </div>
        <div>
          {selectedUser ? (
            <UserDetailPanel 
              user={selectedUser} 
              onRoleUpdated={handleRoleUpdated}
              roleHistory={getUserRoleHistory(selectedUser.id)}
            />
          ) : (
            <div className="h-full flex items-center justify-center border rounded-md p-8">
              <p className="text-muted-foreground text-center">
                Select a user from the table to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
