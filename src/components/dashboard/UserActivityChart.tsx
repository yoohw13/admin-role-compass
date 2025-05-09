
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real application, this would come from an API
const generateActivityData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return days.map(day => ({
    name: day,
    ...hours.reduce((acc, hour) => {
      // Different activity patterns for different user types
      const adminCount = Math.floor(Math.random() * 3);
      const managerCount = Math.floor(Math.random() * 5);
      const employeeCount = Math.floor(Math.random() * 10);
      const guestCount = Math.floor(Math.random() * 4);
      
      acc[`hour_${hour}`] = {
        Admin: adminCount,
        Manager: managerCount,
        Employee: employeeCount,
        Guest: guestCount,
        total: adminCount + managerCount + employeeCount + guestCount
      };
      return acc;
    }, {})
  }));
};

export function UserActivityChart() {
  const [activityData] = useState(generateActivityData);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  
  // Hours of the day
  const hours = [0, 3, 6, 9, 12, 15, 18, 21];
  
  // Prepare data for the chart - aggregate by hours
  const chartData = activityData.map(day => {
    const hourData = hours.reduce((acc, hour) => {
      acc[`hour_${hour}`] = day[`hour_${hour}`].total;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      name: day.name,
      ...hourData
    };
  });
  
  const handleBarClick = (data: any) => {
    const hourKey = Object.keys(data).find(key => key.startsWith('hour_'));
    if (hourKey) {
      const hour = parseInt(hourKey.split('_')[1]);
      setSelectedHour(hour);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                const hourMatch = name.match(/hour_(\d+)/);
                if (hourMatch) {
                  return [`${value} users`, `${hourMatch[1]}:00`];
                }
                return [value, name];
              }}
            />
            <Legend />
            {hours.map((hour, index) => (
              <Bar 
                key={hour}
                dataKey={`hour_${hour}`} 
                name={`${hour}:00`}
                stackId="a" 
                fill={`hsl(${210 + index * 30}, 80%, 60%)`} 
                onClick={handleBarClick}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {selectedHour !== null && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activity Details - {selectedHour}:00</CardTitle>
            <CardDescription>User breakdown by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {activityData.map((day) => (
                <div key={day.name} className="space-y-1">
                  <p className="text-sm font-medium">{day.name}</p>
                  <ul className="text-xs space-y-1">
                    <li className="flex justify-between">
                      <span>Admin:</span> 
                      <span>{day[`hour_${selectedHour}`].Admin}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Manager:</span> 
                      <span>{day[`hour_${selectedHour}`].Manager}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Employee:</span> 
                      <span>{day[`hour_${selectedHour}`].Employee}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Guest:</span> 
                      <span>{day[`hour_${selectedHour}`].Guest}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
