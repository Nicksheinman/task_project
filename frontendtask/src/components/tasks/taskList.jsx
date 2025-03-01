import Task from "./task";

function TaskList({data}) {
  return (
    <div className="tasksList">
      {data.map((task)=>(
        <Task task={task}/>
      ))}
    </div>
  )
}

export default TaskList;