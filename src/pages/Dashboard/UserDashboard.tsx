import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-zinc-700 rounded w-64" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-80" />
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";

export const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 pb-12">
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="mb-6 flex flex-col gap-1">
                <h1 className="text-5xl font-black tracking-tight">Welcome back, Alex</h1>
                <p className="text-muted-foreground text-lg">Continue Learning</p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-sm overflow-hidden">
                <div className="h-64 sm:h-80 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80')] bg-center bg-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-bold">Advanced Project Management</h2>
                  <p className="text-muted-foreground mt-1">Master advanced project management techniques and tools.</p>
                  <p className="mt-4 font-semibold">Progress: 75%</p>
                  <div className="mt-2">
                    <Progress value={75} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4">
                {[
                  {
                    title: "Data Science Fundamentals",
                    subtitle: "Learn the basics of data analysis and visualization.",
                    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
                    progress: 60,
                  },
                  {
                    title: "Digital Marketing Mastery",
                    subtitle: "Become a digital marketing expert with practical skills.",
                    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                    progress: 40,
                  },
                  {
                    title: "UX/UI Design Principles",
                    subtitle: "Design user-friendly interfaces with a focus on user experience.",
                    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                    progress: 80,
                  },
                  {
                    title: "Cloud Computing Essentials",
                    subtitle: "Understand the core concepts of cloud computing and its applications.",
                    image: "https://images.unsplash.com/photo-1518779578993-ec33e536a57f?auto=format&fit=crop&w=800&q=80",
                    progress: 25,
                  },
                ].map((course) => (
                  <div key={course.title} className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-700 overflow-hidden shadow-sm">
                    <img src={course.image} alt={course.title} className="h-28 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{course.subtitle}</p>
                      <p className="text-sm font-semibold mt-3">{course.progress}%</p>
                      <Progress value={course.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-700 shadow-sm p-5">
                <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">Project Management Assignment</p>
                      <p className="text-sm text-muted-foreground">Due: July 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">Data Science Quiz</p>
                      <p className="text-sm text-muted-foreground">Due: July 22, 2024</p>
                    </div>
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-bold">Recent Achievements</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-zinc-800 p-3">
                    <span>🏆</span>
                    <div>
                      <p className="font-semibold">Digital Marketing Module 1</p>
                      <p className="text-sm text-muted-foreground">Completed: June 28, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-zinc-800 p-3">
                    <span>🏆</span>
                    <div>
                      <p className="font-semibold">UX/UI Design Project</p>
                      <p className="text-sm text-muted-foreground">Completed: July 5, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};