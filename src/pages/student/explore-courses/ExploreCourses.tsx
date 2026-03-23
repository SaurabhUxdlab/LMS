import React, { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, X, Clock, DollarSign, ChevronRight, BookOpen, Users, Star, Sparkles, Heart, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Course interface
interface Course {
  id: number
  title: string
  instructor: string
  image: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  duration: number
  category: string
  rating?: number
  students?: number
  description?: string
}

// Course images from public folder
const courseImages: Record<string, string> = {
  coding: '/electrical.jpg',
  marketing: '/plumbing.jpg',
  design: '/hvac.jpg',
  business: '/carpet-cleaning.jpg',
  default: '/electrical.jpg'
}

const getCategoryImage = (category: string): string => {
  return courseImages[category] || courseImages.default
}

// Mock data with better images
const mockCourses: Course[] = [
  { id: 1, title: 'Electrical Fundamentals', instructor: 'Max Johnson', image: courseImages.coding, level: 'beginner', price: 89, duration: 32, category: 'coding', rating: 4.8, students: 1250, description: 'Master the basics of electrical systems' },
  { id: 2, title: 'Plumbing Mastery', instructor: 'Brad Williams', image: courseImages.marketing, level: 'intermediate', price: 99, duration: 45, category: 'marketing', rating: 4.6, students: 890, description: 'Complete plumbing guide' },
  { id: 3, title: 'HVAC Systems', instructor: 'Sarah Chen', image: courseImages.design, level: 'beginner', price: 79, duration: 22, category: 'design', rating: 4.9, students: 2100, description: ' Heating and cooling systems' },
  { id: 4, title: 'Carpentry Basics', instructor: 'Chris Haroun', image: courseImages.business, level: 'advanced', price: 119, duration: 65, category: 'business', rating: 4.7, students: 650, description: 'Woodworking for beginners' },
  { id: 5, title: 'Interior Painting', instructor: 'Brad Traversy', image: courseImages.coding, level: 'advanced', price: 69, duration: 28, category: 'coding', rating: 4.5, students: 420, description: 'Professional painting techniques' },
  { id: 6, title: 'Flooring Installation', instructor: 'Design School', image: courseImages.design, level: 'intermediate', price: 59, duration: 18, category: 'design', rating: 4.8, students: 780, description: 'Install any floor type' }
]

const categories = [
  { name: 'coding', label: 'Electrical', icon: '⚡' },
  { name: 'marketing', label: 'Plumbing', icon: '🔧' },
  { name: 'design', label: 'HVAC', icon: '❄️' },
  { name: 'business', label: 'Carpentry', icon: '🪵' }
]

const getLevelLabel = (level: Course['level']): string => {
  const labels: Record<Course['level'], string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }
  return labels[level]
}

const getLevelColor = (level: Course['level']): string => {
  const colors: Record<Course['level'], string> = {
    beginner: 'bg-green-500/90',
    intermediate: 'bg-amber-500/90',
    advanced: 'bg-red-500/90'
  }
  return colors[level]
}

