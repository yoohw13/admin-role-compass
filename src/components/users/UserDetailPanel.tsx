
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Briefcase } from "lucide-react";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { UserRoleSelector } from "./UserRoleSelector";
import { User, RoleHistory } from "@/types/user";

interface UserDetailPanelProps {
  user: User;
  roleHistory: RoleHistory[];
  onRoleUpdated: () => void;
}

export function UserDetailPanel({ user, roleHistory, onRoleUpdated }: UserDetailPanelProps) {
  const [activeTab, setActiveTab] = useState("details");
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
            <span className="text-sm font-medium text-accent-foreground">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Role</span>
              <div className="flex items-center justify-between">
                <RoleBadge role={user.role} />
                <UserRoleSelector 
                  userId={user.id} 
                  currentRole={user.role} 
                  onRoleUpdated={onRoleUpdated}
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <StatusBadge status={user.status} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{user.department}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {format(new Date(user.joinDate), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Last active {format(new Date(user.lastActive), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">Role History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-3">
          <Card>
            <CardContent className="p-4 space-y-2">
              {user.notes && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Notes</h4>
                  <p className="text-sm">{user.notes}</p>
                </div>
              )}
              
              {!user.notes && (
                <p className="text-sm text-muted-foreground">No additional information available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-3">
          <Card>
            <CardContent className="p-4">
              {roleHistory.length > 0 ? (
                <div className="space-y-3">
                  {roleHistory.map((history) => (
                    <div key={history.id} className="border-l-4 border-primary pl-3 py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">
                            {history.oldRole} → {history.newRole}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Changed by Admin (ID: {history.changedBy})
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(history.changedAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      {history.reason && (
                        <p className="text-xs mt-1 italic">{history.reason}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No role changes recorded.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
