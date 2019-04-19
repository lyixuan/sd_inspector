import React from 'react';
import { Icon } from 'antd';
import styles from '../../style.less';
// 评价的星星
function Star(props) {
  if (!props.evaluate) {
    return null;
  }
  const evaluate = props.evaluate;
  const number = [1, 2, 3, 4, 5];
  const starList = number.map((item, index) =>
    <Icon type="star" theme="filled" key={index} className={index <= evaluate ? '' : styles.empty} />
  )
  return starList
}

function Prise(props) {
  if (props.li.evaluateStar < 1) {
    return null;
  }
  return (
    <li className={styles.step}>
      <div className={styles.time}>{props.li.evaluateDate.split(" ")[1]}</div>
      <div className={styles.content} style={{ width: "480px" }}>
        <div className={styles.bigDot}>
          <span className={styles.dot}></span>
        </div>
        <div className={styles.priseBox}>
          <div className={styles.prise1}>
            <span>提交课程评价：</span>
            <div className={styles.stars}>
              <Star evaluate={props.li.evaluateStar}></Star>
            </div>
          </div>
          <div className={styles.prise2}>
            <PriseLabel label={props.li.evaluateLabel}></PriseLabel>
          </div>
          <div className={styles.prise3}>{props.li.evaluateContent}</div>
        </div>
      </div>
    </li >

  )
}
function PriseLabel(props) {
  let labels = props.label.split(";")
  const label = labels.map((item, index) =>
    <span key={index} className={styles.label}>{item}</span>
  )
  return label
}

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

class EachItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props.item
    return (
      <>
        <li className={styles.step + " " + styles.studyTitle}>
          <div className={styles.time}>{props.countDate.split(" ")[1]}</div>
          <div className={styles.content}>
            <div className={styles.bigDot}>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.text}>{props.subjectType == 1 ? "直播" : "重播"}</div>
          </div>
        </li>
        <li className={styles.step}>
          <div className={styles.time}> </div>
          <div className={styles.content}>
            <div className={styles.bigDot}>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.text}>{props.subjectName}</div>
          </div>
        </li>
        {
          props.subjectType == 1 ? <Prise li={props}></Prise> : null
        }

      </>
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
          <ul className={styles.behavior + " " + styles.study}>
            <ContentChildren content={item.dialogList.length > 1 ? <Ul item={item.dialogList}></Ul> : null}></ContentChildren>
          </ul>
        </section>
      </DateBar>
    </div>
  )
  return layout
}

class Study extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: ["2019-01-02 12:23:21", "20199-01-02 12:23:21", "219-01-02 12:23:21"],
      listData: [
        {
          countDate: "2019-03-03 12:23:21",
          subjectType: 1, //课程类型（1:直播 2:重播）
          subjectName: "中国近现代史",
          evaluateContent: "服务态度好",
          evaluateStar: 2,
          evaluateLabel:
            "上课态度极好;互动好，并答疑解惑;教学内容非常熟练;知识点讲解特清晰;讲课节奏非常好;语言表达能力强;重点、难点很突出", //按分号拆分
          evaluateDate: "2019-03-03 18:23:21"
        },
        {
          countDate: "2019-03-09 12:23:21",
          subjectType: 2, //课程类型（1:直播 2:重播）
          subjectName: "数学",
          evaluateContent: "服务态度好",
          evaluateStar: 5,
          evaluateLabel:
            "上课态度极好;互动好，并答疑解惑;教学内容非常熟练;知识点讲解特清晰;讲课节奏非常好;语言表达能力强;重点、难点很突出", //按分号拆分
          evaluateDate: "2019-03-03 18:23:21"
        }, {
          countDate: "2019-03-09 12:23:21",
          subjectType: 2, //课程类型（1:直播 2:重播）
          subjectName: "数学",
          evaluateContent: "服务态度好",
          evaluateStar: 5,
          evaluateLabel:
            "上课态度极好;互动好，并答疑解惑;教学内容非常熟练;知识点讲解特清晰;讲课节奏非常好;语言表达能力强;重点、难点很突出", //按分号拆分
          evaluateDate: "2019-03-03 18:23:21"
        }]
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
        <section style={{ display: "none" }}>
          <div className={styles.dateBar}>
            <span>2019-09-09</span>
            <span>
              <Icon type="up" />
            </span>
          </div>
          <ul className={styles.behavior + " " + styles.study}>
            <li className={styles.step + " " + styles.studyTitle}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.text}>进入直播</div>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.text}>进入直播</div>
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.time}>20：00：00</div>
              <div className={styles.content}>
                <div className={styles.bigDot}>
                  <span className={styles.dot}></span>
                </div>
                <div className={styles.priseBox}>
                  <div className={styles.prise1}>
                    <span>提交课程评价：</span>
                    <div className={styles.stars}>
                      <Icon type="star" theme="filled" />
                      <Icon type="star" theme="filled" />
                      <Icon type="star" theme="filled" />
                      <Icon type="star" theme="filled" className={styles.empty} />
                      <Icon type="star" theme="filled" className={styles.empty} />
                    </div>
                  </div>
                  <div className={styles.prise2}>
                    <span className={styles.label}>知识点讲解特清晰</span>
                    <span className={styles.label}>知识点讲解</span>
                  </div>
                  <div className={styles.prise3}>要是能互动就更好了</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Study;
