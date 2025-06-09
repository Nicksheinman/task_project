import axios from 'axios';

const api=axios.create({
    baseURL: "http://localhost:8000/api/v1/", 
    withCredentials:true
});

api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          await api.post("token/refresh/",{}, { withCredentials:true});
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
    const response=await api.post('token/',{username,password}, { withCredentials:true});
    return response.data
};

const refreshToken=async ()=> {
    const response= await api.post("token/refresh/", {}, { withCredentials:true});
    return response.data.access;
};

const getTask=async ()=> {
    const response=await api.get('task/');
    return response.data;
}

const updateTasks=  (tasks)=> {
    const response=async ()=> {
      for (const task in tasks) {
        const responseTask= await api.put('task/')
      }
    }
}

const postTask=async (json)=> {
  const response= await api.post("task/", json);
  return response
}

const authCheck=async ()=> {
  const response=await api.post('/token/check/' , {}, { withCredentials:true})
  if (response.data["isAuthenticated"]===true) {return true}
  else {return false}
}
export { login, refreshToken, getTask, postTask, authCheck };

export default api;