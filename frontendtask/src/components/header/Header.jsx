

import "./header.css"

export default function Header() {
    const date=Date.now()
    return (
      <header>
        <h1>TaskFrenzy</h1>
        <span>time={date.toLocaleString()}</span>
      </header>
    );
}