import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./components/user/authContext";

import  MainPage  from "./components/MainP";

function App() {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
      
    
  );
}

export default App;
