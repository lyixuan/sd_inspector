import React from 'react';
import copy from 'copy-to-clipboard';
import { Icon, message } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';
import { pathImUrl, jumpMarkingDetails } from '../../../../utils/utils';
import moment from 'moment'
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';


//对话区域
function SessionContent(props) {
  const li = props.li.map((item, index) => <ListItem {...props} li={item} key={index} />);
  return li;
}
//对话区域行
function ListItem(props) {
  if (!props.li) {
    return null;
  } else {
    return <TeacherOrStudent {...props} item={props.li} />;
  }
}
// 判断是老师还是学员
function TeacherOrStudent(props) {
  if (props.item.type == 1) {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time.split(' ')[1] : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={`${styles.chat} ${styles.chatLeft}`}>
            <div className={styles.avatar}>
              <img src={props.stuHeadUrl ? (pathImUrl + props.stuHeadUrl) : avatarStudent} />
              {/* {props.stuHeadUrl ? <img src={props.stuHeadUrl} /> : <img src={avatarStudent} />} */}
              <p>{props.item.userName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {props.item.content}
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time.split(' ')[1] : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={`${styles.chat} ${styles.chatRight}`}>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {props.item.content}
            </div>
            <div className={styles.avatar}>
              <img src={props.teacherHeadUrl ? (pathImUrl + props.teacherHeadUrl) : avatarTeacher} />
              {/* {props.teacherHeadUrl ? <img src={props.teacherHeadUrl} /> : <img src={avatarTeacher} />} */}
              <p>{props.item.userName}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

class DetailIm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  handleClick = (val) => {
    // 复制
    copy(val)
    message.success('复制成功');
  }
  handleNameClick = (id) => {
    jumpMarkingDetails(id, { target: 'im' })
  }

  render() {
    const { item } = this.props.pageData
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <span className={styles.name + " " + styles.nameCurrent} onClick={() => this.handleNameClick(item.stuId)}>{item.stuName}</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员id：</span>
              <span className={styles.name}>{item.stuId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>后端归属：</span>
              <span className={styles.name}>{item.org}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>班主任：</span>
              <span className={styles.name}>{item.cpName}</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>会话老师：</span>
              <span className={styles.name}>{item.teacherAccount}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>订单id：</span>
              <span className={styles.name}>{item.ordId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>产品包：</span>
              <span className={styles.name}>{item.packageName}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>满意度：</span>
              {
                item.evaluate == 0 ? <span className={styles.name}>不满意</span> : null
              }
              {
                item.evaluate == 1 ? <span className={styles.name}>一般</span> : null
              }
              {
                item.evaluate == 2 ? <span className={styles.name}>满意</span> : null
              }
              {
                item.evaluate == 3 ? <span className={styles.name}>非常满意</span> : null
              }
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>咨询id：</span>
              <span className={styles.name}>{item.itemId}</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>评价：</span>
              <span className={styles.name}>{item.opinion}</span>
            </div>
          </li>
        </ul>
        <div className={styles.imContent}>
          <div className={styles.dateBar}>
            <span>{moment(item.date.split(" ")[0]).format('YYYY年MM月DD日')}</span>
            <span className={styles.btn} onClick={(val) => this.handleClick(item.content)}>
              <Icon type="copy" />复制会话
            </span>
          </div>

          <ul className={styles.behavior}>
            <SessionContent stuHeadUrl={item.stuHeadUrl} teacherHeadUrl={item.teacherHeadUrl} li={item.contentList}></SessionContent>
            {/* <li className={styles.step}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={`${styles.chat} ${styles.chatRight}`}>
                  <div className={styles.chatContent}>
                    <span className={styles.striangle}><em></em></span>
                    报考科目有哪些报考科目有哪些报考科目有哪些报考科目有哪些
                  </div>
                  <div className={styles.avatar}>
                    <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                    <p>尚德学员</p>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={`${styles.chat} ${styles.chatLeft}`}>
                  <div className={styles.avatar}>
                    <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                    <p>尚德学员</p>
                  </div>
                  <div className={styles.chatContent}>
                    <span className={styles.triangle}><em></em></span>
                    报考科目有哪些
					      	</div>
                </div>
              </div>
            </li> */}

          </ul>


        </div>
      </>
    );
  }
}

export default DetailIm;

