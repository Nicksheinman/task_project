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

const updateTasksAxios=(tasks)=> {
  let response_obj={};
  for (let task of Object.values(tasks)) {
    let responseTask=  api.patch(`task/${task.id}/`,task)
    response_obj={...response_obj, [task.id]:responseTask}
  }
  console.log(response_obj)
  return response_obj
}

const deleteTasksAxios=(tasks)=> {
  let response_obj={};
  let deletedId=[]
  for (const task of Object.values(tasks)) {
    let responseTask=  api.delete(`task/${task.id}/`,task)
    .then(deletedId=[...deletedId, task.id])
  }
  return deletedId
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

export {login, refreshToken, getTask, postTask, authCheck, updateTasksAxios, deleteTasksAxios};

export default api;