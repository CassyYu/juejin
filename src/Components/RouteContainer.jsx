import Category from "./Category";
import Article from "./Article";
import { Switch, Route } from "react-router-dom";

export default function RouteContainer() {
  return (
    <Switch>
      <Route exact path="/">
        <Category categoryId={0} sortBy="hot" />
      </Route>
      <Route path="/hot">
        <Category categoryId={0} sortBy="hot" />
      </Route>
      <Route path="/new">
        <Category categoryId={0} sortBy="new" />
      </Route>
      <Route path="/history">
        <Category categoryId={0} sortBy="history" />
      </Route>
      <Route path="/post">
        <Article />
      </Route>
    </Switch>
  )
}