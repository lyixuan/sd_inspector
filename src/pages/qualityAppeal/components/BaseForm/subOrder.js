import React  from 'react';
import { Row, Col } from 'antd';
import styles from './subOrder.less';
import moment from 'moment/moment';

class SubOrder extends React.Component {
  render() {
    const { stuName,trainingAmount,orderStatus,stuId,packageName,classTeacherName,bizDate,collegeName,familyName,groupName } = this.props.orderNumData||{};
    return (
      <div style={{marginLeft:10}}>
        <Row gutter={16}>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>学员姓名</span>：<span>{stuName}</span></div>
          </Col>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>实际支付金额</span>：<span>{trainingAmount}</span></div>
          </Col>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>订单状态</span>：<span>{orderStatus}</span></div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>学员ID</span>：<span>{stuId}</span></div>
          </Col>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>产品包</span>：<span>{packageName}</span></div>
          </Col>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>班主任花名</span>：<span>{classTeacherName}</span></div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>报名时间</span>：<span>{bizDate ? moment(bizDate).format('YYYY年MM月DD日 HH:mm:ss') : null}</span></div>
          </Col>
          <Col className={styles.gutter} span={8}>
            <div><span className={styles.formLabel}>组织</span>：<span>{collegeName} | {familyName} | {groupName}</span></div>
          </Col>
          <Col className={styles.gutter} span={8}>
            <div>&nbsp;</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubOrder;
