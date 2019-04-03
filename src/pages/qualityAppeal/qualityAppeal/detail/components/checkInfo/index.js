import React from 'react';
import styles from './style.css';
import Item from 'antd/lib/list/Item';

export default class CheckInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <section className={styles.personInfoCon}>
        <span className={styles.secctionTitle}>质检审核</span>
        {this.state.data.map(item => (
          <div>
            <div key={item.id} className={styles.container}>
              <div className={styles.secRow}>
                <div>审核结果：{item.checkResult}</div>
                <div>一次申诉截止日期：{item.firstAppealEndDate}</div>
              </div>
              <div className={styles.secRow}>
                <div>审核时间：{item.verifyDate}</div>
              </div>
            </div>
            <div>
              <div className={styles.secCol}>
                <div>审核详情：</div>
                <div>{item.Desc}</div>
              </div>
            </div>
            <div className={styles.divideLine} />
          </div>
        ))}
      </section>
    );
  }
}
