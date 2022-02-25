import { Link } from "react-router-dom";
import "./index.css";

export default function Footer() {
  return (
    <div className="App-footer">
      <div>
        <Link to="/contact"> Contact us </Link>
        <a href="https://www.github.com/humzauddin27"> GitHub </a> 
      </div>
      <div>
        <p> Copyright: Fanteasy - Humza Faheemuddin, 2021 </p>
      </div>
    </div>
  );
}
