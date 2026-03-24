// Instructor Detail Page
// Route: /admin/instructors/:instructorId

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Star, 
  TrendingUp, 
  TrendingDown,
  Mail,
  MessageSquare,
  Download,
  ArrowLeft,
  Users,
  DollarSign,
  BookOpen,
  Target,
  BarChart3,
  Wallet,
  Settings,
  Shield,
  Save,
  Ban
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// =============================================================================
// Types & Interfaces
// =============================================================================

interface InstructorProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  expertise: string
  rating: number
  reviewCount: number
  memberSince: string
  isTopRated: boolean
}

interface InstructorStats {
  totalStudents: number
  totalRevenue: number
  activeCourses: number
  completionRate: number
}

interface Course {
  id: string
  title: string
  students: number
  rating: number
  status: 'active' | 'inactive'
}

interface Review {
  id: string
  studentName: string
  studentAvatar: string
  rating: number
  comment: string
  courseName: string
  date: string
}

// =============================================================================
// Mock Data
// =============================================================================

const mockInstructor: InstructorProfile = {
  id: 'inst-001',
  name: 'Dr. Jane Smith',
  email: 'jane.smith@lms.edu',
  avatar: 'https://i.pravatar.cc/150?u=jane',
  role: 'Senior Data Scientist',
  expertise: 'Python & ML Expert',
  rating: 4.9,
  reviewCount: 328,
  memberSince: 'Jan 2023',
  isTopRated: true,
}

const mockStats: InstructorStats = {
  totalStudents: 3450,
  totalRevenue: 125000,
  activeCourses: 12,
  completionRate: 94,
}

const mockCourses: Course[] = [
  { id: 'c1', title: 'Python for Data Science', students: 1250, rating: 4.9, status: 'active' },
  { id: 'c2', title: 'Machine Learning Fundamentals', students: 890, rating: 4.8, status: 'active' },
  { id: 'c3', title: 'Deep Learning with TensorFlow', students: 650, rating: 4.7, status: 'active' },
  { id: 'c4', title: 'Data Visualization Masterclass', students: 420, rating: 4.9, status: 'active' },
  { id: 'c5', title: 'Statistical Analysis with R', students: 240, rating: 4.6, status: 'inactive' },
]

const mockReviews: Review[] = [
  {
    id: 'r1',
    studentName: 'Alex Johnson',
    studentAvatar: 'https://i.pravatar.cc/150?u=alex',
    rating: 5,
    comment: 'Excellent course! Dr. Smith explains complex concepts in a very understandable way. Highly recommended for anyone starting their ML journey.',
    courseName: 'Python for Data Science',
    date: '2 days ago',
  },
  {
    id: 'r2',
    studentName: 'Maria Garcia',
    studentAvatar: 'https://i.pravatar.cc/150?u=maria',
    rating: 4,
    comment: 'Great content and well-structured modules. The hands-on projects were really helpful.',
    courseName: 'Machine Learning Fundamentals',
    date: '1 week ago',
  },
  {
    id: 'r3',
    studentName: 'John Smith',
    studentAvatar: 'https://i.pravatar.cc/150?u=john',
    rating: 5,
    comment: 'Best instructor I have had on this platform. Very responsive and provides great feedback.',
    courseName: 'Deep Learning with TensorFlow',
    date: '2 weeks ago',
  },
]

// =============================================================================
// Component: Instructor Header
// =============================================================================

