import { useNavigate } from 'react-router-dom'
import {
    FileQuestion,
    Clock,
    Target,
    RefreshCw,
    ArrowRight,
    ArrowLeft,
    AlertCircle,
    ChevronRight,
    BookOpen,
    Home,
    CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { QuizInfo } from '../model/QuizStartModel'

// Mock quiz data
const mockQuizInfo: QuizInfo = {
    id: '1',
    quizName: 'Electrical Safety Assessment',
    moduleName: 'Module 1: Introduction to Electrical Systems',
    courseName: 'Electrical Fundamentals',
    courseId: '1',
    description: 'Test your knowledge on electrical safety procedures, tools, and best practices covered in this module. This assessment includes questions on power isolation, PPE usage, and emergency procedures.',
    totalQuestions: 15,
    timeLimit: 30,
    passingScore: 70,
    attempts: 0,
    allowedAttempts: 1
}

export const QuizStartView = () => {
    const navigate = useNavigate()

    const quiz = mockQuizInfo

    const handleStartQuiz = () => {
        // Navigate to quiz taking page (to be created)
        navigate(`/course/${quiz.courseId}/quiz/${quiz.id}/take`)
    }

    const handleBackToLesson = () => {
        navigate(`/course/${quiz.courseId}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Home className="h-4 w-4" />
                    <span>My Learning</span>
                    <ChevronRight className="h-4 w-4" />
                    <button
                        onClick={() => navigate('/my-courses')}
                        className="hover:text-foreground transition-colors"
                    >
                        {quiz.courseName}
                    </button>
                    <ChevronRight className="h-4 w-4" />
                    <button
                        onClick={handleBackToLesson}
                        className="hover:text-foreground transition-colors"
                    >
                        {quiz.moduleName}
                    </button>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium">{quiz.quizName}</span>
                </div>

                {/* Main Card */}
                <Card className="border-0 shadow-xl">
                    <CardHeader className="pb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                                Assessment
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                                {quiz.moduleName}
                            </Badge>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl font-black">
                            {quiz.quizName}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            {quiz.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-muted/50 rounded-xl p-4 text-center">
                                <FileQuestion className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs text-muted-foreground font-medium mb-1">Questions</p>
                                <p className="text-2xl font-black">{quiz.totalQuestions}</p>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-4 text-center">
                                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs text-muted-foreground font-medium mb-1">Time Limit</p>
                                <p className="text-2xl font-black">{quiz.timeLimit}<span className="text-sm font-normal"> min</span></p>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-4 text-center">
                                <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs text-muted-foreground font-medium mb-1">Passing Score</p>
                                <p className="text-2xl font-black">{quiz.passingScore}<span className="text-sm font-normal">%</span></p>
                            </div>

                            <div className="bg-muted/50 rounded-xl p-4 text-center">
                                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-xs text-muted-foreground font-medium mb-1">Attempts</p>
                                <p className="text-2xl font-black">{quiz.allowedAttempts - quiz.attempts}<span className="text-sm font-normal"> left</span></p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                        {/* Instructions Section */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Instructions
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>Ensure you have a stable internet connection before starting</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>The quiz timer will start immediately once you begin - it cannot be paused</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>If you close the browser, the timer will continue and your progress will be lost</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>Your results will be available immediately after submission</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>Make sure to answer all questions before submitting</span>
                                </li>
                            </ul>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-muted to-transparent" />

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            <Button
                                variant="ghost"
                                onClick={handleBackToLesson}
                                className="gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Lesson
                            </Button>
                            <Button
                                size="lg"
                                onClick={handleStartQuiz}
                                className="gap-2 text-lg px-8 bg-gradient-to-r from-primary to-primary/80"
                            >
                                Start Quiz
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Footer Note */}
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
                            <AlertCircle className="h-4 w-4" />
                            <span>Having technical issues?</span>
                            <button className="text-primary hover:underline font-medium">
                                Contact Support
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default QuizStartView
