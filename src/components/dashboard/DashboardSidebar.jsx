"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { 
  LayoutSideContentLeft, 
  Bell, 
  Briefcase, 
  Envelope, 
  Gear, 
  House, 
  Magnifier, 
  Person, 
  Bookmark, 
  FileText, 
  CreditCard 
} from "@gravity-ui/icons";
import { Building, Users } from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/jobs", label: "Jobs" },
    { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
    { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "Users" },
    { icon: Building, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinksMap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || 'seeker'];

  // Helper to determine if link is active
  const isLinkActive = (href) => {
    return pathname === href;
  };

  const navContent = (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const active = isLinkActive(item.href);
        return (
          <Link
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 border ${
              active
                ? "bg-zinc-900 border-zinc-800/80 text-white shadow-inner font-bold"
                : "text-zinc-400 hover:text-zinc-200 border-transparent hover:bg-zinc-900/40"
            }`}
            href={item.href}
          >
            <item.icon className={`w-4 h-4 transition-colors ${active ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-350"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-md p-4 lg:flex flex-col justify-between">
      <div className="space-y-6">
        <div className="px-3 py-2 border-b border-zinc-900/60 pb-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
            {user?.role ? `${user.role} Console` : 'Console'}
          </span>
          {user?.name && (
            <span className="text-xs font-medium text-zinc-300 truncate block mt-1">
              {user.name}
            </span>
          )}
        </div>
        {navContent}
      </div>
    </aside>
  );
}