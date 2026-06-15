import React from 'react';
import EditJobForm from './EditJobForm';
import { getJobById } from '@/lib/api/jobs';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Edit Job - Talentist Velo',
    description: 'Update your job posting.',
};

export default async function EditJobPage({ params }) {
    const { id } = await params;
    const jobData = await getJobById(id);

    if (!jobData) {
        redirect('/dashboard/recruiter/jobs');
    }

    return (
        <div className="w-full bg-zinc-950 text-white min-h-screen">
            <EditJobForm jobData={jobData} />
        </div>
    );
}
