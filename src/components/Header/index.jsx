import { Link } from "react-router-dom";
import "./index.css";

export default function Header() {
  return (
    <div className="App-header">
      <div className="title">
        <Link to="/">fanteasy</Link>
      </div>
      <div className="routes">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/team-analysis">Team Analysis</Link>
        <Link to="/matchups">Matchups</Link>
      </div>
    </div>
  );
}
