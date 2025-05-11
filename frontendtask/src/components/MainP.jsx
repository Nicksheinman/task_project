import Tasks from "./tasks/tasks";
import { AuthContext, } from "./user/authContext";
import  Header  from "./header/Header";

import { useState, useContext} from "react";

import AboutUs from "./aboutUs/aboutUs";

import LoginForm from "./user/login"

export default function MainPage() {
  const [content, setContent]=useState('aboutUs');
  const { isAuthenticated }=useContext(AuthContext)
  return (
    <div className="main">

      <Header setContent={setContent} isAuthenticated={isAuthenticated}/>
      {content==="aboutUs"&& (<AboutUs />)}
      {content==="tasks"&& (<Tasks />)}
      {content==="login"&& (<LoginForm/>)}
      <div className="content"></div>
    </div>
  );
}
