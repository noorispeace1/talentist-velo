"use client";

import React, { useState } from "react";
import { Switch, Button, toast, Card } from "@heroui/react";
import { Settings, Shield, Globe, Save } from "lucide-react";
import { updateSettingsAdminAction } from "@/lib/actions/settings";
import { useRouter } from "next/navigation";

export default function SettingsClient({ initialData }) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        platformName: initialData?.platformName || "Talentist Velo",
        supportEmail: initialData?.supportEmail || "support@talentist.com",
        currency: initialData?.currency || "USD",
        enableSignups: initialData?.enableSignups ?? true,
        enableJobPosting: initialData?.enableJobPosting ?? true,
        requireAdminApproval: initialData?.requireAdminApproval ?? false,
        maintenanceMode: initialData?.maintenanceMode ?? false,
        metaTitle: initialData?.metaTitle || "Talentist Velo - Discover Your Next Challenge",
        metaDescription: initialData?.metaDescription || "Find jobs and hire top talent securely."
    });

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await updateSettingsAdminAction(formData);
            if (res) {
                toast.success("Settings saved successfully!");
                router.refresh();
            } else {
                toast.error("Failed to save settings.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 relative">
            {/* Custom Tabs Header */}
            <div className="flex w-full border-b border-zinc-800 gap-6">
                <button
                    onClick={() => setActiveTab("general")}
                    className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                        activeTab === "general" 
                        ? "border-violet-500 text-violet-400" 
                        : "border-transparent text-zinc-400 hover:text-zinc-300"
                    }`}
                >
                    <Settings className="w-4 h-4" />
                    <span>General Configuration</span>
                </button>
                <button
                    onClick={() => setActiveTab("features")}
                    className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                        activeTab === "features" 
                        ? "border-violet-500 text-violet-400" 
                        : "border-transparent text-zinc-400 hover:text-zinc-300"
                    }`}
                >
                    <Shield className="w-4 h-4" />
                    <span>Feature Controls</span>
                </button>
                <button
                    onClick={() => setActiveTab("seo")}
                    className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                        activeTab === "seo" 
                        ? "border-violet-500 text-violet-400" 
                        : "border-transparent text-zinc-400 hover:text-zinc-300"
                    }`}
                >
                    <Globe className="w-4 h-4" />
                    <span>SEO & Meta</span>
                </button>
            </div>

            {/* Custom Tabs Content */}
            <div className="mt-4">
                {activeTab === "general" && (
                    <Card className="border border-zinc-800 bg-zinc-900/50 shadow-none rounded-[24px]">
                        <div className="p-8 gap-8 flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-zinc-400 font-medium text-sm mb-2 block">Platform Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Talentist Velo"
                                        value={formData.platformName}
                                        onChange={(e) => handleChange("platformName", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-3 text-zinc-200 outline-none transition-colors shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-400 font-medium text-sm mb-2 block">Support Email</label>
                                    <input
                                        type="email"
                                        placeholder="support@domain.com"
                                        value={formData.supportEmail}
                                        onChange={(e) => handleChange("supportEmail", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-3 text-zinc-200 outline-none transition-colors shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-400 font-medium text-sm mb-2 block">Default Currency</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. USD"
                                        value={formData.currency}
                                        onChange={(e) => handleChange("currency", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-3 text-zinc-200 outline-none transition-colors shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === "features" && (
                    <Card className="border border-zinc-800 bg-zinc-900/50 shadow-none rounded-[24px]">
                        <div className="p-8 gap-8 flex flex-col">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                                    <div>
                                        <h4 className="text-zinc-200 font-medium text-base">Enable New Signups</h4>
                                        <p className="text-zinc-500 text-sm mt-1">Allow new job seekers and recruiters to register.</p>
                                    </div>
                                    <Switch 
                                        isSelected={formData.enableSignups} 
                                        onValueChange={(val) => handleChange("enableSignups", val)}
                                        color="success"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                                    <div>
                                        <h4 className="text-zinc-200 font-medium text-base">Enable Job Posting</h4>
                                        <p className="text-zinc-500 text-sm mt-1">Allow verified recruiters to post new jobs.</p>
                                    </div>
                                    <Switch 
                                        isSelected={formData.enableJobPosting} 
                                        onValueChange={(val) => handleChange("enableJobPosting", val)}
                                        color="success"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                                    <div>
                                        <h4 className="text-zinc-200 font-medium text-base">Require Admin Approval</h4>
                                        <p className="text-zinc-500 text-sm mt-1">Manually approve new companies before they can post jobs.</p>
                                    </div>
                                    <Switch 
                                        isSelected={formData.requireAdminApproval} 
                                        onValueChange={(val) => handleChange("requireAdminApproval", val)}
                                        color="warning"
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                    <div>
                                        <h4 className="text-rose-400 font-medium text-base">Maintenance Mode</h4>
                                        <p className="text-rose-500/70 text-sm mt-1">Take the site offline for visitors (Admins can still access).</p>
                                    </div>
                                    <Switch 
                                        isSelected={formData.maintenanceMode} 
                                        onValueChange={(val) => handleChange("maintenanceMode", val)}
                                        color="danger"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {activeTab === "seo" && (
                    <Card className="border border-zinc-800 bg-zinc-900/50 shadow-none rounded-[24px]">
                        <div className="p-8 gap-8 flex flex-col">
                            <div className="flex flex-col gap-8">
                                <div>
                                    <label className="text-zinc-400 font-medium text-sm mb-2 block">Global Meta Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Talentist Velo - Hire the Best"
                                        value={formData.metaTitle}
                                        onChange={(e) => handleChange("metaTitle", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-3 text-zinc-200 outline-none transition-colors shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-400 font-medium text-sm mb-2 block">Global Meta Description</label>
                                    <input
                                        type="text"
                                        placeholder="Describe your platform for search engines..."
                                        value={formData.metaDescription}
                                        onChange={(e) => handleChange("metaDescription", e.target.value)}
                                        className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-3 text-zinc-200 outline-none transition-colors shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {/* Sticky Save Bar */}
            <div className="sticky bottom-6 z-50 flex justify-end mt-4">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                    <p className="text-zinc-400 text-sm mr-4">Don&apos;t forget to save your changes.</p>
                    <Button
                        color="primary"
                        isLoading={isSaving}
                        onPress={handleSave}
                        className="bg-violet-600 hover:bg-violet-500 font-semibold shadow-lg shadow-violet-500/20"
                        startContent={!isSaving && <Save className="w-4 h-4" />}
                    >
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}
