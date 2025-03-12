

import { useState } from "react";
import "./header.css"

export default function Header() {
    const date=Date.now()
    const [dateS, setDate]=useState(date);
    setInterval(() => {
     setDate(Date.now())
    }, 500);
    return (
      <header>
        <div className="headerName"><h1>TaskFrenzy</h1></div>
        <div className="HeaderSecond"><span>time={dateS}</span></div>
      </header>
    );
}