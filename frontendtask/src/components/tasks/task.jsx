import { useState } from "react";


function Task({task, update}) {
        const [titleC, setTitle]=useState(task.title);
        const [textaC, setTextarea]=useState(task.description);
        const [status, setStatus]=useState(task.status);
        const [select, setSelect]=useState(false);
        const original= {
                title:task.title,
                description:task.description,
                status:task.status
        };
        const newT={};
        const changedTask=()=> {
                if (titleC!==original.title) {newT.title=titleC};
                if (titleC!==original.title) {newT.description=textaC};
                if (titleC!==original.title) {newT.status=status};
                return newT
        };
        const handleCheckbox=()=>{
                if (select===true) {
                        changedTask();
                        update(newT);
                }
        }
        return (
                <div className="task" key={task.id} id={task.id}>
                        <input className="taskName" type="text" value={titleC} onChange={e=>setTitle(e.target.value)}/>
                        <textarea className="taskDescription" id="" value={textaC} onChange={e=>setTextarea(e.target.value)}></textarea>
                        <input type="checkbox" name="" checked={status} onChange={e=>setStatus(e.target.checked)} /> status
                        <input type="checkbox" name="" checked={select} onChange={e=>setSelect(e.target.checked)} /> select
                        <div className="status"></div>
                </div>)
}

export default Task;