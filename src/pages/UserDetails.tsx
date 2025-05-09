
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Pencil, User, Briefcase, Clock } from "lucide-react";
import { RoleBadge } from "@/components/users/RoleBadge";
import { StatusBadge } from "@/components/users/StatusBadge";
import { UserRoleSelector } from "@/components/users/UserRoleSelector";
import { User as UserType, RoleHistory as RoleHistoryType } from "@/types/user";
import { getUserById, getUserRoleHistory } from "@/data/userData";
import { format } from "date-fns";
import { toast } from "sonner";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [roleHistory, setRoleHistory] = useState<RoleHistoryType[]>([]);
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    if (!id) return;
    
    const userId = parseInt(id);
    const userData = getUserById(userId);
    
    if (userData) {
      setUser(userData);
      setRoleHistory(getUserRoleHistory(userId));
    } else {
      toast.error("User not found");
      navigate("/users");
    }
  }, [id, navigate, refresh]);
  
  const handleRoleUpdated = () => {
    setRefresh(prev => prev + 1);
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                <span className="text-lg font-medium text-accent-foreground">
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
                      onRoleUpdated={handleRoleUpdated}
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
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">Role History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.notes && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Notes</h4>
                      <p className="text-sm">{user.notes}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Additional Information</h4>
                    <p className="text-sm text-muted-foreground">No additional information available.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Role Change History</CardTitle>
                </CardHeader>
                <CardContent>
                  {roleHistory.length > 0 ? (
                    <div className="space-y-4">
                      {roleHistory.map((history) => (
                        <div key={history.id} className="border-l-4 border-primary pl-4 py-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {history.oldRole} → {history.newRole}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Changed by Admin (ID: {history.changedBy})
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(history.changedAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                          {history.reason && (
                            <p className="text-sm mt-1 italic">{history.reason}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No role changes recorded for this user.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
