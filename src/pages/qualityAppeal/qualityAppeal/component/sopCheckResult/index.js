import React from 'react';
import { Row, Col } from 'antd';
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

  getSopResult(checkResult) {
    const result = Number(checkResult);
    const [reject, pass, timeout ] = [0, 1, 2];
    switch (result) {
      case reject:
        return '不通过';
      case pass:
        return '通过';
      case timeout:
        return '超时';
    }
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
                  <Row className={styles.container}>
                    <Col span={12}>
                      <div
                        className={
                          item.checkResult ? styles.resultDotColor1 : styles.resultDotColor2
                        }
                      >
                        审核结果：{this.getSopResult(item.checkResult)}
                      </div>
                    </Col>
                    <Col span={4}>
                      <span>执行人：{item.operator}</span>
                    </Col>
                    <Col span={8}>
                      <span>
                        操作时间：{moment(item.operateDate).format('YYYY年MM月DD日 HH:mm:ss')}
                      </span>
                    </Col>
                  </Row>
                  {/* <Row className={styles.container}>
                    <Col span={12}>
                     
                    </Col>
                  </Row> */}
                  <div className={styles.container}>审核说明：{item.desc}</div>
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
