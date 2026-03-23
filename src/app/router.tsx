import { Outlet, type RouteObject } from "react-router-dom";
import Layout from "./layout/Layout";

import { StudentDashboard } from "@/pages/student/dashboard/view/StudentDashboard";
import { MyCourses } from "@/pages/student/my-courses/view/MyCourses";
import StudentCertificates from "@/pages/student/certificates/view/StudentCertificates";
import { AdminDashboard } from "@/pages/admin/dashboard/view/AdminDashboard";
import { InstructorDashboard } from "@/pages/instructor/dashboard/view/InstructorDashboard";
import NotFound from "@/pages/NotFound";

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
        ],
      },
    ],
  },
];
