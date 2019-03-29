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
    const { masterAppealCheck={}, isCollapse } = this.props.data ? this.props.data : {};
    return (
      <section className={isCollapse ? `${styles.hidePanel}` : `${styles.showPanel} `}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管审核：</div>
            {/* {this.state.data.map(item => ( */}
            <div>
              <div className={styles.container}>
                <div className={styles.secRow}>
                  <div className={masterAppealCheck.checkResult == 2 ? styles.resultDotColor1 : styles.resultDotColor2}>
                    审核结果： {masterAppealCheck.checkResult == 2 ? '通过' : '不通过'}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.secCol}>
                  <div>审核说明：{masterAppealCheck.desc}</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
