// Courses Management Dashboard
// Route: /admin/courses

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  GraduationCap,
  Plus,
  Download,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
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

interface Course {
  id: string
  title: string
  thumbnail: string
  category: string
  instructor: {
    name: string
    avatar: string
  }
  students: number
  rating: number
  status: 'published' | 'draft' | 'archived'
  lastUpdated: string
}

interface CourseStats {
  totalCourses: number
  activeCourses: number
  totalEnrollments: number
  completionRate: number
}

// =============================================================================
// Mock Data
// =============================================================================

const mockStats: CourseStats = {
  totalCourses: 156,
  activeCourses: 124,
  totalEnrollments: 18450,
  completionRate: 78,
}

const mockCourses: Course[] = [
  {
    id: 'course-001',
    title: 'Complete Python Bootcamp',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=80&h=60&fit=crop',
    category: 'Development',
    instructor: { name: 'Dr. Sarah Mitchell', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    students: 3450,
    rating: 4.8,
    status: 'published',
    lastUpdated: '2 days ago',
  },
  {
    id: 'course-002',
    title: 'Machine Learning A-Z',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=80&h=60&fit=crop',
    category: 'Data Science',
    instructor: { name: 'James Anderson', avatar: 'https://i.pravatar.cc/150?u=james' },
    students: 2180,
    rating: 4.9,
    status: 'published',
    lastUpdated: '1 week ago',
  },
  {
    id: 'course-003',
    title: 'UI/UX Design Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=80&h=60&fit=crop',
    category: 'Design',
    instructor: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?u=emily' },
    students: 1890,
    rating: 4.7,
    status: 'published',
    lastUpdated: '3 days ago',
  },
  {
    id: 'course-004',
    title: 'Digital Marketing Pro',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=60&fit=crop',
    category: 'Marketing',
    instructor: { name: 'Michael Roberts', avatar: 'https://i.pravatar.cc/150?u=michael' },
    students: 1240,
    rating: 4.5,
    status: 'draft',
    lastUpdated: '5 hours ago',
  },
  {
    id: 'course-005',
    title: 'React Native Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&h=60&fit=crop',
    category: 'Development',
    instructor: { name: 'Lisa Thompson', avatar: 'https://i.pravatar.cc/150?u=lisa' },
    students: 980,
    rating: 4.8,
    status: 'published',
    lastUpdated: '1 day ago',
  },
  {
    id: 'course-006',
    title: 'Data Visualization with D3.js',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=60&fit=crop',
    category: 'Data Science',
    instructor: { name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?u=david' },
    students: 650,
    rating: 4.6,
    status: 'archived',
    lastUpdated: '1 month ago',
  },
  {
    id: 'course-007',
    title: 'Figma for Beginners',
    thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=80&h=60&fit=crop',
    category: 'Design',
    instructor: { name: 'Amanda Garcia', avatar: 'https://i.pravatar.cc/150?u=amanda' },
    students: 2340,
    rating: 4.9,
    status: 'published',
    lastUpdated: '4 days ago',
  },
  {
    id: 'course-008',
    title: 'SEO & Content Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?w=80&h=60&fit=crop',
    category: 'Marketing',
    instructor: { name: 'Robert Kim', avatar: 'https://i.pravatar.cc/150?u=robert' },
    students: 870,
    rating: 4.4,
    status: 'published',
    lastUpdated: '2 weeks ago',
  },
]

const categories = ['All Courses', 'Development', 'Data Science', 'Design', 'Marketing']

// =============================================================================
// Component: Stat Card
// =============================================================================

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend 
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  trend?: string
}) {
  return (
    <Card className="app-kpi-card hover:shadow-md transition-shadow duration-200">
      <CardContent className="app-kpi-content">
        <div className="app-kpi-row">
          <div className="min-w-0">
            <p className="app-kpi-label">{label}</p>
            <p className="app-kpi-value mt-1">{value}</p>
            {trend && (
              <div className="app-kpi-subtext inline-flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                {trend}
              </div>
            )}
          </div>
          <div className="app-kpi-icon-wrap">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// Component: Course Filters
// =============================================================================

function CourseFilters({ 
  activeCategory, 
  onCategoryChange,
  searchQuery,
  onSearchChange
}: { 
  activeCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}

// =============================================================================
// Component: Status Badge
// =============================================================================

function StatusBadge({ status }: { status: 'published' | 'draft' | 'archived' }) {
  const statusConfig = {
    published: { label: 'Published', className: 'bg-green-100 text-green-700 hover:bg-green-100' },
    draft: { label: 'Draft', className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' },
    archived: { label: 'Archived', className: 'bg-gray-100 text-gray-600 hover:bg-gray-100' },
  }

  return (
    <Badge variant="outline" className={statusConfig[status].className}>
      {statusConfig[status].label}
    </Badge>
  )
}

// =============================================================================
// Component: Rating Display
// =============================================================================

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-yellow-500">★</span>
      <span className="font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

// =============================================================================
// Component: Pagination
// =============================================================================

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// =============================================================================
// Main Component: CoursesList
// =============================================================================

export default function CoursesList() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All Courses')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter courses by category and search
  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = activeCategory === 'All Courses' || 
      (activeCategory === 'Development' && course.category === 'Development') ||
      (activeCategory === 'Data Science' && course.category === 'Data Science') ||
      (activeCategory === 'Design' && course.category === 'Design') ||
      (activeCategory === 'Marketing' && course.category === 'Marketing')
    
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  // Paginate
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleRowClick = (courseId: string) => {
    navigate(`/admin/courses/${courseId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        {/* Page Header */}
        <div className="app-page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="app-page-heading">
              <BookOpen className="app-page-title-icon" />
              <h1 className="app-page-title">Course Management</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Manage courses, track performance, and monitor enrollments
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            label="Total Courses"
            value={mockStats.totalCourses}
            trend="+8"
          />
          <StatCard
            icon={Users}
            label="Active Courses"
            value={mockStats.activeCourses}
            trend="+5"
          />
          <StatCard
            icon={GraduationCap}
            label="Total Enrollments"
            value={mockStats.totalEnrollments.toLocaleString()}
            trend="+12%"
          />
          <StatCard
            icon={TrendingUp}
            label="Completion Rate"
            value={`${mockStats.completionRate}%`}
            trend="+3%"
          />
        </div>

        {/* Filters */}
        <CourseFilters 
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat)
            setCurrentPage(1)
          }}
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query)
            setCurrentPage(1)
          }}
        />

        {/* Main Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Course</TableHead>
                <TableHead className="font-semibold">Instructor</TableHead>
                <TableHead className="font-semibold text-center">Students</TableHead>
                <TableHead className="font-semibold text-center">Rating</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="font-semibold">Last Updated</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.map((course) => (
                <TableRow 
                  key={course.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleRowClick(course.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 rounded-md overflow-hidden bg-muted">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-muted-foreground">{course.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <img 
                          src={course.instructor.avatar} 
                          alt={course.instructor.name}
                          className="object-cover"
                        />
                      </Avatar>
                      <span className="text-sm">{course.instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {course.students.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <RatingDisplay rating={course.rating} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={course.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {course.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Edit action
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          // View action
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          // More action
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card>
      </div>
    </div>
  )
}
