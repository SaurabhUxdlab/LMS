import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Mail,
    MapPin,
    MessageSquare,
    BookOpen,
    Clock,
    Award,
    TrendingUp,
    Calendar,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Download,
    Play,
    Code,
    Database,
    Palette,
    Layers,
    Cpu
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

// ==================== Interfaces ====================

interface StudentDetail {
    id: string
    name: string
    email: string
    avatar?: string
    studentId: string
    location: string
    joinedDate: string
    status: 'active' | 'inactive'
    subscription: 'free' | 'premium'
    enrolledCourses: CourseEnrollment[]
    assessments: Assessment[]
    certificates: Certificate[]
    activityLog: Activity[]
    performance: PerformanceMetrics
    skills: Skill[]
    mentor?: Mentor
}

interface CourseEnrollment {
    id: string
    name: string
    instructor: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    progress: number
    lessonsCompleted: number
    totalLessons: number
    lastAccessed: string
    thumbnail?: string
    status: 'in_progress' | 'completed'
}

interface Assessment {
    id: string
    courseModule: string
    date: string
    score: number
    status: 'passed' | 'failed'
}

interface Certificate {
    id: string
    courseName: string
    issuedDate: string
    credentialId: string
}

interface Activity {
    id: string
    action: string
    timestamp: string
    details: string
}

interface PerformanceMetrics {
    averageGrade: number
    gradeTrend: number
    totalLearningHours: number
    learningTarget: number
    coursesCompleted: number
    totalCourses: number
    currentStreak: number
}

interface Skill {
    name: string
    icon: string
    color: string
}

interface Mentor {
    name: string
    avatar?: string
    role: string
}

// ==================== Mock Data ====================

const mockStudentDetail: StudentDetail = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    studentId: 'STU-2024-001',
    location: 'San Francisco, CA',
    joinedDate: 'Jan 15, 2024',
    status: 'active',
    subscription: 'premium',
    enrolledCourses: [
        {
            id: 'c1',
            name: 'React - The Complete Guide',
            instructor: 'Maximilian Schwarzmüller',
            level: 'Intermediate',
            progress: 87,
            lessonsCompleted: 45,
            totalLessons: 52,
            lastAccessed: '2 hours ago',
            status: 'in_progress'
        },
        {
            id: 'c2',
            name: 'TypeScript Masterclass',
            instructor: 'Sarah Drasner',
            level: 'Advanced',
            progress: 75,
            lessonsCompleted: 18,
            totalLessons: 24,
            lastAccessed: '1 day ago',
            status: 'in_progress'
        },
        {
            id: 'c3',
            name: 'Node.js Backend Development',
            instructor: 'Maximilian Schwarzmüller',
            level: 'Intermediate',
            progress: 100,
            lessonsCompleted: 42,
            totalLessons: 42,
            lastAccessed: '3 days ago',
            status: 'completed'
        },
        {
            id: 'c4',
            name: 'Python for Data Science',
            instructor: 'Jose Portilla',
            level: 'Beginner',
            progress: 29,
            lessonsCompleted: 12,
            totalLessons: 42,
            lastAccessed: '5 days ago',
            status: 'in_progress'
        }
    ],
    assessments: [
        { id: 'a1', courseModule: 'React - Components & Props', date: 'Mar 15, 2024', score: 92, status: 'passed' },
        { id: 'a2', courseModule: 'React - State & Hooks', date: 'Mar 10, 2024', score: 88, status: 'passed' },
        { id: 'a3', courseModule: 'TypeScript - Generics', date: 'Mar 05, 2024', score: 75, status: 'passed' },
        { id: 'a4', courseModule: 'Node.js - REST APIs', date: 'Feb 28, 2024', score: 68, status: 'failed' },
        { id: 'a5', courseModule: 'React - Advanced Patterns', date: 'Feb 20, 2024', score: 95, status: 'passed' },
        { id: 'a6', courseModule: 'Python - Data Analysis', date: 'Feb 15, 2024', score: 82, status: 'passed' }
    ],
    certificates: [
        { id: 'cert1', courseName: 'JavaScript - Zero to Hero', issuedDate: 'Feb 15, 2024', credentialId: 'UKA-2024-8921' },
        { id: 'cert2', courseName: 'Python Basics', issuedDate: 'Jan 20, 2024', credentialId: 'UKA-2024-5543' },
        { id: 'cert3', courseName: 'Node.js Backend Development', issuedDate: 'Mar 01, 2024', credentialId: 'UKA-2024-7712' }
    ],
    activityLog: [
        { id: 'act1', action: 'Completed lesson', timestamp: '2 hours ago', details: 'React - Custom Hooks' },
        { id: 'act2', action: 'Submitted quiz', timestamp: '5 hours ago', details: 'TypeScript Advanced Types' },
        { id: 'act3', action: 'Started course', timestamp: '1 day ago', details: 'Node.js Backend Development' },
        { id: 'act4', action: 'Earned certificate', timestamp: '3 days ago', details: 'JavaScript - Zero to Hero' },
        { id: 'act5', action: 'Completed lesson', timestamp: '5 days ago', details: 'React - Context API' }
    ],
    performance: {
        averageGrade: 92,
        gradeTrend: 2.5,
        totalLearningHours: 142,
        learningTarget: 200,
        coursesCompleted: 8,
        totalCourses: 10,
        currentStreak: 12
    },
    skills: [
        { name: 'React', icon: '⚛️', color: 'bg-blue-500' },
        { name: 'TypeScript', icon: '📘', color: 'bg-blue-600' },
        { name: 'Node.js', icon: '🟢', color: 'bg-green-500' },
        { name: 'Python', icon: '🐍', color: 'bg-yellow-500' },
        { name: 'SQL', icon: '🗄️', color: 'bg-orange-500' }
    ],
    mentor: {
        name: 'John Smith',
        role: 'Senior Developer',
        avatar: ''
    }
}

