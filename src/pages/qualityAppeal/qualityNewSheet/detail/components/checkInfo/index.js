import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { CHECKSTATUS } from '@/utils/constants';

export default class CheckInfoComponent extends React.Component {

  getDivideLine(index) {
    const {data=[]} = this.props;
    if (data.length === index + 1) {
      return <></>;
    }
    return <div className={styles.divideLine} />;
  }
  appealPanelVisible() {
    this.props.onClick();
  }
  getAppealStatus() {
    const {checkResultsCollapse} = this.props;
    if (checkResultsCollapse) {
      return '-';
    }
    return '+';
  }
  getOperateName=(code) =>{
    return CHECKSTATUS[code];
  }
  render() {
    const {firstAppealEndDate,data=[],checkResultsCollapse} = this.props;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.secctionTitle}>
          <span>质检审核</span>
          <span
            onClick={() => {
              this.appealPanelVisible();
            }}
            className={styles.appealInfoPanel}
          >
            {this.getAppealStatus()}
          </span>
        </div>
        {data.map((item, index) => (
          <div
            key={item.id}
            className={checkResultsCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`}
          >
            <div className={styles.appealCheckCon}>
              <div key={item.id} className={styles.container}>
                <div className={styles.secRow}>
                  <div>审核结果：{this.getOperateName(item.operate)}</div>
                  {Number(item.operate)===2?<div>一次申诉截止日期：{firstAppealEndDate.slice(0,10)}</div>:null}
                </div>
                <div className={styles.secRow}>
                  <div>审核时间：{moment(item.verifyTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>
              </div>
              <div>
                <div className={styles.secCol}>
                  <div>审核详情：</div>
                  <div>{item.desc}</div>
                </div>
              </div>
              {this.getDivideLine(index)}
            </div>
          </div>
        ))}
      </section>
    );
  }
}
