import React from 'react';
import { Link } from 'dva/router';
import styles from '../../style.less';

class DetailFeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {

    const { item = {} } = this.props.pageData;
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <Link
                className={styles.name + " " + styles.nameCurrent}
                rel="noopener noreferer"
                to={`/ko/behaviorPath?params=${JSON.stringify({ userId: item.stuId, target: 'hx' })}`}
                target='_blank'>
                {item.stuName}
              </Link>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员id：</span>
              <span className={styles.name}>{item.stuId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>反馈id：</span>
              <span className={styles.name}>{item.fsId}</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>后端归属：</span>
              <span className={styles.name}>{item.org}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>反馈时间：</span>
              <span className={styles.name}>{item.date}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>意见分类：</span>
              <span className={styles.name + " " + styles.labels}>
                {item.feedbackTypeName}
                {/* <Keywords list={item.keywordList}></Keywords> */}
              </span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>意见内容：</span>
              <span className={styles.name}>
                {item.content}
              </span>
            </div>
          </li>
        </ul>
      </>
    );
  }
}

export default DetailFeedBack;

