import { useState } from "react";


function Task({task, updateList}) {
        const [id]=useState(task.id);
        const [titleC, setTitle]=useState(task.title);
        const [textaC, setTextarea]=useState(task.description);
        const [status, setStatus]=useState(task.status);
        const [select, setSelect]=useState(false);
        const original= {
                title:task.title,
                description:task.description,
                status:task.status
        };
        const changedTask=()=> {
                const newT={id:task.id,};
                if (titleC!==original.title) {newT.title=titleC};
                if (textaC!==original.description) {newT.description=textaC};
                if (status!==original.status) {newT.status=status};
                return newT
        };
        const handleCheckbox=()=>{
                const newT=changedTask();
                if (Object.keys(newT).length>1) {
                        updateList(newT);
                }
        }
        
        return (
                <div className="task" key={task.id} id={task.id}>
                        <input className="taskName" type="text" value={titleC} onChange={e=>setTitle(e.target.value)}/>
                        <textarea className="taskDescription" id="" value={textaC} onChange={e=>setTextarea(e.target.value)}></textarea>
                        <input type="checkbox" name="" checked={status} onChange={e=>setStatus(e.target.checked)} /> status
                        <input type="checkbox" name="" checked={select} onChange={e=>{
                                setSelect(e.target.checked);
                                const check=e.target.checked;
                                if (check) {
                                        handleCheckbox()
                                }
                                }} /> select
                        <div className="status"></div>
                </div>)
}

export default Task;