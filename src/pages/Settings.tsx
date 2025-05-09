
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  
  const handleSaveNotifications = () => {
    toast.success("Notification settings saved");
  };
  
  const handleSaveSecurity = () => {
    toast.success("Security settings saved");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-muted-foreground">
        Manage application settings and preferences.
      </p>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security & Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-4">Display Options</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-toggle">Dark Mode</Label>
                  <Switch id="theme-toggle" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-4">Date & Time Format</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="time-format">24-hour time format</Label>
                  <Switch id="time-format" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("General settings saved")}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-4">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">
                    Receive role change notifications
                  </Label>
                  <Switch 
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-4">Audit Logging</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging" className="block mb-1">
                      Enable detailed audit logging
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Track all role changes with user information
                    </p>
                  </div>
                  <Switch 
                    id="audit-logging" 
                    checked={auditLogging}
                    onCheckedChange={setAuditLogging}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecurity}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
