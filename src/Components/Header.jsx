import { BrowserRouter as Router, Link } from "react-router-dom";

const categories = [
  { category_id: 0, category_name: '推荐' },
  {
    category_id: 1,
    category_name: '后端',
    children: [
      { category_id: 1, category_name: '全部' },
      { category_id: 11, category_name: 'Java' },
      { category_id: 12, category_name: 'Python' },
      { category_id: 13, category_name: 'Go' },
    ],
  },
  {
    category_id: 2,
    category_name: '前端',
    children: [
      { category_id: 2, category_name: '全部' },
      { category_id: 21, category_name: 'JavaScript' },
      { category_id: 22, category_name: 'Vue.js' },
      { category_id: 23, category_name: 'React.js' },
    ],
  },
  {
    category_id: 3,
    category_name: 'Android',
    children: [
      { category_id: 3, category_name: '全部' },
      { category_id: 31, category_name: 'Flutter' },
      { category_id: 32, category_name: 'Java' },
      { category_id: 33, category_name: 'Kotlin' },
    ],
  },
  {
    category_id: 4,
    category_name: 'iOS',
    children: [
      { category_id: 4, category_name: '全部' },
      { category_id: 41, category_name: 'Swift' },
      { category_id: 42, category_name: 'Objective-C' },
      { category_id: 43, category_name: 'Flutter' },
    ],
  }
];

export default function Header(props) {

  const { handleClickTab, handleClickSub, currentTab, currentSub } = props;

  const subMenu = (tab_name, children) => {
    return (
      <ul className={tab_name === currentTab ? "subTabs activeSubMenu" : "subTabs"}>
        {
          children.map(({ category_id, category_name }) =>
            <li key={category_id} className={currentSub === category_name ? "activeSubBox" : "negativeSubBox"}>
              <Link to={"/" + tab_name + "/" + category_name} onClick={handleClickSub(category_name, category_id)} className={currentSub === category_name ? "activeSub" : "negativeSub"}>{category_name}</Link>
            </li>
          )
        }
      </ul>
    )
  }

  const menu = () => {
    return (
      <ul className="tabs">
        {
          categories.map(({ category_name, category_id, children }) =>
            <li key={category_id}>
              <Link to={"/" + category_name} onClick={handleClickTab(category_name, category_id)} className={currentTab === category_name ? "activeTab" : ""}>{category_name}</Link>
              {children != null ? subMenu(category_name, children) : <></>}
            </li>
          )
        }
      </ul>
    )
  }

  return (
    <Router basename={props.urlString}>
      <header className={currentTab !== "推荐" ? "stretch" : ""}>
        <img className="icon" src={"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/dcec27cc6ece0eb5bb217e62e6bec104.svg"} alt="logo" />
        {menu()}
      </header>
    </Router>
  )
}