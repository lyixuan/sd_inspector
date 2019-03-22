import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { CHECKSTATUS } from '@/utils/constants';

export default class CheckInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      checkResultsCollapse: this.props.checkResultsCollapse,
    };
  }
  componentDidMount() {}
  getDivideLine(index) {
    if (this.state.data.length == index + 1) {
      return <></>;
    }
    return <div className={styles.divideLine} />;
  }
  appealPanelVisible() {
    this.props.onClick();
  }
  getAppealStatus() {
    if (this.state.checkResultsCollapse) {
      return '-';
    }
    return '+';
  }
  getOperateName(code) {
    return CHECKSTATUS[code];
  }
  render() {
    this.state.data = this.props.data ? this.props.data : [];
    this.state.checkResultsCollapse = this.props.checkResultsCollapse;
    const checkResultsCollapse = this.props.checkResultsCollapse;
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
        {this.state.data.map((item, index) => (
          <div className={checkResultsCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`}>
            <div className={styles.appealCheckCon}>
              <div key={item.id} className={styles.container}>
                <div className={styles.secRow}>
                  <div>审核结果：{this.getOperateName(item.operate)}</div>
                  <div>
                    一次申诉截止日期：{moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                </div>
                <div className={styles.secRow}>
                  <div>审核时间：{moment(item.verifyTime).format('YYYY-MM-DD HH:mm:ss')}</div>
                </div>
              </div>
              <div>
                <div className={styles.secCol}>
                  <div>审核详情：</div>
                  <div>{item.Desc}</div>
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
