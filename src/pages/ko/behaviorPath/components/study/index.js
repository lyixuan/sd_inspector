import React from 'react';
import { Icon, Empty, Spin } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';
import Pager from '../pager/pager.js';
// 评价的星星
function Star(props) {
  if (!props.evaluate && props.evaluate != 0) {
    return null;
  }
  const evaluate = props.evaluate;
  const number = [1, 2, 3, 4, 5];
  const starList = number.map((item, index) => (
    <Icon
      type="star"
      theme="filled"
      key={index}
      className={index < evaluate ? '' : styles.empty}
    />
  ));
  return starList;
}

function Prise(props) {
  // if (props.li.evaluateStar < 1) {
  //   return null;
  // }
  return (
    <li className={styles.step}>
      <div className={styles.time}>
        {props.li.evaluateDate ? props.li.evaluateDate.split(' ')[1] : ''}
      </div>
      <div className={styles.content}>
        <div className={styles.bigDot}>
          <span className={styles.dot} />
        </div>
        <div className={styles.priseBox}>
          <div className={styles.prise1}>
            <span>提交课程评价：</span>

          </div>
          <div className={styles.prise3}>{props.li.subjectName}</div>
          <div style={{ display: "flex", paddingTop: "5px", wordBreak: "break-all" }}>
            <label style={{ width: "135px" }}>评价内容：</label>
            <div>
              <div className={styles.stars}>
                <Star evaluate={props.li.evaluateStar} />
              </div>
              <div className={styles.prise2}>
                <PriseLabel label={props.li.evaluateLabel} />
              </div>
              <div>{props.li.evaluateContent}</div>
            </div>
          </div>


        </div>
      </div>
    </li>
  );
}
function PriseLabel(props) {
  let labels = props.label ? props.label.split(';') : [];
  const label = labels.map((item, index) => (
    <span key={index} className={styles.label}>
      {item}
    </span>
  ));
  return label;
}

// 日期条
function DateBar(props) {
  return (
    <div>
      <div className={styles.dateBar} onClick={() => props.list.onClick(props.index)}>
        <span>{props.date.date ? props.date.date.split(' ')[0] : ''}</span>
        <span>
          <Icon type={props.date.collapse ? 'up' : 'down'} />
        </span>
      </div>
      {props.date.collapse ? props.children : null}
    </div>
  );
}

class EachItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props.item;
    if (props.subjectType != 3) {
      return (
        <>

          <li className={styles.step + ' ' + styles.studyTitle}>
            <div className={styles.time}>{props.countDate ? props.countDate.split(' ')[1] : ''}</div>
            <div className={styles.content}>
              <div className={styles.bigDot}>
                <span className={styles.dot} />
              </div>
              <div className={styles.text}>
                {props.subjectType == 1 ? '参加直播课' : '参加重播课'}
              </div>
            </div>
          </li>
          <li className={styles.step}>
            <div className={styles.time}>听课时长{props.classCount}</div>
            <div className={styles.content}>
              <div className={styles.bigDot}>
                <span className={styles.dot} />
              </div>
              <div className={styles.text}>{props.subjectName}</div>
            </div>
          </li>
          {/* <Prise li={props} /> */}

        </>
      );
    } else {
      return (
        <>
          {props.subjectType == 3 ? <Prise li={props} /> : null}
        </>
      )
    }

  }
}

function UlContent(props) {
  const ul = props.li.map((item, index) => <EachItem item={item} key={index} />);
  return ul;
}
function Ul(props) {
  return <UlContent li={props.item} />;
}

function ContentChildren(props) {
  return props.content;
}

// 整个列表
function Layout(props) {
  const layout = props.dataLists.map((item, index) => (
    <div key={index}>
      <DateBar date={item} list={props} index={index}>
        <section>
          <ul className={styles.behavior + ' ' + styles.study}>
            <ContentChildren
              content={
                item.dialogList.length > 0 ? (
                  <Ul item={item.dialogList} />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )
              }
            />
          </ul>
        </section>
      </DateBar>
    </div>
  ));
  return layout;
}

@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList'],
}))
class Study extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      listData: [],
      currentIndex: 0,
    };
  }

  componentDidMount() {
    console.log(154, this.state.currentIndex);
    this.mount(this.props);
  }
  mount(props) {
    console.log(157, this.state.currentIndex);
    let list = [];
    if (props.behaviorPath.dateListStudy.length > 0) {
      props.behaviorPath.dateListStudy.map(item => {
        list.push({
          date: item,
          collapse: false,
          dialogList: [],
        });
      });

      list[this.state.currentIndex].collapse = true;
      list[this.state.currentIndex].dialogList = props.behaviorPath.studyData;
      this.state.dateList = list;
      this.setState({
        dateList: this.state.dateList,
      });
    } else {
      this.setState({
        dateList: [],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.behaviorPath.studyData) !==
      JSON.stringify(this.props.behaviorPath.studyData) ||
      JSON.stringify(nextProps.behaviorPath.dateList) !==
      JSON.stringify(this.props.behaviorPath.dateListStudy)
    ) {
      this.mount(nextProps);
    }
  }
  getStudyList = paramDate => {
    let params = {
      beginDate: paramDate,
      // beginDate: '2019-04-17',
      stuId: this.props.stuId,
      // stuId: 10257895,
    };
    this.props.dispatch({
      type: 'behaviorPath/learningAct',
      payload: { params },
    });
  };
  setIndex = () => {
    this.setState({
      currentIndex: 0
    })
  }

  toggle = index => {
    this.setState({
      currentIndex: index,
    });
    this.state.dateList.map((item, i) => {
      if (i != index) {
        item.collapse = false;
      }
    });
    if (this.state.dateList[index].collapse) {
      console.log('收起');
    } else {
      let date = this.state.dateList[index].date.replace(/[\u4e00-\u9fa5]/g, '-').split('-');
      date.length = 3;
      this.getStudyList(date.join('-'));
    }

    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
  };

  render() {
    const total = this.props.behaviorPath.studyTotal
    return (
      <div className={styles.comWrap}>
        <Spin spinning={this.props.isLoading}>
          {this.state.dateList.length > 0 ? (
            <Layout dataLists={this.state.dateList} onClick={this.toggle} />
          ) : (
              <Empty />
            )}
        </Spin>
        <Pager onClick={this.setIndex} type="1" total={total}></Pager>
      </div>
    );
  }
}

export default Study;
