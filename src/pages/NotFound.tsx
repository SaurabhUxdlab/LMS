import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 flex items-center justify-center p-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <CardTitle className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">404</CardTitle>
          <p className="text-muted-foreground">Page not found.</p>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
