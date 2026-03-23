import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Play,
    Check,
    Lock,
    ChevronDown,
    ChevronRight,
    FileText,
    FileQuestion,
    MessageCircle,
    StickyNote,
    ArrowLeft,
    ArrowRight,
    Clock,
    BookOpen,
    Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import type { Course, Module, Lesson } from '../model/CoursePlayerModel'

// Mock course data - Software Development
const mockCourse: Course = {
    id: '1',
    title: 'React - The Complete Guide',
    description: 'Master React.js from the ground up. Learn React fundamentals, hooks, state management with Redux, React Router, and build real-world projects. This comprehensive course covers everything you need to become a professional React developer.',
    instructor: 'Maximilian Schwarzmüller',
    thumbnail: '/vite.svg',
    videoUrl: '/vite.svg',
    modules: [
        {
            id: 'm1',
            title: 'Module 1: React Fundamentals',
            lessons: [
                { id: 'l1', title: 'Introduction to React', duration: '12:30', isCompleted: true, isLocked: false },
                { id: 'l2', title: 'JSX Deep Dive', duration: '18:45', isCompleted: true, isLocked: false },
                { id: 'l3', title: 'Components & Props', duration: '22:20', isCompleted: true, isLocked: false },
                { id: 'l4', title: 'State & Lifecycle', duration: '25:10', isCompleted: false, isLocked: false },
            ]
        },
        {
            id: 'm2',
            title: 'Module 2: React Hooks',
            lessons: [
                { id: 'l5', title: 'useState Hook', duration: '20:00', isCompleted: false, isLocked: false },
                { id: 'l6', title: 'useEffect Hook', duration: '24:30', isCompleted: false, isLocked: false },
                { id: 'l7', title: 'useContext Hook', duration: '18:15', isCompleted: false, isLocked: true },
                { id: 'l8', title: 'Custom Hooks', duration: '28:45', isCompleted: false, isLocked: true },
            ]
        },
        {
            id: 'm3',
            title: 'Module 3: State Management',
            lessons: [
                { id: 'l9', title: 'Introduction to Redux', duration: '16:20', isCompleted: false, isLocked: true },
                { id: 'l10', title: 'Redux Toolkit', duration: '22:10', isCompleted: false, isLocked: true },
                { id: 'l11', title: 'React Query', duration: '30:00', isCompleted: false, isLocked: true },
                { id: 'l12', title: 'Final Project', duration: '45:00', isCompleted: false, isLocked: true },
            ]
        }
    ]
}

const mockCurrentLesson: Lesson = {
    id: 'l4',
    title: 'State & Lifecycle',
    duration: '25:10',
    isCompleted: false,
    isLocked: false
}

