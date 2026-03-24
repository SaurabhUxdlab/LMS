// Instructor Management Dashboard
// Route: /admin/instructors

import { useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  BookOpen, 
  Star, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal,
  Plus,
  Download,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

interface Instructor {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
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
    phone: '+1 (415) 555-0140',
    location: 'San Francisco, CA',
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
    phone: '+1 (206) 555-0122',
    location: 'Seattle, WA',
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
    phone: '+1 (512) 555-0184',
    location: 'Austin, TX',
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
    phone: '+1 (303) 555-0191',
    location: 'Denver, CO',
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
    phone: '+1 (404) 555-0139',
    location: 'Atlanta, GA',
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
    phone: '+1 (617) 555-0173',
    location: 'Boston, MA',
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
    phone: '+1 (312) 555-0114',
    location: 'Chicago, IL',
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
    phone: '+1 (602) 555-0168',
    location: 'Phoenix, AZ',
    avatar: 'https://i.pravatar.cc/150?u=robert',
    expertise: 'UX Design',
    coursesCount: 7,
    totalStudents: 1560,
    rating: 4.8,
    status: 'active',
  },
]

const categories = ['All Faculty', 'Data Science', 'UX Design', 'Marketing']

interface InstructorFormState {
  name: string
  email: string
  phone: string
  location: string
  expertise: string
  status: Instructor['status']
}

