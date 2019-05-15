import React from 'react';
import styles from '../../style.less';
import avatarStudent from '@/assets/avatarStudent.png';
class PathUserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const info = this.props.info;
    return (
      <div className={styles.personIntro}>
        <div className={styles.userArea}>
          <div className={styles.userName}>
            <img className={styles.avatar} src={avatarStudent} />
            <div>
              <p className={styles.name}>{info.userName}</p>
              <p>{info.sex.toLowerCase() === 'female' ? '女' : '男'}，{info.age}岁</p>
            </div>
          </div>
          <div className={styles.optBtn}>
            <div className={styles.btn}>上一个</div>
            <div className={styles.btn}>下一个</div>
          </div>

        </div>
        <ul className={styles.intro}>
          <li>
            <label>前端归属：</label>
            <span>
              {info.frontOrgs}
            </span>
          </li>
          <li>
            <label>后端归属：</label>
            <span dangerouslySetInnerHTML={{ __html: info.backOrgs.replace(/[;；]/g, "$&<br />") }}>
              {/* {info.backOrgs ? info.backOrgs.replace(/[;；]/g, "$&\r\n") : info.backOrgs} */}
            </span>
          </li>
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
            <label>选课名称：</label>
            <span>{info.choiceLessionName}</span>
          </li>
        </ul>
        <ul className={styles.intro}>
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
            <span dangerouslySetInnerHTML={{ __html: info.packageName.replace(/[;；]/g, "$&<br />") }}>
              {/* {info.packageName} */}
            </span>
          </li>
        </ul>
        <ul className={styles.intro}>
          <li>
            <label>出勤次数：</label>
            <span>{info.attendenceCount}次</span>
          </li>
          <li>
            <label>平均听课时长：</label>
            <span>{parseInt(info.avgListenTime / 60)}分钟</span>
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
      </div>
    );
  }
}

export default PathUserInfo;
