import Comment from "./Comment";
import FormatDate from "./FormatDate";
import { getArticleById } from '../fake-api';
import { useEffect, useState } from "react";
import "./article.css";

export default function Article() {

  const [item, setItem] = useState({});

  useEffect(() => {
    (async () => {
      const url = window.location.href;
      const id = url.split("=")[1];
      const res = await getArticleById(id);
      const { article_content, article_info, author_user_info, category_info } = res.data.article;
      const { avatar_large, user_name, description, follower_count, got_view_count } = author_user_info;
      const { ctime, hot_index, cover_image, title, comment_count } = article_info;
      const { first_category_name, second_category_name } = category_info;
      const obj = {
        id: id,
        avatar_large: avatar_large,
        user_name: user_name,
        ctime: ctime,
        hot_index: hot_index,
        cover_image: cover_image,
        title: title,
        content: article_content,
        comment_count: comment_count,
        first_category_name: first_category_name,
        second_category_name: second_category_name,
        description: description,
        follower_count: follower_count,
        got_view_count: got_view_count
      }
      setItem(obj);
      const content = document.getElementById("content");
      content.innerHTML = item.content;
    })()
  }, [item.content])

  const showImage = img => img ? <img src={img} alt="文章图片" style={{ width: '100%', height: 'auto' }} /> : <></>;

  return (
    <div className="article">
      <div className="header">
        <img className="avatar" src={item.avatar_large} alt={"头像"} />
        <div style={{ flexGrow: '1' }}>
          <div style={{ fontSize: '16px', fontWeight: '700' }}>{item.user_name}</div>
          <span style={{ display: 'flex', fontSize: '14px', color: '#888' }}><FormatDate ctime={item.ctime} opt={1} />&nbsp;&nbsp;阅读量{item.hot_index}</span>
        </div>
        <button className="subscribe">关注</button>
      </div>
      <article>
        {showImage(item.cover_image)}
        <h1>{item.title}</h1>
        <div id="content"></div>
        <div style={{ paddingTop: '25px', marginBottom: '40px', fontSize: '14px', borderTop: '1px solid #eee' }}>
          <span><b>文章分类</b></span>
          <span className="tag" style={{ display: 'inline-block', marginBottom: '20px' }}>
            <span>{item.first_category_name}</span>
          </span>
          <br />
          <span><b>文章标签</b></span>
          <span className="tag">
            <span>{item.first_category_name}</span>
            <span>{item.second_category_name}</span>
          </span>
        </div>
        <div className="author">
          <img src={item.avatar_large} alt={"头像"}></img>
          <div className="right-box">
            <span>
              <span style={{ fontSize: '15px' }}><b>{item.user_name}</b></span>
              <span className="fontType" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: '#aaa' }}>{item.description}</span>
            </span>
            <div className="fontType">
              <span>获得点赞{item.follower_count}</span>
              <span style={{margin: '0 3px'}}>·</span>
              <span>获得阅读{item.got_view_count}</span>
            </div>
          </div>
          <button className="subscribe" style={{ margin: '0 10px' }}>关注</button>
        </div>
      </article>
      <div className="comment-list">
        <Comment item={item} />
      </div>
    </div>
  )
}