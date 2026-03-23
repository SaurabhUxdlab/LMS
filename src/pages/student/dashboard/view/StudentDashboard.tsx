import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const StudentDashboard = () => {
    // Hardcoded data for UI demo
    const courses = [
        {
            title: "Data Science Fundamentals",
            subtitle: "Learn the basics of data analysis and visualization.",
            image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=250&fit=crop",
            progress: 60,
        },
        {
            title: "Digital Marketing Mastery",
            subtitle: "Become a digital marketing expert with practical skills.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
            progress: 40,
        },
        {
            title: "UX/UI Design Principles",
            subtitle: "Design user-friendly interfaces with a focus on user experience.",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop",
            progress: 80,
        },
        {
            title: "Cloud Computing Essentials",
            subtitle: "Understand the core concepts of cloud computing and its applications.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
            progress: 25,
        },
    ];
    const upcomingDeadlines = [
        { title: "Project Management Assignment", dueDate: "July 15, 2024" },
        { title: "Data Science Quiz", dueDate: "July 22, 2024" },
    ];
    const recentAchievements = [
        { title: "Digital Marketing Module 1", completedDate: "June 28, 2024" },
        { title: "UX/UI Design Project", completedDate: "July 5, 2024" },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            <div className="mx-auto pl-1 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="mb-6 flex flex-col gap-1">

                            <h1 className="text-4xl font-black tracking-tight text-foreground">
                                Welcome back, Alex
                            </h1>
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

                        <h2 className="mt-8 text-2xl font-bold">My Courses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
                            {courses.map((course) => (
                                <div key={course.title} className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-700 overflow-hidden shadow-sm">
                                    <img src={course.image} alt={course.title} className="h-28 w-full object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{course.subtitle}</p>
                                        <div className="mt-3">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium">Progress</span>
                                                <span className="text-primary font-semibold">{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Removed separate progress section - now combined with cards */}
                    </div>

                    <aside className="lg:col-span-4">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-700 shadow-sm p-5">
                            <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
                            <div className="space-y-3">
                                {upcomingDeadlines.map((deadline, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800">
                                        <span className="text-2xl">📅</span>
                                        <div>
                                            <p className="font-semibold">{deadline.title}</p>
                                            <p className="text-sm text-muted-foreground">Due: {deadline.dueDate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-6 text-xl font-bold">Recent Achievements</h3>
                            <div className="mt-3 space-y-2">
                                {recentAchievements.map((achievement, index) => (
                                    <div key={index} className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-zinc-800 p-3">
                                        <span>🏆</span>
                                        <div>
                                            <p className="font-semibold">{achievement.title}</p>
                                            <p className="text-sm text-muted-foreground">Completed: {achievement.completedDate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
