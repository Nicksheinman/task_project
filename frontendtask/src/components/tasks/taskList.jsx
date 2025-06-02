import Task from "./task";

function TaskList({data}) {
  const [updateTasks, setUpdateTasks]=[];
  const update=()=>{}
  return (
    <div className="tasksList">
      {data.map((task, key)=>(
        <Task task={task} key={task.id} update={update}/>
      ))}
    </div>
  )
}

export default TaskList;