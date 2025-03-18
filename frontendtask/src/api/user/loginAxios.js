import axios from 'axios';

const api=axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/",
    withCredentials:true
});

export const login=async(email,password)=> {
    const response=await api.post('token/',{email,password});
    return response.data
};

export const refreshToken=async ()=> {
    const response= await api.post("token/refresh/");
    return response.data.acсess;
};

export const getTask=async (acessToken)=> {
    const response=await api.get('task/',{
        headers:{Authorization: `bearer${acessToken}`}
    });
    return response.data;
}

export default api;