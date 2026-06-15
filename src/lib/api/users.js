// import { headers } from "next/headers";
// import { auth } from "../auth";

// export const getUserList = async() =>{
//     const { data: users, error } = await auth.api.listUsers({
//     query: {
      
//         sortBy: "createdAt",
//         sortDirection: "desc"
        
//     },
//     headers: await headers(),
// });
// console.log(users);
// console.log(error);
// return users;
// }
import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserList = async () => {
    const users = await auth.api.listUsers({
        query: {
            sortBy: "createdAt",
            sortDirection: "desc"
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    console.log(users);
    return users;
}