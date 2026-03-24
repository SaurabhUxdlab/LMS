// Instructor Management Dashboard
// Route: /admin/instructors

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  BookOpen, 
  Star, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Mail,
  MoreHorizontal,
  Plus,
  Download,
  MessageSquare,
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

interface Instructor {
  id: string
  name: string
  email: string
  avatar: string
  expertise: string
  coursesCount: number
  totalStudents: number
  rating: number
  status: 'active' | 'inactive'
}

interface InstructorStats {
  totalInstructors: number
  activeCourses: number
  avgRating: number
  pendingApprovals: number
}

// =============================================================================
// Mock Data
// =============================================================================

const mockStats: InstructorStats = {
  totalInstructors: 124,
  activeCourses: 452,
  avgRating: 4.8,
  pendingApprovals: 12,
}

const mockInstructors: Instructor[] = [
  {
    id: 'inst-001',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    expertise: 'Data Science',
    coursesCount: 12,
    totalStudents: 3450,
    rating: 4.9,
    status: 'active',
  },
  {
    id: 'inst-002',
    name: 'James Anderson',
    email: 'james.anderson@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=james',
    expertise: 'UX Design',
    coursesCount: 8,
    totalStudents: 2180,
    rating: 4.7,
    status: 'active',
  },
  {
    id: 'inst-003',
    name: 'Emily Chen',
    email: 'emily.chen@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    expertise: 'Marketing',
    coursesCount: 15,
    totalStudents: 4520,
    rating: 4.8,
    status: 'active',
  },
  {
    id: 'inst-004',
    name: 'Michael Roberts',
    email: 'michael.r@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    expertise: 'Data Science',
    coursesCount: 6,
    totalStudents: 1890,
    rating: 4.6,
    status: 'active',
  },
  {
    id: 'inst-005',
    name: 'Lisa Thompson',
    email: 'lisa.t@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=lisa',
    expertise: 'UX Design',
    coursesCount: 10,
    totalStudents: 2780,
    rating: 4.9,
    status: 'active',
  },
  {
    id: 'inst-006',
    name: 'David Wilson',
    email: 'david.w@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=david',
    expertise: 'Marketing',
    coursesCount: 5,
    totalStudents: 980,
    rating: 4.5,
    status: 'inactive',
  },
  {
    id: 'inst-007',
    name: 'Amanda Garcia',
    email: 'amanda.g@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=amanda',
    expertise: 'Data Science',
    coursesCount: 9,
    totalStudents: 2340,
    rating: 4.7,
    status: 'active',
  },
  {
    id: 'inst-008',
    name: 'Robert Kim',
    email: 'robert.k@lms.edu',
    avatar: 'https://i.pravatar.cc/150?u=robert',
    expertise: 'UX Design',
    coursesCount: 7,
    totalStudents: 1560,
    rating: 4.8,
    status: 'active',
  },
]

const categories = ['All Faculty', 'Data Science', 'UX Design', 'Marketing']

// =============================================================================
// Component: Stat Card
// =============================================================================

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  trendUp 
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  trend?: string
  trendUp?: boolean
}) {
  return (
    <Card className="app-kpi-card hover:shadow-md transition-shadow duration-200">
      <CardContent className="app-kpi-content">
        <div className="app-kpi-row">
          <div className="min-w-0">
            <p className="app-kpi-label">{label}</p>
            <p className="app-kpi-value mt-1">{value}</p>
            {trend && (
              <div className={`app-kpi-subtext inline-flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trendUp ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
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
// Component: Filter Tabs
// =============================================================================

function InstructorFilters({ 
  activeCategory, 
  onCategoryChange 
}: { 
  activeCategory: string
  onCategoryChange: (category: string) => void
}) {
  return (
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
  )
}

// =============================================================================
// Component: Rating Stars
// =============================================================================

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

// =============================================================================
// Component: Status Badge
// =============================================================================

function StatusBadge({ status }: { status: 'active' | 'inactive' }) {
  return (
    <Badge 
      variant={status === 'active' ? 'default' : 'secondary'}
      className={status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-100'}
    >
      {status === 'active' ? 'Active' : 'Inactive'}
    </Badge>
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
// Main Component: InstructorsList
// =============================================================================

export default function InstructorsList() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All Faculty')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter instructors by category
  const filteredInstructors = activeCategory === 'All Faculty' 
    ? mockInstructors 
    : mockInstructors.filter(i => i.expertise === activeCategory)

  // Paginate
  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage)
  const paginatedInstructors = filteredInstructors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleRowClick = (instructorId: string) => {
    navigate(`/admin/instructors/${instructorId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        {/* Page Header */}
        <div className="app-page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="app-page-heading">
              <BookOpen className="app-page-title-icon" />
              <h1 className="app-page-title">Instructor Management</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Oversee faculty performance, manage permissions, and track academy growth
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Instructor
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Instructors"
            value={mockStats.totalInstructors}
            trend="+12%"
            trendUp
          />
          <StatCard
            icon={BookOpen}
            label="Active Courses"
            value={mockStats.activeCourses}
            trend="+8%"
            trendUp
          />
          <StatCard
            icon={Star}
            label="Avg. Instructor Rating"
            value={`${mockStats.avgRating}/5.0`}
            trend="+0.2"
            trendUp
          />
          <StatCard
            icon={Clock}
            label="Pending Approvals"
            value={mockStats.pendingApprovals}
            trend="-3"
            trendUp={false}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <InstructorFilters 
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat)
              setCurrentPage(1)
            }}
          />
        </div>

        {/* Main Table */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Instructor</TableHead>
                <TableHead className="font-semibold">Expertise</TableHead>
                <TableHead className="font-semibold text-center">Courses</TableHead>
                <TableHead className="font-semibold text-center">Total Students</TableHead>
                <TableHead className="font-semibold text-center">Avg Rating</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInstructors.map((instructor) => (
                <TableRow 
                  key={instructor.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleRowClick(instructor.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <img 
                          src={instructor.avatar} 
                          alt={instructor.name}
                          className="object-cover"
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium">{instructor.name}</p>
                        <p className="text-sm text-muted-foreground">{instructor.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/5">
                      {instructor.expertise}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{instructor.coursesCount}</TableCell>
                  <TableCell className="text-center">
                    {instructor.totalStudents.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <RatingDisplay rating={instructor.rating} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={instructor.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Message action
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
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
