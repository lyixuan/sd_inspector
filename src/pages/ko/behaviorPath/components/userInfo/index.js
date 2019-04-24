import React from 'react';
import styles from '../../style.less';
import avatarStudent from '@/assets/avatarStudent.png';
class PathUserInfo extends React.Component {

  render() {
    return (
      <div className={styles.personIntro}>
        <img className={styles.avatar} src={avatarStudent} />
        <ul className={styles.intro}>
          <li>
            <label>学员：</label>
            <span>张小明</span>
          </li>
          <li>
            <label>性别：</label>
            <span>男</span>
          </li>
          <li>
            <label>年龄：</label>
            <span>25</span>
          </li>
          <li>
            <label>手机型号：</label>
            <span>iphone xs max</span>
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
            <span>抖音</span>
          </li>
          <li>
            <label>设备：</label>
            <span>主APP</span>
          </li>
          <li>
            <label>注册状态：</label>
            <span>已注册</span>
          </li>
          <li>
            <label>选课状态：</label>
            <span>未选课</span>
          </li>
          <li>
            <label>新老用户：</label>
            <span>老用户</span>
          </li>
          <li>
            <label>出勤次数：</label>
            <span>30次</span>
          </li>
          <li>
            <label>平均听课时长：</label>
            <span>60分钟</span>
          </li>
          <li>
            <label>做题正确率：</label>
            <span>70%</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default PathUserInfo;
