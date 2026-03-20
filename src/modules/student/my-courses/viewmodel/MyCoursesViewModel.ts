import { useState, useEffect } from 'react';
import type { Course } from '../model/MyCoursesModel';

export const useMyCoursesViewModel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            setCourses([
                {
                    id: '1',
                    title: 'React Fundamentals',
                    description: 'Master React hooks, components, and state management.',
                    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
                    progress: 75
                },
                {
                    id: '2',
                    title: 'TypeScript Advanced',
                    description: 'Deep dive into TypeScript generics, utilities, and advanced patterns.',
                    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
                    progress: 45
                }
            ]);
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return { isLoading, courses };
};

