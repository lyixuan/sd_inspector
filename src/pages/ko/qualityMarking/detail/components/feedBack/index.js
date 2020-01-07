import React from 'react';
import { jumpMarkingDetails } from '../../../../utils/utils';
import styles from '../../style.less';

class DetailFeedBack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  handleNameClick = (id) => {
    jumpMarkingDetails(id, { target: 'hx' })
  }

  render() {
    const { item = {} } = this.props.pageData;
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <span className={styles.name + " " + styles.nameCurrent} onClick={() => jumpMarkingDetails(item.stuId, { target: 'hx' })}>{item.stuName}</span>
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

