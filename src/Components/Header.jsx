import { BrowserRouter as Router, Link } from "react-router-dom";
import { categories } from "../data";

export default function Header(props) {

  const { handleClickTab, handleClickSub, currentTab, currentSub } = props;

  const subMenu = (key, tab_name, children) => {
    return (
      <ul key={key} className={tab_name === currentTab ? "subTabs activeSubMenu" : "subTabs"}>
        {children.map(({ category_id, category_name }, idx) =>
          <li key={idx} className={currentSub === category_name ? "activeSubBox" : "negativeSubBox"}>
            <Link to={"/" + tab_name + "/" + category_name} onClick={handleClickSub(category_name, category_id)} className={currentSub === category_name ? "activeSub" : "negativeSub"}>{category_name}</Link>
          </li>
        )}
      </ul>
    )
  }

  return (
    <Router basename={props.urlString}>
      <header>
        <ul className="tabs">
          {categories.map(({ category_name, category_id }, idx) =>
            <li key={idx}>
              <Link to={"/" + category_name} onClick={handleClickTab(category_name, category_id)} className={currentTab === category_name ? "activeTab" : ""}>{category_name}</Link>
            </li>
          )}
        </ul>
        {categories.map((e, idx) => e.children ? subMenu(idx, e.category_name, e.children) : <></>)}
      </header>
    </Router>
  )
}