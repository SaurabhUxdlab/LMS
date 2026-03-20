import { useState, useEffect } from "react";
import { Download, Share2, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

export const CertificationsPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const certificates = [
        {
            id: 1,
            title: "Advanced UI/UX Design",
            credential: "CERTIFICATE OF COMPLETION",
            issueDate: "Oct 24, 2023",
            credentialId: "UKA-7821-XP",
            bgColor: "from-blue-500 to-blue-700",
        },
        {
            id: 2,
            title: "Business Data Strategy",
            credential: "PROFESSIONAL CREDENTIAL",
            issueDate: "Sep 12, 2023",
            credentialId: "UKA-4432-ZZ",
            bgColor: "from-slate-800 to-slate-900",
        },
        {
            id: 3,
            title: "Full Stack Web Architecture",
            credential: "CERTIFICATE MASTERY",
            issueDate: "Aug 05, 2023",
            credentialId: "UKA-1109-FS",
            bgColor: "from-purple-500 to-purple-700",
        },
    ];

    const nearingCompletion = [
        {
            id: 1,
            title: "Product Management Professional",
            progress: 85,
            icon: "📊",
        },
        {
            id: 2,
            title: "Python for Data Analysis",
            progress: 92,
            icon: "📈",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="max-w-[1400px] mx-auto px-4 pb-12">
                    <div className="pt-8">
                        {/* Header */}
                        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-5xl font-black tracking-tight">My Achievements</h1>
                                <p className="text-muted-foreground mt-2 text-lg">
                                    Manage and share your professional credentials from Upskillz Academy
                                </p>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                View Public Profile
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div className="mb-8">
                            <div className="relative">
                                <svg
                                    className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search your certificates..."
                                    className="w-full pl-12 pr-4 py-2.5 border border-slate-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Earned Certificates Section */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold">Earned Certificates ({certificates.length})</h2>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 5h4v4H5V5m6 0h4v4h-4V5m6 0h4v4h-4V5m-12 6h4v4H5v-4m6 0h4v4h-4v-4m6 0h4v4h-4v-4" />
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certificates.map((cert) => (
                                    <Card key={cert.id} className="overflow-hidden border-0 shadow-lg">
                                        <div className={`h-32 bg-gradient-to-br ${cert.bgColor} flex items-center justify-center`}>
                                            <div className="text-center text-white">
                                                <p className="text-sm font-semibold opacity-90">{cert.credential}</p>
                                            </div>
                                        </div>
                                        <CardContent className="pt-6">
                                            <h3 className="text-xl font-bold mb-4">{cert.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-1">Issued: {cert.issueDate}</p>
                                            <p className="text-sm text-muted-foreground mb-6">ID: {cert.credentialId}</p>
                                            <div className="flex gap-2">
                                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download PDF
                                                </Button>
                                                <Button variant="outline" size="icon" className="border-slate-300 dark:border-zinc-700">
                                                    <Share2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Nearing Completion Section */}
                        <div>
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold mb-2">Nearing Completion</h2>
                                <p className="text-muted-foreground">{nearingCompletion.length} Courses</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {nearingCompletion.map((course) => (
                                    <Card key={course.id} className="border-0 shadow-sm">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="text-4xl">{course.icon}</div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                                                    <div className="mb-2">
                                                        <p className="text-sm font-semibold text-muted-foreground">{course.progress}%</p>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-4">
                                                        <div
                                                            className="h-full bg-blue-600"
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                        Finish Course
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
