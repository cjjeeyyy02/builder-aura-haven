import { Search, Bell, Settings, Menu, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const handleNotificationsClick = () => {
    alert('Notifications:\n• 3 new messages\n• 2 pending approvals\n• 1 system update');
  };

  const handleSettingsClick = () => {
    alert('Settings panel coming soon!\nFeatures:\n• Profile Settings\n• System Preferences\n• Security Options');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm = formData.get('search') as string;
    if (searchTerm.trim()) {
      alert(`Searching for: "${searchTerm}"\n\nSearch functionality coming soon!`);
    }
  };

  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
                {/* Left side - Mobile hamburger menu */}
                <div className="flex items-center gap-4">
                    <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" className="px-3 py-2 border-gray-300">
            <Menu className="w-4 h-4" />
          </Button>

          <div className="max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                name="search"
                placeholder="Search employee, task..."
                className="pl-10 bg-white border-gray-300 w-80"
              />
            </form>
          </div>
        </div>

                {/* Spacer */}
        <div className="flex-1"></div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleNotificationsClick}>
            <Bell className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleSettingsClick}>
            <Settings className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gray-800 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => alert('Profile page coming soon!')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert('Logout functionality coming soon!')}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
