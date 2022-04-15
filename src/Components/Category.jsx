import Header from "./header";
import List from "./list";
import { getArticles } from '../fake-api';
import { useEffect, useState, useRef } from "react";
import { LoadSvg } from "../svg";

export default function Category(props) {

  const [articles, setArticles] = useState([]);

  const [categoryId, setCategoryId] = useState(props.categoryId);
  const [currentTab, setCurrentTab] = useState("推荐");
  const [currentSub, setCurrentSub] = useState("全部");

  const [total, setTotal] = useState();
  const [offset, setOffset] = useState(0);

  const container = useRef();
  const head = useRef();
  const foot = useRef();

  const { sortBy } = props;

  useEffect(() => {
    (async () => {
      const res = await getArticles(categoryId, sortBy, offset, 10);
      const { articles } = res.data;
      setTotal(res.total);
      setArticles(articles);
    })();
    const observerHeader = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      container.current.scrollTop = 1;
      setOffset(offset - 5);
    });
    const observerFooter = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      foot.current.scrollIntoView();
      setOffset(offset + 5);
    });
    if (offset !== 0) observerHeader.observe(document.querySelector('.scrollerHeader'));
    observerFooter.observe(document.querySelector('.scrollerFooter'));
    return () => {
      observerHeader.disconnect();
      observerFooter.disconnect();
    }
  }, [categoryId, sortBy, offset]);

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

  function handleClickTab(category_name, category_id) {
    return () => {
      setCurrentTab(category_name);
      setCurrentSub('全部');
      setCategoryId(category_id);
      setOffset(0);
    }
  }

  function handleClickSub(category_name, category_id) {
    return () => {
      setCurrentSub(category_name);
      setCategoryId(category_id);
      setOffset(0);
    }
  }

  return (
    <>
      <div className="icon-container">
        <img className="main-icon" src={"https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"} alt="logo" />
      </div>
      <Header urlString={"/" + sortBy} handleClickTab={handleClickTab} handleClickSub={handleClickSub} currentTab={currentTab} currentSub={currentSub} />
      <div className="main-container" ref={container}>
        {/* <div style={{ height: top + 'px' }}></div> */}
        <main>
          {offset !== 0 ? (
            <div className="scrollerHeader" ref={head}>
              {/* <div className="load"><LoadSvg />&nbsp;loading</div> */}
            </div>
          ) : <></>}
          <List articles={articles} handleClickAriticle={handleClickAriticle} />
          {/* <List articles={articles.slice(0, 5)} handleClickAriticle={handleClickAriticle} />
          <List articles={articles.slice(5, 10)} handleClickAriticle={handleClickAriticle} /> */}
          {offset >= total ? <></> : (
            <div className="scrollerFooter" ref={foot}>
              <div className="load"><LoadSvg />&nbsp;loading</div>
            </div>
          )}
        </main>
        {/* <div style={{ height: bottom + 'px' }}></div> */}
      </div>
    </>
  )
}