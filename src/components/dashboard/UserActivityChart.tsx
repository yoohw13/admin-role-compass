
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { format } from "date-fns";

// Generate activity data for a full week with hourly data
const generateActivityData = () => {
  // Generate dates for the past week
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return format(date, 'EEE, MMM d');
  });
  
  // Generate hours for each day
  return dates.map(date => {
    const hourData: Record<string, any> = { name: date };
    
    // Add data for each hour (0-23)
    for (let hour = 0; hour < 24; hour++) {
      // Generate random user counts for each role
      const adminUsers = Array.from({ length: Math.floor(Math.random() * 2) }, (_, i) => ({
        id: `admin-${i}`,
        role: 'Admin',
        activity: `Performed system check at ${hour}:00`
      }));
      
      const managerUsers = Array.from({ length: Math.floor(Math.random() * 3) }, (_, i) => ({
        id: `manager-${i}`,
        role: 'Manager',
        activity: `Reviewed team data at ${hour}:00`
      }));
      
      const employeeUsers = Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => ({
        id: `employee-${i}`,
        role: 'Employee',
        activity: `Updated task status at ${hour}:00`
      }));
      
      const guestUsers = Array.from({ length: Math.floor(Math.random() * 2) }, (_, i) => ({
        id: `guest-${i}`,
        role: 'Guest',
        activity: `Viewed dashboard at ${hour}:00`
      }));
      
      // Combine all users for this hour
      const users = [...adminUsers, ...managerUsers, ...employeeUsers, ...guestUsers];
      
      // Store the user records and count
      hourData[`hour_${hour}`] = {
        users,
        count: users.length
      };
    }
    
    return hourData;
  });
};

interface UserActivity {
  id: string;
  role: string;
  activity: string;
}

export function UserActivityChart() {
  const [activityData] = useState(generateActivityData);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserActivity | null>(null);
  
  // For the chart, we need to transform the data to show hourly counts
  const chartData = activityData.map(day => {
    const result: Record<string, any> = { name: day.name };
    
    // Add count for each hour
    for (let hour = 0; hour < 24; hour++) {
      result[`hour_${hour}`] = day[`hour_${hour}`].count;
    }
    
    return result;
  });
  
  const handleBarClick = (data: any, index: number) => {
    const hourKey = Object.keys(data).find(key => key.startsWith('hour_') && key !== 'name');
    
    if (hourKey) {
      const hour = parseInt(hourKey.split('_')[1]);
      const day = data.name;
      
      setSelectedDay(day);
      setSelectedHour(hour);
      setSelectedUser(null); // Reset selected user when changing hours
    }
  };
  
  const handleUserSelect = (user: UserActivity) => {
    setSelectedUser(user);
  };
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <div className="space-y-4">
      <div className="h-[300px]">
        <ChartContainer config={{
          user: { theme: { light: '#0A84FF', dark: '#0A84FF' } }
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                label={{ value: 'Day of Week', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis 
                label={{ value: 'Number of Users', angle: -90, position: 'insideLeft' }} 
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const hour = payload[0].name ? payload[0].name.split('_')[1] : '';
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="font-medium">{label} at {hour}:00</div>
                        <div className="text-xs text-muted-foreground">
                          {payload[0].value} active users
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              
              {hours.map((hour) => (
                <Bar 
                  key={hour}
                  dataKey={`hour_${hour}`} 
                  name={`${hour}:00`}
                  stackId="a" 
                  fill={`hsl(${210 + hour * 6}, 80%, 60%)`}
                  onClick={handleBarClick}
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      {selectedDay && selectedHour !== null && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Activity Details - {selectedDay} at {selectedHour}:00
            </CardTitle>
            <CardDescription>
              {selectedUser ? `User Activity Log` : `${activityData.find(d => d.name === selectedDay)?.[`hour_${selectedHour}`].users.length} active users`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedUser ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {activityData
                  .find(d => d.name === selectedDay)
                  ?.[`hour_${selectedHour}`].users.map((user: UserActivity, index: number) => (
                    <div 
                      key={`${user.id}-${index}`}
                      className="p-2 border rounded-md cursor-pointer hover:bg-accent"
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="font-medium">{user.role}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        ID: {user.id}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">{selectedUser.role}</h3>
                    <p className="text-xs text-muted-foreground">ID: {selectedUser.id}</p>
                  </div>
                  <button 
                    className="text-xs text-primary hover:underline"
                    onClick={() => setSelectedUser(null)}
                  >
                    Back to user list
                  </button>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <h4 className="text-sm font-medium mb-1">Activity Log</h4>
                  <ul className="space-y-2">
                    <li className="text-xs">
                      <span className="text-muted-foreground">{selectedDay}, {selectedHour}:00</span>
                      <p>{selectedUser.activity}</p>
                    </li>
                    {/* In a real application, we would fetch more historical logs for this user */}
                    <li className="text-xs">
                      <span className="text-muted-foreground">{selectedDay}, {Math.max(0, selectedHour - 2)}:00</span>
                      <p>Logged into the system</p>
                    </li>
                    <li className="text-xs">
                      <span className="text-muted-foreground">{selectedDay}, {Math.max(0, selectedHour - 4)}:00</span>
                      <p>Updated profile information</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
