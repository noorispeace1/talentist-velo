'use client';

import React, { useState } from 'react';
import { Table, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { CircleArrowDownFill } from '@gravity-ui/icons';
import { updateBillingAdminAction, deleteBillingAdminAction } from '@/lib/actions/billing';

const PaymentTable = ({ payments }) => {
    const [isProcessing, setIsProcessing] = useState(null);

    const handleUpdateStatus = async (id, status) => {
        setIsProcessing(id);
        const result = await updateBillingAdminAction(id, { status });
        setIsProcessing(null);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this payment record?")) {
            setIsProcessing(id);
            await deleteBillingAdminAction(id);
            setIsProcessing(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusDetails = (status) => {
        switch (status?.toLowerCase()) {
            case 'succeeded':
            case 'completed':
            case 'paid':
            case 'active':
                return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: status || 'Completed' };
            case 'failed':
            case 'canceled':
            case 'rejected':
                return { color: 'text-rose-500', bg: 'bg-rose-500/10', label: status || 'Failed' };
            case 'pending':
            default:
                return { color: 'text-amber-500', bg: 'bg-amber-500/10', label: status || 'Pending' };
        }
    };

    return (
        <div className="w-full bg-[#121214] text-neutral-200 p-6 rounded-lg">
            <Table className="bg-transparent border-none">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Payment management table">
                        <Table.Header>
                            <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Email
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Plan / Item
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Amount
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Status
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                                Date
                            </Table.Column>
                            <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>
                        <Table.Body emptyContent={"No payments found."}>
                            {payments?.map((payment) => {
                                const paymentId = payment._id?.$oid || payment._id;
                                const statusInfo = getStatusDetails(payment.status);

                                return (
                                    <Table.Row key={paymentId} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">
                                        <Table.Cell className="py-4 align-middle">
                                            <div className="font-medium text-neutral-200">{payment.email || 'N/A'}</div>
                                            {payment.stripeSessionId && (
                                                <div className="text-xs text-neutral-500 max-w-[150px] truncate" title={payment.stripeSessionId}>
                                                    {payment.stripeSessionId}
                                                </div>
                                            )}
                                        </Table.Cell>

                                        <Table.Cell className="py-4 align-middle">
                                            <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">
                                                {payment.planId || payment.plan || 'Custom'}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell className="py-4 align-middle">
                                            <div className="font-medium">
                                                ${payment.amount || 0}
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="py-4 align-middle">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusInfo.bg}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.color.replace('text-', 'bg-')}`} />
                                                <span className={`text-xs font-medium capitalize ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="py-4 align-middle text-neutral-400 text-sm">
                                            {formatDate(payment.createdAt?.$date || payment.createdAt)}
                                        </Table.Cell>

                                        <Table.Cell className="py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <Button 
                                                            size="sm" 
                                                            variant="light" 
                                                            className="text-neutral-400 hover:text-neutral-200"
                                                            isLoading={isProcessing === paymentId}
                                                        >
                                                            Update Status
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Status Actions">
                                                        <DropdownItem onClick={() => handleUpdateStatus(paymentId, 'succeeded')} className="text-emerald-500">
                                                            Mark as Succeeded
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleUpdateStatus(paymentId, 'pending')} className="text-amber-500">
                                                            Mark as Pending
                                                        </DropdownItem>
                                                        <DropdownItem onClick={() => handleUpdateStatus(paymentId, 'failed')} className="text-rose-500">
                                                            Mark as Failed
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>

                                                <Button
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    onClick={() => handleDelete(paymentId)}
                                                    className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-3 py-1 text-xs font-medium transition-colors"
                                                    isLoading={isProcessing === paymentId}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default PaymentTable;
