import React, { Suspense } from 'react';
import SigninPage from './SignInPage';

const page = () => {
    return (
        <div>
     <Suspense fallback={<p>Loading</p>}><SigninPage></SigninPage></Suspense> 
        </div>
    );
};

export default page;