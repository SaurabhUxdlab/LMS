export interface Course {
    title: string;
    subtitle: string;
    image: string;
    progress: number;
}

export interface Deadline {
    title: string;
    dueDate: string;
}

export interface Achievement {
    title: string;
    completedDate: string;
}

export interface StudentDashboardData {
    courses: Course[];
    upcomingDeadlines: Deadline[];
    recentAchievements: Achievement[];
}
