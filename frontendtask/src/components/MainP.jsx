import Tasks from "./tasks/tasks";
import { AuthContext, } from "./user/authContext";
import  Header  from "./header/Header";

import { useState, useContext} from "react";

import AboutUs from "./aboutUs/aboutUs";

import LoginForm from "./user/login"
import { Route, Routes } from "react-router-dom";

export default function MainPage() {
  const [content, setContent]=useState('aboutUs');
  const { isAuthenticated }=useContext(AuthContext);
  console.log(isAuthenticated)
  return (
    <div className="main">

      <Header setContent={setContent} isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<AboutUs/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/login_form" element={<LoginForm/>}/>
      </Routes>
      <div className="content"></div>
    </div>
  );
}
