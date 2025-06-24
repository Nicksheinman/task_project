import { updateTasksAxios } from "../../api/user/contentAxios"

const Update=({updateTasks})=> {
    const updateAllTasks=()=>{
        const resultUpdate= updateTasksAxios(updateTasks);
        console.log(resultUpdate);
        return resultUpdate
    }
    return (
        <button onClick={()=>updateAllTasks()}>update</button>
    )
}

export default Update