export interface Stats {
    totalStudents: number;
    totalInstructors: number;
    totalCourses: number;
    totalRevenue: number;
}

export interface Activity {
    user: string;
    action: string;
    description: string;
}

export interface AdminDashboardData {
    stats: Stats;
    recentActivity: Activity[];
}
