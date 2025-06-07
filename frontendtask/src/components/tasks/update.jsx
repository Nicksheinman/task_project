

const Update=({updateTasks})=> {
    const updateAllTasks=()=>{
        console.log(updateTasks)
    }
    return (
        <button onClick={()=>updateAllTasks()}>update</button>
    )
}

export default Update