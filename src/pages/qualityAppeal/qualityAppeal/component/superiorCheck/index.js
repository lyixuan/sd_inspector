import React from 'react';
import styles from './style.css';
import Item from 'antd/lib/list/Item';

export default class SuperiorCheckComponent extends React.Component {
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
        <div>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管审核：</div>
            {this.state.data.map(item => (
              <div>
                <div className={styles.container}>
                  <div className={styles.secRow}>
                    <div className={item.sign ? styles.resultDotColor1 : styles.resultDotColor2}>
                      审核结果： {item.sopCheckResult}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.secCol}>
                    <div>审核说明：{item.checkDesc}</div>
                  </div>
                </div>
              </div>
            ))}
          </article>

          <div className={styles.divideLine} />
        </div>
      </section>
    );
  }
}
