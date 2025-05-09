
import { User, UserRole, RoleHistory, UserStats } from '../types/user';

// Mock user data
export const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    department: 'IT',
    joinDate: '2020-01-15',
    lastActive: '2023-05-08T09:30:00',
    status: 'active',
    notes: 'System administrator with full access'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Manager',
    department: 'HR',
    joinDate: '2021-03-22',
    lastActive: '2023-05-07T16:45:00',
    status: 'active',
    notes: 'Manages HR team and hiring processes'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@company.com',
    role: 'Employee',
    department: 'Marketing',
    joinDate: '2022-06-10',
    lastActive: '2023-05-08T11:20:00',
    status: 'active'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'Manager',
    department: 'Sales',
    joinDate: '2021-08-05',
    lastActive: '2023-05-06T14:15:00',
    status: 'active',
    notes: 'Leads the sales team for North America'
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    role: 'Employee',
    department: 'Finance',
    joinDate: '2022-02-18',
    lastActive: '2023-05-08T10:05:00',
    status: 'active'
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Employee',
    department: 'IT',
    joinDate: '2022-09-30',
    lastActive: '2023-05-07T09:45:00',
    status: 'inactive',
    notes: 'On maternity leave until August 2023'
  },
  {
    id: 7,
    name: 'James Taylor',
    email: 'james.taylor@company.com',
    role: 'Manager',
    department: 'Operations',
    joinDate: '2021-05-12',
    lastActive: '2023-05-08T08:30:00',
    status: 'active'
  },
  {
    id: 8,
    name: 'Jennifer Martinez',
    email: 'jennifer.martinez@company.com',
    role: 'Employee',
    department: 'Customer Service',
    joinDate: '2022-11-15',
    lastActive: '2023-05-08T13:10:00',
    status: 'active'
  },
  {
    id: 9,
    name: 'David Anderson',
    email: 'david.anderson@company.com',
    role: 'Employee',
    department: 'R&D',
    joinDate: '2022-07-20',
    lastActive: '2023-05-06T11:55:00',
    status: 'active'
  },
  {
    id: 10,
    name: 'Lisa Thomas',
    email: 'lisa.thomas@company.com',
    role: 'Admin',
    department: 'IT',
    joinDate: '2020-11-03',
    lastActive: '2023-05-08T15:20:00',
    status: 'active',
    notes: 'System security specialist'
  },
  {
    id: 11,
    name: 'Daniel Garcia',
    email: 'daniel.garcia@company.com',
    role: 'Employee',
    department: 'Marketing',
    joinDate: '2023-01-09',
    lastActive: '2023-05-07T10:30:00',
    status: 'active'
  },
  {
    id: 12,
    name: 'Michelle Rodriguez',
    email: 'michelle.rodriguez@company.com',
    role: 'Manager',
    department: 'Finance',
    joinDate: '2021-02-25',
    lastActive: '2023-05-08T14:40:00',
    status: 'active'
  },
];

// Mock role history data
export const roleHistory: RoleHistory[] = [
  {
    id: 1,
    userId: 3,
    oldRole: 'Guest',
    newRole: 'Employee',
    changedBy: 2,
    changedAt: '2022-08-15T10:30:00',
    reason: 'Completed probation period'
  },
  {
    id: 2,
    userId: 4,
    oldRole: 'Employee',
    newRole: 'Manager',
    changedBy: 1,
    changedAt: '2022-06-20T14:15:00',
    reason: 'Promotion based on performance review'
  },
  {
    id: 3,
    userId: 7,
    oldRole: 'Employee',
    newRole: 'Manager',
    changedBy: 1,
    changedAt: '2022-02-10T09:45:00',
    reason: 'Taking over the operations team'
  },
  {
    id: 4,
    userId: 6,
    oldRole: 'Guest',
    newRole: 'Employee',
    changedBy: 10,
    changedAt: '2022-11-05T11:20:00'
  },
  {
    id: 5,
    userId: 10,
    oldRole: 'Manager',
    newRole: 'Admin',
    changedBy: 1,
    changedAt: '2023-01-18T16:30:00',
    reason: 'Taking over security responsibilities'
  }
];

// Get user stats
export const getUserStats = (): UserStats => {
  const activeUsers = users.filter(user => user.status === 'active').length;
  
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);
  
  return {
    totalUsers: users.length,
    activeUsers,
    roleDistribution
  };
};

// Get user by ID
export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

// Get role history for a user
export const getUserRoleHistory = (userId: number): RoleHistory[] => {
  return roleHistory.filter(history => history.userId === userId);
};

// Update user role
export const updateUserRole = (userId: number, newRole: UserRole, changedById: number, reason?: string): boolean => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return false;
  
  const oldRole = users[userIndex].role;
  users[userIndex].role = newRole;
  
  // Add to role history
  const newHistoryEntry: RoleHistory = {
    id: roleHistory.length + 1,
    userId,
    oldRole,
    newRole,
    changedBy: changedById,
    changedAt: new Date().toISOString(),
    reason
  };
  
  roleHistory.push(newHistoryEntry);
  return true;
};
