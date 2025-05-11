import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/user/authContext";

import  MainPage  from "./components/MainP";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainPage />
      </AuthProvider>
    </BrowserRouter>   
  );
}

export default App;
