"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSettingsAdminAction = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/settings`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Failed to fetch settings", error);
        return null;
    }
}

export const updateSettingsAdminAction = async (data) => {
    const { authHeader } = require("../core/server");
    const headers = await authHeader();
    try {
        const res = await fetch(`${baseUrl}/api/settings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        const { revalidatePath } = require("next/cache");
        revalidatePath("/dashboard/admin/settings");
        return result;
    } catch (error) {
        console.error("Failed to update settings", error);
        return null;
    }
}
