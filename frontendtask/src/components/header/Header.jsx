
import { useContext, useState } from "react";
import "./header.css"

export default function Header({setContent, isAuthenticated}) {
    const date=Date.now()
    const [dateS, setDate]=useState(date);
    setInterval(() => {
     setDate(Date.now())
    }, 500);
    return (
      <header>
        <div className="headerName"><h1>TaskFrenzy</h1></div>
        <div className="HeaderSecond"><span>time={dateS}</span></div>
        <button onClick={e=>setContent('aboutUs')}>About us</button>
        {isAuthenticated && (<button onClick={e=>setContent('tasks')}>Tasks</button>)}
        {isAuthenticated && (<button onClick={e=>setContent('account')}>Account</button>)}
        {!isAuthenticated && (<button onClick={e=>setContent('login')}>Login</button>)}
        {/* <button onClick={e=>setContent('login')}>Login</button> */}
        
      </header>
    );
}