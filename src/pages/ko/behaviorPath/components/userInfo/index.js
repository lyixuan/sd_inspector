import React from 'react';
import { connect } from 'dva';
import { Icon, Tooltip } from 'antd';
import styles from '../../style.less';
import avatarStudent from '@/assets/avatarStudent.png';
import { getTransactionIntentionValue } from '../../../utils/utils'
function Sex(props) {
  if (props.sex) {
    return (
      <>
        {props.sex.toLowerCase() === 'female' ? '女' : '男'}，
      </>
    )
  } else {
    return null;
  }

}

function OrderData(props) {
  const ul = props.info.map((item, index) =>
    <OrderDataLi key={index} item={item}></OrderDataLi>
  )
  return ul
}
function Paid(props) {
  if (props.type == 'PAID') {
    return <>已支付</>
  } else if (props.type == 'EXPIRED') {
    return <>已过服务期</>
  } else if (props.type == 'UNPAID') {
    return <>未支付</>
  } else if (props.type == 'CANCELED') {
    return <>已解约</>
  } else if (props.type == 'FREEZED') {
    return <>已冻结</>
  } else if (props.type == 'REVOKED') {
    return <>已取消</>
  } else if (props.type == 'REPEALED') {
    return <>已作废</>
  } else if (props.type == 'STUCHANGED') {
    return <>已转入</>
  } else if (props.type == 'PRODCHANGED') {
    return <>已转班</>
  }

}
function OrderDataLi(props) {
  let name1 = props.item.front_business_name,
    name2 = props.item.front_legion_name
  let front = null;
  let end = null
  if (!props.item.back_college_name && !props.item.back_family_name && !props.item.back_group_name) {
    end = "无"
  } else {
    end = (props.item.back_college_name ? props.item.back_college_name : '') + '/' + (props.item.back_family_name ? props.item.back_family_name : '') + '/' + (props.item.back_group_name ? props.item.back_group_name : '')
  }
  if (name1 && name2) {
    front = name1 + '/' + name2
  } else if (name1 && !name2) {
    front = name1
  } else if (!name1 && name2) {
    front = name2
  } else {
    front = "无"
  }
  const text = <div className={styles.tooltipContent}>
    <h4>前端归属</h4>
    <p>{front}</p>
    <h4>后端归属</h4>
    <p>{end}</p>
  </div>
  return (
    <li className={styles.card}>
      <div className={`${styles.line} ${props.item.order_type == 1 ? null : styles.lineYellow}`}></div>
      <div className={styles.orderInfo}>
        <h4>{props.item.package_name}</h4>
        <p>
          <span className={styles.price}>{props.item.order_amount}元</span> <Paid type={props.item.status_code}></Paid> {props.item.order_time}
        </p>
      </div>
      <div className={styles.notice}>
        <Tooltip placement="left" title={text}>
          <Icon type="info-circle" />
        </Tooltip>
      </div>
    </li>
  );
}
function ListenTime(props) {
  if (props.time) {
    return (
      <>
        {
          (props.time / 60) < 1 ? `${(props.time).toFixed(2)}秒` : `${(props.time / 60).toFixed(2)}分钟`
        }
        {/* {props.time.toLowerCase() === 'female' ? '女' : '男'}， */}
      </>
    )
  } else {
    return '0秒';
  }
}
@connect(({ koPlan }) => ({
  enumDataIntention: koPlan.enumData[12]
}))
class PathUserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    });
  }
  render() {
    const info = this.props.info && this.props.info.user ? this.props.info.user[0]:{};
    const orderData = this.props.info&&this.props.info.orderData?this.props.info.orderData:[];
    const intent = getTransactionIntentionValue(this.props.enumDataIntention);
    return (
      <div className={styles.personIntro}>
        <div className={styles.userArea}>
          <div className={styles.userName}>
            <img className={styles.avatar} src={avatarStudent} />
            <div>
              <p className={styles.name}>{info.userName}</p>
              <p>
                <Sex sex={info.sex}></Sex>{info.age}岁
              </p>
            </div>
          </div>
          <Tooltip placement="bottom" title={`成单意向: ${intent} (${info.transactionIntention})`}>
            {intent == 'A' && <div className={styles.intention + " " + styles.intentionA}></div>}
            {intent == 'B' && <div className={styles.intention + " " + styles.intentionB}></div>}
            {intent == 'C' && <div className={styles.intention + " " + styles.intentionC}></div>}
            {intent == 'D' && <div className={styles.intention + " " + styles.intentionD}></div>}

          </Tooltip>

          {/* <div className={styles.optBtn}>
            <div className={styles.btn}>上一个</div>
            <div className={styles.btn}>下一个</div>
          </div> */}

        </div>
        <ul className={styles.intro}>
          {/* <li>
            <label>前端归属：</label>
            {
              info.frontOrgs ? <span dangerouslySetInnerHTML={{ __html: info.frontOrgs.replace(/[;；]/g, "$&<br />") }}>
              </span> : <span>{info.frontOrgs}</span>
            }
          </li>
          <li>
            <label>后端归属：</label>
            {
              info.backOrgs ? <span dangerouslySetInnerHTML={{ __html: info.backOrgs.replace(/[;；]/g, "$&<br />") }}>
              </span> : <span>{info.backOrgs}</span>
            }
          </li> */}
          {/*<li>*/}
            {/*<label>设备：</label>*/}
            {/*<span>{info.deviceModel ? info.deviceModel : '其他'}</span>*/}
          {/*</li>*/}
          <li>
            <label>注册时间：</label>
            <span>{info.registerTime}</span>
          </li>
        </ul>
        <ul className={styles.intro}>
          <li>
            <label>KO选课：</label>
            <span>{info.choiceLessonStatus == 1 ? '已选课' : '未选课'}</span>
          </li>
          <li>
            <label>付费订单：</label>
            <span>{info.hasPaidOrder ? '是' : '否'}</span>
          </li>
          <li>
            <label>是否选课前付费：</label>
            <span>{info.paidFlag ? '选课前已付费' : '选课前未付费'}</span>
          </li>
          {/* <li>
            <label>选课名称：</label>
            <span>{info.choiceLessionName}</span>
          </li> */}
        </ul>
        <ul className={styles.intro} style={{ display: 'none' }}>
          <li>
            <label>付费订单：</label>
            <span>{info.hasPaidOrder ? '是' : '否'}</span>
          </li>
          <li>
            <label>是否选课前付费：</label>
            <span>{info.paidFlag ? '选课前已付费' : '选课前未付费'}</span>
          </li>
          <li>
            <label>产品包名称：</label>
            {
              info.packageName ? <span dangerouslySetInnerHTML={{ __html: info.packageName.replace(/[;；]/g, "$&<br />") }}>
              </span> : <span>{info.packageName}</span>
            }
            {/* <span dangerouslySetInnerHTML={{ __html: info.packageName.replace(/[;；]/g, "$&<br />") }}>

            </span> */}
          </li>
        </ul>
        <ul className={styles.intro}>
          <li>
            <label>出勤次数：</label>
            <span>{info.attendenceCount}次</span>
          </li>
          <li>
            <label>平均听课时长：</label>
            <span>{
              <ListenTime time={info.avgListenTime}></ListenTime>
              // (info.avgListenTime / 60) < 1 ? `${(info.avgListenTime).toFixed(2)}秒` : `${(info.avgListenTime / 60).toFixed(2)}分钟`
            }</span>
          </li>
          <li>
            <label>做题量：</label>
            <span>{info.studyExeciseNum}</span>
          </li>
          <li>
            <label>做题正确率：</label>
            <span>{info.studyCorrentRate ? (info.studyCorrentRate * 100).toFixed(2) : '0.00'}%</span>
          </li>
        </ul>
        <div className={styles.orderInfo}>
          <div className={styles.title}>
            <span>订单信息</span>
            <span>共{orderData.length}个</span>
          </div>
          <ul className={styles.orderList}>
            <OrderData info={orderData}></OrderData>
          </ul>
        </div>
      </div>
    );
  }
}

export default PathUserInfo;
