import React from 'react';
import { requireRole } from '@/lib/core/session';
import { getUserList } from '@/lib/api/users';
import { getCompanies } from '@/lib/api/companies';
import { getJobs } from '@/lib/api/jobs';
import Link from 'next/link';
import { Person, Persons, Briefcase, Factory, Gear, ShieldExclamation, ArrowRight } from '@gravity-ui/icons';

const AdminDashboardPage = async () => {
    // 1. Guard route for admin role & get current session
    const user = await requireRole('admin');

    // 2. Fetch statistics with fallback data arrays to ensure uptime
    let users = [];
    let companies = [];
    let jobs = [];

    try {
        const usersData = await getUserList();
        users = usersData?.users || [];
    } catch (e) {
        console.error("Failed to load users:", e);
    }

    try {
        companies = await getCompanies() || [];
    } catch (e) {
        console.error("Failed to load companies:", e);
    }

    try {
        jobs = await getJobs() || [];
    } catch (e) {
        console.error("Failed to load jobs:", e);
    }

    // 3. Compute metrics
    let seekerCount = 0;
    let recruiterCount = 0;
    let adminCount = 0;
    let suspendedCount = 0;

    users.forEach(u => {
        const role = u.role?.toLowerCase();
        if (role === 'seeker') seekerCount++;
        else if (role === 'recruiter') recruiterCount++;
        else if (role === 'admin') adminCount++;

        if (u.banned || u.status === 'Suspended') suspendedCount++;
    });

    let activeCompanies = 0;
    let pendingCompanies = 0;
    companies.forEach(c => {
        if (c.status === 'active') activeCompanies++;
        else pendingCompanies++;
    });

    let activeJobs = 0;
    let closedJobs = 0;
    jobs.forEach(j => {
        if (j.status === 'active' || !j.status) activeJobs++;
        else closedJobs++;
    });

    // 4. Current date formatter
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                {/* 1. Header Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950/40 via-zinc-900/50 to-purple-950/40 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                Admin Control Center
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400">
                                Welcome back, {user?.name || 'Admin'}
                            </h1>
                            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                                {formattedDate} • Platform operations are healthy and all background tasks are running normally.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 text-xs text-zinc-500 border-l border-zinc-800 pl-6 h-fit max-md:border-l-0 max-md:pl-0 max-md:items-start">
                            <span className="text-zinc-400 font-medium">{user?.email}</span>
                            <span>Session Level: <strong className="text-indigo-400 font-semibold uppercase">{user?.role}</strong></span>
                            <span>Systems: <strong className="text-emerald-400 font-semibold">Online</strong></span>
                        </div>
                    </div>
                </div>

                {/* 2. Key Platform Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* Stat Card: Users */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Users</span>
                                <h3 className="text-3xl font-bold text-zinc-100">{users.length}</h3>
                                <p className="text-xs text-zinc-500">
                                    {seekerCount} Seekers • {recruiterCount} Recruiters
                                </p>
                            </div>
                            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 text-zinc-400 group-hover:scale-105 group-hover:text-zinc-200 transition-all">
                                <Persons className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Stat Card: Companies */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Companies</span>
                                <h3 className="text-3xl font-bold text-zinc-100">{companies.length}</h3>
                                <p className="text-xs text-zinc-500">
                                    {activeCompanies} Active • {pendingCompanies} Pending
                                </p>
                            </div>
                            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 text-zinc-400 group-hover:scale-105 group-hover:text-zinc-200 transition-all">
                                <Factory className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Stat Card: Jobs */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Job Posts</span>
                                <h3 className="text-3xl font-bold text-zinc-100">{jobs.length}</h3>
                                <p className="text-xs text-zinc-500">
                                    {activeJobs} Active Listings
                                </p>
                            </div>
                            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 text-zinc-400 group-hover:scale-105 group-hover:text-zinc-200 transition-all">
                                <Briefcase className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Stat Card: Moderation */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Moderation</span>
                                <h3 className={`text-3xl font-bold ${suspendedCount > 0 ? 'text-red-400' : 'text-zinc-100'}`}>
                                    {suspendedCount}
                                </h3>
                                <p className="text-xs text-zinc-500">Suspended Accounts</p>
                            </div>
                            <div className={`p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 group-hover:scale-105 transition-all ${suspendedCount > 0 ? 'text-red-400 border-red-900/30' : 'text-zinc-400'}`}>
                                <ShieldExclamation className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* 3. Quick Actions Control Panel */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-300">Quick Administrative Actions</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Action: Manage Users */}
                        <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 group shadow-md">
                            <div className="space-y-2">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                                    <Person className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-zinc-100 mt-2">Manage Platform Users</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Change user roles between Admin, Recruiter, and Seeker. Suspend violating accounts or activate/delete users permanently.
                                </p>
                            </div>
                            <Link 
                                href="/dashboard/admin/users" 
                                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors w-fit"
                            >
                                Go to User Management <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Action: Moderate Companies */}
                        <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 group shadow-md">
                            <div className="space-y-2">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                                    <Factory className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-zinc-100 mt-2">Moderate Companies</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Review company registration applications, verify enterprise credentials, and update company profiles status list.
                                </p>
                            </div>
                            <Link 
                                href="/dashboard/admin/companies" 
                                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors w-fit"
                            >
                                Go to Company Moderation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Action: Settings */}
                        <div className="relative overflow-hidden border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 group shadow-md">
                            <div className="space-y-2">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                                    <Gear className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-zinc-100 mt-2">Configure Platform</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Access platform configuration parameters, customize SEO tokens, define credit plan structures, and update metadata rules.
                                </p>
                            </div>
                            <Link 
                                href="/dashboard/admin" 
                                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors w-fit cursor-not-allowed opacity-60"
                            >
                                Settings (Under Construction) <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardPage;