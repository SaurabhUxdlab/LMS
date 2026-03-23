import { useNavigate } from 'react-router-dom'
import {
    CheckCircle2,
    XCircle,
    Clock,
    Target,
    Award,
    ArrowLeft,
    ArrowRight,
    Download,
    ChevronRight,
    BookOpen,
    Home
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { QuizResult } from '../model/QuizResultModel'

// Mock quiz result data
const mockQuizResult: QuizResult = {
    id: '1',
    quizName: 'Electrical Safety Quiz',
    courseName: 'Electrical Fundamentals',
    score: 85,
    totalQuestions: 20,
    timeTaken: '25 min',
    pointsEarned: 85,
    passed: true,
    questions: [
        {
            id: 'q1',
            question: 'What is the first step to take when dealing with a broken wire?',
            userAnswer: 'Insulate the area and turn off power',
            correctAnswer: 'Turn off power at the source',
            isCorrect: false,
            explanation: 'The first and most important step is always to turn off power at the source before attempting any repairs.'
        },
        {
            id: 'q2',
            question: 'Which color wire is typically used for ground in US wiring?',
            userAnswer: 'Green or bare copper',
            correctAnswer: 'Green or bare copper',
            isCorrect: true,
            explanation: 'Green insulated wires and bare copper wires are used for grounding in the United States.'
        },
        {
            id: 'q3',
            question: 'What does GFCI stand for?',
            userAnswer: 'Ground Fault Circuit Interrupter',
            correctAnswer: 'Ground Fault Circuit Interrupter',
            isCorrect: true,
            explanation: 'GFCI stands for Ground Fault Circuit Interrupter, a safety device that trips when it detects ground faults.'
        },
        {
            id: 'q4',
            question: 'What is the standard voltage in US residential buildings?',
            userAnswer: '240V',
            correctAnswer: '120V/240V',
            isCorrect: false,
            explanation: 'US residential buildings typically use 120V for standard outlets and 240V for appliances like dryers and ovens.'
        },
        {
            id: 'q5',
            question: 'Which tool is used to test if a wire is live?',
            userAnswer: 'Multimeter',
            correctAnswer: 'Voltage tester',
            isCorrect: false,
            explanation: 'A voltage tester (non-contact or contact type) is specifically designed to detect live wires.'
        },
        {
            id: 'q6',
            question: 'What is the minimum safe distance from power lines?',
            userAnswer: '10 feet',
            correctAnswer: '10 feet',
            isCorrect: true,
            explanation: 'Always maintain at least 10 feet clearance from overhead power lines.'
        },
        {
            id: 'q7',
            question: 'Which PPE is required for electrical work?',
            userAnswer: 'Insulated gloves and safety glasses',
            correctAnswer: 'Insulated gloves and safety glasses',
            isCorrect: true,
            explanation: 'Insulated gloves and safety glasses are essential PPE for any electrical work.'
        },
    ]
}

export const QuizResultView = () => {
    const navigate = useNavigate()

    const result = mockQuizResult
    const correctCount = result.questions.filter(q => q.isCorrect).length

    const handleBackToCourse = () => {
        navigate(`/my-courses`)
    }

    const handleDownloadCertificate = () => {
        console.log('Download certificate')
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
                        {result.courseName}
                    </button>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium">{result.quizName}</span>
                </div>

                {/* Header Card */}
                <Card className="border-0 shadow-lg mb-6 bg-gradient-to-br from-card to-card/50">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Badge variant="outline" className="mb-2">
                                    Quiz Results
                                </Badge>
                                <CardTitle className="text-3xl font-black">
                                    {result.quizName}
                                </CardTitle>
                                <p className="text-muted-foreground mt-1">
                                    {result.courseName}
                                </p>
                            </div>
                            {result.passed ? (
                                <div className="p-4 bg-green-500/20 rounded-2xl">
                                    <Award className="h-12 w-12 text-green-600" />
                                </div>
                            ) : (
                                <div className="p-4 bg-red-500/20 rounded-2xl">
                                    <XCircle className="h-12 w-12 text-red-600" />
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        {/* Score Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold">Your Score</span>
                                <span className={`text-2xl font-black ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.score}%
                                </span>
                            </div>
                            <Progress
                                value={result.score}
                                className="h-3"
                            />
                            {result.passed ? (
                                <div className="flex items-center gap-2 text-green-600 font-medium">
                                    <CheckCircle2 className="h-5 w-5" />
                                    Congratulations! You passed the quiz.
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-600 font-medium">
                                    <XCircle className="h-5 w-5" />
                                    Keep learning! You can retake the quiz.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-0 shadow-md">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Time Taken</p>
                                    <p className="text-xl font-black">{result.timeTaken}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-xl">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Correct Answers</p>
                                    <p className="text-xl font-black">{correctCount}/{result.totalQuestions}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-500/10 rounded-xl">
                                    <Target className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Points Earned</p>
                                    <p className="text-xl font-black">{result.pointsEarned}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Question Review */}
                <Card className="border-0 shadow-md">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold">Question Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {result.questions.map((question, index) => (
                            <div
                                key={question.id}
                                className={`p-4 rounded-xl border ${question.isCorrect
                                    ? 'bg-green-50 border-green-200 dark:bg-green-950/20'
                                    : 'bg-red-50 border-red-200 dark:bg-red-950/20'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Status Icon */}
                                    <div className={`p-2 rounded-full flex-shrink-0 ${question.isCorrect
                                        ? 'bg-green-500/20'
                                        : 'bg-red-500/20'
                                        }`}>
                                        {question.isCorrect ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-600" />
                                        )}
                                    </div>

                                    {/* Question Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-medium text-muted-foreground">
                                                Question {index + 1}
                                            </span>
                                            {question.isCorrect ? (
                                                <Badge className="bg-green-500/90 text-white text-xs">Correct</Badge>
                                            ) : (
                                                <Badge className="bg-red-500/90 text-white text-xs">Incorrect</Badge>
                                            )}
                                        </div>

                                        <p className="font-semibold text-foreground mb-2">
                                            {question.question}
                                        </p>

                                        {!question.isCorrect && (
                                            <div className="mb-2">
                                                <p className="text-sm">
                                                    <span className="font-medium">Your answer: </span>
                                                    <span className="text-red-600">{question.userAnswer}</span>
                                                </p>
                                            </div>
                                        )}

                                        <div className="mb-2">
                                            <p className="text-sm">
                                                <span className="font-medium">Correct answer: </span>
                                                <span className="text-green-600">{question.correctAnswer}</span>
                                            </p>
                                        </div>

                                        {question.explanation && (
                                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                                                <p className="text-sm text-muted-foreground">
                                                    <span className="font-medium">Explanation: </span>
                                                    {question.explanation}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-end">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleBackToCourse}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Course
                    </Button>
                    {result.passed && (
                        <Button
                            size="lg"
                            onClick={handleDownloadCertificate}
                            className="gap-2 bg-gradient-to-r from-primary to-primary/80"
                        >
                            <Download className="h-4 w-4" />
                            Download Certificate
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuizResultView
