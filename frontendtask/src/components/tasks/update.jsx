import { updateTasksAxios, deleteTasksAxios } from "../../api/user/contentAxios"

const Update=({ changedTasks, selectTasks, confirmedTasks, setConfirmedTasks, data, setTasks, setSelectTasks})=> {

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



      const updateAllTasks=async ()=>{
    if (Object.keys(selectTasks).length!==0) {
        let tasksToUpdate={}
        for (let task of Object.values(changedTasks)) {
            if (selectTasks.hasOwnProperty(task.id) &&
             (!confirmedTasks[task.id] ||
              JSON.stringify(task)!==JSON.stringify(confirmedTasks[task.id].data))) {
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
        

    return (
        <div>
            <button onClick={()=>updateAllTasks()}>update</button>
            <button onClick={()=>deleteAllTasks()}>delete</button>
        </div>
    )
}

export default Update