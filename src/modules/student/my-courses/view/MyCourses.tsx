import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMyCoursesViewModel } from "../viewmodel/MyCoursesViewModel";

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

export const MyCourses = () => {
    const { isLoading, courses } = useMyCoursesViewModel();

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <div className="pt-8 space-y-8">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
                        <p className="text-muted-foreground">Browse and manage your enrolled courses</p>
                    </div>

                    {courses.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-20">
                                <div className="mx-auto h-12 w-12 text-zinc-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5a2 2 0 00-2 2v12a2 2 0 002 2h6.568c.68 0 1.246-.484 1.378-1.115l.181-.727c.17-.68.587-1.273 1.188-1.507l2.011-.944A2 2 0 0120 15.366V5a2 2 0 00-2-2h-4.432c-.68 0-1.246.484-1.378 1.115l-.181.727c-.17.68-.587 1.273-1.188 1.507l-2.011.944A2 2 0 019.568 3z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">No courses yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by enrolling in a course.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="h-40 w-full object-cover"
                                    />
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0 pb-4">
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{course.description}</p>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full flex-1">
                                                <div
                                                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{course.progress}%</span>
                                        </div>
                                        <Button className="w-full" variant="default">
                                            Continue Learning
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

