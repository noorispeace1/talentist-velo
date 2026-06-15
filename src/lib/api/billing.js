import { protectedFetch } from "../core/server";

export const getAllBillingAdmin = async () => {
    return protectedFetch(`/api/billing`);
};

export const deleteBillingAdmin = async (id) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { authHeader } = require("../core/server");
    const headers = await authHeader();
    const res = await fetch(`${baseUrl}/api/billing/${id}`, {
        method: 'DELETE',
        headers
    });
    return res.json();
};

export const updateBillingAdmin = async (id, data) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { authHeader } = require("../core/server");
    const headers = await authHeader();
    const res = await fetch(`${baseUrl}/api/billing/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(data)
    });
    return res.json();
};
