import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    Mail,
    MapPin,
    MessageSquare,
    FileText,
    BookOpen,
    Clock,
    Award,
    TrendingUp,
    Calendar,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Star,
    User,
    MoreHorizontal,
    Download,
    Play
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Student Detail interface
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

// Course enrollment interface
interface CourseEnrollment {
    id: string
    name: string
    instructor: string
    progress: number
    lessonsCompleted: number
    totalLessons: number
    lastAccessed: string
    thumbnail?: string
}

// Assessment interface
interface Assessment {
    id: string
    courseModule: string
    date: string
    score: number
    status: 'passed' | 'failed'
}

// Certificate interface
interface Certificate {
    id: string
    courseName: string
    issuedDate: string
    credentialId: string
}

// Activity interface
interface Activity {
    id: string
    action: string
    timestamp: string
    details: string
}

// Performance metrics interface
interface PerformanceMetrics {
    averageGrade: number
    totalLearningHours: number
    coursesCompleted: number
    currentStreak: number
}

// Skill interface
interface Skill {
    name: string
    icon: string
}

// Mentor interface
interface Mentor {
    name: string
    avatar?: string
    role: string
}

// Mock student data
const mockStudentDetail: StudentDetail = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
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
            progress: 87,
            lessonsCompleted: 45,
            totalLessons: 52,
            lastAccessed: '2 hours ago'
        },
        {
            id: 'c2',
            name: 'TypeScript Masterclass',
            instructor: 'Sarah Drasner',
            progress: 75,
            lessonsCompleted: 18,
            totalLessons: 24,
            lastAccessed: '1 day ago'
        },
        {
            id: 'c3',
            name: 'Node.js Backend Development',
            instructor: 'Maximilian Schwarzmüller',
            progress: 29,
            lessonsCompleted: 12,
            totalLessons: 42,
            lastAccessed: '3 days ago'
        }
    ],
    assessments: [
        { id: 'a1', courseModule: 'React - Components & Props', date: 'Mar 15, 2024', score: 92, status: 'passed' },
        { id: 'a2', courseModule: 'React - State & Hooks', date: 'Mar 10, 2024', score: 88, status: 'passed' },
        { id: 'a3', courseModule: 'TypeScript - Generics', date: 'Mar 05, 2024', score: 75, status: 'passed' },
        { id: 'a4', courseModule: 'Node.js - REST APIs', date: 'Feb 28, 2024', score: 68, status: 'failed' },
        { id: 'a5', courseModule: 'React - Advanced Patterns', date: 'Feb 20, 2024', score: 95, status: 'passed' }
    ],
    certificates: [
        { id: 'cert1', courseName: 'JavaScript - Zero to Hero', issuedDate: 'Feb 15, 2024', credentialId: 'UKA-2024-8921' },
        { id: 'cert2', courseName: 'Python Basics', issuedDate: 'Jan 20, 2024', credentialId: 'UKA-2024-5543' }
    ],
    activityLog: [
        { id: 'act1', action: 'Completed lesson', timestamp: '2 hours ago', details: 'React - Custom Hooks' },
        { id: 'act2', action: 'Submitted quiz', timestamp: '5 hours ago', details: 'TypeScript Advanced Types' },
        { id: 'act3', action: 'Started course', timestamp: '1 day ago', details: 'Node.js Backend Development' },
        { id: 'act4', action: 'Earned certificate', timestamp: '3 days ago', details: 'JavaScript - Zero to Hero' },
        { id: 'act5', action: 'Completed lesson', timestamp: '5 days ago', details: 'React - Context API' }
    ],
    performance: {
        averageGrade: 84,
        totalLearningHours: 156,
        coursesCompleted: 2,
        currentStreak: 12
    },
    skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'Node.js', icon: '🟢' }
    ],
    mentor: {
        name: 'John Smith',
        role: 'Senior Developer',
        avatar: ''
    }
}

