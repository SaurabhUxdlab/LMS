import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, DollarSign, Edit } from "lucide-react";
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
        <div className="p-6 space-y-4 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-80 bg-gray-200 rounded" />
        </div>
    );
};

export const InstructorDashboard = () => {
    const navigate = useNavigate();

    const {
        isLoading,
        courses,
        totalStudents,
        avgRating,
        totalRevenue,
        recentActivities,
    } = useInstructorDashboardViewModel();

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="min-h-screen  from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:to-zinc-900">
            <div className="max-w-[1400px] mx-auto px-4 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Instructor Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back, <span className="font-medium text-gray-700 dark:text-gray-300">Sarah</span>
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            
                            <Card className="rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white/80 backdrop-blur">
                                <CardHeader className="flex justify-between items-center pb-2">
                                    <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
                                    <Users className="h-5 w-5 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {totalStudents.toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white/80 backdrop-blur">
                                <CardHeader className="flex justify-between items-center pb-2">
                                    <CardTitle className="text-sm text-gray-600">Course Ratings</CardTitle>
                                    <Star className="h-5 w-5 text-yellow-500" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {avgRating}/5
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white/80 backdrop-blur">
                                <CardHeader className="flex justify-between items-center pb-2">
                                    <CardTitle className="text-sm text-gray-600">Total Revenue</CardTitle>
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        ${totalRevenue.toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>

                        </div>

                        {/* Table */}
                        <div className="bg-white/80 backdrop-blur border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-lg overflow-hidden">
                            
                            <div className="p-5 border-b bg-gray-50/50 dark:bg-zinc-800/50">
                                <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                                    Course Management
                                </h2>
                            </div>

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
                                        <TableRow
                                            key={course.id}
                                            className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                                        >
                                            <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                                                {course.title}
                                            </TableCell>

                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                                                        course.status === "Published"
                                                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                                    }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-gray-700 dark:text-gray-300">
                                                {course.enrollment}
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-zinc-800 transition"
                                                    onClick={() =>
                                                        navigate(`/course-editor/${course.id}`)
                                                    }
                                                >
                                                    <Edit size={14} className="mr-1" />
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* RIGHT - ACTIVITY */}
                    <div className="bg-white/80 backdrop-blur border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-lg p-5 h-fit sticky top-6">
                        
                        <h2 className="font-semibold text-lg mb-5 text-gray-800 dark:text-white">
                            Recent Activity
                        </h2>

                        <div className="space-y-4">
                            {recentActivities.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-3 items-start hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded-lg transition"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow">
                                        {item.student.charAt(0)}
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {item.type}: {item.student}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {item.course}
                                            {item.rating && ` • ${item.rating}`}
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