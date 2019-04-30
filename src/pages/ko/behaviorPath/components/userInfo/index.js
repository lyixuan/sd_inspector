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
        <img className={styles.avatar} src={avatarStudent} />
        <ul className={styles.intro}>
          <li>
            <label>学员：</label>
            <span>{info.userName}</span>
          </li>
          <li>
            <label>性别：</label>
            <span>{info.sex.toLowerCase() === 'female' ? '女' : '男'}</span>
          </li>
          <li>
            <label>年龄：</label>
            <span>{info.age}</span>
          </li>
          <li>
            <label>行政所属：</label>
            <span>
              {info.backOrgs}
              {info.frontOrgs}
            </span>
          </li>

          <li>
            <label>学院：</label>
            <span>{info.collegeName}</span>
          </li>
          <li>
            <label>家族：</label>
            <span>{info.familyName}</span>
          </li>
          <li>
            <label>小组：</label>
            <span>{info.groupName}</span>
          </li>
        </ul>
        <ul className={styles.intro}>
          {/* <li>
            <label>来源：</label>
            <span>{info.userFromApp == 1 ? '极速APP' : '主APP'}</span>
          </li> */}
          <li>
            <label>设备：</label>
            <span>{info.deviceModel ? info.deviceModel : '其他'}</span>
          </li>
          <li>
            <label>选课前是否已付费：</label>
            <span>{info.paidFlag ? '选课前已付费' : '选课前未付费'}</span>
          </li>
          <li>
            <label>注册状态：</label>+<span>{info.registerStatus == 1 ? '已注册' : '未注册'}</span>
          </li>
          <li>
            <label>选课状态：</label>
            <span>{info.choiceLessonStatus == 1 ? '已选课' : '未选课'}</span>
          </li>
          <li>
            <label>选课名称：</label>
            <span>{info.choiceLessionName}</span>
          </li>
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
            <span>{info.studyCorrentRate ? info.studyCorrentRate * 100 : '0.00'}%</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default PathUserInfo;
