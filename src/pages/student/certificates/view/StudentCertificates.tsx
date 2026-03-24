import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Link2,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Certificate {
  id: string;
  title: string;
  course: string;
  issued: string;
  credentialId: string;
  image: string;
  instructor: string;
}

interface InProgressCourse {
  id: string;
  title: string;
  progress: number;
  thumbnail: string;
}

const certificateImages: Record<string, string> = {
  react:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
  javascript:
    "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
  typescript:
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
  node:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  python:
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  native:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
  default:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
};

const getCertificateImage = (cert: { id: string; course: string }): string => {
  const courseLower = cert.course.toLowerCase();

  if (courseLower.includes("react") && !courseLower.includes("native")) return certificateImages.react;
  if (courseLower.includes("javascript")) return certificateImages.javascript;
  if (courseLower.includes("typescript")) return certificateImages.typescript;
  if (courseLower.includes("node")) return certificateImages.node;
  if (courseLower.includes("python")) return certificateImages.python;
  if (courseLower.includes("native")) return certificateImages.native;

  return certificateImages[cert.id] || certificateImages.default;
};

export default function StudentCertificates() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Certificate of Completion",
      course: "React - The Complete Guide",
      issued: "Oct 24, 2024",
      credentialId: "UKA-9821-XP",
      image: getCertificateImage({ id: "1", course: "React - The Complete Guide" }),
      instructor: "Maximilian Schwarzmuller",
    },
    {
      id: "2",
      title: "Certificate of Completion",
      course: "JavaScript - Zero to Hero",
      issued: "Sep 12, 2024",
      credentialId: "UKA-4432-ZZ",
      image: getCertificateImage({ id: "2", course: "JavaScript - Zero to Hero" }),
      instructor: "Brad Traversy",
    },
    {
      id: "3",
      title: "Certificate of Completion",
      course: "TypeScript Masterclass",
      issued: "Aug 05, 2024",
      credentialId: "UKA-1109-FS",
      image: getCertificateImage({ id: "3", course: "TypeScript Masterclass" }),
      instructor: "Sarah Drasner",
    },
  ];

  const nearingCompletion: InProgressCourse[] = [
    {
      id: "4",
      title: "Node.js Backend Development",
      progress: 85,
      thumbnail: getCertificateImage({ id: "4", course: "Node.js Backend Development" }),
    },
    {
      id: "5",
      title: "React Native Mobile Apps",
      progress: 92,
      thumbnail: getCertificateImage({ id: "5", course: "React Native Mobile Apps" }),
    },
  ];

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.credentialId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (cert: Certificate) => {
    console.log("Download certificate:", cert.credentialId);
  };

  const handleShare = (cert: Certificate) => {
    console.log("Share certificate:", cert.credentialId);
  };

  const handleViewCredential = (cert: Certificate) => {
    console.log("View credential:", cert.credentialId);
  };

  const handleFinishCourse = (id: string) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="app-page-shell">
        <div className="space-y-8">
          <header className="space-y-3">
            <div className="app-page-heading">
              <Award className="app-page-title-icon" />
              <h1 className="app-page-title">My Certificates</h1>
            </div>
            <p className="max-w-2xl text-base text-slate-600 dark:text-zinc-300">
              Keep all your earned credentials in one place and track courses that are
              close to certificate completion.
            </p>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="app-kpi-row">
                  <div>
                    <p className="app-kpi-label">Total Certificates</p>
                    <p className="app-kpi-value mt-1">{certificates.length}</p>
                    <p className="app-kpi-subtext">Verified achievements</p>
                  </div>
                  <div className="app-kpi-icon-wrap">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="app-kpi-row">
                  <div>
                    <p className="app-kpi-label">Issued This Year</p>
                    <p className="app-kpi-value mt-1">{certificates.length}</p>
                    <p className="app-kpi-subtext">Latest milestones</p>
                  </div>
                  <div className="app-kpi-icon-wrap">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="app-kpi-card">
              <CardContent className="app-kpi-content">
                <div className="app-kpi-row">
                  <div>
                    <p className="app-kpi-label">Almost Certified</p>
                    <p className="app-kpi-value mt-1">{nearingCompletion.length}</p>
                    <p className="app-kpi-subtext">Courses nearing completion</p>
                  </div>
                  <div className="app-kpi-icon-wrap">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <CardContent className="space-y-5 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Earned Certificates
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-zinc-400">
                    Search and manage your credentials by course title or credential ID.
                  </p>
                </div>

                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by course or credential ID"
                    className="h-12 rounded-2xl border-slate-200 pl-11 shadow-none dark:border-zinc-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {filteredCertificates.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {filteredCertificates.map((cert) => (
                    <Card
                      key={cert.id}
                      className="group gap-0 overflow-hidden rounded-3xl border border-slate-200 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <CardContent className="px-0 py-0">
                        <div className="relative">
                          <img
                            src={cert.image}
                            alt={cert.course}
                            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                          <Badge className="absolute right-3 top-3 bg-amber-500 text-white hover:bg-amber-500">
                            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                            Verified
                          </Badge>
                        </div>

                        <div className="space-y-4 p-5">
                          <div className="space-y-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                              {cert.title}
                            </p>
                            <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 dark:text-white">
                              {cert.course}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                              by {cert.instructor}
                            </p>
                          </div>

                          <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/60">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
                              <Calendar className="h-4 w-4" />
                              <span>Issued on {cert.issued}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
                              <Link2 className="h-4 w-4" />
                              <span className="font-mono">{cert.credentialId}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1 font-semibold" onClick={() => handleDownload(cert)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleViewCredential(cert)}
                            >
                              <Link2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleShare(cert)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="gap-0 rounded-3xl border border-dashed border-slate-300 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                  <CardContent className="space-y-5 p-10 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                      <Search className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        No certificates found
                      </h3>
                      <p className="text-base text-slate-600 dark:text-zinc-400">
                        Try another search term to find your certificate quickly.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {nearingCompletion.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Almost There
                    </h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-zinc-400">
                    Finish these courses to unlock your next certificate.
                  </p>
                </div>
                <Badge className="rounded-full bg-slate-900 px-3 py-1 font-semibold text-white hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-white">
                  {nearingCompletion.length} courses
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {nearingCompletion.map((course) => (
                  <Card
                    key={course.id}
                    className="gap-0 overflow-hidden rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <div className="h-24 w-24 overflow-hidden rounded-2xl shrink-0">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              {course.title}
                            </h3>
                            <div className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
                              <Clock3 className="h-4 w-4" />
                              {course.progress}% complete
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Progress value={course.progress} className="h-2" />
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                              Complete the remaining lessons to unlock your certificate.
                            </p>
                          </div>

                          <Button
                            size="sm"
                            className="font-semibold"
                            onClick={() => handleFinishCourse(course.id)}
                          >
                            Finish Course
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
