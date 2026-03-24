// Course Detail Page for Instructors
// Route: /instructor/my-courses/:courseId

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft,
  Star,
  Edit,
  Globe,
  Calendar,
  Clock,
  Users,
  BookOpen,
  TrendingUp,
  FileText,
  CheckCircle2,
  MoreHorizontal,
  Play,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// =============================================================================
// Types & Interfaces
// =============================================================================

interface CourseDetail {
  id: string
  title: string
  thumbnail: string
  category: string
  level: string
  duration: string
  language: string
  description: string
  instructor: {
    name: string
    avatar: string
  }
  rating: number
  reviewCount: number
  lastUpdated: string
  isPublished: boolean
  price: number
  totalLessons: number
}

interface CourseStats {
  totalStudents: number
  completionRate: number
  totalRevenue: number
  avgRating: number
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'quiz' | 'doc'
  isCompleted: boolean
  isLocked: boolean
}

interface StudentProgress {
  id: string
  name: string
  avatar: string
  progress: number
  lastActive: string
  status: 'active' | 'completed' | 'not_started'
}

// =============================================================================
// Mock Data
// =============================================================================

const mockCourse: CourseDetail = {
  id: '1',
  title: 'Complete Web Development Bootcamp',
  thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
  category: 'Programming',
  level: 'Beginner',
  duration: '48 hours',
  language: 'English',
  description: 'Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more.',
  instructor: {
    name: 'John Instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  rating: 4.8,
  reviewCount: 1250,
  lastUpdated: '2024-01-15',
  isPublished: true,
  price: 4999,
  totalLessons: 156
}

const mockStats: CourseStats = {
  totalStudents: 3420,
  completionRate: 67,
  totalRevenue: 17109980,
  avgRating: 4.8
}

const mockLessons: Lesson[] = [
  { id: '1', title: 'Introduction to Web Development', duration: '15:00', type: 'video', isCompleted: true, isLocked: false },
  { id: '2', title: 'HTML Basics', duration: '45:00', type: 'video', isCompleted: true, isLocked: false },
  { id: '3', title: 'HTML Quiz', duration: '10:00', type: 'quiz', isCompleted: false, isLocked: false },
  { id: '4', title: 'CSS Fundamentals', duration: '60:00', type: 'video', isCompleted: false, isLocked: false },
  { id: '5', title: 'CSS Practice', duration: '30:00', type: 'doc', isCompleted: false, isLocked: true },
  { id: '6', title: 'JavaScript Introduction', duration: '45:00', type: 'video', isCompleted: false, isLocked: true },
]

const mockStudents: StudentProgress[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', progress: 85, lastActive: '2 hours ago', status: 'active' },
  { id: '2', name: 'Bob Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', progress: 100, lastActive: '1 day ago', status: 'completed' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie', progress: 45, lastActive: '5 hours ago', status: 'active' },
  { id: '4', name: 'Diana Ross', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana', progress: 0, lastActive: '3 days ago', status: 'not_started' },
  { id: '5', name: 'Eve Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve', progress: 92, lastActive: '1 hour ago', status: 'active' },
]

// =============================================================================
// Component
// =============================================================================

export default function CourseDetail() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />
      case 'quiz':
        return <FileText className="h-4 w-4" />
      case 'doc':
        return <FileText className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'active':
        return <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-300" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/instructor/my-courses')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{mockCourse.title}</h1>
                <Badge variant={mockCourse.isPublished ? 'default' : 'secondary'}>
                  {mockCourse.isPublished ? 'Published' : 'Draft'}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">
                Last updated {mockCourse.lastUpdated} • {mockCourse.totalLessons} lessons • {mockCourse.duration}
              </p>
            </div>
            <Button onClick={() => navigate(`/instructor/my-courses/${courseId}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.totalStudents.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{(mockStats.totalRevenue / 100000).toFixed(1)}L</p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.completionRate}%</p>
                <p className="text-sm text-muted-foreground">Completion</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.avgRating}</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About this course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {mockCourse.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{mockCourse.language}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{mockCourse.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{mockCourse.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Last updated: {mockCourse.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mockCourse.instructor.avatar} />
                        <AvatarFallback>{mockCourse.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{mockCourse.instructor.name}</p>
                        <p className="text-sm text-muted-foreground">Senior Instructor</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <img 
                      src={mockCourse.thumbnail} 
                      alt={mockCourse.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-bold text-xl">₹{mockCourse.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium">{mockCourse.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Lessons</span>
                        <span className="font-medium">{mockCourse.totalLessons}</span>
                      </div>
                      <Button className="w-full mt-4">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="section-1">
                    <AccordionTrigger className="text-base font-medium">
                      <div className="flex items-center gap-2">
                        <span>Section 1: Getting Started</span>
                        <Badge variant="outline" className="ml-2">3 lessons</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {mockLessons.map((lesson) => (
                          <div 
                            key={lesson.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${lesson.isCompleted ? 'bg-green-100' : 'bg-muted'}`}>
                                {lesson.isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  getLessonIcon(lesson.type)
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                              </div>
                            </div>
                            {lesson.isLocked && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 w-32">
                            <Progress value={student.progress} className="h-2" />
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(student.status)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {student.lastActive}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
