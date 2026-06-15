import React from 'react';
import { requireRole } from '@/lib/core/session';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';
import { getCompanyJobs } from '@/lib/api/jobs';
import Link from 'next/link';
import { Briefcase, Factory, ShieldExclamation, ArrowRight, Thunderbolt, CircleInfo } from '@gravity-ui/icons';

const RecruiterDashboardHomePage = async () => {
    // 1. Guard route for recruiter role & get current session
    const user = await requireRole('recruiter');

    // 2. Fetch data with fallbacks
    let company = null;
    let jobs = [];

    try {
        company = await getLoggedInRecruiterCompany();
    } catch (e) {
        console.error("Failed to load recruiter company:", e);
    }

    if (company?._id) {
        try {
            jobs = await getCompanyJobs(company._id) || [];
        } catch (e) {
            console.error("Failed to load company jobs:", e);
        }
    }

    // 3. Compute stats
    const totalJobs = jobs.length;
    let activeJobs = 0;
    let closedJobs = 0;

    jobs.forEach(j => {
        if (j.status?.toLowerCase() === 'active') {
            activeJobs++;
        } else {
            closedJobs++;
        }
    });

    const isCompanyActive = company?.status === 'active';

    // Format relative time helper for recent list
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    };

    // Slice last 3 jobs for display
    const recentJobs = jobs.slice(0, 3);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                
                {/* 1. Header Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-zinc-900/50 to-zinc-900/40 border border-zinc-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Recruiter Console
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400">
                                Welcome back, {user?.name || 'Recruiter'}
                            </h1>
                            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                                {company ? (
                                    <>Managing recruitment operations for <strong className="text-zinc-200">{company.name}</strong>.</>
                                ) : (
                                    <>Please configure your company profile to start posting jobs.</>
                                )}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 text-xs text-zinc-500 border-l border-zinc-800 pl-6 h-fit max-md:border-l-0 max-md:pl-0 max-md:items-start">
                            <span className="text-zinc-400 font-medium">{user?.email}</span>
                            <span>Company Status: <strong className={isCompanyActive ? "text-emerald-400 font-semibold uppercase" : "text-amber-400 font-semibold uppercase"}>
                                {company?.status || 'Pending Verification'}
                            </strong></span>
                            <span>Operations: <strong className="text-emerald-400 font-semibold">Active</strong></span>
                        </div>
                    </div>
                </div>

                {/* 2. Platform Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* Stat Card: Total Job Posts */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Job Posts</span>
                                <h3 className="text-3xl font-bold text-zinc-100">{totalJobs}</h3>
                                <p className="text-xs text-zinc-500">Historical publications</p>
                            </div>
                            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 text-zinc-400 group-hover:scale-105 group-hover:text-zinc-200 transition-all">
                                <Briefcase className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Stat Card: Active Jobs */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Active Jobs</span>
                                <h3 className="text-3xl font-bold text-emerald-400">{activeJobs}</h3>
                                <p className="text-xs text-zinc-500">Currently open listings</p>
                            </div>
                            <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-900/30 text-emerald-400 group-hover:scale-105 transition-all">
                                <Thunderbolt className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Stat Card: Closed Jobs */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Jobs Closed</span>
                                <h3 className="text-3xl font-bold text-zinc-400">{closedJobs}</h3>
                                <p className="text-xs text-zinc-500">Archived positions</p>
                            </div>
                            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 text-zinc-400 group-hover:scale-105 transition-all">
                                <CircleInfo className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Stat Card: Verification Tier */}
                    <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Company Status</span>
                                <h3 className={`text-xl font-bold mt-2.5 capitalize ${isCompanyActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {company?.status || 'Unverified'}
                                </h3>
                                <p className="text-xs text-zinc-500">System verification status</p>
                            </div>
                            <div className={`p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 group-hover:scale-105 transition-all ${isCompanyActive ? 'text-emerald-400 border-emerald-900/30' : 'text-zinc-400'}`}>
                                <Factory className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* 3. Setup Warn Block if Company profile not configured */}
                {!company && (
                    <div className="flex items-center justify-between gap-4 bg-amber-950/20 border border-amber-900/40 p-4 rounded-xl text-sm text-amber-300">
                        <div className="flex items-center gap-3">
                            <ShieldExclamation className="w-5 h-5 text-amber-400 shrink-0" />
                            <span>You haven&apos;t set up your company details yet. You need to create a company profile before you can post jobs.</span>
                        </div>
                        <Link 
                            href="/dashboard/recruiter/company" 
                            className="bg-amber-600 hover:bg-amber-500 text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap"
                        >
                            Set Up Profile
                        </Link>
                    </div>
                )}

                {/* 4. Recent Jobs & Quick Action Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left: Recent Job Posts */}
                    <div className="lg:col-span-2 border border-zinc-800 bg-zinc-900/10 rounded-2xl p-6 shadow-md space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-base font-bold text-zinc-300">Recently Posted Jobs</h3>
                            <Link href="/dashboard/recruiter/jobs" className="text-xs font-semibold text-emerald-400 hover:underline">
                                Manage Jobs
                            </Link>
                        </div>

                        {recentJobs.length === 0 ? (
                            <div className="p-8 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                                You haven&apos;t posted any jobs yet.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentJobs.map((job) => (
                                    <div key={job._id?.$oid || job._id} className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-zinc-750 transition-colors">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-zinc-200">{job.jobTitle}</h4>
                                            <p className="text-xs text-zinc-500">
                                                {job.jobType} • {job.isRemote ? "Remote" : job.location} • Posted {formatDate(job.createdAt?.$date || job.createdAt)}
                                            </p>
                                        </div>
                                        <span className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase border rounded-full ${
                                            job.status?.toLowerCase() === 'active' 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                        }`}>
                                            {job.status || 'Active'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Quick Links */}
                    <div className="border border-zinc-800 bg-zinc-900/10 rounded-2xl p-6 shadow-md space-y-4">
                        <h3 className="text-base font-bold text-zinc-300">Quick Operations</h3>
                        
                        <div className="flex flex-col gap-3">
                            <Link 
                                href="/dashboard/recruiter/jobs/new" 
                                className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/60 transition group"
                            >
                                <span className="text-xs font-medium text-zinc-300">Post a New Position</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            
                            <Link 
                                href="/dashboard/recruiter/jobs" 
                                className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/60 transition group"
                            >
                                <span className="text-xs font-medium text-zinc-300">Manage Job Listings</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            
                            <Link 
                                href="/dashboard/recruiter/company" 
                                className="flex justify-between items-center p-3.5 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-900/60 transition group"
                            >
                                <span className="text-xs font-medium text-zinc-300">Configure Company Info</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RecruiterDashboardHomePage;