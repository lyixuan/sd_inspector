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
  getDivideLine(index) {
    if (this.state.data.length == index + 1) {
      return <></>;
    }
    return <div className={styles.divideLine} />;
  }
  render() {
    this.state.data = this.props.data ? this.props.data : [];
    console.log(222, this.state.data);
    return (
      <section className={styles.personInfoCon}>
        <span className={styles.secctionTitle}>质检审核</span>
        {this.state.data.map((item, index) => (
          <>
            <div className={styles.appealCheckCon}>
              <div key={item.id} className={styles.container}>
                <div className={styles.secRow}>
                  <div>审核结果：{item.operate}</div>
                  <div>一次申诉截止日期：{item.updateTime}</div>
                </div>
                <div className={styles.secRow}>
                  <div>审核时间：{item.verifyTime}</div>
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
          </>
        ))}
      </section>
    );
  }
}
