"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createJob = async(newJobData) =>{
    const res =  await fetch(`${baseUrl}/api/jobs`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newJobData)       
    });
    return res.json();
}

export const toggleSavedJob = async (userId, jobId) => {
    const res = await fetch(`${baseUrl}/api/saved-jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, jobId })
    });
    return res.json();
}

export const deleteJob = async (id) => {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
        method: 'DELETE',
    });
    return res.json();
}

export const updateJob = async (id, updatedJobData) => {
    const res = await fetch(`${baseUrl}/api/jobs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJobData)
    });
    return res.json();
}