import { protectedFetch } from "../core/server";

export const getSavedJobs = async (userId) => {
    return protectedFetch(`/api/saved-jobs/${userId}`);
}
