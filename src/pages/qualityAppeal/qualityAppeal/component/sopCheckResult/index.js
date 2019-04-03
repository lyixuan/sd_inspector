import React from 'react';
import styles from './style.css';
import moment from 'moment/moment';
// import Item from 'antd/lib/list/Item';

export default class SOPCheckResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}
  getDivideLine(index) {
    if (this.props.data.sopAppealCheck.length == index + 1) {
      return <></>;
    }
    return <div className={styles.divideLine} />;
  }
  render() {
    let { sopAppealCheck, isCollapse } = this.props.data;
    return (
      <section className={isCollapse ? `${styles.hidePanel}` : `${styles.showPanel} `}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>SOP审核结果</div>
            {sopAppealCheck.map((item, index) => (
              <>
                <div>
                  <div className={styles.container}>
                    <div className={styles.secRow}>
                      <div
                        className={
                          item.checkResult ? styles.resultDotColor1 : styles.resultDotColor2
                        }
                      >
                        审核结果：{Number(item.checkResult) === 1 ? '通过' : '不通过'}
                      </div>
                    </div>
                    <div className={styles.secRow}>
                      <div>
                        <span>执行人：{item.operator}</span>
                        <span>操作时间：{moment(item.operateDate).format('YYYY-MM-DD HH:mm:ss')}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.secCol}>
                      <div>审核说明：{item.desc}</div>
                    </div>
                  </div>
                </div>
                {this.getDivideLine(index)}
              </>
            ))}
          </article>
        </div>
      </section>
    );
  }
}
