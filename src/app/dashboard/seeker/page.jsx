import React from 'react';
import { requireRole } from '@/lib/core/session';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getPlanById } from '@/lib/api/plans';
import Link from 'next/link';
import { Briefcase, CreditCard, Rocket, ArrowRight } from '@gravity-ui/icons';

const SeekerDashboardPage = async () => {
    // 1. Guard route for seeker role & get current session
    const user = await requireRole('seeker');

    // 2. Fetch data with fallbacks
    let applications = [];
    let plan = { name: "Free Tier", maxApplicationsPerMonth: 5 };

    try {
        applications = await getApplicationsByApplicant(user.id) || [];
    } catch (e) {
        console.error("Failed to load applicant applications:", e);
    }

    try {
        plan = await getPlanById(user.plan || 'seeker_free');
    } catch (e) {
        console.error("Failed to load plan metrics:", e);
    }

    const applicationCount = applications.length;
    const remainingQuota = Math.max(plan.maxApplicationsPerMonth - applicationCount, 0);
    const usagePercentage = Math.min((applicationCount / plan.maxApplicationsPerMonth) * 100, 100);

    // Format relative time helper for recent list
    const formatRelativeTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };

    // Get status badge colors
    const getStatusStyle = (status) => {
        const norm = status?.toLowerCase() || 'applied';
        switch (norm) {
            case 'shortlisted':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'review':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'rejected':
                return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default:
                return 'bg-zinc-800 text-zinc-300 border-zinc-700';
        }
    };

    // Slice last 3 applications for display
    const recentApplications = applications.slice(0, 3);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                {/* 1. Header Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-zinc-900/50 to-indigo-950/40 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                Candidate Dashboard
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400">
                                Welcome back, {user?.name || 'Seeker'}
                            </h1>
                            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                                Keep track of your applications, update your parameters details, and browse new jobs matching your skills.
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 text-xs text-zinc-500 border-l border-zinc-800 pl-6 h-fit max-md:border-l-0 max-md:pl-0 max-md:items-start">
                            <span className="text-zinc-400 font-medium">{user?.email}</span>
                            <span>Current Plan: <strong className="text-blue-400 font-semibold uppercase">{plan.name}</strong></span>
                            <span>Job Hunt Status: <strong className="text-emerald-400 font-semibold">Active</strong></span>
                        </div>
                    </div>
                </div>

                {/* 2. Quota Usage & Statistics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left 2 Columns: Quota Status Card */}
                    <div className="lg:col-span-2 border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 shadow-lg space-y-6 flex flex-col justify-between">
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                Monthly Application Limit
                            </span>
                            <h2 className="text-xl font-bold text-zinc-200">
                                You have used <span className="text-blue-400 font-extrabold">{applicationCount}</span> of your <span className="text-zinc-400 font-bold">{plan.maxApplicationsPerMonth}</span> submissions
                            </h2>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-2">
                            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500`}
                                    style={{ width: `${usagePercentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-zinc-500 font-medium select-none">
                                <span>{Math.round(usagePercentage)}% Used</span>
                                <span>{remainingQuota} Applications remaining</span>
                            </div>
                        </div>

                        {/* Upsell box */}
                        <div className="flex items-center justify-between gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl text-xs text-zinc-400 leading-normal">
                            <div className="flex items-center gap-3">
                                <Rocket className="w-5 h-5 text-blue-400 shrink-0" />
                                <span>Need more credits? Upgrade your subscription plan at any time.</span>
                            </div>
                            <Link 
                                href="/plans" 
                                className="whitespace-nowrap bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg font-semibold transition"
                            >
                                View Plans
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Mini Statistics Card */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 shadow-lg flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Activity Summary</span>
                            <div className="divide-y divide-zinc-800">
                                <div className="py-2.5 flex justify-between text-sm">
                                    <span className="text-zinc-400 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-zinc-500" />
                                        Total Applications
                                    </span>
                                    <span className="font-bold text-zinc-200">{applicationCount}</span>
                                </div>
                                <div className="py-2.5 flex justify-between text-sm">
                                    <span className="text-zinc-400 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-zinc-500" />
                                        Payment Tier
                                    </span>
                                    <span className="font-bold text-blue-400">{plan.name}</span>
                                </div>
                            </div>
                        </div>

                        <Link 
                            href="/jobs"
                            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold border border-zinc-700/50 flex items-center justify-center gap-1.5 transition"
                        >
                            Browse Jobs <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                </div>

                {/* 3. Recent Applications List & Quick Actions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left: Recent Applications */}
                    <div className="lg:col-span-2 border border-zinc-800 bg-zinc-900/10 rounded-2xl p-6 shadow-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-base font-bold text-zinc-300">Recent Applications</h3>
                            <Link href="/dashboard/seeker/applications" className="text-xs font-semibold text-blue-400 hover:underline">
                                View All
                            </Link>
                        </div>

                        {recentApplications.length === 0 ? (
                            <div className="p-8 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                                You haven&apos;t applied to any jobs yet.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentApplications.map((app,index) => (
                                    <div key={app._id?.$oid + index|| app.jobId + index} className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-zinc-750 transition-colors">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-zinc-200">{app.jobTitle}</h4>
                                            <p className="text-xs text-zinc-500">{app.companyName} • Applied {formatRelativeTime(app.createdAt?.$date || app.createdAt)}</p>
                                        </div>
                                        <span className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase border rounded-full ${getStatusStyle(app.status)}`}>
                                            {app.status || 'Applied'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Quick Actions */}
                    <div className="border border-zinc-800 bg-zinc-900/10 rounded-2xl p-6 shadow-md space-y-4">
                        <h3 className="text-base font-bold text-zinc-300">Quick Links</h3>
                        
                        <div className="flex flex-col gap-3">
                            <Link 
                                href="/jobs" 
                                className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/60 transition group"
                            >
                                <span className="text-xs font-medium text-zinc-300">Explore Open Roles</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            
                            <Link 
                                href="/dashboard/seeker/applications" 
                                className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/60 transition group"
                            >
                                <span className="text-xs font-medium text-zinc-300">Track Applications Status</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            
                            <Link 
                                href="/plans" 
                                className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/60 transition group"
                            >
                                <span className="text-xs font-medium text-zinc-300">Billing & Premium Plans</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SeekerDashboardPage;
