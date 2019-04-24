import React from 'react';
import styles from '../../style.less';
import avatarStudent from '@/assets/avatarStudent.png';
class PathUserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const info = this.props.info
    console.log(9, this.props.info)
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
            <span>{info.sex.toLowerCase() === "female" ? "女" : "男"}</span>
          </li>
          <li>
            <label>年龄：</label>
            <span>{info.age}</span>
          </li>
          <li>
            <label>手机型号：</label>
            <span>{info.phoneBrand}</span>
          </li>
          <li>
            <label>学院：</label>
            <span>自变量学院</span>
          </li>
          <li>
            <label>家族：</label>
            <span>汉专</span>
          </li>
          <li>
            <label>小组：</label>
            <span>运营一组</span>
          </li>
        </ul>
        <ul className={styles.intro}>
          <li>
            <label>来源：</label>
            <span>{info.userFromApp == 1 ? "极速APP" : "主APP"}</span>
          </li>
          <li>
            <label>设备：</label>
            <span>{info.deviceModel}</span>
          </li>
          <li>
            <label>注册状态：</label>
            <span>{info.registerStatus == 1 ? "已注册" : "未注册"}</span>
          </li>
          <li>
            <label>选课状态：</label>
            <span>{info.choiceLessonStatus == 1 ? "已选课" : "未选课"}</span>
          </li>
          {/* <li>
            <label>新老用户：</label>
            <span>老用户</span>
          </li> */}
          <li>
            <label>出勤次数：</label>
            <span>{info.attendenceCount}次</span>
          </li>
          <li>
            <label>平均听课时长：</label>
            <span>{parseInt(info.avgListenTime / 60)}分钟</span>
          </li>
          <li>
            <label>做题正确率：</label>
            <span>{info.studyCorrentRate}%</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default PathUserInfo;
