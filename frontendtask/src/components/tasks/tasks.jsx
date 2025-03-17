
import { useState } from "react";
import TaskAdd from "./taskAdd";
import TaskList from "./taskList";
import { data } from "../../data";

function Tasks() {
  const [tasks, setTasks]=useState(data);
  const [newTask, setNewTask]=useState({title:'',description:'',status:false});
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

