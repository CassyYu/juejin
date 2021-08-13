export default function FormatDate(props) {

  const t = props === undefined ? null : props.ctime;
  const opt = props === undefined ? null : props.opt;


  const toFullDate = () => {
    const d = new Date(t * 1000);
    const date = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + (d.getDate()) + "日";
    return date;
  }
  
  const toGap = () => {
    const sec = new Date().getTime() / 1000 - t;
    const hour = parseInt(sec / 60 / 60);
    if (hour < 24) return hour + "小时前";
    const day = parseInt(hour / 24);
    if (day < 30) return day + "天前";
    const month = parseInt(day / 30);
    if (month < 12) return month + "个月前";
    const year = parseInt(month / 12);
    return year + "年前";
  }

  if (t != null && opt === 1) return <span>{toFullDate()}</span>
  else if (t != null && opt === 2) return <span>{toGap()}</span>
  else return <></>
}