export interface QuizQuestion {
  id: string
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation?: string
}

export interface QuizResult {
  id: string
  quizName: string
  courseName: string
  score: number
  totalQuestions: number
  timeTaken: string
  pointsEarned: number
  passed: boolean
  questions: QuizQuestion[]
}
