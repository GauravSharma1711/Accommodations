import { ApiError } from "../utils/api-error.js";

export const shouldBeLoggedIn = async()=>{
const token = req.cookies.token;
if(!token){
    throw new ApiError(403,"Not authenticated")
}
}

export const shouldBeAdmin = async()=>{
    
}