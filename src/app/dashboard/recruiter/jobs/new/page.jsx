import React from 'react'
import PostJobPage from './PostJobForm'
import { getLoggedInRecruiterCompany } from '@/lib/api/companies'


export default async function page() {
const company = await getLoggedInRecruiterCompany();
    return (
        <div>
            <PostJobPage company={company}></PostJobPage>
        </div>
    )
}