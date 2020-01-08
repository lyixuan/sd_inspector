import React from 'react';
import { Link } from 'dva/router';
import styles from '../../style.less';

function Keywords(props) {
  if (props.list && props.list instanceof Array && props.list.length > 0) {
    const content = props.list.map((items, index) =>
      <em key={index}>{items}</em>
    )
    return content;
  } else {
    return null;
  }
}
function keywordscolorful(str, key) {
  if (key instanceof Array && key.length > 0) {
    key.map(item => {
      var reg = "/" + item + "/g";
      str = str.replace(eval(reg), `<i style="color:#FF5959;font-style:normal;">${item}</i>`)
    })
    return str;
  }

}

function Content(props) {
  const content = props.content;
  const keywords = props.keyWord.split(',');
  if (props.keyWord) {
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: keywordscolorful(content, keywords) }}></span>
      </>
    )
  } else {
    return null
  }


}
class DetailBbs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    const { item } = this.props.pageData;
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <Link
                className={styles.name + " " + styles.nameCurrent}
                rel="noopener noreferer"
                to={`/ko/behaviorPath?params=${JSON.stringify({ userId: item.stuId, target: 'bbs' })}`}
                target='_blank'>
                {item.stuName}
              </Link>
              {/* <span className={styles.name + " " + styles.nameCurrent} onClick={() => this.handleNameClick(item.stuId)}>{item.stuName}</span> */}
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员id：</span>
              <span className={styles.name}>{item.stuId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>主贴id：</span>
              <span className={styles.name}>{item.itemId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>发帖时间：</span>
              <span className={styles.name}>{item.date}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>关&nbsp;键&nbsp;词：</span>
              <span className={styles.name + " " + styles.labels}>
                <Keywords list={item.keywordList}></Keywords>
              </span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>帖子详情：</span>
              <span className={styles.name}>
                <Content content={item.content} keyWord={item.keywords}></Content>
                {/* {item.content} */}
                {/* 上课时希望老师<i className={styles.keyword}>不靠谱</i>打比方的 */}
              </span>
            </div>
          </li>
        </ul>
      </>
    );
  }
}

export default DetailBbs;

