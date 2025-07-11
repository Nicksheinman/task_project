
import { useEffect, useState } from "react";
import TaskAdd from "./taskAdd";
import TaskList from "./taskList";
import { getTask } from "../../api/user/contentAxios";
import { postTask } from "../../api/user/contentAxios";


function Tasks() {
  const [tasks, setTasks]=useState([]);
  const [newTask, setNewTask]=useState({title:'',description:'',status:false});
    useEffect(()=>{
    async function fetchTask() {
      try {
        const response= await getTask();
        setTasks(response);
      } catch (error) {
        console.error("error:", error);
      }
    }
    fetchTask();
  },[])
  
  const addTask= async ()=>{
    if (!newTask.title.trim()) {
      alert("Please enter a task title!");
      return;}
    const createTask={
      title:newTask.title,
      description:newTask.description,
      status:false
    }
    const post=await postTask(createTask)
    try {
        const response= await getTask();
        setTasks(response);
      } catch (error) {
        console.error("error:", error);
      }
    setNewTask({ title: "", description: "", status: false });
  }

  return (
    <div className="tasksManager">
      <TaskList data={tasks} setTasks={setTasks}/>
      <TaskAdd setNewTask={setNewTask}  addTask={addTask} newTask={newTask}/>
    </div>
  )
}

export default Tasks;
