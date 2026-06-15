"use server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "../auth"

export const updateUserRole = async (userId, role) => {
    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role
        },
        headers: await headers()
    })
    revalidatePath('/dashboard/admin/users');
    return data
}

export const banUserAction = async (userId) => {
    const data = await auth.api.banUser({
        body: {
            userId: userId
        },
        headers: await headers()
    })
    revalidatePath('/dashboard/admin/users');
    return data
}

export const unbanUserAction = async (userId) => {
    const data = await auth.api.unbanUser({
        body: {
            userId: userId
        },
        headers: await headers()
    })
    revalidatePath('/dashboard/admin/users');
    return data
}

export const deleteUserAction = async (userId) => {
    const data = await auth.api.removeUser({
        body: {
            userId: userId
        },
        headers: await headers()
    })
    revalidatePath('/dashboard/admin/users');
    return data
}