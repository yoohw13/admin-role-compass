
import { Users, UserCheck, UserX } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserActivityChart } from "@/components/dashboard/UserActivityChart";
import { getUserStats } from "@/data/userData";

const Dashboard = () => {
  const stats = getUserStats();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<UserCheck className="h-4 w-4 text-green-500" />}
        />
        <StatsCard
          title="Inactive Users"
          value={stats.totalUsers - stats.activeUsers}
          icon={<UserX className="h-4 w-4 text-gray-500" />}
        />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">User Activity</h2>
        <div className="rounded-md border bg-white p-6">
          <UserActivityChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
