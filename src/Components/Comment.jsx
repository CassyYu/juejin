import { useEffect, useState } from "react";
import { getCommentsByArticleId } from '../fake-api';
import "./comment.css"
import FormatDate from "./formatDate";

export default function Comment({ item }) {

  const [comments, setComments] = useState([]);

  const id = item.id == null ? null : item.id;
  const comment_count = item.comment_count == null ? null : item.comment_count;

  useEffect(() => {
    if (id != null && comment_count != null) {
      (async () => {
        const res = await getCommentsByArticleId(id, 0, comment_count);
        if (res.data.comments.length > 0) setComments(res.data.comments);
      })()
    }
  }, [id, comment_count])

  const subComments = (reply_infos) => {
    if (reply_infos.length) {
      return reply_infos.map(item => {
        const { reply_info, user_info } = item;
        const { reply_id, reply_content, ctime } = reply_info;
        const { avatar_large, user_name, description } = user_info;
        return (
          <div className="subComment" key={reply_id}>
            <img src={avatar_large} alt={"头像"}></img>
            <div className="right-box" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '2px 0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: '#aaa' }}>
                <span style={{ paddingRight: '5px', color: '#333', fontSize: '13px', fontWeight: '400' }}>{user_name}</span>
                <span className="fontType" style={{ paddingLeft: '5px' }}>{description}</span>
              </div>
              <div style={{ margin: '5px 0' }}>
                <div style={{ color: '#333', fontSize: '13px', fontWeight: '400' }}>{reply_content}</div>
              </div>
              <div style={{ display: 'flex', padding: '5px 0' }}>
                <span style={{ flexGrow: '1' }} className="fontType"><FormatDate ctime={ctime} opt={2} /></span>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  const sortFunc = (a, b) => b.comment_info.digg_count - a.comment_info.digg_count;
  comments.sort(sortFunc);

  return comments.map(comment => {
    const { comment_id, user_info, comment_info, reply_infos } = comment;
    const { user_name, description, avatar_large } = user_info;
    const { comment_content, ctime, digg_count } = comment_info;
    return (
      <div key={comment_id}>
        <div className="comment">
          <img src={avatar_large} alt={"头像"}></img>
          <div className="right-box" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '2px 0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: '#aaa' }}>
              <span style={{ paddingRight: '5px', color: '#333', fontSize: '13px', fontWeight: '400' }}>{user_name}</span>
              <span className="fontType" style={{ paddingLeft: '5px' }}>{description}</span>
            </div>
            <div style={{ margin: '5px 0' }}>
              <div style={{ color: '#333', fontSize: '15px', fontWeight: '400' }}>{comment_content}</div>
            </div>
            <div style={{ display: 'flex', padding: '5px 0' }}>
              <span style={{ flexGrow: '1' }} className="fontType"><FormatDate ctime={ctime} opt={2} /></span>
              <span style={{ width: '60px' }}>
                <i className="fa fa-thumbs-o-up" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                <span className="fontType">{digg_count}</span>
              </span>
              <span>
                <i className="fa fa-comment-o" aria-hidden="true" style={{ marginRight: '8px' }}></i>
                <span className="fontType">回复</span>
              </span>
            </div>
          </div>
        </div>
        {subComments(reply_infos)}
      </div>
    )
  })
}