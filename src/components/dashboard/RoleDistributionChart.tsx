
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { UserStats } from "@/types/user";

interface RoleDistributionChartProps {
  stats: UserStats;
}

export function RoleDistributionChart({ stats }: RoleDistributionChartProps) {
  const COLORS = ["#0A84FF", "#FCD34D", "#10B981", "#6B7280"];
  
  const data = Object.entries(stats.roleDistribution).map(([role, count], index) => ({
    name: role,
    value: count
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} users`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          {Object.entries(stats.roleDistribution).map(([role, count], index) => (
            <div key={role} className="flex items-center space-x-2">
              <div className="h-3 w-3" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <div className="text-sm">{role}: {count}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