function InstructorHeader({ instructor }: { instructor: InstructorProfile }) {
  const navigate = useNavigate()
  
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <img 
              src={instructor.avatar} 
              alt={instructor.name}
              className="object-cover"
            />
          </Avatar>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="app-page-title-icon" />
              <h1 className="app-page-title">{instructor.name}</h1>
              {instructor.isTopRated && (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  <Star className="h-3 w-3 mr-1 fill-amber-500" />
                  Top Rated
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              {instructor.role} • {instructor.expertise}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{instructor.rating}</span>
                <span className="text-muted-foreground text-sm">({instructor.reviewCount} reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground text-sm">Member since {instructor.memberSince}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
    </Card>
  )
}

// =============================================================================
// Component: Stats Row
// =============================================================================

function InstructorStats({ stats }: { stats: InstructorStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="app-kpi-card hover:shadow-md transition-shadow">
        <CardContent className="app-kpi-content">
        <div className="app-kpi-row">
          <div>
            <p className="app-kpi-label">Total Students</p>
            <p className="app-kpi-value mt-1">{stats.totalStudents.toLocaleString()}</p>
            <div className="app-kpi-subtext inline-flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15%
            </div>
          </div>
          <div className="app-kpi-icon-wrap bg-blue-100">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        </CardContent>
      </Card>

      <Card className="app-kpi-card hover:shadow-md transition-shadow">
        <CardContent className="app-kpi-content">
        <div className="app-kpi-row">
          <div>
            <p className="app-kpi-label">Total Revenue</p>
            <p className="app-kpi-value mt-1">${stats.totalRevenue.toLocaleString()}</p>
            <div className="app-kpi-subtext inline-flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8%
            </div>
          </div>
          <div className="app-kpi-icon-wrap bg-green-100">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
        </div>
        </CardContent>
      </Card>

      <Card className="app-kpi-card hover:shadow-md transition-shadow">
        <CardContent className="app-kpi-content">
        <div className="app-kpi-row">
          <div>
            <p className="app-kpi-label">Active Courses</p>
            <p className="app-kpi-value mt-1">{stats.activeCourses}</p>
            <div className="app-kpi-subtext inline-flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2
            </div>
          </div>
          <div className="app-kpi-icon-wrap bg-purple-100">
            <BookOpen className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        </CardContent>
      </Card>

      <Card className="app-kpi-card hover:shadow-md transition-shadow">
        <CardContent className="app-kpi-content">
        <div className="app-kpi-row">
          <div>
            <p className="app-kpi-label">Completion Rate</p>
            <p className="app-kpi-value mt-1">{stats.completionRate}%</p>
            <div className="app-kpi-subtext inline-flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2%
            </div>
          </div>
          <div className="app-kpi-icon-wrap bg-amber-100">
            <Target className="h-5 w-5 text-amber-600" />
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}

// =============================================================================
// Component: Sidebar Management Links
// =============================================================================

function SidebarSection() {
  const [activeLink, setActiveLink] = useState('profile')
  const [commission, setCommission] = useState('30')
  const [role, setRole] = useState('senior')

  const links = [
    { id: 'profile', label: 'Profile Overview', icon: Users },
    { id: 'earnings', label: 'Earnings History', icon: Wallet },
    { id: 'communication', label: 'Communication Logs', icon: MessageSquare },
    { id: 'access', label: 'Access Control', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Management Card */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Management</h3>
        <div className="space-y-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveLink(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLink === link.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Settings Card */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Settings & Policies</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Commission Rate</label>
            <Select value={commission} onValueChange={setCommission}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="25">25%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="35">35%</SelectItem>
                <SelectItem value="40">40%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground">Instructor Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior Instructor</SelectItem>
                <SelectItem value="mid">Mid-Level Instructor</SelectItem>
                <SelectItem value="senior">Senior Instructor</SelectItem>
                <SelectItem value="lead">Lead Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="destructive" className="w-full">
              <Ban className="h-4 w-4 mr-2" />
              Suspend Access
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// =============================================================================
// Component: Analytics Tab Content
// =============================================================================

function AnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Enrollment Trends</h3>
          <div className="h-48 flex items-end justify-around gap-2">
            {[65, 78, 82, 90, 85, 95, 88].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                  style={{ height: `${height}px` }}
                />
                <span className="text-xs text-muted-foreground">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue Breakdown</h3>
          <div className="h-48 flex items-center justify-center">
            <div className="relative w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">$125K</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
            <div className="ml-6 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Courses: $85K</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Subscriptions: $40K</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Student Sentiment */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Student Sentiment</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-muted-foreground">Positive</span>
            <Progress value={78} className="flex-1" />
            <span className="text-sm font-medium text-green-600">78%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-muted-foreground">Neutral</span>
            <Progress value={15} className="flex-1" />
            <span className="text-sm font-medium text-yellow-600">15%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-muted-foreground">Negative</span>
            <Progress value={7} className="flex-1" />
            <span className="text-sm font-medium text-red-600">7%</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

// =============================================================================
// Component: Course Portfolio
// =============================================================================

function CoursePortfolio({ courses }: { courses: Course[] }) {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{course.title}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>{course.students.toLocaleString()} students</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>
            </div>
            <Badge 
              variant={course.status === 'active' ? 'default' : 'secondary'}
              className={course.status === 'active' ? 'bg-green-100 text-green-700' : ''}
            >
              {course.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  )
}

// =============================================================================
// Component: Student Feedback
// =============================================================================

function FeedbackList({ reviews }: { reviews: Review[] }) {
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
                  <p className="text-xs text-muted-foreground">{review.courseName} • {review.date}</p>
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
              <p className="mt-3 text-sm text-muted-foreground">{review.comment}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// =============================================================================
// Main Component: InstructorDetail
// =============================================================================

export default function InstructorDetail() {
  const { instructorId } = useParams()
  const navigate = useNavigate()

  // In a real app, you'd fetch the instructor data using the instructorId
  const instructor = mockInstructor

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/admin/instructors')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Instructors
        </Button>

        {/* Top Header */}
        <InstructorHeader instructor={instructor} />

        {/* Stats Row */}
        <div className="mt-6">
          <InstructorStats stats={mockStats} />
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <SidebarSection />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="analytics">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
                <TabsTrigger value="courses">Course Portfolio</TabsTrigger>
                <TabsTrigger value="feedback">Student Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="analytics">
                <AnalyticsContent />
              </TabsContent>

              <TabsContent value="courses">
                <CoursePortfolio courses={mockCourses} />
              </TabsContent>

              <TabsContent value="feedback">
                <FeedbackList reviews={mockReviews} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
