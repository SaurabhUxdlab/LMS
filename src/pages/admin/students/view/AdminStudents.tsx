import { useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Award,
  TrendingUp,
  Download,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShieldCheck
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label'

// Student interface
interface Student {
  id: string
  studentId: string
  name: string
  email: string
  phone?: string
  location?: string
  avatar?: string
  enrolledCourses: number
  overallProgress: number
  lastActive: string
  status: 'active' | 'inactive'
  courses: CourseProgress[]
}

// Course progress interface
interface CourseProgress {
  name: string
  quizAverage: number
  lessonsCompleted: number
  totalLessons: number
  progress: number
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: '1',
    studentId: 'STU-2024-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (415) 555-0142',
    location: 'San Francisco, CA',
    avatar: '',
    enrolledCourses: 3,
    overallProgress: 78,
    lastActive: '2 hours ago',
    status: 'active',
    courses: [
      { name: 'React - The Complete Guide', quizAverage: 92, lessonsCompleted: 45, totalLessons: 52, progress: 87 },
      { name: 'TypeScript Masterclass', quizAverage: 88, lessonsCompleted: 18, totalLessons: 24, progress: 75 },
      { name: 'Node.js Backend Development', quizAverage: 85, lessonsCompleted: 12, totalLessons: 42, progress: 29 }
    ]
  },
  {
    id: '2',
    studentId: 'STU-2024-002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (206) 555-0186',
    location: 'Seattle, WA',
    avatar: '',
    enrolledCourses: 2,
    overallProgress: 45,
    lastActive: '1 day ago',
    status: 'active',
    courses: [
      { name: 'JavaScript - Zero to Hero', quizAverage: 76, lessonsCompleted: 48, totalLessons: 68, progress: 71 },
      { name: 'Python for Web Development', quizAverage: 82, lessonsCompleted: 15, totalLessons: 35, progress: 43 }
    ]
  },
  {
    id: '3',
    studentId: 'STU-2024-003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (512) 555-0119',
    location: 'Austin, TX',
    avatar: '',
    enrolledCourses: 4,
    overallProgress: 92,
    lastActive: '3 hours ago',
    status: 'active',
    courses: [
      { name: 'React - The Complete Guide', quizAverage: 95, lessonsCompleted: 52, totalLessons: 52, progress: 100 },
      { name: 'TypeScript Masterclass', quizAverage: 91, lessonsCompleted: 24, totalLessons: 24, progress: 100 },
      { name: 'JavaScript - Zero to Hero', quizAverage: 89, lessonsCompleted: 68, totalLessons: 68, progress: 100 },
      { name: 'React Native Mobile Apps', quizAverage: 87, lessonsCompleted: 25, totalLessons: 28, progress: 89 }
    ]
  },
  {
    id: '4',
    studentId: 'STU-2024-004',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (303) 555-0164',
    location: 'Denver, CO',
    avatar: '',
    enrolledCourses: 1,
    overallProgress: 15,
    lastActive: '5 days ago',
    status: 'inactive',
    courses: [
      { name: 'Python for Web Development', quizAverage: 65, lessonsCompleted: 5, totalLessons: 35, progress: 14 }
    ]
  },
  {
    id: '5',
    studentId: 'STU-2024-005',
    name: 'Jessica Williams',
    email: 'jessica.williams@email.com',
    phone: '+1 (404) 555-0131',
    location: 'Atlanta, GA',
    avatar: '',
    enrolledCourses: 2,
    overallProgress: 63,
    lastActive: '6 hours ago',
    status: 'active',
    courses: [
      { name: 'Node.js Backend Development', quizAverage: 79, lessonsCompleted: 28, totalLessons: 42, progress: 67 },
      { name: 'React - The Complete Guide', quizAverage: 83, lessonsCompleted: 35, totalLessons: 52, progress: 67 }
    ]
  },
  {
    id: '6',
    studentId: 'STU-2024-006',
    name: 'James Anderson',
    email: 'james.anderson@email.com',
    phone: '+1 (617) 555-0175',
    location: 'Boston, MA',
    avatar: '',
    enrolledCourses: 3,
    overallProgress: 34,
    lastActive: '2 days ago',
    status: 'active',
    courses: [
      { name: 'JavaScript - Zero to Hero', quizAverage: 72, lessonsCompleted: 22, totalLessons: 68, progress: 32 },
      { name: 'React - The Complete Guide', quizAverage: 68, lessonsCompleted: 10, totalLessons: 52, progress: 19 },
      { name: 'TypeScript Masterclass', quizAverage: 75, lessonsCompleted: 8, totalLessons: 24, progress: 33 }
    ]
  },
  {
    id: '7',
    studentId: 'STU-2024-007',
    name: 'Amanda Taylor',
    email: 'amanda.taylor@email.com',
    phone: '+1 (312) 555-0108',
    location: 'Chicago, IL',
    avatar: '',
    enrolledCourses: 2,
    overallProgress: 88,
    lastActive: '1 hour ago',
    status: 'active',
    courses: [
      { name: 'React Native Mobile Apps', quizAverage: 94, lessonsCompleted: 26, totalLessons: 28, progress: 93 },
      { name: 'Python for Web Development', quizAverage: 90, lessonsCompleted: 32, totalLessons: 35, progress: 91 }
    ]
  },
  {
    id: '8',
    studentId: 'STU-2024-008',
    name: 'Robert Martinez',
    email: 'robert.martinez@email.com',
    phone: '+1 (602) 555-0157',
    location: 'Phoenix, AZ',
    avatar: '',
    enrolledCourses: 1,
    overallProgress: 5,
    lastActive: '1 week ago',
    status: 'inactive',
    courses: [
      { name: 'JavaScript - Zero to Hero', quizAverage: 55, lessonsCompleted: 3, totalLessons: 68, progress: 4 }
    ]
  }
]

