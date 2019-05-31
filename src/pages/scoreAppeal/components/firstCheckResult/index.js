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
  render() {
    // let { sopAppealCheck, isCollapse } = this.props.data;
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>对接人</div>
            <div>
              <Row className={styles.container}>
                <Col span={12}>
                  <div className={styles.resultDotColor1}>审核结果：</div>
                </Col>
                <Col span={4}>
                  <span>执行人：</span>
                </Col>
                <Col span={8}>
                  <span>操作时间：</span>
                </Col>
              </Row>
              <Row className={styles.container}>
                <Col span={12}>
                  <div>审核说明：</div>
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
