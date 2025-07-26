import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/user/authContext";
import { useEffect } from "react";
import  MainPage  from "./components/MainP";

function App() {
  
  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  };

   useEffect(() => {
    const csrf = getCookie("csrftoken");
    if (!csrf) {
      fetch("http://localhost:8000/api/v1/csrf/", {
        credentials: "include",
      }).then(() => {
        console.log("CSRF token initialized");
      }).catch(err => {
        console.error("CSRF fetch failed:", err);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <MainPage />
      </AuthProvider>
    </BrowserRouter>   
  );
}

export default App;
