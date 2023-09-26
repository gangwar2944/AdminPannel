import { publicRequest } from "../Auth/requestMethods";


export const loginUser=async (user)=>{
      const res = await publicRequest.post('/auth/authenticate', user);
      return res.data;
}