import React from 'react';
import styles from './style.css';
// import Item from 'antd/lib/list/Item';

export default class SOPCheckResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { checkResult, desc, operator, operatorDate } = this.state.data;
    console.log(this.state.data);
    return (
      <section className={styles.personInfoCon}>
        <div>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>SOP审核结果</div>
            {this.state.data.map(item => (
              <div>
                <div className={styles.container}>
                  <div className={styles.secRow}>
                    <div
                      className={item.checkResult ? styles.resultDotColor1 : styles.resultDotColor2}
                    >
                      审核结果：{item.checkResult}
                    </div>
                  </div>
                  <div className={styles.secRow}>
                    <div>
                      <span>执行人：{item.operator}</span>
                      <span>操作时间：{item.operatorDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.secCol}>
                    <div>审核说明：{desc}</div>
                  </div>
                </div>
              </div>
            ))}
            }
          </article>

          <div className={styles.divideLine} />
        </div>
      </section>
    );
  }
}
