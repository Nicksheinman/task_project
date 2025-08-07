import Tasks from "./tasks/tasks";
import { AuthContext, } from "./user/authContext";
import  Header  from "./header/Header";

import { useState, useContext} from "react";

import AboutUs from "./aboutUs/aboutUs";
import Register_form from "./user/register";
import LoginForm from "./user/login"
import { Route, Routes } from "react-router-dom";
import Message from "./user/emailMessage";
import EmailConfirm from "./user/emailConfirm";

export default function MainPage() {
  const [content, setContent]=useState('aboutUs');
  const { isAuthenticated }=useContext(AuthContext);
  return (
    <div className="main">

      <Header setContent={setContent} isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route path="/" element={<AboutUs/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/login_form" element={<LoginForm/>}/>
        <Route path="/register_form" element={<Register_form/>}/>
        <Route path="/email_message" element={<Message/>}/>
        <Route path="/email_confirm" element={<EmailConfirm/>}/>
      </Routes>
      <div className="content"></div>
    </div>
  );
}