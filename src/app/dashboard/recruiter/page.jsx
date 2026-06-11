"use client"
import StatsGrid from '@/components/dashboard/StatsGrid';
import { useSession } from '@/lib/auth-client';

import { Briefcase, Persons, Thunderbolt,Check } from '@gravity-ui/icons';
import React from 'react';

const RecruiterDashboardHomePage = () => {
    
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div>Loading...</div>
    }
    const RecruiterStats = [
        { title: "Total Job Posts", value: 48, icon: Briefcase },
        { title: "Total Applicants", value: 1284, icon: Persons },
        { title: "Active Jobs", value: 18, icon: Thunderbolt, iconBgColor: "bg-amber-500/10", iconColor: "text-amber-400" },
        { title: "Jobs Closed", value: 32, icon: Check, iconBgColor: "bg-emerald-500/10", iconColor: "text-emerald-400" }
    ];
    const user = session?.user;
    console.log("Session data in RecruiterDashboardHomePage:", session);
    return (
        <div>
            <h2 className='text-2xl font-bold'>Welcome back,{user?.name}</h2>
            <StatsGrid data={RecruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;