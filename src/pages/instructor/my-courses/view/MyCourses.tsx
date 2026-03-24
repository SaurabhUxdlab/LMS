import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyCoursesViewModel } from "../viewmodel/MyCoursesViewModel"; 
import { Edit, Trash, Eye, Plus, X, MoreHorizontal, ChevronRight, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const MyCourses = () => {
  const { courses, search, setSearch, filter, setFilter } =
    useMyCoursesViewModel();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* MAIN DASHBOARD CONTENT */}
      <div className="p-6 space-y-6 min-h-screen">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-gray-500">
              Manage and track your courses
            </p>
          </div>

          <Button 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => navigate("/instructor/create-course")}
          >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 space-y-3 flex flex-col flex-1">
                  {/* TITLE AND ACTIONS - FLEX ROW */}
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="font-semibold text-gray-800 truncate flex-1">
                      {course.title}
                    </h2>
                    
                    {/* ACTIONS - 3 DOTS MENU */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                        >
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="cursor-pointer gap-2">
                          <Eye size={14} />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-2">
                          <Edit size={14} />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 gap-2">
                          <Trash size={14} />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* DESCRIPTION */}
                  {course.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.description}
                    </p>
                  )}

                  {/* RATING AND LEARNERS */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="text-sm font-medium">{course.rating || "4.5"}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {course.students?.toLocaleString() || "127,507"} learners
                    </span>
                  </div>

                  {/* DURATION */}
                  {course.duration && (
                    <p className="text-xs text-gray-500">
                      {course.duration}
                    </p>
                  )}

                  {/* STATUS */}
                  <div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        course.status === "Published"
                          ? "bg-primary/10 text-primary"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  {/* KNOW MORE BUTTON */}
                  <button 
                    onClick={() => navigate(`/instructor/my-courses/${course.id}`)}
                    className="mt-2 text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 group transition-colors"
                  >
                    Know more
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
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
    </div>
  );
};

export default MyCourses;