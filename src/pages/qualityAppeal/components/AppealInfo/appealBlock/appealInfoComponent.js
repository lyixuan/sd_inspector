import React from 'react';
import { Row, Col } from 'antd';
import styles from './appealInfoComponent.less';
import moment from 'moment';
import OwnLaunchDetail from './ownLaunchDetail';

export default class AppealInfoComponent extends React.Component {
  appealPanelVisible(index) {
    this.props.onClick(index);
  }
  getAppealStatus() {
    const { isCollapse = false } = this.props.data;
    if (isCollapse) {
      return '+';
    }
    return '-';
  }
  render() {
    const { data = {} } = this.props;
    const { appealEndDate, appealStart = [], type, index, isCollapse } = data;
    const number = Number(type) === 2 ? '二' : '一';
    return (
      <section className={styles.personInfoCon}>
        {/* <span
          className={[Number(index) === 0 ? styles.secctionTitle : `${styles.hidePanel}`]}
        >
          申诉信息
        </span> */}
        <div className={styles.appealInfoCon}>
          <div className={styles.appealInfo}>
            {number}次申诉
            <span>
              {' '}
              ({number}次申诉截止日期：
              {appealEndDate ? moment(appealEndDate).format('YYYY-MM-DD') : null})
            </span>
            <span
              onClick={() => {
                this.appealPanelVisible(index);
              }}
              className={styles.appealInfoPanel}
            >
              {this.getAppealStatus()}
            </span>
          </div>
          <article className={isCollapse ? `${styles.hidePanel}` : `${styles.showPanel} `}>
            <OwnLaunchDetail dataList={data} />
          </article>
        </div>
      </section>
    );
  }
}
