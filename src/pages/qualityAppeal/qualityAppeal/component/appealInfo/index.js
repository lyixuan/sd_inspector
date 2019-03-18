import React from 'react';
import styles from './style.css';
import Item from 'antd/lib/list/Item';

export default class AppealInfoComponent extends React.Component {
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
        <span className={styles.secctionTitle}>申诉信息</span>
        <div>
          <div class={styles.appealInfo}>
            一次申诉<span>一次申诉截止日期：{this.state.data.appealEndDate}</span>
          </div>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>申诉发起人</div>
            <div className={styles.container}>
              <div className={styles.secRow}>
                <div>附件：{this.state.data.attUrl} </div>
              </div>
              <div className={[styles.secRow]}>
                <div>
                  <span>执行人：{this.state.data.operator}</span>
                  <span>操作时间：{this.state.data.operateDate}</span>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.secCol}>
                <div>申诉说明：{this.state.data.desc}</div>
                <div />
              </div>
            </div>
          </article>

          <div className={styles.divideLine} />
        </div>
      </section>
    );
  }
}
