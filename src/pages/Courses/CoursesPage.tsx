import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
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

export const CoursesPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(100);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const courses = [
        {
            id: 1,
            title: "Digital Marketing Fundamentals",
            instructor: "Ethan Harper",
            price: "$49.99",
            category: "Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-adf4e565db18?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 2,
            title: "Python Programming for Beginners",
            instructor: "Sophia Carter",
            price: "$59.99",
            category: "Coding",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 3,
            title: "UX/UI Design Masterclass",
            instructor: "Maria Johnson",
            price: "$79.99",
            category: "Design",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 4,
            title: "Business Strategy Essentials",
            instructor: "Olivia Hayes",
            price: "$69.99",
            category: "Business",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 5,
            title: "Mobile App Development with Swift",
            instructor: "Ava Coleman",
            price: "$89.99",
            category: "Coding",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 6,
            title: "Product Management Bootcamp",
            instructor: "Lucas Reed",
            price: "$99.99",
            category: "Business",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 7,
            title: "Financial Modeling and Valuation",
            instructor: "Isabella Morgan",
            price: "$119.99",
            category: "Business",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80",
        },
        {
            id: 8,
            title: "Data Analysis with R",
            instructor: "Noah Paulson",
            price: "$64.99",
            category: "Coding",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
        },
    ];

    const categories = ["Marketing", "Coding", "Design", "Business"];
    const levels = ["Beginner", "Intermediate", "Advanced"];

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const clearFilters = () => {
        setPriceRange(100);
        setSelectedCategories([]);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="max-w-[1600px] mx-auto px-4 pb-12">
                    <div className="pt-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold flex items-center gap-2">
                                        📚 Upskillz Academy
                                    </h1>
                                    <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                                        <span className="font-semibold cursor-pointer hover:text-foreground">My Learning</span>
                                        <span className="cursor-pointer hover:text-foreground">Wishlist</span>
                                        <span className="cursor-pointer hover:text-foreground">Cart</span>
                                    </div>
                                </div>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Filters Sidebar */}
                            <div className="lg:col-span-1">
                                <Card className="border-0 shadow-sm sticky top-8">
                                    <CardContent className="pt-6">
                                        <h2 className="text-xl font-bold mb-6">Filter & Sort</h2>

                                        {/* Price Filter */}
                                        <div className="mb-8">
                                            <label className="block text-sm font-semibold mb-4">Price</label>
                                            <div className="space-y-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="200"
                                                    value={priceRange}
                                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                                    className="w-full accent-blue-600"
                                                />
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    <span>$0</span>
                                                    <span>${priceRange}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Category Filter */}
                                        <div className="mb-8">
                                            <label className="block text-sm font-semibold mb-4">Category</label>
                                            <div className="space-y-3">
                                                {categories.map((category) => (
                                                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(category)}
                                                            onChange={() => toggleCategory(category)}
                                                            className="w-4 h-4 accent-blue-600"
                                                        />
                                                        <span className="text-sm">{category}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Duration Filter */}
                                        <div className="mb-8">
                                            <label className="block text-sm font-semibold mb-4">Duration</label>
                                            <div className="space-y-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    defaultValue="50"
                                                    className="w-full accent-blue-600"
                                                />
                                            </div>
                                        </div>

                                        {/* Level Filter */}
                                        <div className="mb-8">
                                            <label className="block text-sm font-semibold mb-4">Level</label>
                                            <div className="space-y-3">
                                                {levels.map((level) => (
                                                    <label key={level} className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="level"
                                                            className="w-4 h-4 accent-blue-600"
                                                        />
                                                        <span className="text-sm">{level}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Clear Filters */}
                                        <button
                                            onClick={clearFilters}
                                            className="w-full py-2 px-4 border border-slate-300 dark:border-zinc-600 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                                        >
                                            Clear Filters
                                        </button>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Courses Grid */}
                            <div className="lg:col-span-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {courses.map((course) => (
                                        <Card
                                            key={course.id}
                                            className="border-0 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
                                            onClick={() => navigate(`/courses/${course.id}`)}
                                        >
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="h-40 w-full object-cover"
                                            />
                                            <CardContent className="pt-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {course.category}
                                                    </span>
                                                    <span className="text-lg font-bold text-blue-600">{course.price}</span>
                                                </div>
                                                <h3 className="text-sm font-bold leading-tight mb-2">{course.title}</h3>
                                                <p className="text-xs text-muted-foreground">{course.instructor}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