// ==================== Components ====================

// Student Header Component
interface StudentHeaderProps {
    student: StudentDetail
}

function StudentHeader({ student }: StudentHeaderProps) {
    return (
        <Card className="border-0 shadow-lg rounded-xl">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Student Info */}
                    <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20 border-2 border-primary/20">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <Users className="app-page-title-icon" />
                                    <h1 className="app-page-title">{student.name}</h1>
                                    <Badge className="bg-amber-500/90 text-white hover:bg-amber-600/90">
                                        Premium
                                    </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="h-4 w-4" />
                                    <span>{student.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-medium">ID:</span>
                                    <span>{student.studentId}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 mt-1 text-muted-foreground text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>Member since {student.joinedDate}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span>{student.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="font-semibold">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                        </Button>
                        <Button className="font-semibold bg-primary hover:bg-primary/90">
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Course Item Component
interface CourseItemProps {
    course: CourseEnrollment
    studentId: string
    onNavigate: (studentId: string, courseId: string) => void
}

function CourseItem({ course, studentId, onNavigate }: CourseItemProps) {
    // Get icon based on course name
    const getCourseIcon = (name: string) => {
        if (name.toLowerCase().includes('react')) return <Code className="h-5 w-5" />
        if (name.toLowerCase().includes('typescript')) return <Layers className="h-5 w-5" />
        if (name.toLowerCase().includes('node')) return <Database className="h-5 w-5" />
        if (name.toLowerCase().includes('python')) return <Cpu className="h-5 w-5" />
        if (name.toLowerCase().includes('design') || name.toLowerCase().includes('ui')) return <Palette className="h-5 w-5" />
        return <BookOpen className="h-5 w-5" />
    }

    const getIconColor = (name: string) => {
        if (name.toLowerCase().includes('react')) return 'text-blue-500 bg-blue-500/10'
        if (name.toLowerCase().includes('typescript')) return 'text-indigo-500 bg-indigo-500/10'
        if (name.toLowerCase().includes('node')) return 'text-green-500 bg-green-500/10'
        if (name.toLowerCase().includes('python')) return 'text-yellow-500 bg-yellow-500/10'
        return 'text-primary bg-primary/10'
    }

    const handleClick = () => {
        onNavigate(studentId, course.id)
    }

    return (
        <div 
            className="p-4 border border-border/50 rounded-xl hover:bg-muted/40 transition-all duration-200 cursor-pointer group"
            onClick={handleClick}
        >
            <div className="flex items-start gap-4">
                {/* Course Icon */}
                <div className={`p-3 rounded-lg ${getIconColor(course.name)}`}>
                    {getCourseIcon(course.name)}
                </div>
                
                {/* Course Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                            <h3 className="font-semibold text-foreground truncate">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {course.instructor} • {course.level}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Badge 
                                variant={course.status === 'completed' ? 'default' : 'outline'}
                                className={course.status === 'completed' 
                                    ? 'bg-green-500/90 text-white hover:bg-green-600/90' 
                                    : 'bg-blue-500/10 text-blue-600 border-blue-200'
                                }
                            >
                                {course.status === 'completed' ? 'Completed' : 'In Progress'}
                            </Badge>
                            <span className="text-sm font-semibold text-foreground">{course.progress}%</span>
                        </div>
                    </div>
                    
                    <Progress value={course.progress} className="h-2 mb-3" />
                    
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            {course.lessonsCompleted}/{course.totalLessons} lessons
                        </span>
                        <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.lastAccessed}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Course List Component
interface CourseListProps {
    courses: CourseEnrollment[]
    studentId: string
    onNavigate: (studentId: string, courseId: string) => void
}

function CourseList({ courses, studentId, onNavigate }: CourseListProps) {
    return (
        <Card className="border-0 shadow-lg rounded-xl">
            <CardHeader className="pb-3 border-b border-border/50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">Enrolled Courses</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                {courses.map(course => (
                    <CourseItem 
                        key={course.id} 
                        course={course} 
                        studentId={studentId}
                        onNavigate={onNavigate}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

// Assessment Table Component
interface AssessmentTableProps {
    assessments: Assessment[]
}

function AssessmentTable({ assessments }: AssessmentTableProps) {
    return (
        <Card className="border-0 shadow-lg rounded-xl">
            <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-lg font-bold">Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="font-semibold text-muted-foreground">Course Module</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Date</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Score</TableHead>
                            <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assessments.map(assessment => (
                            <TableRow key={assessment.id} className="hover:bg-muted/30">
                                <TableCell className="font-medium">{assessment.courseModule}</TableCell>
                                <TableCell className="text-muted-foreground">{assessment.date}</TableCell>
                                <TableCell className="font-semibold">{assessment.score}%</TableCell>
                                <TableCell>
                                    <Badge 
                                        variant="outline"
                                        className={assessment.status === 'passed'
                                            ? 'bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20'
                                            : 'bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20'
                                        }
                                    >
                                        {assessment.status === 'passed' ? (
                                            <><CheckCircle2 className="h-3 w-3 mr-1" /> Passed</>
                                        ) : (
                                            <><XCircle className="h-3 w-3 mr-1" /> Failed</>
                                        )}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

// KPI Section Component
interface KPISectionProps {
    performance: PerformanceMetrics
}

function KPISection({ performance }: KPISectionProps) {
    return (
        <div className="space-y-4">
            {/* Average Grade */}
            <Card className="app-kpi-card overflow-hidden">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Average Grade</p>
                            <p className="text-3xl font-black text-foreground">{performance.averageGrade}%</p>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 bg-green-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-semibold">+{performance.gradeTrend}%</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Total Learning Hours */}
            <Card className="app-kpi-card overflow-hidden">
                <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Learning Hours</p>
                    <p className="text-3xl font-black text-foreground">{performance.totalLearningHours} <span className="text-lg font-medium">hrs</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Target: {performance.learningTarget} hrs</p>
                </CardContent>
            </Card>

            {/* Courses Completed */}
            <Card className="app-kpi-card overflow-hidden">
                <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-2">Courses Completed</p>
                    <div className="flex items-end gap-2">
                        <p className="text-3xl font-black text-foreground">{performance.coursesCompleted}</p>
                        <p className="text-lg text-muted-foreground mb-1">/ {performance.totalCourses}</p>
                    </div>
                    <Progress 
                        value={(performance.coursesCompleted / performance.totalCourses) * 100} 
                        className="h-2 mt-3" 
                    />
                </CardContent>
            </Card>

            {/* Skill Badges */}
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/50 px-4">
                    <CardTitle className="text-lg font-bold">Skill Badges</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-3">
                        {['React', 'TypeScript', 'Node.js', 'Python', 'SQL'].map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full hover:bg-muted/70 transition-colors cursor-pointer"
                            >
                                <span className="text-lg">{['⚛️', '📘', '🟢', '🐍', '🗄️'][index]}</span>
                                <span className="font-medium text-sm">{skill}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Assigned Mentor */}
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/50 px-4">
                    <CardTitle className="text-lg font-bold">Assigned Mentor</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                JS
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">John Smith</p>
                            <p className="text-sm text-muted-foreground">Senior Developer</p>
                        </div>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// ==================== Main Component ====================

export default function AdminStudentDetail() {
    const navigate = useNavigate()

    const student = mockStudentDetail

    // Navigation handler for course click
    const handleNavigateToCourse = (studentId: string, courseId: string) => {
        navigate(`/admin/students/${studentId}/courses/${courseId}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="app-page-shell">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => navigate('/admin/students')}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Students
                </Button>

                {/* Top Header Card */}
                <StudentHeader 
                    student={student}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs Navigation */}
                        <Tabs defaultValue="courses" className="w-full">
                            <TabsList className="bg-white border-0 shadow-sm rounded-xl p-1 mb-6 w-full justify-start">
                                <TabsTrigger
                                    value="courses"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white px-4"
                                >
                                    Course Progress
                                </TabsTrigger>
                                <TabsTrigger
                                    value="assessments"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white px-4"
                                >
                                    Assessment History
                                </TabsTrigger>
                                <TabsTrigger
                                    value="certificates"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white px-4"
                                >
                                    Certificates
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white px-4"
                                >
                                    Activity Log
                                </TabsTrigger>
                            </TabsList>

                            {/* Course Progress Tab */}
                            <TabsContent value="courses" className="mt-0">
                                <CourseList courses={student.enrolledCourses} studentId={student.id} onNavigate={handleNavigateToCourse} />
                            </TabsContent>

                            {/* Assessment History Tab */}
                            <TabsContent value="assessments" className="mt-0">
                                <AssessmentTable assessments={student.assessments} />
                            </TabsContent>

                            {/* Certificates Tab */}
                            <TabsContent value="certificates" className="mt-0">
                                <Card className="border-0 shadow-lg rounded-xl">
                                    <CardHeader className="pb-3 border-b border-border/50">
                                        <CardTitle className="text-lg font-bold">Earned Certificates</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-4">
                                        {student.certificates.map(cert => (
                                            <div
                                                key={cert.id}
                                                className="p-4 border border-border/50 rounded-xl flex items-center justify-between hover:bg-muted/40 transition-all duration-200"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-amber-500/10 rounded-xl">
                                                        <Award className="h-6 w-6 text-amber-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">{cert.courseName}</h3>
                                                        <p className="text-sm text-muted-foreground">Credential ID: {cert.credentialId}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm text-muted-foreground">{cert.issuedDate}</span>
                                                    <Button variant="outline" size="sm" className="font-medium">
                                                        <Download className="h-4 w-4 mr-1" />
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Activity Log Tab */}
                            <TabsContent value="activity" className="mt-0">
                                <Card className="border-0 shadow-lg rounded-xl">
                                    <CardHeader className="pb-3 border-b border-border/50">
                                        <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="space-y-4">
                                            {student.activityLog.map(activity => (
                                                <div
                                                    key={activity.id}
                                                    className="flex items-start gap-4 pb-4 border-b border-border/30 last:border-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 py-1 rounded-lg transition-colors"
                                                >
                                                    <div className="p-2 bg-primary/10 rounded-lg">
                                                        <Play className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{activity.action}</p>
                                                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                                                    </div>
                                                    <span className="text-sm text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        <KPISection performance={student.performance} />
                    </div>
                </div>
            </div>
        </div>
    )
}
