export interface Course {
    id: string;
    title: string;
    status: "Published" | "Draft";
    enrollment: number;
}

export interface Activity {
    type: "New Enrollment" | "New Review";
    student: string;
    course: string;
    rating?: string;
}

export interface InstructorDashboardData {
    courses: Course[];
    totalStudents: number;
    avgRating: number;
    totalRevenue: number;
    recentActivities: Activity[];
}
