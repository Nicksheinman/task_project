// import { tasks } from "../data";

export default function Tasks(props) {
  return (<div>
    
    {props.tasks.map((task)=> (
        <div className={task.id} key={task.id}>
            <div className='taskName'>{task.title}</div>
            <div className='taskDescription'>{task.description}</div>
            <div className="status">{task.status}</div>
        </div>
    ))}
  </div>);
}


