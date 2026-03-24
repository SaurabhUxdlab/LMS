// Course Detail Page
// Route: /admin/courses/:courseId

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
  Trash2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
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
  instructor: {
    name: string
    avatar: string
  }
  rating: number
  reviewCount: number
  lastUpdated: string
  isPublished: boolean
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
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

interface Student {
  id: string
  name: string
  email: string
  avatar: string
  progress: number
  status: 'active' | 'completed' | 'inactive'
}

interface Review {
  id: string
  studentName: string
  studentAvatar: string
  rating: number
  comment: string
  date: string
}

// =============================================================================
// Mock Data
// =============================================================================

const mockCourse: CourseDetail = {
  id: 'course-001',
  title: 'Advanced React Patterns',
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
  category: 'Development',
  level: 'Advanced',
  duration: '24 hours',
  language: 'English',
  instructor: { name: 'Dr. Sarah Mitchell', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  rating: 4.8,
  reviewCount: 328,
  lastUpdated: '2 days ago',
  isPublished: true,
}

const mockStats: CourseStats = {
  totalStudents: 3450,
  completionRate: 78,
  totalRevenue: 125000,
  avgRating: 4.8,
}

const mockCurriculum: Module[] = [
  {
    id: 'mod-1',
    title: 'Module 1: Introduction to Advanced Patterns',
    lessons: [
      { id: 'l1', title: 'Course Overview', duration: '10 min', type: 'video', isCompleted: true },
      { id: 'l2', title: 'Setting Up Development Environment', duration: '15 min', type: 'video', isCompleted: true },
      { id: 'l3', title: 'Module Quiz', duration: '20 min', type: 'quiz', isCompleted: true },
    ],
  },
  {
    id: 'mod-2',
    title: 'Module 2: Compound Components',
    lessons: [
      { id: 'l4', title: 'Understanding Compound Components', duration: '25 min', type: 'video', isCompleted: true },
      { id: 'l5', title: 'Building a Flexible Tab Component', duration: '30 min', type: 'video', isCompleted: false },
      { id: 'l6', title: 'Context API Deep Dive', duration: '20 min', type: 'doc', isCompleted: false },
      { id: 'l7', title: 'Module Quiz', duration: '15 min', type: 'quiz', isCompleted: false },
    ],
  },
  {
    id: 'mod-3',
    title: 'Module 3: Render Props Pattern',
    lessons: [
      { id: 'l8', title: 'Render Props Explained', duration: '20 min', type: 'video', isCompleted: false },
      { id: 'l9', title: 'Practical Example: DataFetcher', duration: '25 min', type: 'video', isCompleted: false },
      { id: 'l10', title: 'Assignment: Build a Drag & Drop', duration: '45 min', type: 'doc', isCompleted: false },
    ],
  },
  {
    id: 'mod-4',
    title: 'Module 4: Higher-Order Components',
    lessons: [
      { id: 'l11', title: 'HOC Pattern Overview', duration: '15 min', type: 'video', isCompleted: false },
      { id: 'l12', title: 'Real-world HOCs', duration: '30 min', type: 'video', isCompleted: false },
      { id: 'l13', title: 'Final Project', duration: '60 min', type: 'doc', isCompleted: false },
    ],
  },
]

const mockStudents: Student[] = [
  { id: 's1', name: 'Alex Johnson', email: 'alex.j@email.com', avatar: 'https://i.pravatar.cc/150?u=alex', progress: 85, status: 'active' },
  { id: 's2', name: 'Maria Garcia', email: 'maria.g@email.com', avatar: 'https://i.pravatar.cc/150?u=maria', progress: 100, status: 'completed' },
  { id: 's3', name: 'John Smith', email: 'john.s@email.com', avatar: 'https://i.pravatar.cc/150?u=john', progress: 42, status: 'active' },
  { id: 's4', name: 'Emily Chen', email: 'emily.c@email.com', avatar: 'https://i.pravatar.cc/150?u=emily', progress: 15, status: 'active' },
  { id: 's5', name: 'David Wilson', email: 'david.w@email.com', avatar: 'https://i.pravatar.cc/150?u=david', progress: 0, status: 'inactive' },
]

const mockReviews: Review[] = [
  { id: 'r1', studentName: 'Alex Johnson', studentAvatar: 'https://i.pravatar.cc/150?u=alex', rating: 5, comment: 'Excellent course! The compound components module was eye-opening. Highly recommended for any React developer.', date: '2 days ago' },
  { id: 'r2', studentName: 'Maria Garcia', studentAvatar: 'https://i.pravatar.cc/150?u=maria', rating: 4, comment: 'Great content overall. Would love more real-world examples in the HOC section.', date: '1 week ago' },
  { id: 'r3', studentName: 'John Smith', studentAvatar: 'https://i.pravatar.cc/150?u=john', rating: 5, comment: 'Best course on advanced React patterns. The instructor explains complex concepts very clearly.', date: '2 weeks ago' },
]

// =============================================================================
// Component: Course Header
// =============================================================================

function CourseHeader({ course }: { course: CourseDetail }) {
  const navigate = useNavigate()

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Thumbnail */}
        <div className="w-full lg:w-80 h-48 rounded-xl overflow-hidden bg-muted">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{course.category}</Badge>
            <Badge variant={course.isPublished ? 'default' : 'secondary'}>
              {course.isPublished ? 'Published' : 'Draft'}
            </Badge>
          </div>
          
          <div className="app-page-heading">
            <BookOpen className="app-page-title-icon" />
            <h1 className="app-page-title">{course.title}</h1>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="object-cover" />
              </Avatar>
              <span className="text-sm">{course.instructor.name}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-muted-foreground text-sm">({course.reviewCount})</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-sm">Updated {course.lastUpdated}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={() => navigate(`/admin/courses/${course.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Course
          </Button>
          <Button>
            {course.isPublished ? 'Unpublish Course' : 'Publish Course'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

// =============================================================================
// Component: Course Stats
// =============================================================================

function CourseStats({ stats }: { stats: CourseStats }) {
  const statItems = [
    { icon: Users, label: 'Total Students', value: stats.totalStudents.toLocaleString() },
    { icon: CheckCircle2, label: 'Completion Rate', value: `${stats.completionRate}%` },
    { icon: TrendingUp, label: 'Total Revenue', value: `${stats.totalRevenue.toLocaleString()}` },
    { icon: Star, label: 'Avg Rating', value: stats.avgRating.toFixed(1) },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <Card key={index} className="app-kpi-card hover:shadow-md transition-shadow">
          <CardContent className="app-kpi-content">
            <div className="app-kpi-row">
              <div>
                <p className="app-kpi-value text-xl">{item.value}</p>
                <p className="app-kpi-label">{item.label}</p>
              </div>
              <div className="app-kpi-icon-wrap">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// =============================================================================
// Component: Lesson Type Icon
// =============================================================================

function LessonTypeIcon({ type }: { type: 'video' | 'quiz' | 'doc' }) {
  const icons = {
    video: FileText,
    quiz: MoreHorizontal,
    doc: FileText,
  }
  const Icon = icons[type]
  
  const colors = {
    video: 'text-blue-500',
    quiz: 'text-purple-500',
    doc: 'text-amber-500',
  }

  return <Icon className={`h-4 w-4 ${colors[type]}`} />
}

// =============================================================================
// Component: Curriculum Accordion
// =============================================================================

function CurriculumAccordion({ modules }: { modules: Module[] }) {
  return (
    <Accordion type="multiple" defaultValue={['mod-1']} className="w-full">
      {modules.map((module) => (
        <AccordionItem key={module.id} value={module.id} className="border-b">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{module.title}</span>
              <Badge variant="secondary" className="ml-2">{module.lessons.length} lessons</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pl-4">
              {module.lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LessonTypeIcon type={lesson.type} />
                    <span className="text-sm">{lesson.title}</span>
                    {lesson.isCompleted && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                    <Badge variant="outline" className="text-xs capitalize">{lesson.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// =============================================================================
// Component: Students Table
// =============================================================================

function StudentsTable({ students }: { students: Student[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Progress</TableHead>
            <TableHead className="font-semibold text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <img src={student.avatar} alt={student.name} className="object-cover" />
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={student.progress} className="h-2 w-24" />
                  <span className="text-sm text-muted-foreground">{student.progress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant="outline"
                  className={
                    student.status === 'completed' ? 'bg-green-100 text-green-700' :
                    student.status === 'active' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }
                >
                  {student.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// =============================================================================
// Component: Reviews List
// =============================================================================

function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <img src={review.studentAvatar} alt={review.studentName} className="object-cover" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{review.studentName}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// =============================================================================
// Component: Course Sidebar
// =============================================================================

function CourseSidebar({ course }: { course: CourseDetail }) {
  return (
    <div className="space-y-6">
      {/* Course Info Card */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Course Information</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Category</span>
            <Badge variant="outline">{course.category}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Level</span>
            <span className="text-sm font-medium">{course.level}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="text-sm font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Language</span>
            <span className="text-sm font-medium">{course.language}</span>
          </div>
        </div>
      </Card>

      {/* Enrollment Insights */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Enrollment Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-green-50">
            <span className="text-sm text-green-700">This Week</span>
            <span className="text-sm font-bold text-green-700">+124</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50">
            <span className="text-sm text-blue-700">This Month</span>
            <span className="text-sm font-bold text-blue-700">+856</span>
          </div>
        </div>
      </Card>

      {/* Actions Card */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Edit className="h-4 w-4 mr-2" />
            Edit Course
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            <Trash2 className="h-4 w-4 mr-2" />
            Archive Course
          </Button>
        </div>
      </Card>
    </div>
  )
}

// =============================================================================
// Main Component: CourseDetail
// =============================================================================

export default function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  // In a real app, fetch course using courseId
  const course = mockCourse

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        {/* Top Header */}
        <CourseHeader course={course} />

        {/* Stats Row */}
        <div className="mt-6">
          <CourseStats stats={mockStats} />
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Section - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="curriculum">
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Card className="p-4">
                  <CurriculumAccordion modules={mockCurriculum} />
                </Card>
              </TabsContent>

              <TabsContent value="students">
                <Card className="p-4">
                  <StudentsTable students={mockStudents} />
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="p-4">
                  <ReviewsList reviews={mockReviews} />
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </div>
  )
}
