import { useState } from "react";


function Task({task}) {
        const [titleC, setTitle]=useState(task.title);
        const [textaC, setTextarea]=useState(task.description);
        const [checkB, setCheck]=useState(task.status);
        return (
                <div className="task" key={task.id}>
                        <input className="taskName" type="text" value={titleC} onChange={e=>setTitle(e.target.value)}/>
                        <textarea className="taskDescription" id="" value={textaC} onChange={e=>setTextarea(e.target.value)}></textarea>
                        <input type="checkbox" name="" checked={checkB} onChange={e=>setCheck(e.target.checked)} />
                        <div className="status"></div>
                </div>)
}

export default Task; 