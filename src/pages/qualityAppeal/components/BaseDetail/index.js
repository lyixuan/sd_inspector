import React from 'react';
import PersonInfo from './personInfo';
import SubOrder from '@/pages/qualityAppeal/components/BaseDetail/subOrderInfo/subOrder';
import IllegalInfo from '@/pages/qualityAppeal/components/BaseDetail/IllegalInfo';
import IllegallDetail from '@/pages/qualityAppeal/components/BaseDetail/IllegallDetail';
import styles from './style.css';

class BaseDetail extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <div className={styles.firstTitle}>质检违规信息</div>
        <div style={{padding:20}}>
          <PersonInfo data={data}/>
          <div><span className={styles.spanLabel}>子订单编号</span>：{data.orderNum}</div>
          {data.orderNum&&<SubOrder orderNumData={data.orderDetail}/>}
          <IllegalInfo data={data}/>
          <IllegallDetail data={data}/>
        </div>
      </>
    );
  }
}

export default BaseDetail;
