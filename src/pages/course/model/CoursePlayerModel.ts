export interface Lesson {
    id: string
    title: string
    duration: string
    isCompleted: boolean
    isLocked: boolean
}

export interface Module {
    id: string
    title: string
    lessons: Lesson[]
}

export interface Course {
    id: string
    title: string
    description: string
    instructor: string
    thumbnail: string
    videoUrl: string
    modules: Module[]
}

export interface CoursePlayerData {
    course: Course
    currentLesson: Lesson
}
