
import { useEffect, useState } from "react";
import TaskAdd from "./taskAdd";
import TaskList from "./taskList";
import { getTask } from "../../api/user/contentAxios";


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
  
  const addTask=()=>{
    if (!newTask.title.trim()) return;
    const createTask={
      id: Date.now(),
      title:newTask.title,
      description:newTask.description,
      status:false
    }
   
    setTasks([...tasks, createTask]);
    setNewTask({ title: "", description: "", status: false });
  }
  return (
    <div className="tasksManager">
      <TaskList data={tasks} />
      <TaskAdd setNewTask={setNewTask}  addTask={addTask} newTask={newTask}/>
    </div>
  )
}

export default Tasks;

