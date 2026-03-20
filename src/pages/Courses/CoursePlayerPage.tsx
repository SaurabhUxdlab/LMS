import { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export const CoursePlayerPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
        1: true,
        2: false,
        3: false,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const toggleModule = (moduleId: number) => {
        setExpandedModules((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId],
        }));
    };

    const modules = [
        {
            id: 1,
            title: "Module 1",
            subtitle: "Introduction to Data Analysis",
            lessons: [
                { id: 1, title: "Lesson 1: Setting Up Your Environment...", completed: true },
                { id: 2, title: "Lesson 2: Data Manipulation Basics", completed: true },
                { id: 3, title: "Lesson 3: Statistical Analysis Techniques...", completed: true },
                { id: 4, title: "Lesson 4: Data Visualization with Python...", completed: true },
            ],
        },
        {
            id: 2,
            title: "Module 2",
            subtitle: "Advanced Data Analysis",
            lessons: [
                { id: 5, title: "Lesson 5: Working with Large Data...", completed: true },
                { id: 6, title: "Lesson 6: Machine Learning Fundamentals...", completed: true },
                { id: 7, title: "Lesson 7: Project: Analyzing Customer...", completed: true },
            ],
        },
        {
            id: 3,
            title: "Module 3",
            subtitle: "Real-world Applications",
            lessons: [
                { id: 8, title: "Lesson 8: Case Study: Financial Data...", completed: false },
                { id: 9, title: "Lesson 9: Case Study: Healthcare Data...", completed: false },
                { id: 10, title: "Lesson 10: Final Project: Comprehensive...", completed: false },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="flex flex-col h-screen">
                    {/* Header */}
                    <div className="border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center text-white font-bold">
                                        U
                                    </div>
                                    <span className="font-bold text-lg">Upskillz Academy</span>
                                </div>
                                <nav className="hidden md:flex gap-6">
                                    <a href="/" className="text-foreground hover:text-primary">Home</a>
                                    <a href="/courses" className="text-foreground hover:text-primary">My Learning</a>
                                    <a href="/courses" className="text-foreground hover:text-primary">Browse</a>
                                </nav>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Main Content */}
                        <div className="flex-1 overflow-y-auto">
                            {/* Video Section */}
                            <div className="bg-blue-300 dark:bg-blue-900 aspect-video relative flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80"
                                    alt="Course video"
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute w-20 h-20 bg-white dark:bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                                    <svg className="w-8 h-8 text-blue-600 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Course Meta and Tabs */}
                            <div className="max-w-4xl mx-auto px-6 py-8">
                                <h1 className="text-3xl font-bold mb-2">Python for Data Analysis</h1>
                                <p className="text-muted-foreground mb-6">Introduction to Data Analysis</p>

                                {/* Tabs */}
                                <div className="border-b border-slate-200 dark:border-zinc-700 mb-6">
                                    <div className="flex gap-8">
                                        {[
                                            { id: "overview", label: "Overview" },
                                            { id: "resources", label: "Resources" },
                                            { id: "qa", label: "Q&A" },
                                            { id: "notes", label: "Notes" },
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`pb-3 font-medium transition ${activeTab === tab.id
                                                        ? "border-b-2 border-blue-600 text-foreground"
                                                        : "text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tab Content */}
                                {activeTab === "overview" && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-bold mb-4">Overview</h2>
                                            <p className="text-foreground leading-relaxed mb-4">
                                                This course is designed to help you master the fundamentals of data analysis using Python. Through hands-on projects and real-world datasets, you'll learn to manipulate data, perform statistical analysis, and create insightful visualizations. By the end of this course, you'll be equipped with the skills to tackle complex data challenges and drive informed decision-making.
                                            </p>
                                        </div>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                                            Next Lesson
                                        </Button>
                                    </div>
                                )}

                                {activeTab === "resources" && (
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground">Resources coming soon...</p>
                                    </div>
                                )}

                                {activeTab === "qa" && (
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground">Q&A section coming soon...</p>
                                    </div>
                                )}

                                {activeTab === "notes" && (
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground">Notes section coming soon...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Sidebar - Course Content */}
                        <div className="w-80 border-l border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto">
                            <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 p-4">
                                <h3 className="text-lg font-bold">Course Content</h3>
                            </div>

                            <div className="p-4 space-y-2">
                                {modules.map((module) => (
                                    <div key={module.id} className="space-y-1">
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition text-left"
                                        >
                                            <ChevronDown
                                                className={`w-4 h-4 transition ${expandedModules[module.id] ? "rotate-0" : "-rotate-90"
                                                    }`}
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{module.title}</p>
                                                <p className="text-xs text-muted-foreground">{module.subtitle}</p>
                                            </div>
                                        </button>

                                        {expandedModules[module.id] && (
                                            <div className="pl-6 space-y-1">
                                                {module.lessons.map((lesson) => (
                                                    <button
                                                        key={lesson.id}
                                                        className="w-full flex items-center gap-2 p-2 rounded text-left hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition group"
                                                    >
                                                        <div className="flex-1 text-sm text-muted-foreground group-hover:text-foreground truncate">
                                                            {lesson.title}
                                                        </div>
                                                        {lesson.completed && (
                                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
