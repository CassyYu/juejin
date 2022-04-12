import { Link } from "react-router-dom";
import './list.css';
import FormatDate from "./formatDate";

export default function List(props) {

  const { articles, handleClickAriticle } = props;

  const showImage = img => img ? <img src={img} alt="文章图片" /> : <></>;

  if (articles.length) {
    return articles.map(item => {
      const { title, article_id, ctime, brief_content, collect_count, comment_count, cover_image } = item.article_info;
      const { user_name } = item.author_user_info;
      const { first_category_name, second_category_name, second_category_id } = item.category_info;
      return (
        <Link to={"/post/id=" + article_id} key={second_category_id + article_id} onClick={handleClickAriticle(article_id)}>
          <div className="list">
            <div className="title" style={{ fontSize: '17px', color: '#333' }}><b>{title}</b></div>
            <div className="header">
              <span className="author">{user_name}</span>
              <span className="date"><FormatDate ctime={ctime} opt={2} /></span>
            </div>
            <div className="main">
              <div className="brief">{brief_content}</div>
              {showImage(cover_image)}
            </div>
            <div className="footer">
              <span className="info">
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                <span>{collect_count}</span>
              </span>
              <span className="info">
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                <span>{comment_count}</span>
              </span>
              <span className="tags">
                <span>{first_category_name}</span>
                <span>{second_category_name}</span>
              </span>
            </div>
          </div>
        </Link>
      )
    })
  } else {
    return (
      <div className="load">
        <div>loading...</div>
      </div>
    )
  }
}