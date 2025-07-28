import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UserPlus,
  FileText,
  BarChart3,
  Image,
  DollarSign,
  UserMinus,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    label: "DASHBOARD",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    id: "onboarding",
    label: "ONBOARDING",
    icon: UserPlus,
    path: "/onboarding",
  },
  {
    id: "records",
    label: "RECORDS",
    icon: FileText,
    path: "/records",
  },
  {
    id: "performance",
    label: "PERFORMANCE",
    icon: BarChart3,
    path: "/performance",
  },
  {
    id: "media-resources",
    label: "MEDIA RESOURCES",
    icon: Image,
    path: "/media-resources",
  },
  {
    id: "payroll",
    label: "PAYROLL",
    icon: DollarSign,
    path: "/payroll",
  },
  {
    id: "offboarding",
    label: "OFFBOARDING",
    icon: UserMinus,
    path: "/offboarding",
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative z-50 md:z-auto w-64 min-h-screen bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6">
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <div className="space-y-1">
              <h1 className="text-sm font-bold text-gray-900 tracking-wide">
                AI2AIM WORKSPACE
              </h1>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  EMPLOYEE MANAGEMENT SYSTEM
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-gray-500"
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
