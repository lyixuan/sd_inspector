import React from 'react';
import { Icon } from 'antd';
import styles from '../../style.less';


// 日期条
function DateBar(props) {
  return (
    <div>
      <div className={styles.dateBar}>
        <span>{props.date.date.split(" ")[0]}</span>
        <span onClick={() => props.list.onClick(props.index)}>
          <Icon type={props.date.collapse ? "up" : "down"} />
        </span>
      </div>
      {props.date.collapse ? props.children : null}
    </div>
  )
}

// 会话中可展开收起的行
class ToggleSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true
    }
  }
  toggleSession = () => {
    this.setState({
      expand: !this.state.expand
    })

  }
  render() {
    let props = this.props
    return (
      <>
        <li className={styles.step + " " + styles.title} onClick={this.toggleSession}>
          <div className={styles.time}>{props.li.countDate.split(" ")[1]}</div>
          <div className={styles.content}>
            <div className={styles.bigDot + " " + (this.state.expand ? '' : styles.plus)}>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.text}>微信进入会话</div>
          </div>
        </li>
        {this.state.expand ? props.children : null}
      </>
    );
  }
}
//对话区域
function SessionContent(props) {
  const li = props.li.map((item, index) =>
    <ListItem li={item} key={index}></ListItem>
  )
  return li

}
//对话区域行
function ListItem(props) {
  if (!props.li) {
    return null;
  } else {
    return <TeacherOrStudent item={props.li}></TeacherOrStudent>
  }
}
// 判断是老师还是学员
function TeacherOrStudent(props) {
  if (props.item.userType == 1) {
    return (
      <li className={styles.step}>
        <div className={styles.time}>{props.item.consultTime.split(" ")[1]}</div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
              <p>{props.item.userName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}><em></em></span>
              {props.item.message}
            </div>
          </div>
        </div>
      </li>
    )
  } else {
    return (
      <li className={styles.step}>
        <div className={styles.time}>{props.item.consultTime.split(" ")[1]}</div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.chatRight}>
            <div className={styles.chatContent}>
              <span className={styles.triangle}><em></em></span>
              {props.item.message}
            </div>
            <div className={styles.avatar}>
              <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
              <p>{props.item.userName}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
function UlContent(props) {
  const layout = props.li.map((item, index) =>
    <ToggleSession li={item} key={index}>
      <SessionContent li={item.contentList}></SessionContent>
    </ToggleSession>
  )
  return layout
}

function Ul(props) {
  return (
    <UlContent li={props.item.dialogList}></UlContent>
  )
}

// 整个列表
function Layout(props) {
  const layout = props.dataLists.map((item, index) =>
    <div key={index}>
      <DateBar date={item} list={props} index={index}>
        <section>
          <ul className={styles.behavior}>
            <ContentChildren content={item.dialogList.length > 1 ? <Ul item={item}></Ul> : null}></ContentChildren>
          </ul>
        </section>
      </DateBar>
    </div>
  )
  return layout
}
function ContentChildren(props) {
  return props.content
}

class Wechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: ["2019-01-02 12:23:21", "20199-01-02 12:23:21", "219-01-02 12:23:21"],
      listData: [
        {
          countDate: "2019-01-02 12:253:21",
          evaluate: 3, //满意度评价，0：不满意 1：一般 2：满意 3：非常满意
          consultType: 1,
          contentList: [
            {
              userName: "张三",
              userType: "1", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "一次能考过吗"
            },
            {
              userName: "张三",
              userType: "1", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "一次能考过吗"
            },
            {
              userName: "班主任",
              userType: "2", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "一次能考过吗"
            },
            {
              userName: "张三",
              userType: "1", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "有免费的公开课吗"
            }
          ]
        },
        {
          countDate: "2019-01-03 12:23:99",
          evaluate: 0, //满意度评价，0：不满意 1：一般 2：满意 3：非常满意
          consultType: 0,
          contentList: [
            {
              userName: "李四",
              userType: "1", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "一次能考过吗"
            },
            {
              userName: "班主任",
              userType: "2", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "一次能考过吗"
            },
            {
              userName: "张三",
              userType: "1", //用户类型（1:学员 2:老师）
              consultTime: "2019-01-02 12:23:21",
              message: "有免费的公开课吗"
            }
          ]
        }
      ]
    }
    let list = [];
    this.state.dateList.map(item => {
      list.push({
        date: item,
        collapse: false,
        dialogList: []
      })
    })
    list[0].collapse = true;
    list[0].dialogList = this.state.listData;
    list[1].dialogList = this.state.listData;
    this.state.dateList = list
  }

  toggle = (index) => {
    this.state.dateList.map((item, i) => {
      if (i != index) {
        item.collapse = false
      }
    })
    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
    this.setState({
      dateList: this.state.dateList
    })
  }


  render() {
    return (
      <div className={styles.comWrap}>
        <Layout dataLists={this.state.dateList} onClick={this.toggle}></Layout>
      </div >
    );
  }
}

export default Wechart;
