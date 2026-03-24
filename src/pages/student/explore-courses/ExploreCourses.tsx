import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  Filter,
  Heart,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  Clock3,
  TrendingUp,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  price: number;
  duration: number;
  category: string;
  rating?: number;
  students?: number;
  description?: string;
}

const courseImages: Record<string, string> = {
  react:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  javascript:
    "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
  typescript:
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
  node:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  python:
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  "react-native":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
  frontend:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  "web dev":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
  "mobile app":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
  "backend dev":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  default:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
};

const getCategoryImage = (category: string): string => {
  return courseImages[category.toLowerCase()] || courseImages.default;
};

const getCourseImage = (course: { title: string; category: string }): string => {
  const titleLower = course.title.toLowerCase();
  const categoryLower = course.category.toLowerCase();

  if (titleLower.includes("react") && !titleLower.includes("native")) return courseImages.react;
  if (titleLower.includes("javascript")) return courseImages.javascript;
  if (titleLower.includes("typescript")) return courseImages.typescript;
  if (titleLower.includes("node")) return courseImages.node;
  if (titleLower.includes("python")) return courseImages.python;
  if (titleLower.includes("native")) return courseImages["react-native"];
  if (titleLower.includes("frontend") || titleLower.includes("front-end")) return courseImages.frontend;
  if (titleLower.includes("backend") || titleLower.includes("back-end")) return courseImages["backend dev"];
  if (titleLower.includes("web")) return courseImages["web dev"];
  if (titleLower.includes("mobile")) return courseImages["mobile app"];

  return courseImages[categoryLower] || courseImages.default;
};

const mockCourses: Course[] = [
  {
    id: 1,
    title: "React - The Complete Guide",
    instructor: "Maximilian Schwarzmuller",
    image: getCourseImage({ title: "React - The Complete Guide", category: "coding" }),
    price: 89,
    duration: 52,
    category: "coding",
    rating: 4.9,
    students: 125000,
    description: "Master React.js including Hooks, Redux, routing, and production patterns.",
  },
  {
    id: 2,
    title: "JavaScript - Zero to Hero",
    instructor: "Brad Traversy",
    image: getCourseImage({ title: "JavaScript - Zero to Hero", category: "web" }),
    price: 99,
    duration: 68,
    category: "web",
    rating: 4.8,
    students: 98000,
    description: "Build strong JavaScript fundamentals and apply them in real projects.",
  },
  {
    id: 3,
    title: "TypeScript Masterclass",
    instructor: "Sarah Drasner",
    image: getCourseImage({ title: "TypeScript Masterclass", category: "coding" }),
    price: 79,
    duration: 24,
    category: "coding",
    rating: 4.7,
    students: 45000,
    description: "Level up with advanced types, generics, safer APIs, and architecture tips.",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    instructor: "Maximilian Schwarzmuller",
    image: getCourseImage({ title: "Node.js Backend Development", category: "backend" }),
    price: 119,
    duration: 42,
    category: "backend",
    rating: 4.8,
    students: 67000,
    description: "Design REST APIs, authentication flows, and scalable server-side apps.",
  },
  {
    id: 5,
    title: "React Native Mobile Apps",
    instructor: "Brad Traversy",
    image: getCourseImage({ title: "React Native Mobile Apps", category: "mobile" }),
    price: 69,
    duration: 28,
    category: "mobile",
    rating: 4.6,
    students: 32000,
    description: "Create cross-platform mobile apps with modern React Native workflows.",
  },
  {
    id: 6,
    title: "Python for Web Development",
    instructor: "Jose Portilla",
    image: getCourseImage({ title: "Python for Web Development", category: "backend" }),
    price: 59,
    duration: 35,
    category: "web",
    rating: 4.8,
    students: 156000,
    description: "Learn Python and Django to build practical web applications quickly.",
  },
];

const categories = [
  { name: "coding", label: "Frontend" },
  { name: "web", label: "Web Dev" },
  { name: "mobile", label: "Mobile" },
  { name: "backend", label: "Backend" },
];

