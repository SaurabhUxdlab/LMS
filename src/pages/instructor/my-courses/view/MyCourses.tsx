import React from "react";
import { useMyCoursesViewModel } from "../viewmodel/MyCoursesViewModel"; 
import { Edit, Trash, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MyCourses = () => {
  const { courses, search, setSearch, filter, setFilter } =
    useMyCoursesViewModel();

  return (
    <div className="p-6 space-y-6  min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-gray-500">
            Manage and track your courses
          </p>
        </div>

      <Button className="bg-[#15803D] hover:bg-[#166534] text-white">
  <Plus size={16} className="mr-2" />
  Create Course
</Button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-white"
        />

        <div className="flex gap-2">
          {["All", "Published", "Draft"].map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "outline"}
              onClick={() => setFilter(item as any)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      {/* COURSES GRID */}
      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border">
          <p className="text-gray-500">No courses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 space-y-3">

                {/* TITLE */}
                <h2 className="font-semibold text-gray-800">
                  {course.title}
                </h2>

                {/* STATUS */}
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    course.status === "Published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.status}
                </span>

                {/* STUDENTS */}
                <p className="text-sm text-gray-500">
                  {course.students} students
                </p>

                {/* ACTIONS */}
                <div className="flex justify-between items-center pt-3">

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={14} />
                    </Button>

                    <Button size="sm" variant="outline">
                      <Edit size={14} />
                    </Button>

                    <Button size="sm" variant="destructive">
                      <Trash size={14} />
                    </Button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center pt-6 gap-2">
        <Button variant="outline">Prev</Button>
        <Button variant="default">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
};

export default MyCourses;