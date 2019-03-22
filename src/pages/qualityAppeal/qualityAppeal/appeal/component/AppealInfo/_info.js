import React from 'react';
import {  Row, Col } from 'antd';
import styles from './style.less';

class Info extends React.Component {
  render() {
    const a=1;
      return (
      <div className={styles.itemInfo}>
        <Row>
          <Col span={12} >
            <span className={a!==1?styles.redIcon:styles.greenIcon}> 审核结果：</span>
            <span>已驳回</span>
          </Col>
          <Col span={4}>
            <span> 执行人：</span>
            <span>张三</span>
          </Col>
          <Col span={8}>
            <span>操作时间：</span>
            <span>2019-02-12 12：22：22</span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span> 审核说明：</span>
            <span>
              郭珊老师在4月2日19:30-21:00讲的【开学典礼】明劳动者具有从事某一职业所必备的学识和技能的证明。
            </span>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Info;
