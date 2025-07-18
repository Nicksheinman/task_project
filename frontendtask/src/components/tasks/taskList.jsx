import { useState, useRef } from "react";
import Task from "./task";
import Update from "./update";



function TaskList({data, setTasks}) {
  const [selectTasks, setSelectTasks]=useState({});
  const [selectOriginal, setSelectOriginal]=useState({})
  const [changedTasks, setChangedTasks]=useState({});
  const [confirmedTasks, setConfirmedTasks] = useState({});
  
  const tasksList=(newT)=>{
    setChangedTasks(prev=>{
      return {...prev, [newT.id]:newT}
    })
  }

  const updateList=(newT, original)=>{
    setSelectTasks(prev => {
      const exist=prev[newT.id];
      const idTask=newT.id
      if (exist) {
        setSelectOriginal(prev=>{
          const updatedO = { ...prev };
          delete updatedO[newT.id];
          return updatedO;
        })
        const updated = { ...prev };
        delete updated[newT.id];
        return updated;
      } else {
        setSelectOriginal(prev=>{
          return {...prev, [idTask]:original}
        })
        return {...prev, [idTask]:newT}
      }});}   
  
    
  return (
    <div className="tasksList">
      {data.map((task, key)=>(
        <Task task={task} key={task.id} updateList={updateList} tasksList={tasksList} data={data} selectTasks={selectTasks} setTasks={setTasks}  setSelectTasks={setSelectTasks} changedTasks={changedTasks} confirmedTask={confirmedTasks} setConfirmedTasks={setConfirmedTasks}/>
      ))}
      <Update selectTasks={selectTasks} setSelectTasks={setSelectTasks} setTasks={setTasks}  changedTasks={changedTasks} selectOriginal={selectOriginal} confirmedTasks={confirmedTasks} setConfirmedTasks={setConfirmedTasks} data={data}/>
    </div>)}

export default TaskList;