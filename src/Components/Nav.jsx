import { useState } from "react";
import { Link } from "react-router-dom";
import { HotSvg1, HotSvg2, NewSvg1, NewSvg2, HisSvg1, HisSvg2 } from "../svg";

export default function Nav() {

  const url = window.location.href.split("/");
  const initialNav = url[3] === "" ? "hot" : url[3];
  const [currentNav, setCurrentNav] = useState(initialNav);

  const handleClickNav = (nav) => { return () => setCurrentNav(nav); }

  return (
    <nav>
      <ul>
        <Link to="/hot" onClick={handleClickNav("hot")} target="_parent">
          <li className={currentNav === "hot" ? "activeNav" : ""}>
            <div>{currentNav === "hot" ? <HotSvg1 /> : <HotSvg2 />}</div>
            <div>热门</div>
          </li>
        </Link>
        <Link to="/new" onClick={handleClickNav("new")} target="_parent">
          <li className={currentNav === "new" ? "activeNav" : ""}>
            <div>{currentNav === "new" ? <NewSvg1 /> : <NewSvg2 />}</div>
            <div>最新</div>
          </li>
        </Link>
        <Link to="/history" onClick={handleClickNav("history")} target="_parent">
          <li className={currentNav === "history" ? "activeNav" : ""}>
            <div>{currentNav === "history" ? <HisSvg1 /> : <HisSvg2 />}</div>
            <div>历史</div>
          </li>
        </Link>
      </ul>
    </nav>
  )
}