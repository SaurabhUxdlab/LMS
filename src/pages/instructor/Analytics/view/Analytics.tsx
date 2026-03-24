// import React from "react";
// import { useAnalyticsViewModel } from "../viewmodel/AnalyticsViewModel";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DollarSign, Users, BookOpen, Star } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// const Analytics = () => {
//   const { stats, revenueData, enrollmentData } =
//     useAnalyticsViewModel();

//   return (
//     <div className="p-6 space-y-6 min-h-screen ">

//       {/* HEADER */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-3xl font-bold tracking-tight">
//           Analytics Dashboard
//         </h1>
//         <p className="text-gray-500">
//           Track your course performance and revenue
//         </p>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Revenue
//             </CardTitle>
//             <DollarSign className="h-4 w-4 text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">
//               ₹{stats.totalRevenue.toLocaleString()}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Overall earnings
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Students
//             </CardTitle>
//             <Users className="h-4 w-4 text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">
//               {stats.totalStudents.toLocaleString()}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Across all courses
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Courses
//             </CardTitle>
//             <BookOpen className="h-4 w-4 text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">
//               {stats.totalCourses}
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Created courses
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Avg Rating
//             </CardTitle>
//             <Star className="h-4 w-4 text-gray-400" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">
//               {stats.avgRating}/5
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Student feedback
//             </p>
//           </CardContent>
//         </Card>

//       </div>

//       {/* CHARTS SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Revenue Chart */}
//         <div className="bg-white rounded-2xl border shadow-sm p-5">
//           <h2 className="text-lg font-semibold mb-4">
//             Revenue Overview
//           </h2>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={revenueData}>
//                 <XAxis dataKey="month" stroke="#888888" fontSize={12} />
//                 <YAxis stroke="#888888" fontSize={12} />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Enrollment Chart */}
//         <div className="bg-white rounded-2xl border shadow-sm p-5">
//           <h2 className="text-lg font-semibold mb-4">
//             Course Enrollments
//           </h2>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={enrollmentData}>
//                 <XAxis dataKey="course" stroke="#888888" fontSize={12} />
//                 <YAxis stroke="#888888" fontSize={12} />
//                 <Tooltip />
//                 <Bar dataKey="students" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Analytics;


import React from "react";
import { useAnalyticsViewModel } from "../viewmodel/AnalyticsViewModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, Star } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Analytics = () => {
  const { stats, revenueData, enrollmentData } =
    useAnalyticsViewModel();

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[#f8fafc]">

      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500">
          Track your course performance and revenue
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ₹{stats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Overall earnings
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.totalStudents.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Across all courses
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.totalCourses}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Created courses
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Rating
            </CardTitle>
            <Star className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.avgRating}/5
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Student feedback
            </p>
          </CardContent>
        </Card>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">
            Revenue Overview
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #eee",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0057b8"   // 🔥 GREEN LINE
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment Chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">
            Course Enrollments
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <XAxis dataKey="course" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #eee",
                  }}
                />

                <Bar
                  dataKey="students"
                  fill="#0057b8"   // 🔥 GREEN BAR
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;