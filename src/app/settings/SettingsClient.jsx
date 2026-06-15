"use client";

import React, { useState } from "react";
import { Button, Input, toast, Switch } from "@heroui/react";
import { Person, ShieldCheck, Bell, Palette, ArrowRight, CreditCard } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SettingsClient({ initialUser, billingHistory = [] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile State
  const [name, setName] = useState(initialUser?.name || "");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    try {
      const { data, error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      return toast.error("Please fill in all password fields.");
    }
    
    setIsUpdatingPassword(true);
    try {
      const { data, error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password.");
      } else {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleMockSave = (e) => {
    e.preventDefault();
    toast.success("Preferences saved successfully!");
  };

  const inputClasses = "bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition w-full";

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 animate-in fade-in duration-700">
      
      {/* Settings Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-3 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "profile" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"}`}
          >
            <Person className="w-5 h-5" />
            Profile Details
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "security" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"}`}
          >
            <ShieldCheck className="w-5 h-5" />
            Security
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "notifications" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"}`}
          >
            <Bell className="w-5 h-5" />
            Notifications
          </button>
          <button 
            onClick={() => setActiveTab("appearance")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "appearance" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"}`}
          >
            <Palette className="w-5 h-5" />
            Appearance
          </button>
          <button 
            onClick={() => setActiveTab("billing")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "billing" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"}`}
          >
            <CreditCard className="w-5 h-5" />
            Billing History
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Profile Details</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-xl">
              
              <div className="flex items-center gap-5 pb-6 border-b border-zinc-800/80">
                <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-2xl font-bold text-zinc-400">
                  {initialUser?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Profile Picture</h3>
                  <p className="text-sm text-zinc-500 mb-2">Update your avatar via Gravatar.</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className={inputClasses}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Email Address (Read Only)</label>
                <input 
                  type="email" 
                  value={initialUser?.email || ""} 
                  readOnly
                  className={`${inputClasses} opacity-60 cursor-not-allowed`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Account Role</label>
                <div className="flex items-center">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
                    {initialUser?.role || "USER"}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isUpdatingProfile}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11"
                >
                  Save Profile
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Security & Password</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-xl">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  className={inputClasses}
                  placeholder="Enter your current password"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className={inputClasses}
                  placeholder="Enter your new password"
                />
                <p className="text-xs text-zinc-500 mt-1">Must be at least 8 characters long.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  isLoading={isUpdatingPassword}
                  className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
            <form onSubmit={handleMockSave} className="space-y-8 max-w-xl">
              
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
                <div>
                  <h3 className="text-base font-medium text-white">Email Alerts</h3>
                  <p className="text-sm text-zinc-500">Receive emails for application updates and messages.</p>
                </div>
                <Switch defaultSelected color="secondary" />
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
                <div>
                  <h3 className="text-base font-medium text-white">New Job Matches</h3>
                  <p className="text-sm text-zinc-500">Weekly digest of roles that match your profile.</p>
                </div>
                <Switch defaultSelected color="secondary" />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11">
                  Save Preferences
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Appearance</h2>
            <form onSubmit={handleMockSave} className="space-y-8 max-w-xl">
              
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-medium text-white">Theme Preference</h3>
                  <p className="text-sm text-zinc-500">Select your preferred workspace theme.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-purple-500 bg-zinc-950 rounded-xl p-4 cursor-pointer relative">
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-purple-500 border border-zinc-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <div className="h-16 rounded-md bg-zinc-900 mb-2"></div>
                    <p className="text-sm font-medium text-white text-center">Dark Mode</p>
                  </div>
                  <div className="border border-zinc-800 bg-zinc-800/20 rounded-xl p-4 cursor-not-allowed opacity-50 relative">
                    <div className="h-16 rounded-md bg-zinc-200 mb-2"></div>
                    <p className="text-sm font-medium text-white text-center">Light Mode <span className="text-[10px] text-zinc-400 block">(Coming Soon)</span></p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-zinc-800/80">
                <Button type="submit" className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11">
                  Save Appearance
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Billing History</h2>
            <div className="max-w-3xl">
              <div className="mb-6">
                <h3 className="text-base font-medium text-white">Transaction Log</h3>
                <p className="text-sm text-zinc-500">Review your past plan purchases and invoices.</p>
              </div>

              {billingHistory.length === 0 ? (
                <div className="text-center py-12 bg-zinc-950/50 rounded-xl border border-zinc-800/80">
                  <CreditCard className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                  <h3 className="text-zinc-300 font-medium mb-1">No transactions yet</h3>
                  <p className="text-sm text-zinc-500">You haven&apos;t made any purchases.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="text-xs uppercase bg-zinc-950 text-zinc-500">
                      <tr>
                        <th scope="col" className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Date</th>
                        <th scope="col" className="px-4 py-3">Plan</th>
                        <th scope="col" className="px-4 py-3">Amount</th>
                        <th scope="col" className="px-4 py-3 rounded-tr-lg rounded-br-lg">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((record) => (
                        <tr key={record._id} className="border-b border-zinc-800/60 last:border-none hover:bg-zinc-800/20 transition-colors">
                          <td className="px-4 py-4 font-medium text-zinc-300">
                            {new Date(record.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </td>
                          <td className="px-4 py-4">
                            <span className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-full border border-zinc-700">
                              {record.planId}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-zinc-200">
                            ${parseFloat(record.amount).toFixed(2)} {record.currency || 'USD'}
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 text-xs px-2 py-0.5 rounded-full capitalize">
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
