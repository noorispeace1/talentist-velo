"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const saveBillingRecord = async (billingData) => {
    try {
        const res = await fetch(`${baseUrl}/api/billing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billingData)
        });
        return res.json();
    } catch (error) {
        console.error("Failed to save billing record", error);
        return null;
    }
}

export const getBillingHistory = async (email) => {
    try {
        const res = await fetch(`${baseUrl}/api/billing/${email}`, {
            // Add cache: 'no-store' to ensure we get fresh billing data
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Failed to fetch billing history", error);
        return [];
    }
}

export const updateBillingAdminAction = async (id, data) => {
    const { authHeader } = require("../core/server");
    const headers = await authHeader();
    try {
        const res = await fetch(`${baseUrl}/api/billing/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        const { revalidatePath } = require("next/cache");
        revalidatePath("/dashboard/admin/payments");
        return result;
    } catch (error) {
        console.error("Failed to update billing record", error);
        return null;
    }
}

export const deleteBillingAdminAction = async (id) => {
    const { authHeader } = require("../core/server");
    const headers = await authHeader();
    try {
        const res = await fetch(`${baseUrl}/api/billing/${id}`, {
            method: 'DELETE',
            headers
        });
        const result = await res.json();
        const { revalidatePath } = require("next/cache");
        revalidatePath("/dashboard/admin/payments");
        return result;
    } catch (error) {
        console.error("Failed to delete billing record", error);
        return null;
    }
}

export const getAdminBillingHistory = async () => {
    const { authHeader } = require("../core/server");
    const headers = await authHeader();
    try {
        const res = await fetch(`${baseUrl}/api/billing`, {
            headers,
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Failed to fetch admin billing history", error);
        return [];
    }
}
