import { useState } from "react";
import { Link } from "react-router-dom";
import "../font-awesome-4.7.0/css/font-awesome.min.css";

export default function Nav() {

  const url = window.location.href.split("/");
  const initialNav = url[3] === "" ? "hot" : url[3];
  const [currentNav, setCurrentNav] = useState(initialNav);

  const handleClickNav = (nav) => { return () => setCurrentNav(nav); }

  return (
    <nav>
      <ul>
        <li className={currentNav === "hot" ? "activeNav" : ""}>
          <Link to="/hot" onClick={handleClickNav("hot")} target="_parent">
            <span><i className="fa fa-fire" aria-hidden="true"></i></span>
            <span>热门</span>
          </Link>
        </li>
        <li className={currentNav === "new" ? "activeNav" : ""}>
          <Link to="/new" onClick={handleClickNav("new")} target="_parent">
            <span><i className="fa fa-envelope-open" aria-hidden="true"></i></span>
            <span>最新</span>
          </Link>
        </li>
        <li className={currentNav === "history" ? "activeNav" : ""}>
          <Link to="/history" onClick={handleClickNav("history")} target="_parent">
            <span><i className="fa fa-history" aria-hidden="true"></i></span>
            <span>历史</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}