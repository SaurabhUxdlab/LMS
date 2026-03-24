import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  ClipboardCheck,
  Download,
  BookOpen,
  AlertCircle,
  Lock,
  GraduationCap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent 
} from '@/components/ui/accordion'

// ==================== Types ====================

interface Lesson {
  id: string
  title: string
  type: 'video' | 'document' | 'quiz'
  status: 'completed' | 'in_progress' | 'not_started'
  score?: number
  attempts?: number
}

interface Module {
  id: string
  title: string
  status: 'completed' | 'active' | 'locked'
  lessons: Lesson[]
}

interface StudentCourseData {
  studentId: string
  studentName: string
  studentAvatar: string
  studentEmail: string
  courseId: string
  courseTitle: string
  instructor: string
  enrollmentDate: string
  overallProgress: number
  currentModule: number
  totalModules: number
  timeSpent: string
  lastAccessed: string
  pendingAssignments: number
  modules: Module[]
}

// ==================== Mock Data ====================

const mockStudentCourseData: StudentCourseData = {
  studentId: '88291',
  studentName: 'Jane Doe',
  studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  studentEmail: 'jane.doe@example.com',
  courseId: 'course-001',
  courseTitle: 'Advanced UI Design',
  instructor: 'Sarah Mitchell',
  enrollmentDate: 'Jan 15, 2026',
  overallProgress: 74,
  currentModule: 3,
  totalModules: 5,
  timeSpent: '42h 30m',
  lastAccessed: 'Mar 20, 2026',
  pendingAssignments: 2,
  modules: [
    {
      id: 'module-1',
      title: 'Module 1: Fundamentals & Research',
      status: 'completed',
      lessons: [
        { id: 'l1', title: 'Introduction to UI Design', type: 'video', status: 'completed' },
        { id: 'l2', title: 'User Research Methods', type: 'video', status: 'completed' },
        { id: 'l3', title: 'Competitor Analysis', type: 'document', status: 'completed' },
        { id: 'l4', title: 'Fundamentals Quiz', type: 'quiz', status: 'completed', score: 95 }
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2: Design Systems & Typography',
      status: 'completed',
      lessons: [
        { id: 'l5', title: 'Introduction to Design Systems', type: 'video', status: 'completed' },
        { id: 'l6', title: 'Typography Fundamentals', type: 'video', status: 'completed' },
        { id: 'l7', title: 'Responsive Layout Principles', type: 'video', status: 'completed' },
        { id: 'l8', title: '8pt Grid System Deep Dive', type: 'document', status: 'completed' },
        { id: 'l9', title: 'Grids Knowledge Check', type: 'quiz', status: 'completed', score: 92 }
      ]
    },
    {
      id: 'module-3',
      title: 'Module 3: Color & Visual Design',
      status: 'active',
      lessons: [
        { id: 'l10', title: 'Color Theory Basics', type: 'video', status: 'completed' },
        { id: 'l11', title: 'Creating Color Palettes', type: 'video', status: 'completed' },
        { id: 'l12', title: 'Visual Hierarchy', type: 'document', status: 'in_progress' },
        { id: 'l13', title: 'Iconography & Illustrations', type: 'video', status: 'not_started' },
        { id: 'l14', title: 'Color & Visual Quiz', type: 'quiz', status: 'not_started' }
      ]
    },
    {
      id: 'module-4',
      title: 'Module 4: Interaction Design',
      status: 'locked',
      lessons: [
        { id: 'l15', title: 'Micro-interactions', type: 'video', status: 'not_started' },
        { id: 'l16', title: 'Motion Design Principles', type: 'video', status: 'not_started' },
        { id: 'l17', title: 'Animation in UI', type: 'document', status: 'not_started' },
        { id: 'l18', title: 'Interaction Design Project', type: 'quiz', status: 'not_started' }
      ]
    },
    {
      id: 'module-5',
      title: 'Module 5: Advanced Techniques',
      status: 'locked',
      lessons: [
        { id: 'l19', title: 'Designing for Accessibility', type: 'video', status: 'not_started' },
        { id: 'l20', title: 'Design handoff & Collaboration', type: 'video', status: 'not_started' },
        { id: 'l21', title: 'Portfolio Review', type: 'quiz', status: 'not_started' }
      ]
    }
  ]
}

// ==================== Components ====================

// Course Header Component
interface CourseHeaderProps {
  data: StudentCourseData
}

function CourseHeader({ data }: CourseHeaderProps) {
  const navigate = useNavigate()

  return (
    <Card className="border-0 shadow-lg rounded-xl">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left: Student Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={data.studentAvatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {data.studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="app-page-heading">
                <BookOpen className="app-page-title-icon" />
                <h1 className="app-page-title">{data.courseTitle}</h1>
              </div>
              <p className="text-muted-foreground">
                Student: {data.studentName} | ID: {data.studentId}
              </p>
            </div>
          </div>

          {/* Right: Overall Completion */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-4xl font-black text-primary">{data.overallProgress}%</div>
            <Progress value={data.overallProgress} className="w-48 h-2" />
            <p className="text-sm text-muted-foreground">
              Module {data.currentModule} of {data.totalModules} in progress
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/admin/students')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
      </CardContent>
    </Card>
  )
}

// Lesson Item Component
interface LessonItemProps {
  lesson: Lesson
}

function LessonItem({ lesson }: LessonItemProps) {
  const getIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <PlayCircle className="h-4 w-4 text-blue-500" />
      case 'document':
        return <FileText className="h-4 w-4 text-orange-500" />
      case 'quiz':
        return <ClipboardCheck className="h-4 w-4 text-purple-500" />
    }
  }

  const getStatusBadge = () => {
    switch (lesson.status) {
      case 'completed':
        return (
          <Badge className="bg-green-500/90 text-white hover:bg-green-600/90">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case 'in_progress':
        return (
          <Badge className="bg-blue-500/90 text-white hover:bg-blue-600/90">
            In Progress
          </Badge>
        )
      case 'not_started':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Not Started
          </Badge>
        )
    }
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="font-medium text-sm">{lesson.title}</span>
      </div>
      <div className="flex items-center gap-3">
        {lesson.score && (
          <Badge variant="secondary" className="font-semibold">
            Score: {lesson.score}%
          </Badge>
        )}
        {lesson.attempts && lesson.attempts > 1 && (
          <span className="text-xs text-muted-foreground">
            {lesson.attempts} attempts
          </span>
        )}
        {getStatusBadge()}
      </div>
    </div>
  )
}

// Module Accordion Component
interface ModuleAccordionProps {
  modules: Module[]
}

function ModuleAccordion({ modules }: ModuleAccordionProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'active':
        return <PlayCircle className="h-5 w-5 text-blue-500" />
      case 'locked':
        return <Lock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const completedCount = modules.filter(m => m.status === 'completed').length

  return (
    <Card className="border-0 shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Course Curriculum</CardTitle>
          <Badge variant="outline">
            {completedCount}/{modules.length} Completed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" defaultValue="module-3" collapsible className="w-full">
          {modules.map((module) => (
            <AccordionItem 
              key={module.id} 
              value={module.id}
              className={module.status === 'active' ? 'border-l-4 border-l-blue-500 pl-4 -ml-4' : ''}
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  {getStatusIcon(module.status)}
                  <div>
                    <span className="font-semibold">{module.title}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({module.lessons.filter(l => l.status === 'completed').length}/{module.lessons.length} lessons)
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <LessonItem key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

// Student Insights Component
interface StudentInsightsProps {
  data: StudentCourseData
}

function StudentInsights({ data }: StudentInsightsProps) {
  return (
    <Card className="border-0 shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Student Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time Spent</p>
            <p className="font-semibold">{data.timeSpent}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Accessed</p>
            <p className="font-semibold">{data.lastAccessed}</p>
          </div>
        </div>

        {data.pendingAssignments > 0 && (
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-orange-800 font-medium">
                {data.pendingAssignments} Pending Assignments
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Report Card Component
function ReportCard() {
  return (
    <Card className="border-0 shadow-lg rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h3 className="text-xl font-bold">Academic Report</h3>
          </div>
          <p className="text-blue-100 text-sm">
            Download a comprehensive progress report including grades, completed modules, 
            and performance metrics.
          </p>
          <Button 
            variant="secondary" 
            className="w-full bg-white text-blue-700 hover:bg-blue-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Progress Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Course Info Component
interface CourseInfoProps {
  data: StudentCourseData
}

function CourseInfo({ data }: CourseInfoProps) {
  return (
    <Card className="border-0 shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold">Course Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              SM
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Instructor</p>
            <p className="font-semibold">{data.instructor}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Enrollment Date</p>
            <p className="font-semibold">{data.enrollmentDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ==================== Main Component ====================

export default function StudentCourseDetail() {
  const data = mockStudentCourseData

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        {/* Top Header Card */}
        <CourseHeader data={data} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Course Curriculum */}
          <div className="lg:col-span-2">
            <ModuleAccordion modules={data.modules} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <StudentInsights data={data} />
            <ReportCard />
            <CourseInfo data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