export const CoursePlayer = () => {
    const navigate = useNavigate()
    const [activeModule, setActiveModule] = useState<string>('m1')
    const [activeLesson, setActiveLesson] = useState<string>('l4')
    const [expandedModules, setExpandedModules] = useState<string[]>(['m1'])

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        )
    }

    const handleLessonClick = (lesson: Lesson) => {
        if (!lesson.isLocked) {
            setActiveLesson(lesson.id)
        }
    }

    const getNextLesson = (): Lesson | null => {
        const allLessons = mockCourse.modules.flatMap(m => m.lessons)
        const currentIndex = allLessons.findIndex(l => l.id === activeLesson)
        if (currentIndex < allLessons.length - 1) {
            return allLessons[currentIndex + 1]
        }
        return null
    }

    const getCompletedCount = (): number => {
        return mockCourse.modules.reduce((acc, m) =>
            acc + m.lessons.filter(l => l.isCompleted).length, 0
        )
    }

    const totalLessons = mockCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    const progressPercent = Math.round((getCompletedCount() / totalLessons) * 100)
    const nextLesson = getNextLesson()

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/my-courses')}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to My Courses
                        </Button>
                        <div className="h-6 w-px bg-muted" />
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span className="font-medium text-sm truncate max-w-[300px]">
                                {mockCourse.title}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Award className="h-4 w-4" />
                            <span>{progressPercent}% Complete</span>
                        </div>
                        <Progress value={progressPercent} className="w-24 h-2" />
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row">
                {/* Left Section - Video & Content */}
                <main className="flex-1 lg:w-[70%] p-6">
                    {/* Video Player */}
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-6">
                        <img
                            src={mockCourse.videoUrl}
                            alt={mockCurrentLesson.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Button
                                size="lg"
                                className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-primary shadow-xl"
                            >
                                <Play className="h-8 w-8 ml-1" />
                            </Button>
                        </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {mockCurrentLesson.duration}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                                Lesson {mockCourse.modules.flatMap(m => m.lessons).findIndex(l => l.id === activeLesson) + 1} of {totalLessons}
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">
                            {mockCurrentLesson.title}
                        </h1>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="w-full justify-start gap-6 border-b rounded-none bg-transparent h-12">
                            <TabsTrigger
                                value="overview"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent px-4"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="resources"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent px-4"
                            >
                                Resources
                            </TabsTrigger>
                            <TabsTrigger
                                value="qa"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent px-4"
                            >
                                Q&A
                            </TabsTrigger>
                            <TabsTrigger
                                value="quiz"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent px-4"
                            >
                                Quiz
                            </TabsTrigger>
                            <TabsTrigger
                                value="notes"
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none bg-transparent px-4"
                            >
                                Notes
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                            <Card className="border-0 shadow-none">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">About this lesson</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {mockCourse.description}
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed mt-4">
                                        In this lesson, you'll learn about State and Lifecycle methods in React.
                                        We'll cover useState for local state management, useEffect for side effects,
                                        and understand the component lifecycle in modern React applications.
                                    </p>
                                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                                        <div className="text-sm text-muted-foreground">
                                            <span className="font-medium text-foreground">Instructor:</span> {mockCourse.instructor}
                                        </div>
                                        {nextLesson && (
                                            <Button className="gap-2">
                                                Next Lesson
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="resources" className="mt-6">
                            <Card className="border-0 shadow-none">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">Downloadable Resources</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <span className="flex-1">Lesson Slides PDF</span>
                                            <Button variant="ghost" size="sm">Download</Button>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                                            <FileText className="h-5 w-5 text-primary" />
                                            <span className="flex-1">Code Examples</span>
                                            <Button variant="ghost" size="sm">Download</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="qa" className="mt-6">
                            <Card className="border-0 shadow-none">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">Questions & Answers</h3>
                                        <Button variant="outline" size="sm">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Ask a Question
                                        </Button>
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        No questions yet. Be the first to ask!
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="quiz" className="mt-6">
                            <Card className="border-0 shadow-none">
                                <CardContent className="p-6">
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            <FileQuestion className="h-10 w-10 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Module Quiz</h3>
                                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                            Test your knowledge with a quiz after completing this module.
                                            You need 70% to pass.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Button
                                                className="gap-2"
                                                onClick={() => navigate(`/course/${mockCourse.id}/quiz/1/start`)}
                                            >
                                                Take Quiz
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => navigate(`/course/${mockCourse.id}/quiz/1/result`)}
                                            >
                                                View Previous Result
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notes" className="mt-6">
                            <Card className="border-0 shadow-none">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold">Your Notes</h3>
                                        <Button variant="outline" size="sm">
                                            <StickyNote className="h-4 w-4 mr-2" />
                                            Add Note
                                        </Button>
                                    </div>
                                    <textarea
                                        className="w-full h-40 p-4 rounded-lg border bg-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Take notes while watching..."
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>

                {/* Right Section - Course Content Sidebar */}
                <aside className="lg:w-[320px] lg:min-w-[320px] border-l bg-muted/20 p-6">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg">Course Content</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <span>{mockCourse.modules.length} modules</span>
                                <span>•</span>
                                <span>{totalLessons} lessons</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                            {mockCourse.modules.map((module) => (
                                <div key={module.id} className="border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="font-medium text-sm text-left flex-1">
                                            {module.title}
                                        </span>
                                        {expandedModules.includes(module.id) ? (
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>

                                    {expandedModules.includes(module.id) && (
                                        <div className="bg-background">
                                            {module.lessons.map((lesson) => (
                                                <button
                                                    key={lesson.id}
                                                    onClick={() => handleLessonClick(lesson)}
                                                    disabled={lesson.isLocked}
                                                    className={`w-full flex items-center gap-3 p-3 text-sm transition-colors ${activeLesson === lesson.id
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'hover:bg-muted/50 text-foreground'
                                                        } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                >
                                                    {lesson.isCompleted ? (
                                                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                    ) : lesson.isLocked ? (
                                                        <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                    ) : (
                                                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                                                    )}
                                                    <span className={`flex-1 text-left line-clamp-1 ${activeLesson === lesson.id ? 'font-medium' : ''
                                                        }`}>
                                                        {lesson.title}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {lesson.duration}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    )
}

export default CoursePlayer
