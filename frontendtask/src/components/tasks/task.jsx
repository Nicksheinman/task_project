

function Task({task}) {
    return (
        <div className="task" key={task.id}>
                <input className="taskName" type="text" value={task.title}/>
                <textarea className="taskDescription" id="">{task.description}</textarea>
                <input type="checkbox" name=""/>
                <div className="status">{task.status}</div>
        </div>)
}

export default Task;