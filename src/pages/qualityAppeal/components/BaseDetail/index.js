import React from 'react';
import PersonInfo from './personInfo';
import SubOrder from '@/pages/qualityAppeal/components/BaseDetail/subOrderInfo/subOrder';
import IllegalInfo from '@/pages/qualityAppeal/components/BaseDetail/IllegalInfo';
import styles from './style.css';

class BaseDetail extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <PersonInfo data={data}/>
        <div><span className={styles.spanLabel}>子订单编号</span>：{data.orderNum}</div>
        <SubOrder orderNumData={data.orderDetail}/>
        <IllegalInfo data={data}/>
      </>
    );
  }
}

export default BaseDetail;
