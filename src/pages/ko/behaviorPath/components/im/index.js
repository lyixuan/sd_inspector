import React from 'react';
import { Icon, Empty, Spin } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import Pager from '../pager/pager.js';

// 评价的星星
function Star(props) {
  console.log(13, props.evaluate)
  const evaluate = props.evaluate;
  const number = [1, 2, 3];
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
  if (!props.li.evaluate && props.li.evaluate != 0) {
    return null;
  }
  return (
    <li className={styles.step}>
      <div className={styles.time}>
        {/* {props.li.countDate ? props.li.countDate.split(' ')[1] : ''} */}
      </div>
      <div className={styles.content}>
        <div className={styles.bigDot}>
          <span className={styles.dot} />
        </div>
        <div className={styles.prise}>
          <span>学员提交评价：</span>
          <div className={styles.stars}>
            <Star evaluate={props.li.evaluate} />
          </div>
        </div>
      </div>
    </li>
  );
}

// 日期条
function DateBar(props) {
  return (
    <div>
      <div className={styles.dateBar} onClick={() => props.list.onClick(props.index)}>
        <span>{props.date.date}</span>
        <span>
          <Icon type={props.date.collapse ? 'up' : 'down'} />
        </span>
      </div>
      {props.date.collapse ? props.children : null}
    </div>
  );
}

// 判断会话类型
function sessionType(type) {
  if (
    type == 1 ||
    type == 6 ||
    type == 7 ||
    type == 8 ||
    type == 9 ||
    type == 32 ||
    type == 33 ||
    type == 34 ||
    type == 35 ||
    type == 64 ||
    type == 67 ||
    type == 96 ||
    type == 97 ||
    type == 98
  ) {
    return '进入会话';
  } else if (type == 4 || type == 5 || type == 101 || type == 102 || type == 103) {
    return '排队';
  } else if (type == 3 || type == 10 || type == 66 || type == 99 || type == 100) {
    return '留言';
  } else {
    return '其他';
  }
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
            <div className={styles.text}>{sessionType(props.li.consultType)}</div>
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
  let message = "";
  // 检测文本中是否包含 { }
  if (/\{([^\}]+)\}/.test(props.item.message)) {
    message = JSON.parse(props.item.message).content;
  } else {
    message = props.item.message
  }
  if (props.item.userType == 1) {
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
              {message}
            </div>
          </div>
        </div>
      </li>
    );
  } else {
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
              {message}
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
      <Prise li={item} />
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
function ContentChildren(props) {
  return props.content;
}

@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList'],
}))
class Im extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateList: [],
      listData: [],
      currentIndex: 0,
    };
  }
  componentDidMount() {
    this.mount(this.props);
  }
  mount(props) {
    let list = [];
    if (props.behaviorPath.dateListIm.length > 0) {
      props.behaviorPath.dateListIm.map(item => {
        list.push({
          date: item,
          collapse: false,
          dialogList: [],
        });
      });

      list[this.state.currentIndex].collapse = true;
      list[this.state.currentIndex].dialogList = props.behaviorPath.imData
        ? props.behaviorPath.imData
        : [];
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
      JSON.stringify(nextProps.behaviorPath.imData) !==
      JSON.stringify(this.props.behaviorPath.imData) ||
      JSON.stringify(nextProps.behaviorPath.dateListIm) !==
      JSON.stringify(this.props.behaviorPath.dateListIm)
    ) {
      this.mount(nextProps);
    }

  }
  getImList = paramDate => {
    let params = {
      beginDate: paramDate,
      stuId: this.props.stuId,
    };
    this.props.dispatch({
      type: 'behaviorPath/imAct',
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
      this.getImList(date.join('-'));
    }
    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
  };

  render() {
    const total = this.props.behaviorPath.imTotal
    return (
      <div className={styles.comWrap}>
        <Spin spinning={this.props.isLoading}>
          {this.state.dateList.length > 0 ? (
            <Layout dataLists={this.state.dateList} onClick={this.toggle} />
          ) : (
              <Empty />
            )}
        </Spin>
        <Pager onClick={this.setIndex} type="2" total={total}></Pager>
      </div>
    );
  }
}

export default Im;
