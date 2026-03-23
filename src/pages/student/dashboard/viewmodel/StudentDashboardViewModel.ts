import { useState, useEffect } from "react";
import type { Course, Deadline, Achievement } from "../model/StudentDashboardModel";

export const useStudentDashboardViewModel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [upcomingDeadlines, setUpcomingDeadlines] = useState<Deadline[]>([]);
    const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        // Simulate API call to fetch dashboard data
        const timer = setTimeout(() => {
            setCourses([
                {
                    title: "Data Science Fundamentals",
                    subtitle: "Learn the basics of data analysis and visualization.",
                    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
                    progress: 60,
                },
                {
                    title: "Digital Marketing Mastery",
                    subtitle: "Become a digital marketing expert with practical skills.",
                    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                    progress: 40,
                },
                {
                    title: "UX/UI Design Principles",
                    subtitle: "Design user-friendly interfaces with a focus on user experience.",
                    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                    progress: 80,
                },
                {
                    title: "Cloud Computing Essentials",
                    subtitle: "Understand the core concepts of cloud computing and its applications.",
                    image: "https://images.unsplash.com/photo-1518779578993-ec33e536a57f?auto=format&fit=crop&w=800&q=80",
                    progress: 25,
                },
            ]);

            setUpcomingDeadlines([
                {
                    title: "Project Management Assignment",
                    dueDate: "July 15, 2024",
                },
                {
                    title: "Data Science Quiz",
                    dueDate: "July 22, 2024",
                },
            ]);

            setRecentAchievements([
                {
                    title: "Digital Marketing Module 1",
                    completedDate: "June 28, 2024",
                },
                {
                    title: "UX/UI Design Project",
                    completedDate: "July 5, 2024",
                },
            ]);

            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return {
        isLoading,
        courses,
        upcomingDeadlines,
        recentAchievements,
    };
};
