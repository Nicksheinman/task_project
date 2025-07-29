import { useState, useContext } from "react";
import { AuthContext } from "./authContext";


export default function Register_form() {
    const { handleRegister } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSecond, setPasswordSecond] = useState("");
    const handelSubmit=(e)=>{
        e.preventDefault();
        if (password===passwordSecond) {handleRegister()}
    }
    return (
      <form onSubmit={''}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="password" value={passwordSecond} onChange={(e) => setPasswordSecond(e.target.value)} placeholder="Please enter password again" required />
        <button type="submit">register</button>
      </form>
    )
}