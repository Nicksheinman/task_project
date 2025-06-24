import { useState } from "react";
import Task from "./task";
import Update from "./update";
import { useEffect } from "react";
function TaskList({data}) {
  const [updateTasks, setUpdateTasks]=useState([]);
  const updateList=(newT)=>{
    setUpdateTasks(prev => {
      const exist=prev[newT.id];
      if (exist) {
        const updated = { ...prev };
        delete updated[newT.id];
        return updated;
      } else {
        return [...prev, newT]
      }
    });
  }
   useEffect(() => {
    console.log("updated updateTasks:", updateTasks);
  }, [updateTasks]);
  return (
    <div className="tasksList">
      {data.map((task, key)=>(
        <Task task={task} key={task.id} updateList={updateList}/>
      ))}
      <Update updateTasks={updateTasks}/>
    </div>
  )
}

export default TaskList;