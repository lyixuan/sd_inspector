import React from 'react';
import { Row, Col, Tooltip, Icon, Empty } from 'antd';
import styles from './style.css';
import { thousandsFormat } from '@/utils/utils';
export default class OrderStat extends React.Component {
  paid = type => {
    if (type === 'PAID') {
      return <>已支付</>;
    } else if (type === 'EXPIRED') {
      return <>已过服务期</>;
    } else if (type === 'UNPAID') {
      return <>未支付</>;
    } else if (type === 'CANCELED') {
      return <>已解约</>;
    } else if (type === 'FREEZED') {
      return <>已冻结</>;
    } else if (type === 'REVOKED') {
      return <>已取消</>;
    } else if (type === 'REPEALED') {
      return <>已作废</>;
    } else if (type === 'STUCHANGED') {
      return <>已转入</>;
    } else if (type === 'PRODCHANGED') {
      return <>已转班</>;
    }
  };
  render() {
    const {
      orderNum = 0,
      totalRestAmount = 0,
      orderList = [],
      refundNum = 0,
      orderFlag,
      refundDate,
      refundBackDate,
    } = this.props.orderStat || {};
    const orderRender = orderList.map((item, i) => {
      let end = '';
      let front = '';
      let textDate = '';
      if (item.orderFlag === 2) {
        textDate = (
          <p style={{ color: '#fff' }}>
            {item.refundDate}
            <span style={{ marginLeft: '5px' }}>发起退费</span>
          </p>
        );
      }
      if (item.orderFlag === 3) {
        textDate = (
          <p style={{ color: '#fff' }}>
            {item.refundBackDate}
            <span style={{ marginLeft: '5px' }}>发起退挽</span>
          </p>
        );
      }

      if (!item.collegeName && item.familyName && !item.groupName) {
        end = '无';
      } else {
        end = `${item.collegeName}${item.familyName ? '/' : ''}${item.familyName &&
          item.familyName}${item.groupName ? '/' : ''}${item.groupName && item.groupName}`;
      }
      if (item.legionName && item.businessName) {
        front = item.businessName + '/' + item.legionName;
      } else if (item.legionName && !item.businessName) {
        front = item.legionName;
      } else if (!item.legionName && item.businessName) {
        front = item.businessName;
      } else {
        front = '无';
      }
      const text = (
        <div className={styles.tooltipContent}>
          {textDate}
          <h4>前端归属</h4>
          <p>{front}</p>
          <h4>后端归属</h4>
          <p>{end}</p>
        </div>
      );

      const tips = <span></span>;

      return (
        <div className={styles.card} key={i}>
          <div className={`${styles.line} ${item.orderType === 1 ? null : styles.lineYellow}`} />
          <div className={styles.orderInfo}>
            <h4>
              {item.packageName}
              {orderFlag && orderFlag === 2 && <span className={styles.orderStatus2}>退</span>}
              {orderFlag && orderFlag === 3 && <span className={styles.orderStatus3}>挽</span>}
            </h4>
            <p>
              <span className={styles.price}>{thousandsFormat(item.totalAmount)}元</span>{' '}
              <span>{this.paid(item.statusCode)}</span> {item.bizDate}
            </p>
          </div>
          <div className="userPortary">
            <Tooltip placement="left" title={text}>
              <Icon type="info-circle" />
            </Tooltip>
          </div>
        </div>
      );
    });

    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <Tooltip placement="right" title={`学员所有订单的汇总数据以及订单详情。`}>
            <span className={styles.boxTitle}>订单状况</span>
          </Tooltip>
        </div>
        <div className={styles.boxFlex} style={{ height: this.props.height + 'px' }}>
          <Row className={styles.orderRow}>
            <Col span={8}>
              <div className={styles.num}>{orderNum ? thousandsFormat(orderNum) : 0}</div>
              <div>订单数</div>
            </Col>
            <Col span={8}>
              <div className={styles.num}>{refundNum ? thousandsFormat(refundNum) : 0}</div>
              <div>退发订单数</div>
            </Col>
            <Col span={8}>
              <div className={styles.num}>
                {totalRestAmount ? thousandsFormat(Math.ceil(totalRestAmount)) : 0}
              </div>
              <div>净流水总额（元）</div>
            </Col>
          </Row>
          <div className={styles.scorllOrder}>
            {orderList.length === 0 ? <Empty /> : orderRender}
          </div>
        </div>
      </div>
    );
  }
}
