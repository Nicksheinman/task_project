import { updateTasksAxios, deleteTasksAxios } from "../../api/user/contentAxios"

const Update=({updateAllTasks, changedTasks, setSelectTasks, deleteAllTasks, selectOriginal})=> {

        

    return (
        <div>
            <button onClick={()=>updateAllTasks()}>update</button>
            <button onClick={()=>deleteAllTasks()}>delete</button>
        </div>
    )
}

export default Update