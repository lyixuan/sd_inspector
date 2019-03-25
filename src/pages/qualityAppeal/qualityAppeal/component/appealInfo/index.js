import React from 'react';
import styles from './style.css';
import moment from 'moment';

export default class AppealInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      appealInfoCollapse: false,
    };
  }
  componentDidMount() {}
  appealPanelVisible(index) {
    this.props.onClick(index);
  }
  getAppealStatus() {
    if (this.state.appealInfoCollapse) {
      return '+';
    }
    return '-';
  }
  render() {
    const { appealEndDate, appealStart, type, index, isCollapse } = this.props.data;
    this.state.appealInfoCollapse = isCollapse;
    console.log(isCollapse);
    return (
      <section className={styles.personInfoCon}>
        <span className={[index == 0 ? styles.secctionTitle : `${styles.hidePanel}`]}>
          申诉信息
        </span>
        <div className={styles.appealInfoCon}>
          <div className={styles.appealInfo}>
            {type}次申诉
            <span>一次申诉截止日期：{moment(appealEndDate).format('YYYY-MM-DD HH:mm:ss')}</span>
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
            <div className={styles.appealPerson}>
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
            </div>
          </article>
        </div>
      </section>
    );
  }
}
