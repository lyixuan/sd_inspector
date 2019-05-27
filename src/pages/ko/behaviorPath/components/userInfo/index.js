import React from 'react';
import { Icon } from 'antd';
import styles from '../../style.less';
import avatarStudent from '@/assets/avatarStudent.png';
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
class PathUserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const info = this.props.info[0];

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
          <div className={styles.optBtn}>
            <div className={styles.btn}>上一个</div>
            <div className={styles.btn}>下一个</div>
          </div>

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
          <li>
            <label>设备：</label>
            <span>{info.deviceModel ? info.deviceModel : '其他'}</span>
          </li>
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
            <span>共10个</span>
          </div>
          <ul className={styles.orderList}>
            <li className={styles.card}>
              <div className={styles.line}></div>
              <div className={styles.orderInfo}>
                <h4>自考公共课</h4>
                <p>
                  <span className={styles.price}>0元</span> 已支付 2019-10-10 12:22:23
                </p>
              </div>
              <div className={styles.notice}>
                <Icon type="info-circle" />
              </div>
            </li>
            <li className={styles.card}>
              <div className={styles.line}></div>
              <div className={styles.orderInfo}>
                <h4>自考公共课</h4>
                <p>
                  <span className={styles.price}>0元</span> 已支付 2019-10-10 12:22:23
                </p>
              </div>
              <div className={styles.notice}>
                <Icon type="info-circle" />
              </div>
            </li>
            <li className={styles.card}>
              <div className={styles.line}></div>
              <div className={styles.orderInfo}>
                <h4>自考公共课</h4>
                <p>
                  <span className={styles.price}>0元</span> 已支付 2019-10-10 12:22:23
                </p>
              </div>
              <div className={styles.notice}>
                <Icon type="info-circle" />
              </div>
            </li>
            <li className={styles.card}>
              <div className={styles.line}></div>
              <div className={styles.orderInfo}>
                <h4>自考公共课</h4>
                <p>
                  <span className={styles.price}>0元</span> 已支付 2019-10-10 12:22:23
                </p>
              </div>
              <div className={styles.notice}>
                <Icon type="info-circle" />
              </div>
            </li>
            <li className={styles.card}>
              <div className={styles.line}></div>
              <div className={styles.orderInfo}>
                <h4>自考公共课</h4>
                <p>
                  <span className={styles.price}>0元</span> 已支付 2019-10-10 12:22:23
                </p>
              </div>
              <div className={styles.notice}>
                <Icon type="info-circle" />
              </div>
            </li>
            <li className={styles.card}>
              <div className={styles.line}></div>
              <div className={styles.orderInfo}>
                <h4>自考公共课</h4>
                <p>
                  <span className={styles.price}>0元</span> 已支付 2019-10-10 12:22:23
                </p>
              </div>
              <div className={styles.notice}>
                <Icon type="info-circle" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PathUserInfo;
