import React from 'react';
import { Icon } from 'antd';
import {
  pathImUrl,
  getSubStringValue,
  linkRoute, linkImgRouteBul,
} from '@/pages/ko/utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import robort2 from '@/assets/robort2.png';
import styles from './style.less';


// 评价的星星
function Star(props) {
  const evaluate = props.evaluate;
  const number = [1, 2, 3, 4];
  const starList = number.map((item, index) => (
    <Icon
      type="star"
      theme="filled"
      key={index}
      className={index <= evaluate ? '' : styles.empty}
    />
  ));
  return starList;
}

function Prise(props) {
  const { starLevel } = props.li
  // if (!props.li.evaluate && props.li.evaluate != 0) {
  //   return null;
  // }
  if (starLevel < 0 || starLevel === null) {
    return null;
  }
  return (
    <li className={styles.step}>
      <div className={styles.time}>
        {props.li.evaluateTime ? props.li.evaluateTime : ''}
        {/* {props.li.countDate ? props.li.countDate.split(' ')[1] : ''} */}
      </div>
      <div className={styles.content}>
        <div className={styles.bigDot}>
          <span className={styles.dot} />
        </div>
        <div className={styles.prise}>
          <span>学员提交评价：</span>
          <div className={styles.stars}>
            <Star evaluate={starLevel} />
          </div>
          <p style={{ color: '#59595E', marginLeft: '10px' }}>
            {starLevel === 0 && '不满意'}
            {starLevel === 1 && '一般'}
            {starLevel === 2 && '满意'}
            {starLevel === 3 && '非常满意'}
          </p>
        </div>
      </div>
    </li>
  );
}

function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataMark.contentList.map((item, index) => <ListItem item={item} dataMark={props.dataMark} key={index} />)}
      <Prise li={props.dataMark} />
    </ul>

  </section>;
  return layout;
}

//对话区域行
function ListItem(props) {
  if (!props.item) {
    return null;
  } else {
    return <TeacherOrStudent {...props} />;
  }
}

// 判断是老师还是学员
function TeacherOrStudent(props) {
  if (props.item.type == 1) {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={props.dataMark.stuHeadUrl ? (pathImUrl + props.dataMark.stuHeadUrl) : avatarStudent} />
              <p>{getSubStringValue(props.dataMark.stuName, 3)}</p>
            </div>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.content, styles.linkRoute) }}></span>
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    let reg = /##[\s\S]*##/g;
    let answer = props.item.content;
    if (!answer) { return <></> }

    if (answer && answer.match(/\{\{(.+?)\}\}/g)) {
      answer = answer.replace(/\{\{(.+?)\}\}/g, 1)
    }
    if (answer && answer.match(reg)) {
      let media = JSON.parse(answer.match(reg)[0].replace(/##/g, "").replace(/\\"/g, '"'));
      let content = answer.replace(reg, "##placeholder##").split(/##/g)
      let mediaContent = [];
      content.forEach((item, index) => {
        if (item) {
          if (item == "placeholder") {
            mediaContent.push({
              type: "media",
              media: media
            })
          } else {
            mediaContent.push({
              type: "text",
              content: item
            })
          }
        }
      })
      mediaContent.map(item => {
        if (item.type === 'media' && item.media.type === 'img') {
          answer = item.media.arr[0].url
        }
      })
    } else if (answer.indexOf('answerType') > -1) {
      answer = JSON.parse(answer.replace(/\\"/g, "").replace(/“/g, "'").replace(/”/g, "'").replace(/\\/g, "").replace(/\\"/g, "")).answer;
    } else {
      answer = props.item.content
    }
    // let answer = props.item.content;
    // if (answer.indexOf('answerType') > -1) {
    //   answer = JSON.parse(answer.replace(/\\"/g, "").replace(/“/g, "'").replace(/”/g, "'").replace(/\\/g, "").replace(/\\"/g, "")).answer;
    // } else {
    //   answer = props.item.content
    // }
    // if (!answer) { return <></> }

    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatRight}>
            <div className={linkImgRouteBul(answer) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(answer, styles.linkRoute) }}></span>
            </div>
            <div className={styles.avatar}>
              <img src={robort2} />
              {/* <img src={props.dataMark.teacherHeadUrl ? (pathImUrl + props.dataMark.teacherHeadUrl) : avatarTeacher} /> */}
              <p>{getSubStringValue(props.dataMark.teacherName, 3)}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

class BIDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
    }
  }

  render() {

    return (
      <div>
        <Layout dataMark={this.props.content}></Layout>
      </div>
    );
  }
}

export default BIDialog;
