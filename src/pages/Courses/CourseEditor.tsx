import { useState } from "react";
import { GripVertical, Plus, Video, FileText, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Static curriculum data
const initialCurriculum = [
    {
        id: 1,
        type: "section",
        title: "Section 1: Introduction to Data Science",
        lessons: [
            { id: 101, type: "lesson", title: "Lesson 1: What is Data Science?", subtitle: "1 lesson", icon: "video" },
        ],
    },
    {
        id: 2,
        type: "section",
        title: "Section 2: Data Analysis Techniques",
        lessons: [
            { id: 201, type: "lesson", title: "Lesson 2: Exploratory Data Analysis", subtitle: "1 lesson", icon: "video" },
            { id: 202, type: "lesson", title: "Lesson 3: Statistical Methods", subtitle: "1 lesson", icon: "pdf" },
            { id: 203, type: "lesson", title: "Lesson 4: Data Visualization", subtitle: "1 lesson", icon: "video" },
            { id: 204, type: "lesson", title: "Lesson 5: Quiz on Data Analysis", subtitle: "1 lesson", icon: "quiz" },
        ],
    },
];

export const CourseEditor = () => {
    const [curriculum, setCurriculum] = useState(initialCurriculum);

    // Get icon based on lesson type
    const getLessonIcon = (iconType: string) => {
        switch (iconType) {
            case "video":
                return <Video className="h-5 w-5 text-blue-500" />;
            case "pdf":
                return <FileText className="h-5 w-5 text-orange-500" />;
            case "quiz":
                return <FileText className="h-5 w-5 text-purple-500" />;
            default:
                return <FileText className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
            <div className="max-w-[1600px] mx-auto px-4 pb-12">
                <div className="pt-8">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="cursor-pointer hover:text-foreground">My Courses</span>
                            <span className="text-gray-400">/</span>
                            <span className="text-foreground font-medium">Course Title</span>
                        </nav>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="curriculum" className="mb-8">
                        <TabsList className="grid grid-cols-4 w-full max-w-md">
                            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                            <TabsTrigger value="pricing">Pricing</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="curriculum" className="mt-6">
                            {/* Curriculum Section */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Curriculum</h2>

                                {/* Curriculum List */}
                                <div className="space-y-4">
                                    {curriculum.map((item) => (
                                        <div key={item.id} className="space-y-2">
                                            {/* Section */}
                                            <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 hover:shadow-md transition">
                                                <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                    <Pencil className="h-4 w-4" />
                                                    <span>Section</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{item.lessons.length} lesson{item.lessons.length !== 1 ? "s" : ""}</p>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Lessons */}
                                            <div className="ml-8 space-y-2">
                                                {item.lessons.map((lesson) => (
                                                    <div key={lesson.id} className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 hover:shadow-md transition">
                                                        <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                                                        <div className="flex items-center gap-2">
                                                            {getLessonIcon(lesson.icon)}
                                                            <div className="flex-1">
                                                                <h4 className="font-medium">{lesson.title}</h4>
                                                                <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-500">
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Section Button */}
                                <Button variant="secondary" className="w-full py-3 text-sm font-medium">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Section
                                </Button>

                                {/* Save and Publish Buttons */}
                                <div className="flex justify-end gap-4 mt-8">
                                    <Button variant="outline" size="lg" className="px-8">
                                        Save Draft
                                    </Button>
                                    <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                                        Publish
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="basic-info" className="mt-6">
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
                                <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                                <p className="text-muted-foreground">Course details coming soon...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="pricing" className="mt-6">
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
                                <h2 className="text-2xl font-bold mb-6">Pricing</h2>
                                <p className="text-muted-foreground">Pricing settings coming soon...</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings" className="mt-6">
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
                                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                                <p className="text-muted-foreground">Settings coming soon...</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
