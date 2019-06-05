import React from 'react';
import styles from './style.css';
import { Row, Col } from 'antd';

export default class SuperiorCheckComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { masterAppealCheck ={}} = this.props;
    const { checkResult,operator, operateDate,operateRole,desc,tagList=[]} = masterAppealCheck;
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管</div>
            <div>
              <Row className={styles.container}>
                <Col span={12}>
                  <div className={styles.resultDotColor1}>审核结果：{checkResult}</div>
                </Col>
                <Col span={4}>
                  <span>执行人：{operator}</span>
                </Col>
                <Col span={4}>
                  <span>执行人角色：{operateRole}</span>
                </Col>
                <Col span={4}>
                  <span>操作时间：{operateDate}</span>
                </Col>
              </Row>
              <Row className={styles.container}>
                <Col span={24}>
                  <div>审核说明：{desc}</div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div>标签列表：{tagList.join()}</div>
                </Col>
              </Row>
            </div>
          </article>
        </div>
      </section>
    );
  }
}
