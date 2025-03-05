import Task from "./task";

function TaskList({data}) {
  return (
    <div className="tasksList">
      {data.map((task, key)=>(
        <Task task={task} key={task.id}/>
      ))}
    </div>
  )
}

export default TaskList;