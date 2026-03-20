export interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    progress: number;
}

export interface MyCoursesData {
    courses: Course[];
}
