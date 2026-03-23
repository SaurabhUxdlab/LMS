import * as React from "react"
import { Link } from "react-router-dom"
import { Star, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CourseCardProps {
    id: string
    title: string
    instructor: string
    thumbnail?: string
    rating?: number
    reviewCount?: number
    price?: number
    originalPrice?: number
    bestseller?: boolean
}

export function CourseCard({
    id,
    title,
    instructor,
    thumbnail,
    rating = 0,
    reviewCount = 0,
    price = 0,
    originalPrice,
    bestseller = false,
}: CourseCardProps) {
    // Default thumbnail if none provided
    const imageSrc = thumbnail || "/vite.svg"

    return (
        <Link to={`/course/${id}`}>
            <Card className="group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border-border/50">
                {/* Thumbnail Section */}
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {bestseller && (
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                            Bestseller
                        </Badge>
                    )}
                </div>

                {/* Content Section */}
                <CardContent className="p-4 space-y-2">
                    {/* Course Title */}
                    <h3 className="font-semibold text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    {/* Instructor Name */}
                    <p className="text-sm text-muted-foreground">{instructor}</p>

                    {/* Rating + Reviews */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1 font-semibold text-amber-600">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            {rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">({reviewCount.toLocaleString()} reviews)</span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-lg text-foreground">
                            ${price.toFixed(2)}
                        </span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

// Variant with progress (for My Courses)
interface CourseCardWithProgressProps extends CourseCardProps {
    progress?: number
    lastLesson?: string
    duration?: string
}

export function CourseCardWithProgress({
    id,
    title,
    instructor,
    thumbnail,
    rating,
    reviewCount,
    price,
    originalPrice,
    bestseller,
    progress = 0,
    lastLesson,
    duration,
}: CourseCardWithProgressProps) {
    const imageSrc = thumbnail || "/vite.svg"

    return (
        <Link to={`/course/${id}`}>
            <Card className="group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] bg-white border-border/50">
                {/* Thumbnail Section */}
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-2 right-2 bg-amber-500/90 text-white text-xs font-semibold">
                        {progress}%
                    </Badge>
                    {bestseller && (
                        <Badge className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                            Bestseller
                        </Badge>
                    )}
                </div>

                {/* Content Section */}
                <CardContent className="p-4 space-y-3">
                    {/* Duration Badge */}
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {duration || "N/A"}
                        </Badge>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-semibold text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    {/* Instructor Name */}
                    <p className="text-sm text-muted-foreground">{instructor}</p>

                    {/* Last Lesson */}
                    {lastLesson && (
                        <p className="text-xs text-muted-foreground">
                            Next: {lastLesson}
                        </p>
                    )}

                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-right">{progress}% complete</p>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg text-foreground">
                            ${price?.toFixed(2) || "Free"}
                        </span>
                        {originalPrice && originalPrice > (price || 0) && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CourseCard
