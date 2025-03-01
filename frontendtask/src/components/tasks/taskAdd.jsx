


function TaskAdd({setNewTask, addTask, newTask}) {
    return (
        
    <div className="taskAdd">
      <input type="text" placeholder="Put here name of task!" id="title" onChange={e=>setNewTask({...newTask, title:e.target.value})}/>
      <textarea placeholder="Put here description of task!" id="description" onChange={e=>setNewTask({...newTask, description:e.target.value})}></textarea>
      {/* <input type="checkbox" id="status" {}/> chose here if the task is completed! */}
      <button onClick={addTask}>Add</button>
    </div>
    )
}

export default TaskAdd;
