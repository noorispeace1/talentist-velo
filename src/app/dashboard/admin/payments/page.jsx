import React from 'react';
import { getAdminBillingHistory } from '@/lib/actions/billing';
import AdminPaymentsClient from './AdminPaymentsClient';

export const metadata = {
    title: 'Payment Management - Admin Dashboard',
    description: 'Manage all platform payments.',
};

export default async function AdminPaymentsPage() {
    const billingHistory = await getAdminBillingHistory();

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Payment Management</h1>
                <p className="text-zinc-400 mt-2 text-sm">
                    View and manage all user subscriptions, payments, and billing records.
                </p>
            </div>
            
            <AdminPaymentsClient initialData={billingHistory} />
        </div>
    );
}
