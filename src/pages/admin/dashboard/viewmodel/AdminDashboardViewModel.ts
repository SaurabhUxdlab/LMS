import { useState, useEffect } from "react";
import type { Stats, Activity } from "../model/AdminDashboardModel";

export const useAdminDashboardViewModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalInstructors: 0,
    totalCourses: 0,
    totalRevenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    // Instantly set mock data for instant dashboard load
    const fetchedStats: Stats = {
      totalStudents: 1500,
      totalInstructors: 75,
      totalCourses: 200,
      totalRevenue: 50000,
    };

    const fetchedActivity: Activity[] = [
      { user: "John Doe", action: "New student registered", description: "John Doe registered as a student" },
      { user: "Jane Smith", action: "New course published", description: "Introduction to JavaScript" },
      { user: "Mike Johnson", action: "Instructor profile updated", description: "Mike Johnson updated his profile" },
      { user: "Sarah Williams", action: "Course enrollment", description: "Sarah Williams enrolled in Web Development" },
    ];

    setStats(fetchedStats);
    setRecentActivity(fetchedActivity);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    stats,
    recentActivity,
  };
};