// Summary stats
const summaryStats = [
  {
    title: 'Total Active Students',
    value: '1,247',
    change: '+12%',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Completion Rate',
    value: '68%',
    change: '+5%',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Recent Certifications',
    value: '89',
    change: '+18%',
    icon: Award,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10'
  }
]

interface StudentFormState {
  name: string
  email: string
  phone: string
  location: string
  status: Student['status']
}

const defaultStudentForm: StudentFormState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  status: 'active'
}

export default function AdminStudents() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [isStudentSheetOpen, setIsStudentSheetOpen] = useState(false)
  const [studentSheetMode, setStudentSheetMode] = useState<'create' | 'edit'>('create')
  const [studentForm, setStudentForm] = useState<StudentFormState>(defaultStudentForm)
  const [studentPendingDelete, setStudentPendingDelete] = useState<Student | null>(null)
  const studentsPerPage = 5

  const stopRowNavigation = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  const openCreateStudentSheet = () => {
    setStudentSheetMode('create')
    setStudentForm(defaultStudentForm)
    setIsStudentSheetOpen(true)
  }

  const openEditStudentSheet = (student: Student) => {
    setStudentSheetMode('edit')
    setStudentForm({
      name: student.name,
      email: student.email,
      phone: student.phone ?? '',
      location: student.location ?? '',
      status: student.status
    })
    setIsStudentSheetOpen(true)
  }

  const closeStudentSheet = () => {
    setIsStudentSheetOpen(false)
  }

  const handleSheetOpenChange = (open: boolean) => {
    setIsStudentSheetOpen(open)
  }

  const handleStudentFormChange = (field: keyof StudentFormState, value: string) => {
    setStudentForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const openDeleteConfirmation = (student: Student) => {
    setStudentPendingDelete(student)
  }

  const closeDeleteConfirmation = () => {
    setStudentPendingDelete(null)
  }

  // Filter students based on search
  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        <header className="app-page-header">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="app-page-heading">
                <Users className="app-page-title-icon" />
                <h1 className="app-page-title text-black">
                  Student Management
                </h1>
              </div>
              <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                Track, filter, and manage student progress
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-semibold shadow-none dark:border-zinc-700">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Sheet open={isStudentSheetOpen} onOpenChange={handleSheetOpenChange}>
                <Button className="h-11 rounded-xl px-5 font-semibold" onClick={openCreateStudentSheet}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Student
                </Button>
                <SheetContent side="right" className="flex w-full flex-col border-l border-slate-200 bg-white p-0 sm:max-w-[720px] dark:border-zinc-800 dark:bg-zinc-950">
                  <SheetHeader className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100/80 px-6 py-6 text-left dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <UserPlus className="h-7 w-7" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <SheetTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {studentSheetMode === 'edit' ? 'Edit Student Details' : 'Add New Student'}
                          </SheetTitle>
                          <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-primary">
                            {studentSheetMode === 'edit' ? 'Edit Mode' : 'Admin Access'}
                          </Badge>
                        </div>
                        <SheetDescription className="max-w-xl text-sm leading-6 text-slate-600 dark:text-zinc-400">
                          {studentSheetMode === 'edit'
                            ? 'Update the selected student profile details without leaving the directory.'
                            : 'Create a new learner profile with the core contact and enrollment details required for onboarding.'}
                        </SheetDescription>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          Full Name
                        </Label>
                        <div className="relative">
                          <UserPlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="name"
                            placeholder="Enter full name"
                            value={studentForm.name}
                            onChange={(e) => handleStudentFormChange('name', e.target.value)}
                            className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            value={studentForm.email}
                            onChange={(e) => handleStudentFormChange('email', e.target.value)}
                            className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="phone"
                            placeholder="Enter phone number"
                            value={studentForm.phone}
                            onChange={(e) => handleStudentFormChange('phone', e.target.value)}
                            className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="location" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          Location
                        </Label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="location"
                            placeholder="Enter location"
                            value={studentForm.location}
                            onChange={(e) => handleStudentFormChange('location', e.target.value)}
                            className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="status" className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                          Account Status
                        </Label>
                        <Select
                          value={studentForm.status}
                          onValueChange={(value: Student['status']) => handleStudentFormChange('status', value)}
                        >
                          <SelectTrigger id="status" className="h-12 rounded-2xl border-slate-200 shadow-none dark:border-zinc-700">
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
                      <Button variant="outline" className="h-11 rounded-xl border-slate-200 px-5 font-semibold shadow-none dark:border-zinc-700" onClick={closeStudentSheet}>
                        Cancel
                      </Button>
                      <Button className="h-11 rounded-xl px-5 font-semibold shadow-sm">
                        {studentSheetMode === 'edit' ? 'Save Changes' : 'Add Student'}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="app-kpi-label">{stat.title}</p>
                    <p className="app-kpi-value mt-1">{stat.value}</p>
                    <p className="app-kpi-subtext text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className={`app-kpi-icon-wrap ${stat.bgColor} border-0`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter & Action Bar */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-1 flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="h-11 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200 shadow-none dark:border-zinc-700 lg:w-[240px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="react">React - The Complete Guide</SelectItem>
                  <SelectItem value="javascript">JavaScript - Zero to Hero</SelectItem>
                  <SelectItem value="typescript">TypeScript Masterclass</SelectItem>
                  <SelectItem value="node">Node.js Backend Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-slate-200 shadow-none dark:border-zinc-700">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-slate-200 shadow-none dark:border-zinc-700">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 rounded-2xl border-slate-200 font-semibold shadow-none dark:border-zinc-700">
                    Bulk Actions
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export Selected</DropdownMenuItem>
                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                  <DropdownMenuItem>Deactivate Selected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <Card className="gap-0 overflow-hidden rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-zinc-800 md:px-6">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Student Directory</h2>
                <p className="text-sm text-muted-foreground">
                  Review enrollments, progress, and latest activity for each learner.
                </p>
              </div>
              <Badge variant="outline" className="w-fit rounded-full border-slate-200 bg-white px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                {filteredStudents.length} students
              </Badge>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/40">
                <TableHead className="font-semibold">Student ID</TableHead>
                <TableHead className="font-semibold">Student</TableHead>
                <TableHead className="font-semibold">Enrolled Courses</TableHead>
                <TableHead className="font-semibold">Overall Progress</TableHead>
                <TableHead className="font-semibold">Last Active</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map(student => (
                <TableRow
                  key={student.id}
                  className="cursor-pointer border-slate-200/80 transition-colors hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                  onClick={() => navigate(`/admin/students/${student.id}`)}
                >
                  <TableCell>
                    <span className="font-medium text-slate-700 dark:text-zinc-300">{student.studentId}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-slate-200 dark:border-zinc-700">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{student.enrolledCourses}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-[170px] items-center gap-3">
                      <Progress value={student.overallProgress} className="h-2" />
                      <span className="text-sm font-medium">{student.overallProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{student.lastActive}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={student.status === 'active'
                      ? 'rounded-full bg-green-500/90 text-white hover:bg-green-600'
                      : 'rounded-full bg-gray-500/90 text-white hover:bg-gray-600'
                    }>
                      {student.status === 'active' ? (
                        <><CheckCircle2 className="h-3 w-3 mr-1" /> Active</>
                      ) : (
                        <><XCircle className="h-3 w-3 mr-1" /> Inactive</>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={stopRowNavigation}>
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
                              navigate(`/admin/students/${student.id}`)
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              openEditStudentSheet(student)
                            }}
                          >
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              openDeleteConfirmation(student)
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

          <div className="flex flex-col gap-3 border-t border-slate-200 p-4 dark:border-zinc-800 md:flex-row md:items-center md:justify-between md:px-6">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * studentsPerPage + 1} to {Math.min(currentPage * studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="rounded-xl"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {studentPendingDelete ? (
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
                <XCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Delete Student
                </h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
                  Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{studentPendingDelete.name}</span>? This action cannot be undone.
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
                Delete Student
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
