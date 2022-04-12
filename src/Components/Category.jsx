import Header from "./header";
import List from "./list";
import { getArticles, getArticleById } from '../fake-api';
import { useEffect, useState } from "react";

export default function Category(props) {

  const itemHeight = 190;
  const itemNum = Math.ceil((document.body.clientHeight - 93) / itemHeight);
  const limit = 3 * itemNum;


  const [articles, setArticles] = useState([]);
  const [visitedArticles, setVisitedArticles] = useState([]);

  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [currentTab, setCurrentTab] = useState("推荐");
  const [currentSub, setCurrentSub] = useState('全部');
  const { sortBy } = props;

  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [maxItemNum, setMaxItemNum] = useState(limit);
  const [e, setE] = useState(null);

  const top = offset * itemHeight;
  const bottom = (maxItemNum - limit) * itemHeight - top;

  useEffect(() => {
    (async () => {
      const res = await getArticles(categoryId, sortBy, offset, limit);
      setTotal(res.total);
      const { articles } = res.data;
      setArticles(articles);
    })();
    (async () => {
      let vArticles = [];
      const str = window.localStorage.getItem('history');
      const arr = str ? JSON.parse(str) : [];
      for (let i = 0, len = arr.length; i < len; i++) {
        const res = await getArticleById(arr[i]);
        vArticles.push(res.data.article);
      }
      setVisitedArticles(vArticles);
    })()
  }, [categoryId, sortBy, offset, limit, itemNum]);

  const handleScroll = (e) => {
    setE(e);
    const height = e.target.scrollTop - itemNum * itemHeight;
    const index = parseInt(height / itemHeight);
    if (offset + limit > maxItemNum) setMaxItemNum(offset + limit);
    if (index >= offset + itemNum) setOffset(Math.min(total - limit, offset + itemNum));
    else if (index <= offset - itemNum) setOffset(Math.max(0, offset - itemNum));
  }

  const handleClickAriticle = function (id) {
    return () => {
      const str = window.localStorage.getItem('history');
      const arr = str ? JSON.parse(str) : [];
      const idx = arr.indexOf(id);
      if (idx !== -1) arr.splice(idx, 1);
      arr.unshift(id);
      window.localStorage.setItem('history', JSON.stringify(arr));
    }
  }

  const handleClickTab = (category_name, category_id) => {
    return (() => {
      setCurrentTab(category_name);
      setCurrentSub('全部');
      changeCategory(category_id);
      if (e != null) e.target.scrollTop = 0;
      setOffset(0);
      setMaxItemNum(limit);
    })
  }

  const handleClickSub = (category_name, category_id) => {
    return (() => {
      setCurrentSub(category_name);
      changeCategory(category_id);
      if (e != null) e.target.scrollTop = 0;
      setOffset(0);
      setMaxItemNum(limit);
    })
  }

  const changeCategory = (id) => setCategoryId(id);

  if (sortBy === "history" && !window.localStorage.getItem('history')?.length) return (
    <div className="load">
      <div>还没有浏览过文章</div>
    </div>
  )
  else if (sortBy !== "history" && articles.length === 0) return (
    <div className="load">
      <div>loading...</div>
    </div>
  )
  if (sortBy === "history") return (
    <main style={{ overflow: 'scroll', marginTop: '5px' }}>
      <List articles={visitedArticles} handleClickAriticle={handleClickAriticle} />
    </main>
  )
  else return (
    <>
      <Header urlString={"/" + sortBy} handleClickTab={handleClickTab} handleClickSub={handleClickSub} currentTab={currentTab} currentSub={currentSub} />
      <div style={{ overflow: 'scroll' }} onScroll={handleScroll}>
        <div style={{ height: top + 'px' }}></div>
        <main>
          <List articles={articles} handleClickAriticle={handleClickAriticle} />
        </main>
        <div style={{ height: bottom + 'px' }}></div>
      </div>
    </>
  )
}