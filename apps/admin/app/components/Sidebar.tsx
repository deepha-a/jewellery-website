"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Grid,
  Boxes,
  ShoppingCart,
  Users,
  Ticket,
  Star,
  BarChart3,
  Image,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Categories", icon: Grid, path: "/categories" },
  { name: "Inventory", icon: Boxes, path: "/inventory" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Coupons", icon: Ticket, path: "/coupons" },
  { name: "Reviews", icon: Star, path: "/reviews" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Banners", icon: Image, path: "/banners" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="gd-sidebar">
      <div className="gd-sidebar-header">
        <div className="gd-logo">GlowDrape</div>
      </div>

      <nav className="gd-nav">
        {navItems.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path || pathname.startsWith(path + "/");
          return (
            <Link
              key={name}
              href={path}
              className={`gd-nav-item${isActive ? " gd-nav-item-active" : ""}`}
            >
              <Icon size={20} className={isActive ? "gd-icon-active" : "gd-icon"} />
              <span className="gd-nav-text">{name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="gd-footer" aria-hidden>
        <div className="gd-user-card">
          <div className="gd-user-avatar">A</div>
          <div className="gd-user-info">
            <div className="gd-user-name">Admin</div>
            <div className="gd-user-email">admin@glowdrape.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
