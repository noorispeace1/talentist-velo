import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async (queryString) =>{
    return serverFetch(queryString ? `/api/jobs?${queryString}` : "/api/jobs");
}
export const getJobById = async (jobId) => {    
    console.log(jobId);
    return serverFetch(`/api/jobs/${jobId}`);
}   

export const getCompanyJobs = async (companyId,status="active") => {
    console.log("Fetching jobs for companyId:", companyId, "with status:", status);
 const res = await fetch (`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
 return res.json();
}