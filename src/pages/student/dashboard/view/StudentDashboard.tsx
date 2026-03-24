import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Target,
  Trophy,
} from "lucide-react";

const stats = [
  {
    label: "Enrolled Courses",
    value: "8",
    subtext: "2 active this week",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    label: "Completed",
    value: "3",
    subtext: "1 course this month",
    icon: CheckCircle2,
    color: "text-emerald-600",
  },
  {
    label: "Certificates",
    value: "2",
    subtext: "Ready to download",
    icon: Trophy,
    color: "text-amber-600",
  },
  {
    label: "Learning Hours",
    value: "48",
    subtext: "6h this week",
    icon: Clock3,
    color: "text-violet-600",
  },
];

const continueLearning = {
  title: "Advanced Project Management",
  category: "Leadership Track",
  mentor: "Michael Grant",
  image:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  progress: 75,
  nextLesson: "Risk planning and stakeholder alignment",
  duration: "18 min left",
};

const courses = [
  {
    title: "Data Science Fundamentals",
    subtitle: "Build confidence with data analysis, dashboards, and storytelling.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    progress: 60,
    lessons: "12 / 20 lessons",
  },
  {
    title: "Digital Marketing Mastery",
    subtitle: "Improve campaigns, funnels, and performance measurement.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    progress: 40,
    lessons: "9 / 24 lessons",
  },
  {
    title: "UX/UI Design Principles",
    subtitle: "Design cleaner user journeys and more intuitive interfaces.",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    progress: 80,
    lessons: "16 / 20 lessons",
  },
];

const upcomingDeadlines = [
  {
    title: "Project Management Assignment",
    dueDate: "July 15, 2024",
    type: "Assignment",
  },
  {
    title: "Data Science Quiz",
    dueDate: "July 22, 2024",
    type: "Quiz",
  },
  {
    title: "UX Case Study Review",
    dueDate: "July 25, 2024",
    type: "Review",
  },
];

const achievements = [
  {
    title: "Digital Marketing Module 1",
    detail: "Completed with a 92% score",
  },
  {
    title: "UX/UI Design Project",
    detail: "Submitted final wireframe deck",
  },
  {
    title: "7-Day Learning Streak",
    detail: "Stayed consistent throughout the week",
  },
];

const goals = [
  {
    label: "Weekly study target",
    value: "6 / 8 hours",
    progress: 75,
  },
  {
    label: "Course completion target",
    value: "3 / 5 courses",
    progress: 60,
  },
];

export const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fc] dark:bg-zinc-950">
      <div className="app-page-shell">
        <div className="space-y-8">
          <header className="app-page-header space-y-3">
            <div className="app-page-heading">
              <GraduationCap className="app-page-title-icon" />
              <h1 className="app-page-title">Welcome back, Alex</h1>
            </div>

            <p className="max-w-2xl text-base text-slate-600 dark:text-zinc-300">
              Stay on track with your current courses, upcoming deadlines, and
              weekly learning goals.
            </p>

          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="app-kpi-card">
                <CardContent className="app-kpi-content">
                  <div className="app-kpi-row">
                    <div>
                      <p className="app-kpi-label">{stat.label}</p>
                      <p className="app-kpi-value mt-1">{stat.value}</p>
                      <p className="app-kpi-subtext">{stat.subtext}</p>
                    </div>
                    <div className="app-kpi-icon-wrap">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="space-y-6">
              <Card className="gap-0 border border-slate-200 bg-white py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="px-0 py-0">
                  <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                      <img
                        src={continueLearning.image}
                        alt={continueLearning.title}
                        className="h-64 w-full object-cover lg:h-full"
                      />
                    </div>
                    <div className="space-y-5 p-6">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">
                          Continue learning
                        </p>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                          {continueLearning.title}
                        </h2>
                        <p className="text-sm leading-6 text-slate-600 dark:text-zinc-300">
                          Pick up where you left off and keep your momentum going with the
                          next guided lesson.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700 dark:text-zinc-200">
                            Progress
                          </span>
                          <span className="font-semibold text-primary">
                            {continueLearning.progress}%
                          </span>
                        </div>
                        <Progress
                          value={continueLearning.progress}
                          className="mt-3 h-2 bg-slate-200 dark:bg-zinc-700"
                        />
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                          <span>{continueLearning.category}</span>
                          <span>{continueLearning.duration}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button className="font-semibold">
                          Continue Course
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="font-semibold">
                          View Syllabus
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      My Courses
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">
                      Track your active learning paths and pick up quickly.
                    </p>
                  </div>
                  <Button variant="outline" className="font-semibold">
                    View All
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <Card
                      key={course.title}
                      className="gap-0 overflow-hidden border border-slate-200 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <CardContent className="px-0 py-0">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-44 w-full object-cover"
                        />
                        <div className="space-y-4 p-5">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {course.title}
                            </h3>
                            <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
                              {course.subtitle}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-slate-700 dark:text-zinc-200">
                                {course.lessons}
                              </span>
                              <span className="font-semibold text-primary">
                                {course.progress}%
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <Button variant="outline" className="w-full font-semibold">
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <Card className="gap-0 border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Upcoming Deadlines
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div
                        key={deadline.title}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {deadline.title}
                            </p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                              Due on {deadline.dueDate}
                            </p>
                          </div>
                          <Badge variant="outline" className="rounded-full">
                            {deadline.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-0 border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Weekly Goals
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <div key={goal.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700 dark:text-zinc-200">
                            {goal.label}
                          </span>
                          <span className="text-slate-500 dark:text-zinc-400">
                            {goal.value}
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-0 border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Recent Achievements
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.title}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {achievement.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                            {achievement.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
