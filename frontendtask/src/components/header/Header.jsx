

import { useState } from "react";
import "./header.css"

export default function Header({setContent}) {
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
        <button onClick={e=>setContent('tasks')}>Tasks</button>
        <button onClick={e=>setContent('login')}>Login</button>

      </header>
    );
}