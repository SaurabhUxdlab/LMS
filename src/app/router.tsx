import { Outlet, type RouteObject } from "react-router-dom";
import Layout from "./layout/Layout";
import { UserDashboard } from "@/pages/Dashboard/UserDashboard";
import { InstructorDashboard } from "@/pages/Dashboard/InstructorDashboard";
import { CertificationsPage } from "@/pages/Certifications/CertificationsPage";
import { CoursesPage } from "@/pages/Courses/CoursesPage";
import { CoursePlayerPage } from "@/pages/Courses/CoursePlayerPage";
import { CourseEditor } from "@/pages/Courses/CourseEditor";
import { QuizCreator } from "@/pages/Courses/QuizCreator";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";
import Signin from "@/pages/Auth/Signin";
import Signup from "@/pages/Auth/Signup";
import { AuditLogsPage } from "@/pages/AuditLogs";
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
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor", "admin", "super admin"]}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "instructor-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["instructor", "admin", "super admin"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "certifications",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor", "admin", "super admin"]}>
            <CertificationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor", "admin", "super admin"]}>
            <CoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "courses/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor", "admin", "super admin"]}>
            <CoursePlayerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-editor/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["instructor", "admin", "super admin"]}>
            <CourseEditor />
          </ProtectedRoute>
        ),
      },
      {
        path: "quiz-creator/:courseId",
        element: (
          <ProtectedRoute allowedRoles={["instructor", "admin", "super admin"]}>
            <QuizCreator />
          </ProtectedRoute>
        ),
      },
      {
        path: "audit-logs",
        element: (
          <ProtectedRoute allowedRoles={["super admin"]}>
            <AuditLogsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={["super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">User Management - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "content",
        element: (
          <ProtectedRoute allowedRoles={["super admin", "admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Content Management - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets",
        element: (
          <ProtectedRoute allowedRoles={["super admin", "admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Support Tickets - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "inquiries",
        element: (
          <ProtectedRoute allowedRoles={["super admin", "admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">User Inquiries - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Analytics - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "student-analytics",
        element: (
          <ProtectedRoute allowedRoles={["student"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Student Analytics - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Reports - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "students",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Students - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "instructors",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Instructors - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-courses",
        element: (
          <ProtectedRoute allowedRoles={["admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Courses - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor", "admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Settings - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "create-course",
        element: (
          <ProtectedRoute allowedRoles={["student", "instructor"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Create Course - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "instructor-analytics",
        element: (
          <ProtectedRoute allowedRoles={["instructor", "admin", "super admin"]}>
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">Instructor Analytics - Coming Soon</p>
            </div>
          </ProtectedRoute>
        ),
      },
    ],
  },
];
