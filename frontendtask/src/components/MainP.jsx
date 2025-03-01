



import  Tasks  from "./tasks/tasks";

export default function MainPage(props) {
  return (
    <div className="aboutUs">
        <div className="aboutUsHeader"><h3>About us</h3></div>
        <div className='aboutUsinfo'>TaskFrenzy is an innovative task management platform designed to streamline
        your workflow and boost productivity. It simplifies the process of
        organizing, tracking, and completing tasks in real time, empowering teams
        and individuals to stay on top of deadlines and achieve their goals
        efficiently.</div>
        <Tasks />
    </div>);
}

