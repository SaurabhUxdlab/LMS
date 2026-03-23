import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart3, Settings } from "lucide-react";
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
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <div className="pt-8 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, Admin</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">Active students</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalInstructors.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">Active instructors</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalCourses.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">Published courses</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">This month</p>
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
