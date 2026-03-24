import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail?: string;
  progress: number;
  lastLesson?: string;
  duration?: string;
  lessons?: number;
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
  default:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
};

const getCourseImage = (course: { id: string; title?: string }): string => {
  const titleLower = course.title?.toLowerCase() || "";

  if (titleLower.includes("react") && !titleLower.includes("native")) return courseImages.react;
  if (titleLower.includes("javascript")) return courseImages.javascript;
  if (titleLower.includes("typescript")) return courseImages.typescript;
  if (titleLower.includes("node")) return courseImages.node;
  if (titleLower.includes("python")) return courseImages.python;
  if (titleLower.includes("native")) {
    return "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop";
  }

  return courseImages[course.id] || courseImages.default;
};

const LoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="animate-pulse space-y-3">
      <div className="h-10 w-64 rounded bg-muted" />
      <div className="h-5 w-96 rounded bg-muted" />
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted animate-pulse" />
        ))}
    </div>
  </div>
);

export const MyCourses = () => {
  const navigate = useNavigate();
  const [isLoading] = useState(false);

  const courses: Course[] = [
    {
      id: "1",
      title: "React - The Complete Guide",
      instructor: "Maximilian Schwarzmuller",
      thumbnail: getCourseImage({ id: "1", title: "React - The Complete Guide" }),
      progress: 67,
      lastLesson: "React Hooks - useState",
      duration: "52 hours",
      lessons: 178,
    },
    {
      id: "2",
      title: "JavaScript - Zero to Hero",
      instructor: "Brad Traversy",
      thumbnail: getCourseImage({ id: "2", title: "JavaScript - Zero to Hero" }),
      progress: 45,
      lastLesson: "DOM Manipulation",
      duration: "68 hours",
      lessons: 220,
    },
    {
      id: "3",
      title: "TypeScript Masterclass",
      instructor: "Sarah Drasner",
      thumbnail: getCourseImage({ id: "3", title: "TypeScript Masterclass" }),
      progress: 100,
      lastLesson: "Advanced Types",
      duration: "24 hours",
      lessons: 86,
    },
  ];

  if (isLoading) return <LoadingSkeleton />;

  const inProgress = courses.filter((course) => course.progress < 100);
  const completed = courses.filter((course) => course.progress === 100);

  const continueCourse =
    inProgress.length > 0
      ? inProgress.reduce((prev, current) => (prev.progress > current.progress ? prev : current))
      : undefined;

  const handleResume = (id: string) => navigate(`/course/${id}`);
  const handleCertificate = () => navigate("/certificates");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        <div className="space-y-8">
          <header className="space-y-3">
            <div className="app-page-heading">
              <GraduationCap className="app-page-title-icon" />
              <h1 className="app-page-title">My Learning</h1>
            </div>
            <p className="max-w-2xl text-base text-slate-600 dark:text-zinc-300">
              Track active courses, continue where you left off, and review your completed
              learning milestones in one place.
            </p>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="app-kpi-row">
                  <div>
                    <p className="app-kpi-label">Total Courses</p>
                    <p className="app-kpi-value mt-1">{courses.length}</p>
                    <p className="app-kpi-subtext">All enrolled programs</p>
                  </div>
                  <div className="app-kpi-icon-wrap">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="app-kpi-row">
                  <div>
                    <p className="app-kpi-label">In Progress</p>
                    <p className="app-kpi-value mt-1">{inProgress.length}</p>
                    <p className="app-kpi-subtext">Currently active</p>
                  </div>
                  <div className="app-kpi-icon-wrap">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="app-kpi-row">
                  <div>
                    <p className="app-kpi-label">Completed</p>
                    <p className="app-kpi-value mt-1">{completed.length}</p>
                    <p className="app-kpi-subtext">Certificates ready</p>
                  </div>
                  <div className="app-kpi-icon-wrap">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {continueCourse && (
            <section>
              <Card className="gap-0 overflow-hidden border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="px-0 py-0">
                  <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                      <img
                        src={continueCourse.thumbnail}
                        alt={continueCourse.title}
                        className="h-64 w-full object-cover lg:h-full"
                      />
                    </div>

                    <div className="space-y-5 p-6">
                      <div className="space-y-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 font-medium">
                          Continue Learning
                        </Badge>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                          {continueCourse.title}
                        </h2>
                        <p className="text-sm leading-6 text-slate-600 dark:text-zinc-300">
                          Pick up from your latest lesson and keep your learning momentum
                          going with a focused study session.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700 dark:text-zinc-200">
                            Progress
                          </span>
                          <span className="font-semibold text-primary">
                            {continueCourse.progress}%
                          </span>
                        </div>
                        <Progress value={continueCourse.progress} className="mt-3 h-2" />
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-zinc-400">
                          <span>{continueCourse.lastLesson}</span>
                          <span>{continueCourse.duration}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          className="font-semibold"
                          onClick={() => handleResume(continueCourse.id)}
                        >
                          Resume Course
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="font-semibold">
                          View Course Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {inProgress.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    In Progress
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-zinc-400">
                    Courses you are actively working through right now.
                  </p>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1 font-semibold">
                  {inProgress.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {inProgress.map((course) => (
                  <Card
                    key={course.id}
                    className="gap-0 overflow-hidden border border-slate-200 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <CardContent className="px-0 py-0">
                      <div className="relative">
                        <img
                          src={course.thumbnail || "/vite.svg"}
                          alt={course.title}
                          className="h-44 w-full object-cover"
                        />
                        <Badge className="absolute right-3 top-3 bg-amber-500 text-white hover:bg-amber-500">
                          {course.progress}%
                        </Badge>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                            <Clock3 className="h-3.5 w-3.5" />
                            <span>{course.duration || "N/A"}</span>
                            <span>•</span>
                            <span>{course.lessons} lessons</span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {course.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-zinc-400">
                            {course.instructor}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700 dark:text-zinc-200">
                              Last lesson
                            </span>
                            <span className="text-slate-500 dark:text-zinc-400">
                              {course.lastLesson}
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <Button
                          variant="outline"
                          className="w-full font-semibold"
                          onClick={() => handleResume(course.id)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Completed
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-zinc-400">
                    Your finished courses and certificate-ready achievements.
                  </p>
                </div>
                <Badge className="rounded-full bg-green-600 px-3 py-1 font-semibold hover:bg-green-700">
                  {completed.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {completed.map((course) => (
                  <Card
                    key={course.id}
                    className="gap-0 overflow-hidden border border-slate-200 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <CardContent className="px-0 py-0">
                      <div className="relative">
                        <img
                          src={course.thumbnail || "/vite.svg"}
                          alt={course.title}
                          className="h-44 w-full object-cover"
                        />
                        <Badge className="absolute right-3 top-3 bg-green-600 text-white hover:bg-green-600">
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                          Completed
                        </Badge>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                            <Clock3 className="h-3.5 w-3.5" />
                            <span>{course.duration || "N/A"}</span>
                            <span>•</span>
                            <span>{course.lessons} lessons</span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {course.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-zinc-400">
                            {course.instructor}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900/60 dark:bg-green-950/20 dark:text-green-300">
                          Certificate available for this course.
                        </div>

                        <Button className="w-full bg-green-600 font-semibold hover:bg-green-700" onClick={handleCertificate}>
                          <Award className="mr-2 h-4 w-4" />
                          View Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {courses.length === 0 && !isLoading && (
            <Card className="mx-auto max-w-2xl gap-0 border border-dashed border-slate-300 py-0 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <CardContent className="space-y-6 p-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    No courses yet
                  </h3>
                  <p className="mx-auto max-w-lg text-base text-slate-600 dark:text-zinc-400">
                    Start your learning journey today by exploring our course catalog and
                    enrolling in a program that matches your goals.
                  </p>
                </div>
                <Button size="lg" className="font-semibold shadow-sm" asChild>
                  <a href="/explore-courses">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Browse Courses
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
