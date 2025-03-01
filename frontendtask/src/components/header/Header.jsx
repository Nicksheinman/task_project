

import "./header.css"

export default function Header() {
    const date=Date.now()
    return (
      <header>
        <div className="headerName"><h1>TaskFrenzy</h1></div>
        <div className="HeaderSecond"><span>time={date.toLocaleString()}</span></div>
      </header>
    );
}