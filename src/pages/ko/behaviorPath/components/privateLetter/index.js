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
          <Icon type={props.date.collapse ? "up" : "down"} style={{ display: (props.date.dialogList.length > 0) ? "block" : "none" }} />
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
        {
          !this.state.expand ? (
            <li className={styles.step + " " + styles.title} onClick={this.toggleSession}>
              <div className={styles.time}>{props.li.contentList[0].consultTime.split(" ")[1]}</div>
              <div className={styles.content}>
                <div className={styles.bigDot + " " + styles.plus}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.privateToggle}>
                  <div className={styles.avatar}>
                    <img src="http://img1.imgtn.bdimg.com/it/u=1393987749,3422146058&fm=26&gp=0.jpg" />
                  </div>
                  <div className={styles.intro}>
                    <p className={styles.name}>{props.li.contentList[0].userName}</p>
                    <p className={styles.chat}>{props.li.contentList[0].message}</p>
                  </div>
                </div>
              </div>
            </li>
          ) : (
              <li className={styles.step + " " + styles.title} onClick={this.toggleSession}>
                <div className={styles.time}>{props.li.countDate.split(" ")[1]}</div>
                <div className={styles.content}>
                  <div className={styles.bigDot + " " + (this.state.expand ? '' : styles.plus)}>
                    <span className={styles.dot}></span>
                  </div>
                  <div className={styles.text}>与{props.li.userName}的对话</div>
                </div>
              </li>
            )
        }

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

function Layout(props) {
  const layout = props.dataLists.map((item, index) =>
    <div key={index}>
      <DateBar date={item} list={props} index={index}>
        <section>
          <ul className={styles.behavior + " " + styles.privateLetter}>
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

class PrivateLetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 100,
      dateList: ["2019-01-02 12:23:21", "20199-01-02 12:23:21", "219-01-02 12:23:21"],
      listData:
        [{
          countDate: "2019-01-03 12:23:21",
          userName: "李四",
          contentList: [
            {
              userId: 100,
              userName: "张三",
              consultTime: "2019-01-03 12:23:21",
              message: "今年自考什么时候报名"
            },
            {
              userId: 2,
              userName: "张三",
              consultTime: "2019-01-03 12:23:21",
              message: "今年自考什么时候报名"
            }
          ]
        },
        {
          countDate: "2019-02-03 12:23:21",
          userName: "李四22",
          contentList: [
            {
              userId: 11,
              userName: "张三",
              consultTime: "2019-03-03 12:23:21",
              message: "今年自考什么时候报名"
            },
            {
              userId: 100,
              userName: "张三",
              consultTime: "2019-03-03 12:23:21",
              message: "今年自考什么时候报名"
            }
          ]
        }]
    }
    let list = [];
    // 根据userId来判断是学员还是老师，如果是学员，在数据中加一个userType
    this.state.listData.map(item => {
      item.contentList.map(item => {
        if (item.userId == this.state.userId) {
          item.userType = 1
        } else {
          item.userType = 2
        }
      })
    })
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

      </div>
    );
  }
}

export default PrivateLetter;
