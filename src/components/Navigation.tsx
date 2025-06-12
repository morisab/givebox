import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  Home,
  MessageCircle,
  Package,
  History,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  // Simulate logged in state - in real app, this would come from auth context/store
  const isLoggedIn = true;
  const currentUser = {
    name: "Budiman",
    avatar: "/placeholder.svg",
  };

  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/donasi", label: "Donasi", icon: Package },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/bagi", label: "Bagi", icon: Plus },
    { path: "/riwayat", label: "Riwayat", icon: History },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-gray-900">GiftBox</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Link to="/profil/me">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/masuk">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link to="/daftar">
                  <Button size="sm">Daftar</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around py-2 border-t">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
