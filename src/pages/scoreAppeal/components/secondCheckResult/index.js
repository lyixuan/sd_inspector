import React from 'react';
import styles from './style.css';
import { Row, Col } from 'antd';
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
    const { masterAppealCheck = {}, isCollapse } = this.props.data ? this.props.data : {};
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管</div>
            {/* {this.state.data.map(item => ( */}
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
