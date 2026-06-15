
import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const authHeader = async () => {
    const token = await getUserToken();
    console.log({token});
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`,
        {
             headers: await authHeader()
        }
    );
    // handle 401, 404, 403
    return  handleStatusCode(res);
}
export const protectedFetch = async(path) =>{
const res = await fetch(`${baseUrl}${path}`,
{
                headers: await authHeader()

}

)
 return  handleStatusCode(res);
}


export const serverMutation = async (path, data, method = 'POST') => {
    const token = await authHeader()
    console.log({token});
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403
return handleStatusCode(res)
}

const handleStatusCode = res => {
    if(res.status === 401){
    redirect('/unauthorized')
}
else if (res.status === 403){
    redirect('/unauthorized')
}
    return res.json();
}