const defaultInstructorForm: InstructorFormState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  expertise: 'Data Science',
  status: 'active',
}

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
    <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
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
      className={status === 'active'
        ? 'rounded-full bg-green-500/90 text-white hover:bg-green-600'
        : 'rounded-full bg-gray-500/90 text-white hover:bg-gray-600'}
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
  totalItems,
  itemsPerPage,
  totalPages, 
  onPageChange 
}: { 
  currentPage: number
  totalItems: number
  itemsPerPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 p-4 dark:border-zinc-800 md:flex-row md:items-center md:justify-between md:px-6">
      <p className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} instructors
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="sm"
            className="rounded-xl"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
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
  const [searchTerm, setSearchTerm] = useState('')
  const [isInstructorSheetOpen, setIsInstructorSheetOpen] = useState(false)
  const [instructorSheetMode, setInstructorSheetMode] = useState<'create' | 'edit'>('create')
  const [instructorForm, setInstructorForm] = useState<InstructorFormState>(defaultInstructorForm)
  const [instructorPendingDelete, setInstructorPendingDelete] = useState<Instructor | null>(null)
  const itemsPerPage = 5

  // Filter instructors by category and search
  const filteredInstructors = mockInstructors.filter((instructor) => {
    const matchesCategory =
      activeCategory === 'All Faculty' || instructor.expertise === activeCategory

    const query = searchTerm.toLowerCase()
    const matchesSearch =
      instructor.name.toLowerCase().includes(query) ||
      instructor.email.toLowerCase().includes(query) ||
      instructor.expertise.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })

  // Paginate
  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage)
  const paginatedInstructors = filteredInstructors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleRowClick = (instructorId: string) => {
    navigate(`/admin/instructors/${instructorId}`)
  }

  const openCreateInstructorSheet = () => {
    setInstructorSheetMode('create')
    setInstructorForm(defaultInstructorForm)
    setIsInstructorSheetOpen(true)
  }

  const openEditInstructorSheet = (instructor: Instructor) => {
    setInstructorSheetMode('edit')
    setInstructorForm({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone ?? '',
      location: instructor.location ?? '',
      expertise: instructor.expertise,
      status: instructor.status,
    })
    setIsInstructorSheetOpen(true)
  }

  const closeInstructorSheet = () => {
    setIsInstructorSheetOpen(false)
  }

  const handleInstructorSheetOpenChange = (open: boolean) => {
    setIsInstructorSheetOpen(open)
  }

  const handleInstructorFormChange = (field: keyof InstructorFormState, value: string) => {
    setInstructorForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const stopRowNavigation = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  const openDeleteConfirmation = (instructor: Instructor) => {
    setInstructorPendingDelete(instructor)
  }

  const closeDeleteConfirmation = () => {
    setInstructorPendingDelete(null)
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
            <Button onClick={openCreateInstructorSheet}>
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
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder="Search instructors..."
                  className="h-11 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                />
              </div>
              <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900 lg:max-w-max">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-zinc-300">
                  <Filter className="h-4 w-4" />
                  Categories
                </div>
                <InstructorFilters 
                  activeCategory={activeCategory}
                  onCategoryChange={(cat) => {
                    setActiveCategory(cat)
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Card className="gap-0 overflow-hidden rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-zinc-800 md:px-6">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Instructor Directory</h2>
                <p className="text-sm text-muted-foreground">
                  Review faculty expertise, course load, ratings, and active status.
                </p>
              </div>
              <Badge variant="outline" className="w-fit rounded-full border-slate-200 bg-white px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                {filteredInstructors.length} instructors
              </Badge>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/40">
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
                  className="cursor-pointer border-slate-200/80 transition-colors hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                  onClick={() => handleRowClick(instructor.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-slate-200 dark:border-zinc-700">
                        <img 
                          src={instructor.avatar} 
                          alt={instructor.name}
                          className="h-full w-full object-cover"
                        />
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{instructor.name}</p>
                        <p className="text-sm text-muted-foreground">{instructor.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full border-slate-200 bg-white px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                      {instructor.expertise}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{instructor.coursesCount}</TableCell>
                  <TableCell className="text-center font-semibold">
                    {instructor.totalStudents.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <RatingDisplay rating={instructor.rating} />
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={instructor.status} />
                  </TableCell>
                  <TableCell className="text-right" onClick={stopRowNavigation}>
                    <div className="flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-xl"
                            onClick={stopRowNavigation}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/admin/instructors/${instructor.id}`)
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openEditInstructorSheet(instructor)
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              openDeleteConfirmation(instructor)
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Pagination 
            currentPage={currentPage}
            totalItems={filteredInstructors.length}
            itemsPerPage={itemsPerPage}
            totalPages={Math.max(totalPages, 1)}
            onPageChange={setCurrentPage}
          />
        </Card>

        <Sheet open={isInstructorSheetOpen} onOpenChange={handleInstructorSheetOpenChange}>
          <SheetContent side="right" className="flex w-full flex-col border-l border-slate-200 bg-white p-0 sm:max-w-[720px] dark:border-zinc-800 dark:bg-zinc-950">
            <SheetHeader className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100/80 px-6 py-6 text-left dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <UserPlus className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <SheetTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {instructorSheetMode === 'edit' ? 'Edit Instructor Details' : 'Add New Instructor'}
                    </SheetTitle>
                    <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-primary">
                      {instructorSheetMode === 'edit' ? 'Edit Mode' : 'Admin Access'}
                    </Badge>
                  </div>
                  <SheetDescription className="max-w-xl text-sm leading-6 text-slate-600 dark:text-zinc-400">
                    {instructorSheetMode === 'edit'
                      ? 'Update the selected instructor profile details without leaving the directory.'
                      : 'Create a new instructor profile with the core contact and faculty details required for onboarding.'}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="grid gap-2 md:col-span-2">
                  <Label htmlFor="instructor-name" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserPlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="instructor-name"
                      placeholder="Enter full name"
                      value={instructorForm.name}
                      onChange={(e) => handleInstructorFormChange('name', e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructor-email" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="instructor-email"
                      type="email"
                      placeholder="Enter email address"
                      value={instructorForm.email}
                      onChange={(e) => handleInstructorFormChange('email', e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructor-phone" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="instructor-phone"
                      placeholder="Enter phone number"
                      value={instructorForm.phone}
                      onChange={(e) => handleInstructorFormChange('phone', e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructor-location" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="instructor-location"
                      placeholder="Enter location"
                      value={instructorForm.location}
                      onChange={(e) => handleInstructorFormChange('location', e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructor-expertise" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    Expertise
                  </Label>
                  <Select
                    value={instructorForm.expertise}
                    onValueChange={(value) => handleInstructorFormChange('expertise', value)}
                  >
                    <SelectTrigger id="instructor-expertise" className="h-12 rounded-2xl border-slate-200 shadow-none dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-slate-400" />
                        <SelectValue placeholder="Select expertise" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter((category) => category !== 'All Faculty').map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="instructor-status" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                    Account Status
                  </Label>
                  <Select
                    value={instructorForm.status}
                    onValueChange={(value: Instructor['status']) => handleInstructorFormChange('status', value)}
                  >
                    <SelectTrigger id="instructor-status" className="h-12 rounded-2xl border-slate-200 shadow-none dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-slate-400" />
                        <SelectValue placeholder="Select status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-slate-200 px-5 font-semibold shadow-none dark:border-zinc-700"
                  onClick={closeInstructorSheet}
                >
                  Cancel
                </Button>
                <Button className="h-11 rounded-xl px-5 font-semibold shadow-sm">
                  {instructorSheetMode === 'edit' ? 'Save Changes' : 'Add Instructor'}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {instructorPendingDelete ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"
            onClick={closeDeleteConfirmation}
          >
            <div
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Delete Instructor
                  </h3>
                  <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
                    Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{instructorPendingDelete.name}</span>? This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-slate-200 px-5 font-semibold shadow-none dark:border-zinc-700"
                  onClick={closeDeleteConfirmation}
                >
                  Cancel
                </Button>
                <Button
                  className="h-11 rounded-xl bg-red-600 px-5 font-semibold text-white shadow-sm hover:bg-red-700"
                  onClick={closeDeleteConfirmation}
                >
                  Delete Instructor
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
