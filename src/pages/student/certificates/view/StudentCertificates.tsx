import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Award,
    Download,
    Link2,
    Share2,
    Search,
    Clock,
    TrendingUp,
    Sparkles,
    ExternalLink,
    Calendar,
    FileText,
    CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface Certificate {
    id: string
    title: string
    course: string
    issued: string
    credentialId: string
    image: string
    instructor: string
}

interface InProgressCourse {
    id: string
    title: string
    progress: number
    thumbnail: string
}

// Real course images - mapped by course name
const certificateImages: Record<string, string> = {
    '1': '/src/assets/react.svg',
    '2': '/vite.svg',
    '3': '/vite.svg',
    '4': '/vite.svg',
    'react': '/src/assets/react.svg',
    'javascript': '/vite.svg',
    'typescript': '/vite.svg',
    'node': '/vite.svg',
    'python': '/vite.svg',
    'native': '/src/assets/react.svg',
    'default': '/vite.svg'
}

// Get image based on course name
const getCertificateImage = (cert: { id: string; course: string }): string => {
    const courseLower = cert.course.toLowerCase()

    if (courseLower.includes('react')) return certificateImages['react']
    if (courseLower.includes('javascript')) return certificateImages['javascript']
    if (courseLower.includes('typescript')) return certificateImages['typescript']
    if (courseLower.includes('node')) return certificateImages['node']
    if (courseLower.includes('python')) return certificateImages['python']
    if (courseLower.includes('native')) return certificateImages['react']

    return certificateImages[cert.id] || certificateImages.default
}

export default function StudentCertificates() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    // Hardcoded data for demo - Software Development certificates
    const certificates: Certificate[] = [
        {
            id: '1',
            title: 'Certificate of Completion',
            course: 'React - The Complete Guide',
            issued: 'Oct 24, 2024',
            credentialId: 'UKA-9821-XP',
            image: getCertificateImage({ id: '1', course: 'React - The Complete Guide' }),
            instructor: 'Maximilian Schwarzmüller'
        },
        {
            id: '2',
            title: 'Certificate of Completion',
            course: 'JavaScript - Zero to Hero',
            issued: 'Sep 12, 2024',
            credentialId: 'UKA-4432-ZZ',
            image: getCertificateImage({ id: '2', course: 'JavaScript - Zero to Hero' }),
            instructor: 'Brad Traversy'
        },
        {
            id: '3',
            title: 'Certificate of Completion',
            course: 'TypeScript Masterclass',
            issued: 'Aug 05, 2024',
            credentialId: 'UKA-1109-FS',
            image: getCertificateImage({ id: '3', course: 'TypeScript Masterclass' }),
            instructor: 'Sarah Drasner'
        },
    ]

    const nearingCompletion: InProgressCourse[] = [
        {
            id: '4',
            title: 'Node.js Backend Development',
            progress: 85,
            thumbnail: getCertificateImage({ id: '4', course: 'Node.js Backend Development' })
        },
        {
            id: '5',
            title: 'React Native Mobile Apps',
            progress: 92,
            thumbnail: getCertificateImage({ id: '5', course: 'React Native Mobile Apps' })
        },
    ]

    const filteredCertificates = certificates.filter(cert =>
        cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.credentialId.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDownload = (cert: Certificate) => {
        console.log('Download certificate:', cert.credentialId)
    }

    const handleShare = (cert: Certificate) => {
        console.log('Share certificate:', cert.credentialId)
    }

    const handleViewCredential = (cert: Certificate) => {
        console.log('View credential:', cert.credentialId)
    }

    const handleFinishCourse = (id: string) => {
        navigate(`/course/${id}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="mx-auto pl-1 py-4">

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Award className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-foreground">
                                My Certificates
                            </h1>
                        </div>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Your earned credentials and achievements
                    </p>
                </header>

                {/* Search Bar */}
                <div className="mb-10">
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search certificates by course or credential ID..."
                            className="h-14 pl-14 pr-4 shadow-md border-2 border-transparent focus:border-primary rounded-2xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-xl">
                                    <Award className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Total Certificates</p>
                                    <p className="text-3xl font-black">{certificates.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-xl">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">This Year</p>
                                    <p className="text-3xl font-black">{certificates.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-5 to-green-10 border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/20 rounded-xl">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">In Progress</p>
                                    <p className="text-3xl font-black">{nearingCompletion.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Earned Certificates */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-black">Earned Certificates</h2>
                        <Badge className="bg-amber-500/90 text-white font-bold">{filteredCertificates.length}</Badge>
                    </div>

                    {filteredCertificates.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {filteredCertificates.map((cert) => (
                                <Card
                                    key={cert.id}
                                    className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-card"
                                >
                                    {/* Certificate Image */}
                                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-secondary/20" />
                                        <img
                                            src={cert.image}
                                            alt={cert.course}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <Badge className="absolute top-3 right-3 bg-amber-500/90 text-white font-bold">
                                            <Award className="h-3 w-3 mr-1" />
                                            Verified
                                        </Badge>
                                    </div>

                                    <CardContent className="p-5">
                                        <Badge variant="outline" className="mb-2 text-xs font-medium">
                                            {cert.title}
                                        </Badge>

                                        <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
                                            {cert.course}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-3">
                                            by {cert.instructor}
                                        </p>

                                        {/* Certificate Details */}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{cert.issued}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-xs text-muted-foreground">Credential ID:</span>
                                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                                                {cert.credentialId}
                                            </code>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 font-semibold"
                                                onClick={() => handleDownload(cert)}
                                            >
                                                <Download className="h-4 w-4 mr-2" />
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
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-dashed border-muted bg-gradient-to-br from-muted/20 to-background">
                            <CardContent className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
                                    <Search className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No certificates found</h3>
                                <p className="text-muted-foreground">
                                    Try a different search term
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Nearing Completion */}
                {nearingCompletion.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <h2 className="text-2xl font-black">Almost There!</h2>
                            <Badge variant="secondary" className="font-bold">{nearingCompletion.length} Courses</Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {nearingCompletion.map((course) => (
                                <Card
                                    key={course.id}
                                    className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all bg-card"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                                                </div>
                                                <Progress value={course.progress} className="h-2 mb-3" />
                                                <Button
                                                    size="sm"
                                                    className="w-full font-semibold"
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
    )
}
