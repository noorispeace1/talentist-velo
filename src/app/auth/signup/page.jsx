import React, { Suspense } from 'react';
import SignupPage from './SignUpPage';

const page = () => {
    return (
        <div>
            <Suspense fallback={<p>loading</p>}><SignupPage></SignupPage></Suspense>
        </div>
    );
};

export default page;