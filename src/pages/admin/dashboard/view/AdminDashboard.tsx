import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    BarChart3,
    BookOpen,
    GraduationCap,
    LayoutDashboard,
    Users,
} from "lucide-react";
import { useAdminDashboardViewModel } from "../viewmodel/AdminDashboardViewModel";

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

export const AdminDashboard = () => {
    const { isLoading, stats, recentActivity } = useAdminDashboardViewModel();

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    const averageRevenuePerCourse =
        stats.totalCourses > 0 ? Math.round(stats.totalRevenue / stats.totalCourses) : 0;

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            <div className="app-page-shell">
                <div className="space-y-6">
                    <header className="space-y-3">
                        <div className="app-page-heading">
                            <LayoutDashboard className="app-page-title-icon" />
                            <h1 className="app-page-title">Admin Dashboard</h1>
                        </div>
                        <p className="max-w-2xl text-base text-slate-600 dark:text-zinc-300">
                            Welcome back, Admin. Here is a clean snapshot of learners,
                            instructors, course growth, and platform activity.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div>
                                        <p className="app-kpi-label">Total Students</p>
                                        <div className="app-kpi-value">{stats.totalStudents.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">Active students</p>
                                    </div>
                                    <div className="app-kpi-icon-wrap">
                                        <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div>
                                        <p className="app-kpi-label">Total Instructors</p>
                                        <div className="app-kpi-value">{stats.totalInstructors.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">Active instructors</p>
                                    </div>
                                    <div className="app-kpi-icon-wrap">
                                        <GraduationCap className="h-5 w-5 text-emerald-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div>
                                        <p className="app-kpi-label">Total Courses</p>
                                        <div className="app-kpi-value">{stats.totalCourses.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">Published courses</p>
                                    </div>
                                    <div className="app-kpi-icon-wrap">
                                        <BookOpen className="h-5 w-5 text-violet-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div>
                                        <p className="app-kpi-label">Total Revenue</p>
                                        <div className="app-kpi-value">${stats.totalRevenue.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">This month</p>
                                    </div>
                                    <div className="app-kpi-icon-wrap">
                                        <BarChart3 className="h-5 w-5 text-amber-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
                        <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                            <CardHeader className="border-b border-slate-200 px-6 py-5 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                                        Recent Activity
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recentActivity.map((activity, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40"
                                        >
                                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white">
                                                {activity.user.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                        {activity.action}
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-full border-slate-200 bg-white px-2.5 py-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-900"
                                                    >
                                                        {activity.user}
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                                    {activity.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                                <CardHeader className="border-b border-slate-200 px-6 py-5 dark:border-zinc-800">
                                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Platform Snapshot
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            Student-to-Instructor Ratio
                                        </p>
                                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                                            {Math.max(1, Math.round(stats.totalStudents / Math.max(stats.totalInstructors, 1)))}:1
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                            Learner support coverage across the platform
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            Course Performance
                                        </p>
                                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                                            ${averageRevenuePerCourse.toLocaleString()}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                            Average revenue generated per course
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                                <CardHeader className="border-b border-slate-200 px-6 py-5 dark:border-zinc-800">
                                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Management Focus
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 p-6">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            Monitor enrollments
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                            Track student growth and course participation trends.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            Review instructor activity
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                            Keep course quality and publishing activity consistent.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            Watch monthly revenue
                                        </p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                                            Use revenue and course counts to spot growth opportunities.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
