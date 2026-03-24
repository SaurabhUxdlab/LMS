import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, BookOpen, BarChart3, Settings } from "lucide-react";
import { useState, useEffect } from "react";
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

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            <div className="app-page-shell">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="app-page-header flex flex-col gap-1">
                        <div className="app-page-heading">
                            <LayoutDashboard className="app-page-title-icon" />
                            <h1 className="app-page-title">Admin Dashboard</h1>
                        </div>
                        <p className="text-muted-foreground">Welcome back, Admin</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div className="app-kpi-icon-wrap">
                                        <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="app-kpi-label">Total Students</p>
                                        <div className="app-kpi-value">{stats.totalStudents.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">Active students</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div className="app-kpi-icon-wrap">
                                        <BookOpen className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="app-kpi-label">Total Instructors</p>
                                        <div className="app-kpi-value">{stats.totalInstructors.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">Active instructors</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div className="app-kpi-icon-wrap">
                                        <BookOpen className="h-5 w-5 text-violet-600" />
                                    </div>
                                    <div>
                                        <p className="app-kpi-label">Total Courses</p>
                                        <div className="app-kpi-value">{stats.totalCourses.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">Published courses</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="app-kpi-card">
                            <CardContent className="app-kpi-content">
                                <div className="app-kpi-row">
                                    <div className="app-kpi-icon-wrap">
                                        <BarChart3 className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="app-kpi-label">Total Revenue</p>
                                        <div className="app-kpi-value">${stats.totalRevenue.toLocaleString()}</div>
                                        <p className="app-kpi-subtext">This month</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-200 dark:border-zinc-700 last:border-0 last:pb-0">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                            {activity.user.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
