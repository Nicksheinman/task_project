import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./header.css"

export default function Header({setContent, isAuthenticated}) {
    const date=Date.now()
    const [dateS, setDate]=useState(date);
    const navigate = useNavigate();
    setInterval(() => {
     setDate(Date.now())
    }, 500);
    return (
      <header>
        <div className="headerName"><h1>TaskFrenzy</h1></div>
        <div className="HeaderSecond"><span>time={dateS}</span></div>
        <button onClick={e=>navigate('/')}>About us</button>
        {isAuthenticated && (<button onClick={e=>navigate('/tasks')}>Tasks</button>)}
        {isAuthenticated && (<button onClick={e=>navigate('/account')}>Account</button>)}
        {!isAuthenticated && (<button onClick={e=>navigate('/login_form')}>Login</button>)}
        {/* <button onClick={e=>setContent('login')}>Login</button> */}
        
      </header>
    );
}