import { useContext, useState } from "react";
import { AuthContext } from "./authContext";

function LoginForm() {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(username, password);
    };
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">enter</button>
      </form>
    )
  }
  
export default LoginForm;