const RangeSlider = ({
  value,
  onValueChange,
  max = 100,
  step = 1,
  label,
  prefix = "",
  suffix = "",
  compact = false,
}: {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  max?: number;
  step?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
}) => {
  const handleMinChange = (newMin: number) =>
    onValueChange([newMin, Math.max(newMin, value[1])]);
  const handleMaxChange = (newMax: number) =>
    onValueChange([Math.min(newMax, value[0]), newMax]);

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-medium text-slate-700 dark:text-zinc-200">
          {label}
        </Label>
        <span className="text-xs font-medium text-primary">
          {prefix}
          {value[0]}
          {suffix} - {prefix}
          {value[1]}
          {suffix}
        </span>
      </div>

      <div className={`rounded-2xl bg-slate-100 dark:bg-zinc-800 ${compact ? "px-3 py-2.5" : "px-3 py-3"}`}>
        <div className="relative h-2 rounded-full bg-slate-200 dark:bg-zinc-700">
          <div
            className="absolute h-2 rounded-full bg-primary"
            style={{
              left: `${(value[0] / max) * 100}%`,
              right: `${100 - (value[1] / max) * 100}%`,
            }}
          />
        </div>
        <div className={`${compact ? "mt-2" : "mt-3"} flex gap-3`}>
          <input
            type="range"
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-transparent accent-primary"
            min="0"
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
          />
          <input
            type="range"
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-transparent accent-primary"
            min="0"
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

const CourseCardSkeleton = () => (
  <div className="animate-pulse space-y-4 rounded-3xl border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
    <div className="h-44 rounded-2xl bg-muted" />
    <div className="h-5 w-3/4 rounded bg-muted" />
    <div className="h-4 w-1/2 rounded bg-muted" />
    <div className="h-4 w-full rounded bg-muted" />
  </div>
);

export default function ExploreCourses() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    price: [number, number];
    duration: [number, number];
  }>({
    price: [0, 150],
    duration: [0, 80],
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading] = useState(false);

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        course.price >= filters.price[0] && course.price <= filters.price[1];
      const matchesDuration =
        course.duration >= filters.duration[0] &&
        course.duration <= filters.duration[1];
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(course.category);

      return (
        matchesSearch &&
        matchesPrice &&
        matchesDuration &&
        matchesCategory
      );
    });
  }, [searchTerm, filters, selectedCategories]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setFilters({ price: [0, 150], duration: [0, 80] });
    setSelectedCategories([]);
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        <div className="space-y-8">
          <header className="space-y-4">
            <div className="app-page-heading">
              <BookOpen className="app-page-title-icon" />
              <h1 className="app-page-title">Explore Courses</h1>
            </div>
            <p className="max-w-3xl text-base text-slate-600 dark:text-zinc-300">
              Discover curated learning paths, compare course outcomes, and enroll in
              programs that match your goals and skill level.
            </p>
          </header>

          <section className="space-y-6">
            <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <CardContent className="space-y-4 p-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex w-full gap-3 xl:max-w-xl">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search by title, instructor, or category"
                        className="h-11 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-11 rounded-2xl px-3"
                      onClick={() => setShowFilters((prev) => !prev)}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-zinc-700 dark:text-zinc-400">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>{filteredCourses.length} results</span>
                    </div>
                    <Button onClick={clearFilters} variant="outline" className="h-10 rounded-full px-4 font-semibold">
                      <X className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </div>

                {showFilters && (
                  <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-zinc-700">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
                        <Filter className="h-4 w-4 text-primary" />
                        Categories
                      </div>
                      {categories.map((cat) => (
                        <Badge
                          key={cat.name}
                          variant={selectedCategories.includes(cat.name) ? "default" : "outline"}
                          className={`cursor-pointer rounded-full px-3 py-1 ${
                            selectedCategories.includes(cat.name) ? "bg-primary text-white" : ""
                          }`}
                          onClick={() => toggleCategory(cat.name)}
                        >
                          {cat.label}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-800/40">
                        <RangeSlider
                          compact
                          value={filters.price}
                          onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, price: value }))
                          }
                          max={150}
                          label="Price"
                          prefix="$"
                        />
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 dark:border-zinc-700 dark:bg-zinc-800/40">
                        <RangeSlider
                          compact
                          value={filters.duration}
                          onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, duration: value }))
                          }
                          max={80}
                          label="Duration"
                          suffix="h"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Available Courses
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">
                      Compare course levels, instructors, and learning outcomes before you enroll.
                    </p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <CourseCardSkeleton key={i} />
                      ))}
                  </div>
                ) : filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        <CardContent className="px-0 py-0">
                          <div className="relative">
                            <img
                              src={course.image || getCategoryImage(course.category)}
                              alt={course.title}
                              className="h-52 w-full object-cover transition-all duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                            <div className="absolute right-3 top-3">
                              <button
                                className="rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Heart className="h-4 w-4 text-slate-500 hover:text-rose-500" />
                              </button>
                            </div>

                            <div className="absolute bottom-3 left-3">
                              <div className="rounded-2xl bg-white px-3 py-2 shadow-sm">
                                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                  Price
                                </span>
                                <div className="text-lg font-bold text-primary">${course.price}</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4 p-5">
                            <div className="space-y-2">
                              <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                                {course.title}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-zinc-400">
                                by <span className="font-medium text-slate-900 dark:text-white">{course.instructor}</span>
                              </p>
                              <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                                {course.description || "Learn professional skills from industry experts."}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-zinc-700 dark:text-zinc-400">
                              <span className="inline-flex items-center gap-1.5">
                                <Clock3 className="h-4 w-4" />
                                {course.duration}h
                              </span>
                              {course.rating && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                  {course.rating}
                                </span>
                              )}
                              {course.students && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Users className="h-4 w-4" />
                                  {course.students >= 1000
                                    ? `${(course.students / 1000).toFixed(1)}k`
                                    : course.students}
                                </span>
                              )}
                            </div>

                            <Button
                              className="w-full font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/course/${course.id}`);
                              }}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Enroll Now
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="gap-0 rounded-3xl border border-dashed border-slate-300 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <CardContent className="space-y-6 p-10 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                        <Search className="h-10 w-10 text-primary" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                          No courses found
                        </h3>
                        <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-zinc-400">
                          We could not find any courses matching your current filters. Try broadening
                          your search or clearing a few filters.
                        </p>
                      </div>
                      <Button onClick={clearFilters} size="lg" className="font-semibold shadow-sm">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Reset Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
