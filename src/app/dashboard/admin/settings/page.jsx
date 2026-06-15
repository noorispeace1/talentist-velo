import React from 'react';
import { getSettingsAdminAction } from '@/lib/actions/settings';
import SettingsClient from './SettingsClient.jsx';

export const metadata = {
    title: 'Platform Settings - Admin Dashboard',
    description: 'Manage global platform configurations.',
};

export default async function AdminSettingsPage() {
    const settings = await getSettingsAdminAction();

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Platform Settings</h1>
                <p className="text-zinc-400 mt-2 text-sm">
                    Configure global settings, feature toggles, and appearance.
                </p>
            </div>
            
            <SettingsClient initialData={settings} />
        </div>
    );
}
