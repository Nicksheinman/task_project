import { useContext, useState } from "react";
import { AuthContext } from "./authContext";


function LoginForm() {
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(email, password);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">enter</button>
      </form>
    );
  }
  
export default LoginForm; 