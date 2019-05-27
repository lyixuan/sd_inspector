import React from 'react';
import { Icon, Empty, Spin } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';
import Pager from '../pager/pager.js';
import face1 from '@/assets/face1.png';
import face2 from '@/assets/face2.png';


// 日期条
function DateBar(props) {
  return (
    <div>
      <div className={styles.dateBar} onClick={() => props.list.onClick(props.index)}>
        <div className={styles.expression}>
          <span>{props.date.date.split(" ")[0]}</span>
          <div className={styles.expressionArea}>
            <img src={face1} />
            <div className={styles.progress}>
              <p className={styles.progressText}>
                <span>60%</span>
                <span>40%</span>
              </p>
              <div className={styles.progressBar}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
              </div>
            </div>
            <img src={face2} />
          </div>
        </div>

        <span>
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
    return "点赞帖"
  } else if (type == 4) {
    return "回复帖"
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
        <div className={styles.time}>{props.countDate ? props.countDate.split(" ")[1] : ''}</div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot}></span>
          </div>
          <div className={styles.post}>
            <p className={styles.postHead}>{sessionType(props.postType)}</p>
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
            <ContentChildren content={item.dialogList.length > 0 ? <Ul item={item.dialogList}></Ul> : <Spin size="small" style={{ textAlign: "center", width: "100%" }} />}></ContentChildren>
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

class Bbs extends React.Component {
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
  didMount(props) {
    let list = [];
    if (props.behaviorPath.dateListBbs.length > 0) {
      props.behaviorPath.dateListBbs.map(item => {
        list.push({
          date: item,
          collapse: false,
          dialogList: [],
        });
      });

      list[this.state.currentIndex].collapse = true;
      list[this.state.currentIndex].dialogList = props.behaviorPath.bbsData;
      this.state.dateList = list;
      this.setState({
        dateList: this.state.dateList,
      });
    }
  }
  mount(props) {
    if (props.behaviorPath.dateListBbs.length > 0) {
      this.state.dateList[this.state.currentIndex].dialogList = props.behaviorPath.bbsData;
      this.setState({
        dateList: this.state.dateList,
      });
    }

    // let list = [];
    // if (props.behaviorPath.dateListBbs.length > 0) {
    //   props.behaviorPath.dateListBbs.map(item => {
    //     list.push({
    //       date: item,
    //       collapse: false,
    //       dialogList: [],
    //     });
    //   });
    //   console.log(174, this.state.currentIndex)
    //   list[this.state.currentIndex].collapse = true;
    //   list[this.state.currentIndex].dialogList = props.behaviorPath.bbsData ? props.behaviorPath.bbsData : [];
    //   this.state.dateList = list;
    //   this.setState({
    //     dateList: this.state.dateList
    //   });
    // } else {
    //   this.setState({
    //     dateList: []
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    if ((JSON.stringify(nextProps.behaviorPath.dateListBbs) !== JSON.stringify(this.props.behaviorPath.dateListBbs))) {
      this.didMount(nextProps);
    }
    if ((JSON.stringify(nextProps.behaviorPath.bbsData) !== JSON.stringify(this.props.behaviorPath.bbsData))) {
      this.mount(nextProps);
    }
  }
  getBbsList = paramDate => {
    let params = {
      beginDate: paramDate,
      stuId: this.props.stuId,
    };
    this.props.dispatch({
      type: 'behaviorPath/bbsAct',
      payload: { params },
    });
  };
  setIndex = () => {
    this.setState({
      currentIndex: 0
    })
  }

  toggle = (index) => {
    this.setState({
      currentIndex: index
    })
    // this.state.dateList.map((item, i) => {
    //   if (i != index) {
    //     item.collapse = false
    //   }
    // })
    if (this.state.dateList[index].collapse) {
      console.log('收起');
    } else {
      if (this.state.dateList[index].dialogList.length < 1) {
        let date = this.state.dateList[index].date.replace(/[\u4e00-\u9fa5]/g, '-').split('-');
        date.length = 3;
        this.getBbsList(date.join('-'));
      }

    }
    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
  }

  render() {
    const total = this.props.behaviorPath.bbsTotal
    return (
      <div className={styles.comWrap}>
        <Spin spinning={this.props.isLoading}>
          {
            this.state.dateList.length > 0 ? <Layout dataLists={this.state.dateList} onClick={this.toggle}></Layout> : <Empty></Empty>
          }
        </Spin>
        <Pager onClick={this.setIndex} type="4" total={total} stuId={this.props.stuId}></Pager>
        {/* <Layout dataLists={this.state.dateList} onClick={this.toggle}></Layout> */}
      </div >
    );
  }
}

export default Bbs;
