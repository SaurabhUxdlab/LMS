import { useEffect, useState } from "react";
import type {
  AnalyticsStats,
  RevenueData,
  EnrollmentData,
} from "../model/AnalyticsModel";

export const useAnalyticsViewModel = () => {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalRevenue: 0,
    totalStudents: 0,
    totalCourses: 0,
    avgRating: 0,
  });

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);

  useEffect(() => {
    // 🔥 Dummy API Data
    setStats({
      totalRevenue: 12500,
      totalStudents: 2345,
      totalCourses: 6,
      avgRating: 4.8,
    });

    setRevenueData([
      { month: "Jan", revenue: 2000 },
      { month: "Feb", revenue: 3000 },
      { month: "Mar", revenue: 2500 },
      { month: "Apr", revenue: 4000 },
      { month: "May", revenue: 3500 },
    ]);

    setEnrollmentData([
      { course: "React JS", students: 980 },
      { course: "Python", students: 700 },
      { course: "Marketing", students: 665 },
    ]);
  }, []);

  return {
    stats,
    revenueData,
    enrollmentData,
  };
};