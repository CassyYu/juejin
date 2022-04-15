import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav";
import Category from "./components/category";
import Article from "./components/article";
import History from "./components/history";

export default function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/new">
          <Category categoryId={0} sortBy="new" />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/post">
          <Article />
        </Route>
        <Route path={"/" || "/hot"}>
          <Category categoryId={0} sortBy="hot" />
        </Route>
      </Switch>
      <Nav />
    </Router>
  )
}