export interface QuizInfo {
    id: string
    quizName: string
    moduleName: string
    courseName: string
    courseId: string
    description: string
    totalQuestions: number
    timeLimit: number // in minutes
    passingScore: number
    attempts: number
    allowedAttempts: number
}

export interface QuizStartData {
    quiz: QuizInfo
}
