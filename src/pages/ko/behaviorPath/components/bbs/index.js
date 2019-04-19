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
// 判断贴子类型
function sessionType(type) {
  if (type == 1) {
    return "主帖"
  } else if (type == 2) {
    return "跟帖"
  } else if (type == 3) {
    return "点赞"
  }

}
class EachItem extends React.Component {
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
    console.log(this.state.expand)
  }

  processStr = (str, n) => {
    var l = str.length;
    if (l <= n) return str;
    return str.slice(0, l - (l - 100)) + "...";
  }

  render() {
    let props = this.props.item
    let { expand } = this.state
    return (
      <li className={styles.step}>
        <div className={styles.time}>{props.countDate.split(" ")[1]}</div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.post}>
            <p className={styles.postHead}>{sessionType(props.postType)}</p>
            {
              props.masterPostContent ? (
                <div className={styles.postBody}>
                  {
                    expand ? this.processStr(props.masterPostContent, 100) : props.masterPostContent
                  }
                  {
                    props.masterPostContent.length > 100 ? <span className={styles.toggle} onClick={this.toggleSession}>{!expand ? '收起' : '展开'} <Icon type={!expand ? 'up' : 'down'} /></span> : null
                  }

                </div>
              ) : null
            }
            {
              props.slavePostContent ? (
                <div className={styles.postBody}>
                  {
                    expand ? this.processStr(props.slavePostContent, 100) : props.slavePostContent
                  }
                  {
                    props.slavePostContent.length > 100 ? <span className={styles.toggle} onClick={this.toggleSession}>{!expand ? '收起' : '展开'} <Icon type={!expand ? 'up' : 'down'} /></span> : null
                  }

                </div>
              ) : null
            }
            {
              props.replayPostContent ? (
                <div className={styles.postBody}>
                  {
                    expand ? this.processStr(props.replayPostContent, 100) : props.replayPostContent
                  }
                  {
                    props.replayPostContent.length > 100 ? <span className={styles.toggle} onClick={this.toggleSession}>{!expand ? '收起' : '展开'} <Icon type={!expand ? 'up' : 'down'} /></span> : null
                  }

                </div>
              ) : null
            }
          </div>
        </div>
      </li>
    )
  }
}

function UlContent(props) {
  const ul = props.li.map((item, index) =>
    <EachItem item={item} key={index}></EachItem>
  )
  return ul
}

function Ul(props) {
  return (
    <UlContent li={props.item}></UlContent>
  )
}

function ContentChildren(props) {
  return props.content
}

// 整个列表
function Layout(props) {
  const layout = props.dataLists.map((item, index) =>
    <div key={index}>
      <DateBar date={item} list={props} index={index}>
        <section>
          <ul className={styles.behavior}>
            <ContentChildren content={item.dialogList.length > 1 ? <Ul item={item.dialogList}></Ul> : null}></ContentChildren>
          </ul>
        </section>
      </DateBar>
    </div>
  )
  return layout
}

class Bbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: ["2019-01-02 12:23:21", "20199-01-02 12:23:21", "219-01-02 12:23:21"],
      listData: [
        {
          countDate: "2019-01-02 12:23:21",
          postType: 1, //1：发主贴;2:跟帖；3：点赞；
          masterPostContent: "考期一定过1904考期一定过1904考期一定过1904考期一定过1904考期一定过1904考期一定过考期一定过1904考期一定过1904考期一定过1904考期一定过1904考期一定过1904考期一定过，dkfljdfkdfj", //主贴内容
          slavePostContent: "加油", //跟帖内容
          replayPostContent: "加油" //回复内容
        },
        {
          countDate: "2019-01-02 12:23:21",
          postType: 2, //1：发主贴;2:跟帖；3：点赞；
          masterPostContent: "1904考期一定过", //主贴内容
          slavePostContent: "", //跟帖内容
          replayPostContent: "" //回复内容
        },
        {
          countDate: "2019-01-02 12:23:21",
          postType: 3, //1：发主贴;2:跟帖；3：点赞；
          masterPostContent: "1904考期一定过", //主贴内容
          slavePostContent: "加油", //跟帖内容
          replayPostContent: "加油" //回复内容
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

export default Bbs;
