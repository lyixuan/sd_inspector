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
  render() {
    const { sopAppealCheck=[]}  = this.props;
    // const { checkResult,operator, operateDate,operateRole,desc} = sopAppealCheck;
    const content = sopAppealCheck.map((v,i)=>(
      <div key={i}>
        <Row className={styles.container}>
          <Col span={12}>
            <div>审核结果：<span className={v.checkResult===1?styles.resultDotColor1:styles.resultDotColor2}>{v.checkResult===1?'通过':'驳回'}</span></div>
          </Col>
          <Col span={4}>
            <span>执行人：{v.operator}</span>
          </Col>
          <Col span={3}>
            <span>执行人角色：{v.operateRole}</span>
          </Col>
          <Col span={5}>
            <span>操作时间：{moment(new Date(v.operateDate)).format('YYYY年MM月DD日 HH:mm:ss')}</span>
          </Col>
        </Row>
        <Row className={styles.container}>
          <Col span={24} >
            <div>审核说明：{v.desc}</div>
          </Col>
        </Row>
        {i!==sopAppealCheck.length-1&&<div className={styles.divideLine}/>}
      </div>
    ))
    return (
      <section className={styles.showPanel}>
        <div className={styles.personInfoCon}>
          <article className={styles.appealPerson}>
            <div className={styles.secctionTitle}>对接人</div>
            {content}
          </article>
        </div>
      </section>
    );
  }
}
