
export type UserRole = 'Admin' | 'Manager' | 'Employee' | 'Guest';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
  avatar?: string;
  notes?: string;
}

export interface RoleHistory {
  id: number;
  userId: number;
  oldRole: UserRole;
  newRole: UserRole;
  changedBy: number;
  changedAt: string;
  reason?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  roleDistribution: Record<UserRole, number>;
}
