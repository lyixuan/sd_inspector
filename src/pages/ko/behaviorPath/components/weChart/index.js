import React from 'react';
import { Icon, Empty, Spin } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import miniApp from '@/assets/miniApp.png';
import Pager from '../pager/pager.js';

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

// 会话中可展开收起的行
class ToggleSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true,
    };
  }
  toggleSession = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };
  render() {
    let props = this.props;
    return (
      <>
        <li className={styles.step + ' ' + styles.title} onClick={this.toggleSession}>
          <div className={styles.time}>
            {props.li.countDate ? props.li.countDate.split(' ')[1] : ''}
          </div>
          <div className={styles.content}>
            <div className={styles.bigDot + ' ' + (this.state.expand ? '' : styles.plus)}>
              <span className={styles.dot} />
            </div>
            <div className={styles.text}>进入会话</div>
          </div>
        </li>
        {this.state.expand ? props.children : null}
      </>
    );
  }
}
//对话区域
function SessionContent(props) {
  const li = props.li.map((item, index) => <ListItem li={item} key={index} />);
  return li;
}
//对话区域行
function ListItem(props) {
  if (!props.li) {
    return null;
  } else {
    return <TeacherOrStudent item={props.li} />;
  }
}
// 判断是老师还是学员
function TeacherOrStudent(props) {
  if (props.item.userType == 1) {
    if (props.item.appletFlag) {
      return (
        <li className={styles.step}>
          <div className={styles.time}>
            {props.item.consultTime ? props.item.consultTime.split(' ')[1] : ''}
          </div>
          <div className={styles.content}>
            <div className={styles.bigDot}>
              <span className={styles.dot} />
            </div>
            <div className={styles.chatLeft}>
              <div className={styles.avatar}>
                <img src={avatarStudent} />
                <p>{props.item.userName}</p>
              </div>
              <div className={`${styles.chatContent} ${styles.miniApp}`}>
                <img src={miniApp} />
                {props.item.message}
              </div>
            </div>
          </div>
        </li>
      )
    }
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.consultTime ? props.item.consultTime.split(' ')[1] : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={avatarStudent} />
              <p>{props.item.userName}</p>
            </div>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {props.item.message}
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    if (props.item.appletFlag) {
      return (
        <li className={styles.step}>
          <div className={styles.time}>
            {props.item.consultTime ? props.item.consultTime.split(' ')[1] : ''}
          </div>
          <div className={styles.content}>
            <div className={styles.bigDot}>
              <span className={styles.dot} />
            </div>
            <div className={styles.chatRight}>
              <div className={`${styles.chatContent} ${styles.miniApp}`}>
                <img src={miniApp} />
                {props.item.message}
              </div>
              <div className={styles.avatar}>
                <img src={avatarTeacher} />
                <p>{props.item.userName}</p>
              </div>
            </div>
          </div>
        </li>
      )
    }

    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.consultTime ? props.item.consultTime.split(' ')[1] : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatRight}>
            <div className={styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {props.item.message}
            </div>
            <div className={styles.avatar}>
              <img src={avatarTeacher} />
              <p>{props.item.userName}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
function UlContent(props) {
  const layout = props.li.map((item, index) => (
    <ToggleSession li={item} key={index}>
      <SessionContent li={item.contentList} />
    </ToggleSession>
  ));
  return layout;
}

function Ul(props) {
  return <UlContent li={props.item.dialogList} />;
}

// 整个列表
function Layout(props) {
  const layout = props.dataLists.map((item, index) => (
    <div key={index}>
      <DateBar date={item} list={props} index={index}>
        <section>
          <ul className={styles.behavior}>
            <ContentChildren
              content={
                item.dialogList.length > 0 ? (
                  <Ul item={item} />
                ) : (
                    // <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    <Spin size="small" style={{ textAlign: "center", width: "100%" }} />
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
function ContentChildren(props) {
  return props.content;
}

@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList'],
}))
class Wechart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      listData: [],
      currentIndex: 0,
    };
  }
  componentDidMount() {
    this.didMount(this.props);
  }
  didMount(props) {
    let list = [];
    if (props.behaviorPath.dateListWechart.length > 0) {
      props.behaviorPath.dateListWechart.map(item => {
        list.push({
          date: item,
          collapse: false,
          dialogList: [],
        });
      });

      list[this.state.currentIndex].collapse = true;
      list[this.state.currentIndex].dialogList = props.behaviorPath.wechartData;
      this.state.dateList = list;
      this.setState({
        dateList: this.state.dateList,
      });
    }
  }
  mount(props) {
    if (props.behaviorPath.dateListWechart.length > 0) {
      this.state.dateList[this.state.currentIndex].dialogList = props.behaviorPath.wechartData;
      this.setState({
        dateList: this.state.dateList,
      });
    }

    // let list = [];
    // if (props.behaviorPath.dateListWechart.length > 0) {
    //   props.behaviorPath.dateListWechart.map(item => {
    //     list.push({
    //       date: item,
    //       collapse: false,
    //       dialogList: [],
    //     });
    //   });

    //   list[this.state.currentIndex].collapse = true;
    //   list[this.state.currentIndex].dialogList = props.behaviorPath.wechartData
    //     ? props.behaviorPath.wechartData
    //     : [];
    //   this.state.dateList = list;
    //   this.setState({
    //     dateList: this.state.dateList,
    //   });
    // } else {
    //   this.setState({
    //     dateList: [],
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.behaviorPath.dateListWechart) !==
      JSON.stringify(this.props.behaviorPath.dateListWechart)
    ) {
      this.didMount(nextProps);
    }
    if (
      JSON.stringify(nextProps.behaviorPath.wechartData) !==
      JSON.stringify(this.props.behaviorPath.wechartData)
    ) {
      this.mount(nextProps);
    }

  }
  getWechartList = paramDate => {
    let params = {
      beginDate: paramDate,
      stuId: this.props.stuId,
    };
    this.props.dispatch({
      type: 'behaviorPath/wechatAct',
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
    // this.state.dateList.map((item, i) => {
    //   if (i != index) {
    //     item.collapse = false;
    //   }
    // });
    if (this.state.dateList[index].collapse) {
      console.log('收起');
    } else {
      if (this.state.dateList[index].dialogList.length < 1) {
        let date = this.state.dateList[index].date.replace(/[\u4e00-\u9fa5]/g, '-').split('-');
        date.length = 3;
        this.getWechartList(date.join('-'));
      }

    }
    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
  };

  render() {
    const total = this.props.behaviorPath.weChartTotal
    return (
      <div className={styles.comWrap}>
        <Spin spinning={this.props.isLoading}>
          {this.state.dateList.length > 0 ? (
            <Layout dataLists={this.state.dateList} onClick={this.toggle} />
          ) : (
              <Empty />
            )}
        </Spin>
        <Pager onClick={this.setIndex} type="3" total={total} stuId={this.props.stuId}></Pager>
        {/* <Layout dataLists={this.state.dateList} onClick={this.toggle}></Layout> */}
      </div>
    );
  }
}

export default Wechart;
