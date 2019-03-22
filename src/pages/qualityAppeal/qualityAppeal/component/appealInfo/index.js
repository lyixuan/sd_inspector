import React from 'react';
import styles from './style.css';
import moment from 'moment';

export default class AppealInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      appealInfoCollapse: props.appealInfoCollapse,
    };
  }
  componentDidMount() {}
  appealPanelVisible() {
    this.props.onClick();
  }
  getAppealStatus() {
    if (this.state.appealInfoCollapse) {
      return '-';
    }
    return '+';
  }
  render() {
    const { appealEndDate, appealStart, type } = this.props.data;
    const appealInfoCollapse = this.props.appealInfoCollapse;
    return (
      <section className={styles.personInfoCon}>
        <span className={styles.secctionTitle}>申诉信息</span>
        <div className={styles.appealInfoCon}>
          <div className={styles.appealInfo}>
            {type}次申诉
            <span>一次申诉截止日期：{moment(appealEndDate).format('YYYY-MM-DD HH:mm:ss')}</span>
            <span
              onClick={() => {
                this.appealPanelVisible();
              }}
              className={styles.appealInfoPanel}
            >
              {this.getAppealStatus()}
            </span>
          </div>
          <article
            className={[
              styles.appealPerson,
              appealInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`,
            ]}
          >
            <div className={styles.secctionTitle}>申诉发起人</div>
            <div className={styles.container}>
              <div className={styles.secRow}>
                <div>附件：{appealStart.attUrl ? appealStart.attUrl : ''} </div>
              </div>
              <div className={[styles.secRow]}>
                <div>
                  <span>执行人：{appealStart.operator}</span>
                  <span>
                    操作时间：{moment(appealStart.operateDate).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.secCol}>
                <div>申诉说明：{appealStart.desc}</div>
                <div />
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
