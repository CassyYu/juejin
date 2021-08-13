import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./Components/RouteContainer";
import Nav from "./Components/Nav";

export default function App() {

  const [direction, setDirection] = useState(window.orientation);

  window.addEventListener("orientationchange", () => setDirection(window.orientation));

  if (direction !== 0) return (
    <div className="rotate">
      <div>
        请使用手机竖屏观看
      </div>
    </div>
  )
  else return (
    <Router basename="/">
      <RouteContainer />
      <Nav />
    </Router>
  )
}