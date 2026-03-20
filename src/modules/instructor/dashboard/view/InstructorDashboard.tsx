import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, DollarSign, Edit, MoreVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useInstructorDashboardViewModel } from "../viewmodel/InstructorDashboardViewModel";

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

export const InstructorDashboard = () => {
    const navigate = useNavigate();
    const { isLoading, courses, totalStudents, avgRating, totalRevenue, recentActivities } = useInstructorDashboardViewModel();

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <div className="pt-8 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, Sarah</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Course Ratings</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground fill-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{avgRating}/5</div>
                                <p className="text-xs text-muted-foreground mt-1">Average rating</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-1">This month</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Course Management */}
                    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-zinc-700">
                            <h2 className="text-xl font-bold">Course Management</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Course Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Enrollment</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courses.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell className="font-medium">{course.title}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === "Published"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                        }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{course.enrollment}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                                        onClick={() => navigate(`/course-editor/${course.id}`)}
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-200 dark:border-zinc-700 last:border-0 last:pb-0">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                            {activity.student.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium">
                                            {activity.type}: {activity.student}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.course}
                                            {activity.rating && ` - ${activity.rating}`}
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