// Custom Range Slider
const RangeSlider = ({
  value,
  onValueChange,
  max = 100,
  step = 1,
  label,
  unit = ''
}: {
  value: [number, number]
  onValueChange: (value: [number, number]) => void
  max?: number
  step?: number
  label: string
  unit?: string
}) => {
  const handleMinChange = (newMin: number) => onValueChange([newMin, Math.max(newMin, value[1])])
  const handleMaxChange = (newMax: number) => onValueChange([Math.min(newMax, value[0]), newMax])

  return (
    <div>
      <Label className="text-sm font-semibold mb-3 block text-foreground">
        {label}: <span className="text-primary">${value[0]} - ${value[1]}</span>
      </Label>
      <div className="space-y-3">
        <div className="relative h-2 bg-muted rounded-full">
          <div
            className="absolute h-2 bg-gradient-to-r from-primary to-primary/70 rounded-full"
            style={{
              left: `${(value[0] / max) * 100}%`,
              right: `${100 - (value[1] / max) * 100}%`
            }}
          />
        </div>
        <div className="flex gap-3">
          <input
            type="range"
            className="flex-1 h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-primary"
            min="0"
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
          />
          <input
            type="range"
            className="flex-1 h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-primary"
            min="0"
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

// Custom Level Filter 
const LevelFilter = ({
  value,
  onValueChange
}: {
  value: Course['level'] | ''
  onValueChange: (value: Course['level'] | '') => void
}) => (
  <div className="space-y-2">
    {(['', 'beginner', 'intermediate', 'advanced'] as const).map(level => (
      <button
        key={level}
        className={`w-full p-3 rounded-xl border-2 flex items-center gap-3 transition-all hover:shadow-md ${value === level
          ? 'border-primary bg-primary/10 text-primary shadow-sm'
          : 'border-transparent hover:border-primary/30 bg-muted/30'
          }`}
        onClick={() => onValueChange(level)}
      >
        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${value === level ? 'border-primary bg-primary' : 'border-muted-foreground'
          }`}>
          {value === level && <div className="w-2 h-2 bg-background rounded-full" />}
        </div>
        <span className="font-medium capitalize">{level || 'All Levels'}</span>
      </button>
    ))}
  </div>
)

// Loading Skeleton
const CourseCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-56 bg-muted rounded-2xl mb-4" />
    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
    <div className="h-4 bg-muted rounded w-1/2" />
  </div>
)

export default function ExploreCourses() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<{
    price: [number, number]
    duration: [number, number]
    level: Course['level'] | ''
  }>({
    price: [0, 150],
    duration: [0, 80],
    level: ''
  })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading] = useState(false)

  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPrice = course.price >= filters.price[0] && course.price <= filters.price[1]
      const matchesDuration = course.duration >= filters.duration[0] && course.duration <= filters.duration[1]
      const matchesLevel = !filters.level || course.level === filters.level
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)

      return matchesSearch && matchesPrice && matchesDuration && matchesLevel && matchesCategory
    })
  }, [searchTerm, filters, selectedCategories])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setFilters({ price: [0, 150], duration: [0, 80], level: '' })
    setSelectedCategories([])
  }, [])

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Explore Courses
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Discover your next skill and start learning today
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">{mockCourses.length}</span>
              <span>Courses</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">{mockCourses.reduce((acc, c) => acc + (c.students || 0), 0).toLocaleString()}</span>
              <span>Students</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="font-semibold">4.7</span>
              <span>Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Filters Sidebar */}
          <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky lg:top-8">
            <Card className="shadow-xl border-0 rounded-3xl overflow-hidden bg-card">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                  <div className="p-2 bg-primary/20 rounded-xl">
                    <Filter className="h-5 w-5 text-primary" />
                  </div>
                  Filters
                </h2>
              </div>
              <CardContent className="p-6 pt-4 space-y-6">
                <RangeSlider
                  value={filters.price}
                  onValueChange={value => setFilters(prev => ({ ...prev, price: value }))}
                  max={150}
                  label="Price Range"
                />

                <RangeSlider
                  value={filters.duration}
                  onValueChange={value => setFilters(prev => ({ ...prev, duration: value }))}
                  max={80}
                  label="Duration"
                  unit="h"
                />

                <div>
                  <Label className="text-sm font-semibold mb-4 block text-foreground">Experience Level</Label>
                  <LevelFilter
                    value={filters.level}
                    onValueChange={value => setFilters(prev => ({ ...prev, level: value }))}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-sm font-semibold mb-4 block text-foreground">Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <Badge
                        key={cat.name}
                        variant={selectedCategories.includes(cat.name) ? "default" : "outline"}
                        className={`px-4 py-2 cursor-pointer hover:scale-105 transition-all border-2 font-semibold ${selectedCategories.includes(cat.name)
                          ? 'bg-primary border-primary'
                          : 'border-transparent hover:border-primary/50 bg-muted/50'
                          }`}
                        onClick={() => toggleCategory(cat.name)}
                      >
                        <span className="mr-1.5">{cat.icon}</span>
                        {cat.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={clearFilters} className="w-full font-bold" variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, instructors..."
                    className="h-14 pl-14 pr-4 shadow-lg border-2 border-transparent focus:border-primary rounded-2xl"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 text-muted-foreground bg-muted/30 px-4 py-2 rounded-xl">
                  <span className="font-semibold">{filteredCourses.length}</span>
                  <span>courses found</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <section>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <Card
                      key={course.id}
                      className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full bg-card"
                      onClick={() => navigate(`/student/course/${course.id}`)}
                    >
                      {/* Image Section */}
                      <div className="relative h-52 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                        <img
                          src={course.image || getCategoryImage(course.category)}
                          alt={course.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                          <Badge className={`${getLevelColor(course.level)} text-white font-bold text-xs px-3 py-1 shadow-lg`}>
                            {getLevelLabel(course.level)}
                          </Badge>
                          <div className="flex gap-1">
                            <button
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                            </button>
                          </div>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute bottom-3 left-3">
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                            <span className="font-black text-xl text-primary">${course.price}</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-5 pt-4">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs font-medium uppercase">
                            {course.category}
                          </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>

                        {/* Instructor */}
                        <p className="text-muted-foreground text-sm mb-3">
                          by <span className="font-semibold text-foreground">{course.instructor}</span>
                        </p>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {course.description || 'Learn professional skills from industry experts'}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium text-sm">{course.duration}h</span>
                          </div>
                          {course.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="font-bold text-sm">{course.rating}</span>
                            </div>
                          )}
                          {course.students && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span className="font-medium text-sm">{course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students}</span>
                            </div>
                          )}
                        </div>

                        {/* Enroll Button */}
                        <Button
                          className="w-full mt-4 font-bold group-hover:scale-[1.02] transition-transform"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/student/course/${course.id}`)
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Enroll Now
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-muted bg-gradient-to-br from-muted/20 to-background">
                  <CardContent className="text-center py-20">
                    <div className="w-28 h-28 mx-auto mb-6 bg-primary/10 rounded-3xl flex items-center justify-center">
                      <Search className="h-14 w-14 text-primary" />
                    </div>
                    <h3 className="text-3xl font-black mb-4">No courses found</h3>
                    <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                      We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
                    </p>
                    <Button onClick={clearFilters} size="lg" className="font-bold shadow-lg">
                      <X className="h-5 w-5 mr-2" />
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
