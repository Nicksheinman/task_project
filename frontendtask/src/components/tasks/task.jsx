import { useEffect, useState, useRef } from "react";


function Task({task, updateList, tasksList, updateSingle, deleteSingle, changeRefs}) {
        const [id]=useState(task.id);
        const [titleC, setTitle]=useState(task.title);
        const [textaC, setTextarea]=useState(task.description);
        const [status, setStatus]=useState(task.status);
        const [select, setSelect]=useState(false);

        const original= useRef({
                id:task.id,
                title:task.title,
                description:task.description,
                status:task.status
        });
        const changedTask=()=> {
                const newT={id:task.id,};
                if (titleC!==original.title) {newT.title=titleC};
                if (textaC!==original.description) {newT.description=textaC};
                if (status!==original.status) {newT.status=status};
                return newT
        };
 
        useEffect(()=>{
                const newT={id:task.id,};
                if (titleC!==original.current.title) {newT.title=titleC};
                if (textaC!==original.current.description) {newT.description=textaC};
                if (status!==original.current.status) {newT.status=status};
                if (Object.keys(newT).length>1) {tasksList(newT)}
        }, [titleC, textaC, status])

        const changeTask=(value, type)=> {
                if (type==="title") {
                        setTitle(value);
                }
                if (type==="description") {
                        setTextarea(value);
                }
                if (type==="status") {
                        setStatus(value);
                }
        }

        const handleCheckbox=()=>{
                const newT=changedTask();              
                updateList(newT, original);
             
        }
        
        return (
                <div className="task" key={task.id} id={task.id}>
                        <input className="taskName" type="text" value={titleC} onChange={e=>{
                                let type="title";
                                let value=e.target.value;
                                changeTask(value, type);}}/>
                        <textarea className="taskDescription" id="" value={textaC} onChange={e=>{
                                let type="description";
                                let value=e.target.value;
                                changeTask(value, type);}}></textarea>
                        <input type="checkbox" name="" checked={status} onChange={e=>{
                                let type="status";
                                let value=e.target.checked;
                                changeTask(value, type);}} /> status
                        <input type="checkbox" name="" checked={select} onChange={e=>{
                                setSelect(e.target.checked);                             
                                handleCheckbox();
                                }} />select
                        <input type="button" value="update" onClick={()=>{updateSingle(original.id, original)}} />
                        <input type="button" value="delete" onClick={()=>{deleteSingle(original.id)}} />
                </div>)
}

export default Task;