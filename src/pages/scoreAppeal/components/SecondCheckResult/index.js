import React from 'react';
import styles from './style.css';
import { Row, Col } from 'antd';
import moment from 'moment/moment';

export default class SuperiorCheckComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { masterAppealCheck } = this.props;
    const { checkResult,operator, operateDate,operateRole,desc,tagList=[]} = masterAppealCheck;
    const tags = tagList.map((v)=>v.name)
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管</div>
            <div>
            <Row className={styles.container}>
              <Col span={12}>
                  <div>审核结果：<span className={checkResult===1?styles.resultDotColor1:styles.resultDotColor2}>{checkResult===1?'通过':'驳回'}</span></div>
              </Col>
              <Col span={3}>
                  <span>执行人：{operator}</span>
              </Col>
              <Col span={4}>
                  <span>执行人角色：{operateRole}</span>
              </Col>
              <Col span={5}>
                  <span>操作时间：{moment(new Date(operateDate)).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Col>
            </Row>
            <Row className={styles.container}>
              <Col span={24}>
                  <div>审核说明：{desc}</div>
              </Col>
            </Row>
            <Row className={styles.container}>
              <Col span={24}>
                  <div>审核标签：{tags.join('，')}</div>
              </Col>
            </Row>
            </div>
          </article>
        </div>
      </section>
    );
  }
}