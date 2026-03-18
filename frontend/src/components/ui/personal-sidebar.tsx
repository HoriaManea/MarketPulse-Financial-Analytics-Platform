import { Dispatch, SetStateAction, useState } from "react";
import {
  Settings,
  ChevronRight,
  Bell,
  User,
  Menu,
  DollarSign,
  Coins,
  Globe,
  Package,
  TrendingUp,
  Newspaper,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const navigation = [
  { name: "Cryptocurrencies", href: "#", icon: Coins, current: true },
  { name: "Forex", href: "/forexdashboard", icon: Globe, current: false },
  { name: "Commodities", href: "/commodities", icon: Package, current: false },
  { name: "Stocks", href: "/stocks", icon: TrendingUp, current: false },
  { name: "News", href: "/news", icon: Newspaper, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed top-[0.8rem] left-3 z-60 md:hidden">
        <Button
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="!bg-primary hover:!bg-primary rounded-sm text-white"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
      </div>
      {/* Sidebar */}
      <div
        className={cn(
          "bg-background fixed inset-y-0 top-14 left-0 z-50 transform overflow-hidden border-r transition-all duration-500 ease-in-out",
          // On mobile, slide sidebar in/out based on mobileOpen
          "md:translate-x-0",
          mobileOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full",
          collapsed && "w-16 md:w-20",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="hidden items-center justify-between border-b md:flex">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-muted flex w-full cursor-pointer items-center justify-between p-3.5 transition-all duration-500"
            >
              <div
                className={cn(
                  "flex w-full items-center gap-3",
                  collapsed ? "m-auto justify-center" : "justify-start",
                )}
              >
                <DollarSign className="text-primary size-8" />
                {!collapsed && (
                  <h1 className="text-2xl font-medium">FinDash Pro</h1>
                )}
              </div>
              <ChevronRight
                className={cn(
                  "size-5 transition-all duration-500",
                  collapsed ? "hidden" : "block",
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-2 pt-4 md:p-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-sm border border-transparent p-3 text-sm font-medium transition-all duration-300 hover:scale-105",
                  item.current
                    ? "border-primary/30 from-primary/10 text-primary bg-gradient-to-br"
                    : "text-muted-foreground from-primary/10 hover:border-primary/30 hover:text-primary hover:bg-gradient-to-br",
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon
                  className={cn(
                    item.current
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-primary",
                    collapsed ? "mx-auto size-5" : "mr-3 size-5",
                  )}
                />
                {!collapsed && item.name}
              </a>
            ))}
          </nav>

          {/* Mobile user & notification buttons */}
          <nav className="flex flex-col space-y-2 p-2 md:hidden md:p-4">
            <button
              className={cn(
                "group flex items-center rounded-sm border border-transparent px-3 py-3 text-sm font-medium transition-all duration-300 hover:scale-105",
                "border-primary/30 from-primary/10 text-primary bg-gradient-to-br",
              )}
              aria-label="Notifications"
              onClick={() => setMobileOpen(false)}
            >
              <Bell
                className={cn(
                  "text-primary",
                  collapsed ? "mx-auto size-5" : "mr-3 size-5",
                )}
              />
              {!collapsed && "Notifications"}
            </button>
            <button
              className={cn(
                "group flex items-center rounded-sm border border-transparent px-3 py-3 text-sm font-medium transition-all duration-300 hover:scale-105",
                "border-primary/30 from-primary/10 text-primary bg-gradient-to-br",
              )}
              aria-label="Profile"
              onClick={() => setMobileOpen(false)}
            >
              <User
                className={cn(
                  "text-primary",
                  collapsed ? "mx-auto size-5" : "mr-3 size-5",
                )}
              />
              {!collapsed && "Profile"}
            </button>
          </nav>

          {/* Footer */}
          {!collapsed && (
            <div className="h-20 w-full border-t p-5">
              <div className="border-primary/30 from-primary/20 text-primary flex items-center justify-center gap-2 w-full rounded-md border bg-gradient-to-b p-3 text-sm transition hover:bg-primary/10 cursor-pointer">
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
