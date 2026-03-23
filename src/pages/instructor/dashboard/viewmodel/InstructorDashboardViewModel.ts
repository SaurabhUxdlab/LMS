

import { useState, useEffect } from "react";
import type { Course, Activity } from "../model/InstructorDashboardModel";

export const useInstructorDashboardViewModel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchedCourses: Course[] = [
                {
                    id: "1",
                    title: "Introduction to Digital Marketing",
                    status: "Published",
                    enrollment: 567,
                },
                {
                    id: "2",
                    title: "Advanced Data Analysis with Python",
                    status: "Published",
                    enrollment: 432,
                },
                {
                    id: "3",
                    title: "Project Management Fundamentals",
                    status: "Draft",
                    enrollment: 210,
                },
                {
                    id: "4",
                    title: "Creative Writing for Professionals",
                    status: "Published",
                    enrollment: 678,
                },
                {
                    id: "5",
                    title: "Business Communication Strategies",
                    status: "Published",
                    enrollment: 459,
                },
            ];

            const fetchedActivities: Activity[] = [
                {
                    type: "New Enrollment",
                    student: "Alex",
                    course: "Introduction to Digital Marketing",
                },
                {
                    type: "New Review",
                    student: "Emily",
                    course: "Advanced Data Analysis with Python",
                    rating: "5 stars",
                },
                {
                    type: "New Enrollment",
                    student: "David",
                    course: "Creative Writing for Professionals",
                },
                {
                    type: "New Review",
                    student: "Olivia",
                    course: "Business Communication Strategies",
                    rating: "4 stars",
                },
            ];

            setCourses(fetchedCourses);
            setTotalStudents(
                fetchedCourses.reduce((sum, c) => sum + c.enrollment, 0)
            );
            setAvgRating(4.8);
            setTotalRevenue(12500);
            setRecentActivities(fetchedActivities);

            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return {
        isLoading,
        courses,
        totalStudents,
        avgRating,
        totalRevenue,
        recentActivities,
    };
};