import Tasks from "./tasks/tasks";
import  Header  from "./header/Header";
import { useState } from "react";
import AboutUs from "./aboutUs/aboutUs";
import Login from "./user/login"
export default function MainPage(props) {
  const [content, setContent]=useState('aboutUs')
  return (
    <div className="main">
      <Header setContent={setContent} />
      {content==="aboutUs"&& (<AboutUs />)}
      {content==="tasks"&& (<Tasks />)}
      {content==="login"&& (<Login />)}
      <div className="content"></div>
    </div>
  );
}
