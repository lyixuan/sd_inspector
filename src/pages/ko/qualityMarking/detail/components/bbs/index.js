import React from 'react';
import copy from 'copy-to-clipboard';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';

function Keywords(props) {
  if (props.list.length > 0) {
    const content = props.list.map((items, index) =>
      <em key={index}>{items}</em>
    )
    return content;
  } else {
    return null;
  }
}
class DetailBbs extends React.Component {
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
              <span className={styles.name}>{item.itemId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>订单id：</span>
              <span className={styles.name}>{item.ordId}</span>
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
                {item.content}
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

