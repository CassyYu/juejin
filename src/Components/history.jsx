import List from "./list";
import { getArticleById } from '../fake-api';
import { useEffect, useState } from "react";

export default function History() {

  const [visitedArticles, setVisitedArticles] = useState([]);

  useEffect(() => {
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
  }, []);

  function handleClickAriticle(id) {
    return () => {
      const str = window.localStorage.getItem('history');
      const arr = str ? JSON.parse(str) : [];
      const idx = arr.indexOf(id);
      if (idx !== -1) arr.splice(idx, 1);
      arr.unshift(id);
      window.localStorage.setItem('history', JSON.stringify(arr));
    }
  }

  if (!window.localStorage.getItem('history')?.length) return (
    <div className="load">
      <div>还没有浏览过文章</div>
    </div>
  )
  return (
    <>
      <div className="icon-container">
        <img className="main-icon" src={"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"} alt="logo" />
      </div>
      <main style={{ overflow: 'scroll' }}>
        <List articles={visitedArticles} handleClickAriticle={handleClickAriticle} />
      </main>
    </>
  )
}