import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, BookOpen, GraduationCap, Users, BarChart3, FileText, Plus, Award, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { clearUser } from "@/store/userSlice";

const LMSNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const [isOpen, setIsOpen] = useState(false);

    const role = user?.role || 'student'; // From store

    if (user.loading || !user.uid) {
        return null;
    }

    const studentTabs = [
        { name: 'Dashboard', path: '/student-dashboard', icon: GraduationCap },
        { name: 'My Courses', path: '/student-my-courses', icon: BookOpen },
        { name: 'Certificates', path: '/student-certificates', icon: 'award' },
        { name: 'Community', path: '/student-community', icon: 'users' },
        { name: 'Settings', path: '/student-settings', icon: Settings },
    ];

    const instructorTabs = [
        { name: 'Dashboard', path: '/instructor-dashboard', icon: GraduationCap },
        { name: 'My Courses', path: '/instructor-my-courses', icon: BookOpen },
        { name: 'Create Course', path: '/instructor-create-course', icon: Plus },
        { name: 'Analytics', path: '/instructor-analytics', icon: BarChart3 },
        { name: 'Settings', path: '/instructor-settings', icon: Settings },
    ];

    const adminTabs = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: GraduationCap },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Instructors', path: '/admin-instructors', icon: User },
        { name: 'Courses', path: '/admin-courses', icon: BookOpen },
        { name: 'Reports', path: '/admin-reports', icon: FileText },
        { name: 'Settings', path: '/admin-settings', icon: Settings },
    ];

    const tabs = role === 'student' ? studentTabs : role === 'instructor' ? instructorTabs : adminTabs;

    const handleLogout = async () => {
        dispatch(clearUser());
        navigate('/signin');
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink to={`/${role}-dashboard`} className="flex items-center gap-2">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Upskill Academy
                        </div>
                    </NavLink>

                    <nav className="hidden md:flex items-center gap-1">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.path}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                    }`
                                }
                            >
                                <tab.icon className="h-4 w-4 inline mr-1" />
                                {tab.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-1" />
                            Logout
                        </Button>
                        <Button onClick={() => navigate(`/${role}-settings`)} variant="outline">
                            <User className="h-4 w-4 mr-1" />
                            {user.email}
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </Button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 border-t">
                        <div className="flex flex-col gap-2 px-4 py-4">
                            {tabs.map((tab) => (
                                <NavLink
                                    key={tab.path}
                                    to={tab.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    {tab.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default LMSNavbar;

