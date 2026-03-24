import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Users, BookOpen, DollarSign, BarChart2, TrendingUp, PieChart, UserCircle2, Star } from "lucide-react";

// --- Mock Data ---
const stats = [
  {
    label: "Total Students",
    value: 1240,
    icon: <Users className="w-6 h-6 text-blue-600" />,
    trend: 5.2,
    trendUp: true,
  },
  {
    label: "Total Courses",
    value: 87,
    icon: <BookOpen className="w-6 h-6 text-green-600" />,
    trend: 1.8,
    trendUp: true,
  },
  {
    label: "Total Revenue",
    value: "$42,300",
    icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
    trend: 2.1,
    trendUp: false,
  },
  {
    label: "Avg Completion Rate",
    value: "78%",
    icon: <BarChart2 className="w-6 h-6 text-purple-600" />,
    trend: 0.7,
    trendUp: true,
  },
];

const enrollmentData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 180 },
  { month: "Apr", value: 210 },
  { month: "May", value: 200 },
  { month: "Jun", value: 250 },
  { month: "Jul", value: 300 },
  { month: "Aug", value: 320 },
  { month: "Sep", value: 310 },
  { month: "Oct", value: 330 },
  { month: "Nov", value: 340 },
  { month: "Dec", value: 360 },
];

const revenueData = [
  { month: "Jan", value: 3200 },
  { month: "Feb", value: 4100 },
  { month: "Mar", value: 3900 },
  { month: "Apr", value: 4200 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 5100 },
  { month: "Jul", value: 5300 },
  { month: "Aug", value: 5500 },
  { month: "Sep", value: 5200 },
  { month: "Oct", value: 5700 },
  { month: "Nov", value: 5900 },
  { month: "Dec", value: 6000 },
];

const coursePerformance = [
  { name: "React Basics", enrollments: 320, completion: 85, rating: 4.7 },
  { name: "Advanced Python", enrollments: 210, completion: 78, rating: 4.5 },
  { name: "UI/UX Design", enrollments: 180, completion: 72, rating: 4.3 },
  { name: "Data Science", enrollments: 150, completion: 80, rating: 4.6 },
];

const topInstructors = [
  { name: "Alice Johnson", students: 420, rating: 4.9, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Michael Lee", students: 390, rating: 4.8, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Priya Singh", students: 370, rating: 4.7, avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const engagement = {
  activeUsers: 890,
  avgHours: 4.2,
  dropOff: 6.5,
};

const categoryDistribution = [
  { category: "Development", value: 40, color: "bg-blue-500" },
  { category: "Design", value: 25, color: "bg-pink-500" },
  { category: "Business", value: 20, color: "bg-green-500" },
  { category: "Marketing", value: 15, color: "bg-yellow-500" },
];

// --- Components ---

function ReportsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <div className="app-page-heading">
          <BarChart2 className="app-page-title-icon" />
          <h1 className="app-page-title">Reports & Analytics</h1>
        </div>
        <p className="text-muted-foreground">Track platform performance, engagement, and growth</p>
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue="7d">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="custom">Custom</option>
        </Select>
        <Button variant="outline">Export Report</Button>
      </div>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="app-kpi-card transition-shadow hover:shadow-md">
          <CardContent className="app-kpi-content">
            <div className="app-kpi-row">
              <div className="min-w-0">
                <div className="app-kpi-label">{stat.label}</div>
                <div className="app-kpi-value mt-1">{stat.value}</div>
                <span className={`app-kpi-subtext inline-flex items-center ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {stat.trend}%
                </span>
              </div>
              <div className="app-kpi-icon-wrap">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EnrollmentChart() {
  return (
    <Card className="col-span-2 h-64">
      <CardHeader>
        <CardTitle>Enrollment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for chart */}
        <div className="h-40 flex items-center justify-center bg-muted rounded-md animate-pulse">
          <TrendingUp className="w-10 h-10 text-blue-400" />
          <span className="ml-2 text-muted-foreground">[Chart Placeholder]</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueChart() {
  return (
    <Card className="h-64">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for chart */}
        <div className="h-40 flex items-center justify-center bg-muted rounded-md animate-pulse">
          <BarChart2 className="w-10 h-10 text-yellow-400" />
          <span className="ml-2 text-muted-foreground">[Chart Placeholder]</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CoursePerformanceTable() {
  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle>Course Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-2 text-left font-medium">Course</th>
              <th className="px-4 py-2 text-left font-medium">Enrollments</th>
              <th className="px-4 py-2 text-left font-medium">Completion %</th>
              <th className="px-4 py-2 text-left font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {coursePerformance.map((course) => (
              <tr key={course.name} className="hover:bg-accent transition-colors">
                <td className="px-4 py-2">{course.name}</td>
                <td className="px-4 py-2">{course.enrollments}</td>
                <td className="px-4 py-2">{course.completion}%</td>
                <td className="px-4 py-2 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {course.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function TopInstructorsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Instructors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topInstructors.map((inst) => (
            <li key={inst.name} className="flex items-center gap-3 hover:bg-accent rounded-md p-2 transition-colors">
              <img src={inst.avatar} alt={inst.name} className="w-10 h-10 rounded-full object-cover border" />
              <div className="flex-1">
                <div className="font-medium">{inst.name}</div>
                <div className="text-xs text-muted-foreground">{inst.students} students</div>
              </div>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                {inst.rating}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function EngagementMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span>Active Users</span>
            <span className="font-semibold">{engagement.activeUsers}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Avg Learning Hours</span>
            <span className="font-semibold">{engagement.avgHours} hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Drop-off Rate</span>
            <span className="font-semibold text-red-600">{engagement.dropOff}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryDistribution() {
  // Pie chart placeholder
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Donut chart placeholder */}
            <PieChart className="w-20 h-20 text-muted-foreground" />
            <span className="absolute text-lg font-bold">100%</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryDistribution.map((cat) => (
              <span key={cat.category} className={`flex items-center gap-1 text-xs ${cat.color} px-2 py-1 rounded text-white`}>
                <span className="w-2 h-2 rounded-full bg-white/70 inline-block" />
                {cat.category}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Dashboard ---

export default function ReportsDashboard() {
  return (
    <div className="app-page-shell">
      <ReportsHeader />
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <EnrollmentChart />
        <RevenueChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CoursePerformanceTable />
        </div>
        <TopInstructorsList />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EngagementMetrics />
        <CategoryDistribution />
      </div>
    </div>
  );
}
