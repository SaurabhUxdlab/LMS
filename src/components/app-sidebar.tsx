"use client"

import * as React from "react"
import { useLocation } from "react-router-dom"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Wrench,
  Settings,
  LogOut,
  FileText,
  Users,
  BarChart3,
  Eye,
  BookOpen,
  Award,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
   studentNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      url: "/courses",
      icon: BookOpen,
    },
    {
      title: "Certificates",
      url: "/certifications",
      icon: Award,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  superAdminNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/users",
      icon: Users,
    },
    {
      title: "Audit Logs",
      url: "/audit-logs",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  contentManagerNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Content Management",
      url: "/content",
      icon: FileText,
    },
    {
      title: "Audit Logs",
      url: "/audit-logs",
      icon: FileText,
    },
  ],
  supportAgentNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Support Tickets",
      url: "/tickets",
      icon: FileText,
    },
    {
      title: "User Inquiries",
      url: "/inquiries",
      icon: Users,
    },
  ],
  analyticsViewerNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
    },
  ],
  instructorNav: [
    {
      title: "Dashboard",
      url: "/instructor-dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Courses",
      url: "/courses",
      icon: BookOpen,
    },
    {
      title: "Create Course",
      url: "/create-course",
      icon: FileText,
    },
    {
      title: "Analytics",
      url: "/instructor-analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      url: "/students",
      icon: Users,
    },
    {
      title: "Instructors",
      url: "/instructors",
      icon: BookOpen,
    },
    {
      title: "Courses",
      url: "/admin-courses",
      icon: FileText,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const location = useLocation()
  const user = useSelector((state: RootState) => state.user)
  const role = user?.role?.toLowerCase() || ""

  const getRoleNavigation = () => {
    switch (role) {
      case "super admin":
        return data.superAdminNav
      case "admin":
        return data.adminNav
      case "instructor":
        return data.instructorNav
      case "content manager":
        return data.contentManagerNav
      case "support agent":
        return data.supportAgentNav
      case "analytics viewer":
        return data.analyticsViewerNav
      case "student":
        return data.studentNav
      default:
        return data.studentNav
    }
  }

  const navItems = getRoleNavigation().map((item) => ({
    ...item,
    isActive: location.pathname === item.url,
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="group flex items-center gap-2.5 rounded-lg p-1 -ml-1 cursor-pointer"
        >
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Wrench className="h-7 w-7 text-white transition-transform sm:h-8 sm:w-8 bg-primary p-1 rounded-full" />
            </motion.div>
          </div>
          {state !== "collapsed" && (
            <div className="flex flex-col">
              <span className="text-xl font-bold sm:text-xl leading-none">
                <span className="text-primary">Upskill Academy</span>
              </span>
              <span className="text-sm text-slate-500 mt-1">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </div>
          )}
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.uid ? `${role.charAt(0).toUpperCase() + role.slice(1)}` : data.user.name,
          email: user?.email || data.user.email,
          avatar: data.user.avatar
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

