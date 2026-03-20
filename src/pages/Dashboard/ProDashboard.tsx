import {
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  CheckCircle,
  Star,
  DollarSign,
  User,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const proLinks = [
  { title: "Dashboard", url: "/prodashboard", icon: LayoutDashboard },
  { title: "Leads", url: "/leads", icon: ClipboardList },
  { title: "Active Jobs", url: "/active-jobs", icon: Briefcase },
  { title: "Completed Jobs", url: "/completed-jobs", icon: CheckCircle },
  { title: "Reviews", url: "/reviews", icon: Star },
  { title: "Earnings", url: "/earnings", icon: DollarSign },
  { title: "Profile Management", url: "/profile", icon: User },
  { title: "Service Areas", url: "/service-areas", icon: MapPin },
];

export default function ProDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pro Dashboard</h1>
        <p className="text-muted-foreground">Welcome, service professional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {proLinks.map((link) => (
          <Link key={link.title} to={link.url}>
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
                <link.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  View details
                  <ChevronRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
