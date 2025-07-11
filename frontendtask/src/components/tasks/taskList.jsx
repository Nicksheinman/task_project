import { useState } from "react";
import Task from "./task";
import Update from "./update";
import { updateTasksAxios, deleteTasksAxios } from "../../api/user/contentAxios";


function TaskList({data, setTasks}) {
  const [selectTasks, setSelectTasks]=useState({});
  const [changedTasks, setChangedTasks]=useState({});

  const tasksList=(newT)=>{
    setChangedTasks(prev=>{
      return {...prev, [newT.id]:newT}
    })
  }


  const updateList=(newT)=>{
    setSelectTasks(prev => {
      const exist=prev[newT.id];
      const idTask=newT.id
      if (exist) {
        const updated = { ...prev };
        delete updated[newT.id];
        return updated;
      } else {
        return {...prev, [idTask]:newT}
      }
    });
  }   
  
  const updateSingle=(id)=> {
    for (let task of Object.values(changedTasks)) {
      if (task.id===id) {
        updateTasksAxios({id:task})
      }
    }
  }
  
  const deleteSingle=(id)=>{
    for (let task of data) {
      if (task.id===id) {
        deleteTasksAxios({id:task})
        setTasks(prev=>prev.filter(task=>task.id!==id))
        for (let taskSelecect in selectTasks) {
          if (taskSelecect.id===task.id) { setSelectTasks(prev=>prev.filter(task=>task.id!==id))}
        }
      }
    }}
  
  const deleteAllTasks=()=>{
      let deleteTask={...data};
      let taskToDelete={...selectTasks}
      if (Object.keys(deleteTask).length!==0) {
          const resultDelete= deleteTasksAxios(taskToDelete)
          for (const id of resultDelete) {
              prev.filter(task => !resultDelete.includes(task.id))}}
          setSelectTasks({})
          return deleteTask
      }
    
  return (
    <div className="tasksList">
      {data.map((task, key)=>(
        <Task task={task} key={task.id} updateList={updateList} tasksList={tasksList} updateSingle={updateSingle} deleteSingle={deleteSingle}/>
      ))}
      <Update selectTasks={selectTasks} setSelectTasks={setSelectTasks} changedTasks={changedTasks} deleteAllTasks={deleteAllTasks}/>
    </div>
  )
  }

export default TaskList;