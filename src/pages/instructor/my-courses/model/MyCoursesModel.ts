export interface Course {
    id: string;
    title: string;
    thumbnail: string;
    status: "Published" | "Draft";
    students: number;
}