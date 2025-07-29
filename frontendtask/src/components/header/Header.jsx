import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../user/authContext";
import "./header.css"

export default function Header() {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
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
        {!isAuthenticated && (<button onClick={e=>navigate('/register_form')}>Register</button>)}
        {isAuthenticated && (<button onClick={e=>{handleLogout()}}>Logout</button>)}
        {/* <button onClick={e=>setContent('login')}>Login</button> */}
        
      </header>
    );
}