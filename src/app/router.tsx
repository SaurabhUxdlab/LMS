import { Outlet, type RouteObject } from "react-router-dom";
import Layout from "./layout/Layout";

import { StudentDashboard } from "@/pages/student/dashboard/view/StudentDashboard";
import { MyCourses } from "@/pages/student/my-courses/view/MyCourses";

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

    ],
  },
];
