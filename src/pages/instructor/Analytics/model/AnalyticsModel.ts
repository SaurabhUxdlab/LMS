export interface AnalyticsStats {
  totalRevenue: number;
  totalStudents: number;
  totalCourses: number;
  avgRating: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface EnrollmentData {
  course: string;
  students: number;
}