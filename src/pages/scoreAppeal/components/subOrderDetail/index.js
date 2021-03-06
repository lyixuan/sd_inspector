import React from 'react';
import moment from 'moment';
import styles from './style.css';
import { jumpMarkingDetails } from '@/pages/ko/utils/utils';

export default class SubOrderDetailComponent extends React.Component {
  render() {

    const { orderInfo,dimensionType,from } = this.props;
    const {stuName,orderNum,signDate,stuId,actualAmount,productName,collegeName, familyName, groupName,orderStatus,nickName} = orderInfo || {};
    const groupName2 = groupName ? ` | ${groupName}`:'';
    const familyName2 = familyName ? ` | ${familyName}`:'';

    let  str = '{"widgetName":"im待申诉详情进学员档案","traceName":"学分管理/待申诉/im/详情页/学员姓名"}';
    if(Number(from)===2){
      str = '{"widgetName":"im在途申诉详情进学员档案","traceName":"学分管理/在途申诉/im/详情页/学员姓名"}';
    }
    return (
      <section className={styles.subOrderCon}>
        <span className={styles.boxTitle}>子订单详情</span>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>学员姓名：{Number(dimensionType)===14?<span style={{color:'#00CCC3',cursor:'pointer'}} onClick={()=>jumpMarkingDetails(stuId,{target:'im'} )}  data-trace={str}>{stuName}</span>:<span>{stuName}</span>}</div>
            <div>学员ID：{stuId}</div>
            <div>组织：{collegeName}{familyName2}{groupName2}</div>
          </div>
          <div className={styles.secRow}>
            <div>子订单编号：{orderNum}</div>
            <div>实际支付金额：{actualAmount}</div>
            <div>订单状态：{orderStatus}</div>
          </div>
          <div className={styles.secRow}>
            <div>报名时间：{signDate ? moment(signDate).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
            <div>产品包：{productName}</div>
            <div>班主任花名：{nickName}</div>
          </div>
        </div>
      </section>
    );
  }
}
