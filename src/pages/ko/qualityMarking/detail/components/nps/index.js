import React from 'react';
import copy from 'copy-to-clipboard';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';

function TagList(props) {
  if (props.list.length < 1) {
    return null;
  }
  const li = props.list.map((item, index) =>
    <li className={styles.flex} key={index}>
      <div className={styles.row}>
        <span className={styles.label}>{item.name}：</span>
        <span className={styles.name + " " + styles.labels}>
          <Label label={item.keywordList}></Label>
        </span>
      </div>
    </li>
  );
  return li;
}
function Label(props) {
  const label = props.label.map((item, index) =>
    <em key={index}>{item}</em>
  );
  return label
}
class DetailNps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  handleClick = (e) => {
    // 复制
    copy(e.target.value)
    alert('复制成功', 1)
  }

  render() {
    console.log(44, this.props.pageData)
    const { item } = this.props.pageData
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <span className={styles.name + " " + styles.nameCurrent}>{item.stuName}</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员id：</span>
              <span className={styles.name}>{item.stuId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>订&nbsp;&nbsp;单&nbsp;&nbsp;id：</span>
              <span className={styles.name}>{item.ordId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>星&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</span>
              <span className={styles.name}>{item.starLevel}</span>
            </div>
          </li>
          <TagList list={item.tagList}></TagList>
          {/* <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>班主任服务：</span>
              <span className={styles.name + " " + styles.labels}>
                <em>吐槽客服态度吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
              </span>
            </div>
          </li> */}
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>自主评价：</span>
              <span className={styles.name}>
                {item.opinion}
              </span>
            </div>
          </li>
        </ul>
      </>
    );
  }
}

export default DetailNps;

