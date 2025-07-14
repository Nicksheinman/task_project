import { useEffect, useState, useRef } from "react";
import Task from "./task";
import Update from "./update";
import { updateTasksAxios, deleteTasksAxios } from "../../api/user/contentAxios";


function TaskList({data, setTasks}) {
  const [selectTasks, setSelectTasks]=useState({});
  const [selectOriginal, setSelectOriginal]=useState({})
  const [changedTasks, setChangedTasks]=useState({});
  const [confirmedTasks, setConfirmedTasks] = useState({});
  
  useEffect(()=>{
    console.log(confirmedTasks)
  }, [confirmedTasks])

  const tasksList=(newT)=>{
    setChangedTasks(prev=>{
      return {...prev, [newT.id]:newT}
    })
  }

  useEffect(()=> {
    console.log(selectOriginal)
  }, [selectOriginal])

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
  
  const updateAllTasks=async ()=>{
    if (Object.keys(selectTasks).length!==0) {
        let tasksToUpdate={}
        for (let task of Object.values(changedTasks)) {
            if (selectTasks.hasOwnProperty(task.id) &&
             (!confirmedTasks[task.id] ||
              JSON.stringify(task)!==JSON.stringify(confirmedTasks[130].data))) {
                tasksToUpdate[task.id]=task;
            }
        }
        if (Object.keys(tasksToUpdate).length>0) {
            const resultUpdate=await updateTasksAxios(tasksToUpdate);
            for (let id in resultUpdate) {
              setConfirmedTasks(prev=>{
                return {...prev, [Number(id)] :resultUpdate[id]}
              })
            }
            return resultUpdate}
        }
      }
        

  const deleteSingle=(id)=>{
    for (let task of data) {
      if (task.id===id) {
        deleteTasksAxios({id:task})
        setTasks(prev=>prev.filter(task=>task.id!==id))
        let updateSelect={...selectTasks}
        for (let taskSelecect in updateSelect) {
          if (id===Number(taskSelecect))
            delete updateSelect[taskSelecect]
        }
        setSelectTasks(updateSelect)
      }
    }}
  
  const deleteAllTasks=()=>{
      let deleteTask={...data};
      let taskToDelete={...selectTasks}
      if (Object.keys(deleteTask).length!==0) {
          const resultDelete= deleteTasksAxios(taskToDelete)
          for (const id of resultDelete) {
            setTasks(prev =>
              prev.filter(task => !resultDelete.includes(task.id))
            )}}
          setSelectTasks({})
          return deleteTask
      }
    const changeRefs = useRef({});
  return (
    <div className="tasksList">
      {data.map((task, key)=>(
        <Task task={task} key={task.id} updateList={updateList} tasksList={tasksList} updateSingle={updateSingle} deleteSingle={deleteSingle} changedCheck={false} changeRefs={(changeRefs.current[task.id] = { current: false })}/>
      ))}
      <Update selectTasks={selectTasks} setSelectTasks={setSelectTasks} changedTasks={changedTasks} deleteAllTasks={deleteAllTasks} selectOriginal={selectOriginal} updateAllTasks={updateAllTasks}/>
    </div>
  )
  }

export default TaskList;