export default function AdminStudentDetail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('courses')

    const student = mockStudentDetail

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
            <div className="max-w-[1600px] mx-auto px-4">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => navigate('/admin/students')}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Students
                </Button>

                {/* Top Header Section */}
                <Card className="border-0 shadow-lg rounded-xl mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            {/* Student Info */}
                            <div className="flex items-start gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                        {student.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-2xl font-black">{student.name}</h1>
                                        <Badge className={student.subscription === 'premium'
                                            ? 'bg-amber-500/90 text-white'
                                            : 'bg-gray-500/90 text-white'
                                        }>
                                            {student.subscription === 'premium' ? '⭐ Premium' : 'Free'}
                                        </Badge>
                                        <Badge className={student.status === 'active'
                                            ? 'bg-green-500/90 text-white'
                                            : 'bg-gray-500/90 text-white'
                                        }>
                                            {student.status === 'active' ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            <span>{student.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">ID:</span>
                                            <span>{student.studentId}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{student.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Joined {student.joinedDate}</span>
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
                                <Button className="font-semibold">
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate Report
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs Navigation */}
                        <Tabs defaultValue="courses" className="w-full">
                            <TabsList className="bg-white border-0 shadow-sm rounded-xl p-1 mb-6">
                                <TabsTrigger
                                    value="courses"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Course Progress
                                </TabsTrigger>
                                <TabsTrigger
                                    value="assessments"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Assessment History
                                </TabsTrigger>
                                <TabsTrigger
                                    value="certificates"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Certificates
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                                >
                                    Activity Log
                                </TabsTrigger>
                            </TabsList>

                            {/* Course Progress Tab */}
                            <TabsContent value="courses" className="mt-0">
                                <Card className="border-0 shadow-lg rounded-xl">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg font-bold">Enrolled Courses</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {student.enrolledCourses.map(course => (
                                            <div
                                                key={course.id}
                                                className="p-4 border border-gray-100 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h3 className="font-semibold">{course.name}</h3>
                                                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                                                    </div>
                                                    <Badge variant="outline" className="font-medium">
                                                        {course.progress}%
                                                    </Badge>
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
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Assessment History Tab */}
                            <TabsContent value="assessments" className="mt-0">
                                <Card className="border-0 shadow-lg rounded-xl">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg font-bold">Recent Assessments</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-100">
                                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Course Module</th>
                                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Date</th>
                                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Score</th>
                                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-sm">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {student.assessments.map(assessment => (
                                                        <tr key={assessment.id} className="border-b border-gray-50 hover:bg-muted/30">
                                                            <td className="py-3 px-4 font-medium">{assessment.courseModule}</td>
                                                            <td className="py-3 px-4 text-muted-foreground">{assessment.date}</td>
                                                            <td className="py-3 px-4 font-semibold">{assessment.score}%</td>
                                                            <td className="py-3 px-4">
                                                                <Badge className={assessment.status === 'passed'
                                                                    ? 'bg-green-500/90 text-white'
                                                                    : 'bg-red-500/90 text-white'
                                                                }>
                                                                    {assessment.status === 'passed' ? (
                                                                        <><CheckCircle2 className="h-3 w-3 mr-1" /> Passed</>
                                                                    ) : (
                                                                        <><XCircle className="h-3 w-3 mr-1" /> Failed</>
                                                                    )}
                                                                </Badge>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Certificates Tab */}
                            <TabsContent value="certificates" className="mt-0">
                                <Card className="border-0 shadow-lg rounded-xl">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg font-bold">Earned Certificates</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {student.certificates.map(cert => (
                                            <div
                                                key={cert.id}
                                                className="p-4 border border-gray-100 rounded-xl flex items-center justify-between hover:bg-muted/30 transition-colors"
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
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {student.activityLog.map(activity => (
                                                <div
                                                    key={activity.id}
                                                    className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0"
                                                >
                                                    <div className="p-2 bg-primary/10 rounded-lg">
                                                        <Play className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{activity.action}</p>
                                                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
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
                        {/* Performance Metrics */}
                        <Card className="border-0 shadow-lg rounded-xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-bold">Key Performance Indicators</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl">
                                    <p className="text-sm text-muted-foreground mb-1">Average Grade</p>
                                    <p className="text-3xl font-black text-primary">{student.performance.averageGrade}%</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-green-5 to-green-10 rounded-xl">
                                    <p className="text-sm text-muted-foreground mb-1">Learning Hours</p>
                                    <p className="text-3xl font-black text-green-600">{student.performance.totalLearningHours}h</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-amber-5 to-amber-10 rounded-xl">
                                    <p className="text-sm text-muted-foreground mb-1">Courses Completed</p>
                                    <p className="text-3xl font-black text-amber-600">{student.performance.coursesCompleted}</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-blue-5 to-blue-10 rounded-xl">
                                    <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                                    <p className="text-3xl font-black text-blue-600">{student.performance.currentStreak} days</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skill Badges */}
                        <Card className="border-0 shadow-lg rounded-xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-bold">Skill Badges</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    {student.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full"
                                        >
                                            <span className="text-lg">{skill.icon}</span>
                                            <span className="font-medium text-sm">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Assigned Mentor */}
                        <Card className="border-0 shadow-lg rounded-xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-bold">Assigned Mentor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {student.mentor ? (
                                    <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={student.mentor.avatar} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {student.mentor.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{student.mentor.name}</p>
                                            <p className="text-sm text-muted-foreground">{student.mentor.role}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="ml-auto">
                                            <MessageSquare className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-muted-foreground mb-3">No mentor assigned</p>
                                        <Button variant="outline" size="sm" className="font-medium">
                                            Assign Mentor
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
