import { protectedFetch } from "../core/server";

export const getApplicationsByApplicant = async (applicantId) => {
return protectedFetch(`/api/applications/applicant?applicantId=${applicantId}`);
}