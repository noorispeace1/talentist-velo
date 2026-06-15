"use client";

import React, { useState } from "react";
import { Button, toast } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { updateBillingAdminAction, deleteBillingAdminAction } from "@/lib/actions/billing";
import { useRouter } from "next/navigation";

export default function AdminPaymentsClient({ initialData }) {
    const router = useRouter();
    const [payments, setPayments] = useState(initialData || []);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpdateStatus = async (id, newStatus) => {
        setIsProcessing(true);
        try {
            const res = await updateBillingAdminAction(id, { status: newStatus });
            if (res) {
                toast.success("Payment status updated");
                setPayments(payments.map(p => p._id === id ? { ...p, status: newStatus } : p));
                router.refresh();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this billing record?")) return;
        setIsProcessing(true);
        try {
            const res = await deleteBillingAdminAction(id);
            if (res) {
                toast.success("Record deleted");
                setPayments(payments.filter(p => p._id !== id));
                router.refresh();
            } else {
                toast.error("Failed to delete record");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsProcessing(false);
        }
    };

    if (payments.length === 0) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center shadow-xl">
                <p className="text-zinc-500">No payment records found.</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="text-xs uppercase bg-zinc-950 border-b border-zinc-800 text-zinc-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">Date</th>
                            <th scope="col" className="px-6 py-4">User Email</th>
                            <th scope="col" className="px-6 py-4">Plan ID</th>
                            <th scope="col" className="px-6 py-4">Amount</th>
                            <th scope="col" className="px-6 py-4">Status</th>
                            <th scope="col" className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                        {payments.map((record) => (
                            <tr key={record._id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-300">
                                    {new Date(record.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-4 text-zinc-200">
                                    {record.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-md border border-zinc-700">
                                        {record.planId}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-emerald-400 font-medium">
                                    ${parseFloat(record.amount).toFixed(2)} {record.currency || 'USD'}
                                </td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={record.status}
                                        onChange={(e) => handleUpdateStatus(record._id, e.target.value)}
                                        disabled={isProcessing}
                                        className={`text-xs px-2 py-1 rounded-md border outline-none cursor-pointer disabled:opacity-50 ${
                                            record.status === 'paid' 
                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                : record.status === 'failed'
                                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                        }`}
                                    >
                                        <option value="paid" className="bg-zinc-900 text-emerald-400">Paid</option>
                                        <option value="pending" className="bg-zinc-900 text-amber-400">Pending</option>
                                        <option value="failed" className="bg-zinc-900 text-rose-400">Failed</option>
                                        <option value="refunded" className="bg-zinc-900 text-zinc-400">Refunded</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        isLoading={isProcessing}
                                        onPress={() => handleDelete(record._id)}
                                        className="bg-transparent text-rose-400 hover:bg-rose-500/10 rounded-lg"
                                        aria-label="Delete Record"
                                    >
                                        <TrashBin className="w-4 h-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
