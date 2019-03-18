import React from 'react';
import styles from './style.css';
import Item from 'antd/lib/list/Item';

export default class SOPCheckResultComponent extends React.Component {
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
            <div className={styles.secctionTitle}>SOP审核结果</div>
            <div className={styles.container}>
              <div className={styles.secRow}>
                <div className={styles.resultDotColor1}>审核结果： </div>
              </div>
              <div className={styles.secRow}>
                <div>执行人：</div>
              </div>
            </div>
            <div>
              <div className={styles.secCol}>
                <div>审核说明</div>
              </div>
            </div>
          </article>

          <div className={styles.divideLine} />
        </div>
      </section>
    );
  }
}
