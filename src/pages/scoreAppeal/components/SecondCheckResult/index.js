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
    // const { checkResult,operator, operateDate,operateRole,desc,tagList=[]} = masterAppealCheck;
    const context = masterAppealCheck.map((v,i)=>(
      <div key={i}>
        <Row className={styles.container}>
          <Col span={12}>
            <div className={styles.resultDotColor1}>审核结果：{v.checkResult}</div>
          </Col>
          <Col span={4}>
            <span>执行人：{v.operator}</span>
          </Col>
          <Col span={4}>
            <span>执行人角色：{v.operateRole}</span>
          </Col>
          <Col span={4}>
            <span>操作时间：{v.operateDate}</span>
          </Col>
        </Row>
        <Row className={styles.container}>
          <Col span={24}>
            <div>审核说明：{v.desc}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div>标签列表：{v.tagList.join()}</div>
          </Col>
        </Row>
      </div>
    ));
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>主管</div>
            {context}
          </article>
        </div>
      </section>
    );
  }
}
