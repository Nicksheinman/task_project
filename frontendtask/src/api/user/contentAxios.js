import axios from 'axios';

const api=axios.create({
    baseURL:"http://127.0.0.1:8000/api/v1/",
    withCredentials:true
});

api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          await api.post("token/refresh/");
          return api(originalRequest);
  
        } catch (refreshError) {
          console.error("error with updating token", refreshError);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

const login=async(username,password)=> {
    const response=await api.post('token/',{username,password});
    return response.data
};

const refreshToken=async ()=> {
    const response= await api.post("token/refresh/");
    return response.data.acсess;
};

const getTask=async ()=> {
    const response=await api.get('task/');
    return response.data;
}

export { login, refreshToken, getTask };

export default api;