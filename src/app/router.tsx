import { Outlet, type RouteObject } from "react-router-dom";
import Layout from "./layout/Layout";

import { StudentDashboard } from "@/pages/student/dashboard/view/StudentDashboard";
import { MyCourses } from "@/pages/student/my-courses/view/MyCourses";
import StudentCertificates from "@/pages/student/certificates/view/StudentCertificates";
import StudentCommunity from "@/pages/student/community/view/StudentCommunity";
import StudentSettings from "@/pages/student/settings/view/StudentSettings";
import ExploreCourses from "@/pages/student/explore-courses/ExploreCourses";
import { AdminDashboard } from "@/pages/admin/dashboard/view/AdminDashboard";
import AdminStudents from "@/pages/admin/students/view/AdminStudents";
import AdminStudentDetail from "@/pages/admin/students/view/AdminStudentDetail";
import StudentCourseDetail from "@/pages/admin/students/view/StudentCourseDetail";
import InstructorsList from "@/pages/admin/instructor/view/InstructorsList";
import InstructorDetail from "@/pages/admin/instructor/view/InstructorDetail";
import CoursesList from "@/pages/admin/course/view/CoursesList";
import AdminCourseDetail from "@/pages/admin/course/view/CourseDetail";
import { InstructorDashboard } from "@/pages/instructor/dashboard/view/InstructorDashboard";
import InstructorMyCourses from "@/pages/instructor/my-courses/view/MyCourses";
import Analytics from "@/pages/instructor/Analytics/view/Analytics";
import Settings from "@/pages/instructor/settings/view/Settings";
import CreateCourse from "@/pages/instructor/my-courses/view/CreateCourse";
import InstructorCourseDetail from "@/pages/instructor/my-courses/view/CourseDetail";
import SettingsPage from "@/pages/admin/settings/view/SettingsPage";
import CoursePlayer from "@/pages/course/view/CoursePlayer";
import QuizResultView from "@/pages/course/view/QuizResultView";
import QuizStartView from "@/pages/course/view/QuizStartView";
import NotFound from "@/pages/NotFound";
import ReportsDashboard from "@/pages/admin/reports/view/ReportsDashboard";

// Removed broken course imports
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";
import Signin from "@/pages/Auth/Signin";
import Signup from "@/pages/Auth/Signup";
// Removed missing AuditLogsPage import
function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export const appRoutes: RouteObject[] = [
  {
    path: "signin",
    element: (
      <GuestRoute>
        <Signin />
      </GuestRoute>
    ),
  },

  {
    path: "signup",
    element: (
      <GuestRoute>
        <Signup />
      </GuestRoute>
    ),
  },

  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      // Student routes
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "explore-courses",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <ExploreCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-courses",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: "certificates",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentCertificates />
          </ProtectedRoute>
        ),
      },
      {
        path: "community",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentCommunity />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentSettings />
          </ProtectedRoute>
        ),
      },
      // Course Player - accessible to students and instructors
      {
        path: "course/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor"]}>
            <CoursePlayer />
          </ProtectedRoute>
        ),
      },
      // Quiz Start - accessible to students and instructors
      {
        path: "course/:courseId/quiz/:quizId/start",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor"]}>
            <QuizStartView />
          </ProtectedRoute>
        ),
      },
      // Quiz Result - accessible to students and instructors
      {
        path: "course/:courseId/quiz/:quizId/result",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor"]}>
            <QuizResultView />
          </ProtectedRoute>
        ),
      },
      // Admin routes
      {
        path: "admin",
        children: [
          {
            path: "dashboard",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "students",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminStudents />
              </ProtectedRoute>
            ),
          },
          {
            path: "students/:id",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminStudentDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "students/:studentId/courses/:courseId",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <StudentCourseDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "instructors",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <InstructorsList />
              </ProtectedRoute>
            ),
          },
          {
            path: "instructors/:instructorId",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <InstructorDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <CoursesList />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses/:courseId",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <InstructorCourseDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "settings",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <SettingsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "reports",
            element: (
              <ProtectedRoute allowedRoles={["admin"]}>
                <ReportsDashboard />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Instructor routes
     {
        path: "instructor",
        children: [
          {
            path: "dashboard",
            element: (
              <ProtectedRoute allowedRoles={["instructor"]}>
                <InstructorDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-courses",
            element: (
              <ProtectedRoute allowedRoles={["instructor"]}>
                <InstructorMyCourses />
              </ProtectedRoute>
            ),
          },
          {
            path: "create-course",
            element: (
              <ProtectedRoute allowedRoles={["instructor"]}>
                <CreateCourse />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-courses/:courseId",
            element: (
              <ProtectedRoute allowedRoles={["instructor"]}>
                <InstructorCourseDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "analytics",
            element: (
              <ProtectedRoute allowedRoles={["instructor"]}>
                <Analytics />
              </ProtectedRoute>
            ),
          },
          {
            path: "settings",
            element: (
              <ProtectedRoute allowedRoles={["instructor"]}>
                <Settings />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
];



