import React from 'react';
import styles from './style.css';
// import { List } from 'antd';

// const { Item } = List;

export default class AppealInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { appealEndDate, appealStart } = this.state.data;
    console.log(this.state.data);
    return (
      <section className={styles.personInfoCon}>
        <span className={styles.secctionTitle}>申诉信息</span>
        <div>
          <div class={styles.appealInfo}>
            一次申诉<span>一次申诉截止日期：{appealEndDate}</span>
          </div>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>申诉发起人</div>
            <div className={styles.container}>
              <div className={styles.secRow}>
                <div>附件：{appealStart.attUrl} </div>
              </div>
              <div className={[styles.secRow]}>
                <div>
                  <span>执行人：{appealStart.operator}</span>
                  <span>操作时间：{appealStart.operateDate}</span>
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
