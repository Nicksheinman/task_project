import { updateTasksAxios, deleteTasksAxios } from "../../api/user/contentAxios"

const Update=({selectTasks, changedTasks, setSelectTasks, deleteAllTasks})=> {
    const updateAllTasks=()=>{
        if (Object.keys(selectTasks).length!==0) {
            let tasksToUpdate={}
            for (let task of Object.values(changedTasks)) {
                if (selectTasks.hasOwnProperty(task.id)) {
                    tasksToUpdate[task.id]=task;
                }
            }
            if (Object.keys(tasksToUpdate).length>0) {
                const resultUpdate= updateTasksAxios(tasksToUpdate);
                return resultUpdate}
            }
            return null
        }        

    return (
        <div>
            <button onClick={()=>updateAllTasks()}>update</button>
            <button onClick={()=>deleteAllTasks()}>delete</button>
        </div>
    )
}

export default Update