import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Award, Clock, BookOpen, ChevronRight, GraduationCap, TrendingUp, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Course {
  id: string
  title: string
  instructor: string
  thumbnail?: string
  progress: number
  lastLesson?: string
  duration?: string
  lessons?: number
}

// Real course images - mapped by course title/id
const courseImages: Record<string, string> = {
  '1': '/src/assets/react.svg',
  '2': '/vite.svg',
  '3': '/vite.svg',
  '4': '/vite.svg',
  '5': '/vite.svg',
  'react': '/src/assets/react.svg',
  'javascript': '/vite.svg',
  'typescript': '/vite.svg',
  'node': '/vite.svg',
  'python': '/vite.svg',
  'default': '/vite.svg'
}

// Get image based on course title or id
const getCourseImage = (course: { id: string; title?: string }): string => {
  const titleLower = course.title?.toLowerCase() || ''

  if (titleLower.includes('react')) return courseImages['react']
  if (titleLower.includes('javascript')) return courseImages['javascript']
  if (titleLower.includes('typescript')) return courseImages['typescript']
  if (titleLower.includes('node')) return courseImages['node']
  if (titleLower.includes('python')) return courseImages['python']

  return courseImages[course.id] || courseImages.default
}

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="animate-pulse">
      <div className="h-10 bg-muted rounded w-64 mb-4" />
      <div className="h-5 bg-muted rounded w-96" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-56 bg-muted rounded-2xl animate-pulse" />
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded-full w-full" />
        </div>
      ))}
    </div>
  </div>
)

export const MyCourses = () => {
  const navigate = useNavigate()
  const [isLoading] = useState(false)

  const courses: Course[] = [
    {
      id: '1',
      title: 'React - The Complete Guide',
      instructor: 'Maximilian Schwarzmüller',
      thumbnail: getCourseImage({ id: '1', title: 'React - The Complete Guide' }),
      progress: 67,
      lastLesson: 'React Hooks - useState',
      duration: '52 hours',
      lessons: 178
    },
    {
      id: '2',
      title: 'JavaScript - Zero to Hero',
      instructor: 'Brad Traversy',
      thumbnail: getCourseImage({ id: '2', title: 'JavaScript - Zero to Hero' }),
      progress: 45,
      lastLesson: 'DOM Manipulation',
      duration: '68 hours',
      lessons: 220
    },
    {
      id: '3',
      title: 'TypeScript Masterclass',
      instructor: 'Sarah Drasner',
      thumbnail: getCourseImage({ id: '3', title: 'TypeScript Masterclass' }),
      progress: 100,
      lastLesson: 'Advanced Types',
      duration: '24 hours',
      lessons: 86
    },
  ]

  if (isLoading) return <LoadingSkeleton />

  const inProgress: Course[] = courses.filter((course: Course) => course.progress < 100)
  const completed: Course[] = courses.filter((course: Course) => course.progress === 100)

  const continueCourse: Course | undefined = inProgress.length > 0
    ? inProgress.reduce((prev: Course, current: Course) =>
      prev.progress > current.progress ? prev : current
    )
    : undefined

  const handleResume = (id: string) => navigate(`/course/${id}`)
  const handleCertificate = (id: string) => navigate(`/certificates`)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <div className="max-w-[1400px] mx-auto px-4 pb-12">

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                My Learning
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Continue your journey and track your progress across all enrolled courses
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Courses</p>
                  <p className="text-3xl font-black">{courses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-5 to-amber-10 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">In Progress</p>
                  <p className="text-3xl font-black">{inProgress.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-5 to-green-10 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Completed</p>
                  <p className="text-3xl font-black">{completed.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning - Featured Card */}
        {continueCourse && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Pick up where you left off</span>
            </div>
            <Card className="group border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-gradient-to-r from-card to-card/50 rounded-2xl">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="lg:w-2/5 relative overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <img
                    src={continueCourse.thumbnail || '/vite.svg'}
                    alt={continueCourse.title}
                    className="w-full h-56 lg:h-full min-h-[280px] object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-2xl lg:rounded-l-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm font-bold px-4 py-1.5 shadow-lg">
                    <Play className="h-3 w-3 mr-1.5" />
                    Continue Learning
                  </Badge>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-medium">
                      <Clock className="h-3 w-3 mr-1" />
                      {continueCourse.duration || 'N/A'}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-medium">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {continueCourse.lessons || 0} Lessons
                    </Badge>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-black mb-3 group-hover:text-primary transition-colors">
                    {continueCourse.title}
                  </h2>
                  <p className="text-muted-foreground font-medium mb-2">by {continueCourse.instructor}</p>

                  <div className="mb-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Last accessed:</span> {continueCourse.lastLesson || 'Latest lesson'}
                  </div>

                  <div className="my-6">
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>Your Progress</span>
                      <span className="text-primary">{continueCourse.progress}%</span>
                    </div>
                    <Progress
                      value={continueCourse.progress}
                      className="h-3 bg-muted/50"
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full font-bold text-lg shadow-lg hover:shadow-xl transition-all group-hover:scale-[1.02]"
                    onClick={() => handleResume(continueCourse.id)}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Resume Course
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* In Progress Courses */}
        {inProgress.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-black flex items-center gap-3">
                In Progress
              </h2>
              <Badge variant="secondary" className="text-sm font-bold px-3 py-1">{inProgress.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgress.map(course => (
                <Card
                  key={course.id}
                  className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 overflow-hidden bg-card cursor-pointer rounded-2xl"
                  onClick={() => handleResume(course.id)}
                >
                  <div className="relative h-40 overflow-hidden rounded-t-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                    <img
                      src={course.thumbnail || '/vite.svg'}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-sm font-semibold text-xs">
                      {course.progress}%
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration || 'N/A'}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{course.instructor}</p>

                    <div className="space-y-3">
                      <Progress
                        value={course.progress}
                        className="h-2 bg-muted/50"
                      />
                      <Button
                        variant="outline"
                        className="w-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleResume(course.id)
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Completed Courses */}
        {completed.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-black flex items-center gap-3">
                Completed
              </h2>
              <Badge className="text-sm font-bold px-3 py-1 bg-green-600 hover:bg-green-700">{completed.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map(course => (
                <Card
                  key={course.id}
                  className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 overflow-hidden bg-gradient-to-br from-green-5/30 to-card cursor-pointer rounded-2xl"
                  onClick={() => handleCertificate(course.id)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-40 overflow-hidden rounded-t-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-secondary/10" />
                      <img
                        src={course.thumbnail || '/vite.svg'}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-600/90 backdrop-blur-sm font-semibold text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration || 'N/A'}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-green-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{course.instructor}</p>

                    <Button
                      className="w-full font-semibold bg-green-600 hover:bg-green-700 transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCertificate(course.id)
                      }}
                    >
                      <Award className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {courses.length === 0 && !isLoading && (
          <Card className="max-w-2xl mx-auto text-center py-16 border-dashed bg-gradient-to-br from-muted/30 to-background">
            <CardContent>
              <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-black mb-4">No courses yet</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Start your learning journey today! Browse our catalog and enroll in courses that interest you.
              </p>
              <Button size="lg" className="font-bold shadow-lg" asChild>
                <a href="/explore-courses">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Browse Courses
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
