"use client";

import { Bell, Search } from "lucide-react";

export default function TopBar() {
  return (
    <div className="gd-topbar">
      <div className="gd-search-wrap">
        <Search size={16} className="gd-search-icon" />
        <input
          type="text"
          placeholder="Search.."
          className="gd-search-input"
        />
      </div>
      <div className="gd-topbar-right">
        <Bell size={20} className="gd-bell-icon" />
        <span className="gd-notif-text">Notifications</span>
      </div>
    </div>
  );
}
