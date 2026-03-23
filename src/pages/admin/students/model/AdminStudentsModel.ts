// Student Management Model Types

export interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  enrolledCourses: number
  overallProgress: number
  lastActive: string
  status: 'active' | 'inactive'
  courses: CourseProgress[]
}

export interface CourseProgress {
  name: string
  quizAverage: number
  lessonsCompleted: number
  totalLessons: number
  progress: number
}

export interface StudentFilters {
  course: string
  dateRange: string
  search: string
}

export interface SummaryStats {
  totalActiveStudents: number
  completionRate: number
  recentCertifications: number
}
