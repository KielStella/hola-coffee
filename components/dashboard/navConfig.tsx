import {
  LayoutDashboard,
  ShoppingBag,
  QrCode,
  Gift,
  Coffee,
  Users,
  UserCog,
  MessageSquare,
  Settings,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminNavItems: DashboardNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "QR Scanner", href: "/admin/scanner", icon: QrCode },
  { label: "Menu", href: "/admin/menu", icon: Coffee },
  { label: "Rewards", href: "/admin/rewards", icon: Gift },
  { label: "Staff", href: "/admin/staff", icon: UserCog },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Activity Log", href: "/admin/logs", icon: ScrollText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const staffNavItems: DashboardNavItem[] = [
  { label: "Dashboard", href: "/staff-portal", icon: LayoutDashboard },
  { label: "Orders", href: "/staff-portal/orders", icon: ShoppingBag },
  { label: "QR Scanner", href: "/staff-portal/scanner", icon: QrCode },
  { label: "Messages", href: "/staff-portal/messages", icon: MessageSquare },
];
