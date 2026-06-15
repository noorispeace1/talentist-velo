"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import { Person, ArrowRight } from "@gravity-ui/icons";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  const navLinks = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/plans",
    },
  ];

  const DashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  const userDashboardUrl = DashboardLinks[user?.role || "seeker"];

  if (user?.email) {
    navLinks.push({
      label: "Dashboard",
      href: userDashboardUrl,
    });
  }

  // Helper to determine if link is active
  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const roleColors = {
    admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    recruiter: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    seeker: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md shadow-lg shadow-black/20">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-inner group-hover:border-zinc-700 transition-all duration-300">
            <Image
              src="/logo.jpg"
              alt="Talentist-Velo Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="hidden leading-none sm:block">
            <h1 className="text-base font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
              Talentist-Velo
            </h1>
          </div>
        </Link>

        {/* MIDDLE SECTION - Nav Links */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/30 px-2.5 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                      active
                        ? "bg-zinc-800/80 text-white shadow-sm border border-zinc-700/50"
                        : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT SIDE - Auth Action Block */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <div className="flex items-center gap-4">
                
                {/* User Avatar & Session Details */}
                <div className="flex items-center gap-2.5 bg-zinc-900/40 border border-zinc-800/80 rounded-full pl-2.5 pr-4 py-1.5 shadow-md">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Person className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-xs font-semibold text-zinc-200">{user.name}</span>
                    <span className={`inline-block w-fit px-1.5 py-0.5 mt-0.5 rounded text-[9px] font-bold tracking-wider uppercase border ${roleColors[user.role] || roleColors.seeker}`}>
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-red-400 bg-zinc-900/20 hover:bg-red-500/5 border border-zinc-800/80 hover:border-red-950/40 rounded-xl transition-all duration-300"
                >
                  Sign Out
                </button>

                {/* Dashboard Shortcut CTA */}
                <Link
                  href={userDashboardUrl}
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/20 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/10 group/btn"
                >
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>

              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-100 border border-white/20 rounded-xl transition-all duration-300 shadow-lg shadow-white/5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 md:hidden transition-all duration-300"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800/80 bg-zinc-950 md:hidden animate-in slide-in-from-top duration-300">
          <div className="space-y-4 px-4 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-zinc-900 text-white border border-zinc-800"
                          : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-zinc-850 pt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} width={32} height={32} className="object-cover rounded-full" />
                      ) : (
                        <Person className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-sm font-semibold text-zinc-200">{user.name}</span>
                      <span className={`inline-block w-fit px-1.5 py-0.5 mt-0.5 rounded text-[8px] font-bold tracking-wider uppercase border ${roleColors[user.role] || roleColors.seeker}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={userDashboardUrl}
                    className="flex justify-center items-center gap-1.5 px-4 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-sm font-semibold text-zinc-400 hover:text-red-400 bg-zinc-900/30 border border-zinc-800 rounded-xl transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/auth/signin"
                    className="flex justify-center items-center rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/signup"
                    className="flex justify-center items-center rounded-xl px-4 py-3 text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-100 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}