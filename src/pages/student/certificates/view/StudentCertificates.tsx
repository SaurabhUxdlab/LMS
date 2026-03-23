import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudentCertificates() {
    // Hardcoded data for demo
    const certificates = [
        {
            title: "Advanced UI/UX Design",
            issued: "Oct 24, 2023",
            id: "UKA-9821-XP",
            image: "https://placehold.co/300x180/3b82f6/fff?text=UI%2FUX+Design",
        },
        {
            title: "Business Data Strategy",
            issued: "Sep 12, 2023",
            id: "UKA-4432-ZZ",
            image: "https://placehold.co/300x180/1e293b/fff?text=Data+Strategy",
        },
        {
            title: "Full Stack Web Architecture",
            issued: "Aug 05, 2023",
            id: "UKA-1109-FS",
            image: "https://placehold.co/300x180/312e81/fff?text=Web+Architecture",
        },
    ];
    const nearingCompletion = [
        {
            title: "Product Management Professional",
            progress: 85,
        },
        {
            title: "Python for Data Analysis",
            progress: 92,
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black">My Achievements</h1>
                    <p className="text-muted-foreground">Manage and share your professional credentials from Upskillz Academy</p>
                </div>
                <Button className="h-12 px-6 text-base font-semibold">View Public Profile</Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-2 mb-8">
                <Input placeholder="Search your certificates..." className="flex-1" />
                <Button variant="ghost" className="ml-2">🔍</Button>
                <span className="ml-auto text-xs text-muted-foreground">AUTO-POST LINKEDIN</span>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Earned Certificates ({certificates.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certificates.map((cert, idx) => (
                        <Card key={cert.id} className="rounded-2xl shadow group hover:shadow-lg transition-shadow">
                            <img src={cert.image} alt={cert.title} className="rounded-t-2xl h-40 w-full object-cover" />
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-1 line-clamp-2">{cert.title}</h3>
                                <p className="text-xs text-muted-foreground mb-2">Issued: {cert.issued} · ID: {cert.id}</p>
                                <div className="flex gap-2 mt-4">
                                    <Button size="sm" className="flex-1">Download PDF</Button>
                                    <Button size="icon" variant="outline">🔗</Button>
                                    <Button size="icon" variant="outline">📤</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold">Nearing Completion</h2>
                    <span className="text-xs text-primary font-semibold">{nearingCompletion.length} Courses</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nearingCompletion.map((course, idx) => (
                        <Card key={course.title} className="rounded-2xl shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-base">{course.title}</h3>
                                    <span className="text-primary font-bold text-sm">{course.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full mb-3">
                                    <div className="h-2 bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                                </div>
                                <Button size="sm" className="w-full">Finish Course</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
