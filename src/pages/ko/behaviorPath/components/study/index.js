import React from 'react';
import { Icon, Empty, Spin } from 'antd';
import { connect } from 'dva';
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
      <div className={styles.dateBar} onClick={() => props.list.onClick(props.index)}>
        <span>{props.date.date.split(" ")[0]}</span>
        <span>
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
            <ContentChildren content={item.dialogList.length > 0 ? <Ul item={item.dialogList}></Ul> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}></ContentChildren>
          </ul>
        </section>
      </DateBar>
    </div>
  )
  return layout
}


@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList']
}))

class Study extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      listData: [],
      currentIndex: 0
    }
  }

  componentDidMount() {
    this.mount(this.props);
  }
  mount(props) {
    let list = [];
    if (props.behaviorPath.dateList.length > 0) {
      props.behaviorPath.dateList.map(item => {
        list.push({
          date: item,
          collapse: false,
          dialogList: [],
        });
      });

      list[this.state.currentIndex].collapse = true;
      list[this.state.currentIndex].dialogList = props.behaviorPath.studyData ? props.behaviorPath.studyData : [];
      this.state.dateList = list;
      this.setState({
        dateList: this.state.dateList
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.behaviorPath.studyData) !==
      JSON.stringify(this.props.behaviorPath.studyData)
    ) {
      this.mount(nextProps);

    }
  }
  getStudyList = paramDate => {
    let params = {
      beginDate: paramDate,
      // beginDate: '2019-04-17',
      stuId: this.props.stuId,
    };
    this.props.dispatch({
      type: 'behaviorPath/learningAct',
      payload: { params },
    });
  };

  toggle = (index) => {
    this.setState({
      currentIndex: index
    })
    this.state.dateList.map((item, i) => {
      if (i != index) {
        item.collapse = false
      }
    })
    if (this.state.dateList[index].collapse) {
      console.log('收起');
    } else {
      let date = this.state.dateList[index].date.replace(/[\u4e00-\u9fa5]/g, '-').split('-');
      date.length = 3;
      this.getStudyList(date.join('-'));
    }

    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
  }

  render() {
    return (
      <div className={styles.comWrap}>
        <Spin spinning={this.props.isLoading}>
          <Layout dataLists={this.state.dateList} onClick={this.toggle}></Layout>
        </Spin>
        {/* <Layout dataLists={this.state.dateList} onClick={this.toggle}></Layout> */}
      </div>
    );
  }
}

export default Study;
