import { useState, useEffect } from "react";
import type { Course } from "../model/MyCoursesModel";

export const useMyCoursesViewModel = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Published" | "Draft">("All");

//   useEffect(() => {
//     const data: Course[] = [
//       {
//         id: "1",
//         title: "Introduction to Digital Marketing",
//         thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48",
//         status: "Published",
//         students: 567,
//       },
//       {
//         id: "2",
//         title: "Advanced Data Analysis with Python",
//         thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
//         status: "Published",
//         students: 432,
//       },
//       {
//         id: "3",
//         title: "Project Management Fundamentals",
//         thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
//         status: "Draft",
//         students: 210,
//       },
//     ];

//     setCourses(data);
//   }, []);
useEffect(() => {
  const data: Course[] = [
    {
      id: "1",
      title: "Introduction to Digital Marketing",
      thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48",
      status: "Published",
      students: 567,
    },
    {
      id: "2",
      title: "Advanced Data Analysis with Python",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      status: "Published",
      students: 432,
    },
    {
      id: "3",
      title: "Project Management Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      status: "Draft",
      students: 210,
    },

    // 🔥 NEW COURSES
    {
      id: "4",
      title: "Full Stack Web Development",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      status: "Published",
      students: 820,
    },
    {
      id: "5",
      title: "UI/UX Design Masterclass",
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      status: "Draft",
      students: 150,
    },
    {
      id: "6",
      title: "React JS Complete Guide",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      status: "Published",
      students: 980,
    },
  ];

  setCourses(data);
}, []);
  const filteredCourses = courses.filter((course) => {
    const matchSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || course.status === filter;

    return matchSearch && matchFilter;
  });

  return {
    courses: filteredCourses,
    search,
    setSearch,
    filter,
    setFilter,
  };
};