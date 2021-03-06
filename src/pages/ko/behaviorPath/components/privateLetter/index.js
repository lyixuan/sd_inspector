import React from 'react';
import { Icon, Empty, Spin } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';
import Pager from '../pager/pager.js';
import { linkImgRouteBul, linkRoute } from '@/pages/ko/utils/utils';

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
        {!this.state.expand ? (
          <li className={styles.step + ' ' + styles.title} onClick={this.toggleSession}>
            <div className={styles.time}>
              {props.li.contentList[0].consultTime
                ? props.li.contentList[0].consultTime.split(' ')[1]
                : ''}
            </div>
            <div className={styles.content}>
              <div className={styles.bigDot + ' ' + styles.plus}>
                <span className={styles.dot} />
              </div>
              <div className={styles.privateToggle}>
                <div className={styles.avatar}>
                  <img src={avatarTeacher} />
                </div>
                <div className={styles.intro}>
                  <p className={styles.name}>{props.li.contentList[0].userName}</p>
                  <p className={styles.chat}>{props.li.contentList[0].message}</p>
                </div>
              </div>
            </div>
          </li>
        ) : (
            <li className={styles.step + ' ' + styles.title} onClick={this.toggleSession}>
              <div className={styles.time}>
                {props.li.countDate ? props.li.countDate.split(' ')[1] : ''}
              </div>
              <div className={styles.content}>
                <div className={styles.bigDot + ' ' + (this.state.expand ? '' : styles.plus)}>
                  <span className={styles.dot} />
                </div>
                <div className={styles.text}>与{props.li.userName}的对话</div>
              </div>
            </li>
          )}

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
            <div className={linkImgRouteBul(props.item.message) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {/*{props.item.message}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.message, styles.linkRoute) }}></span>
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
            <div className={linkImgRouteBul(props.item.message) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.message, styles.linkRoute) }}></span>
              {/*{props.item.message}*/}
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

function Layout(props) {
  const layout = props.dataLists.map((item, index) => (
    <div key={index}>
      <DateBar date={item} list={props} index={index}>
        <section>
          <ul className={styles.behavior + ' ' + styles.privateLetter}>
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
class PrivateLetter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.stuId,
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
    if (props.behaviorPath.dateListLetter.length > 0) {
      props.behaviorPath.dateListLetter.map(item => {
        list.push({
          date: item,
          collapse: false,
          dialogList: [],
        });
      });

      list[this.state.currentIndex].collapse = true;
      list[this.state.currentIndex].dialogList = props.behaviorPath.letterData;
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
  mount(props) {
    if (props.behaviorPath.dateListLetter.length > 0) {
      this.state.dateList[this.state.currentIndex].dialogList = props.behaviorPath.letterData;
      this.setState({
        dateList: this.state.dateList,
      });
    }
    // let list = [];
    // if (props.behaviorPath.dateListLetter.length > 0) {
    //   if (props.behaviorPath.letterData) {
    //     // 根据userId来判断是学员还是老师，如果是学员，在数据中加一个userType
    //     props.behaviorPath.letterData.map(item => {
    //       item.contentList.map(item => {
    //         if (item.userId == this.state.userId) {
    //           item.userType = 2;
    //         } else {
    //           item.userType = 1;
    //         }
    //       });
    //     });
    //   }

    //   props.behaviorPath.dateListLetter.map(item => {
    //     list.push({
    //       date: item,
    //       collapse: false,
    //       dialogList: [],
    //     });
    //   });

    //   list[this.state.currentIndex].collapse = true;
    //   list[this.state.currentIndex].dialogList = props.behaviorPath.letterData
    //     ? props.behaviorPath.letterData
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
      JSON.stringify(nextProps.behaviorPath.dateListLetter) !==
      JSON.stringify(this.props.behaviorPath.dateListLetter)
    ) {
      this.didMount(nextProps);
    }
    if (
      JSON.stringify(nextProps.behaviorPath.letterData) !==
      JSON.stringify(this.props.behaviorPath.letterData)
    ) {
      this.mount(nextProps);
    }
  }
  getLetterList = paramDate => {
    let params = {
      beginDate: paramDate,
      stuId: this.props.stuId,
    };
    this.props.dispatch({
      type: 'behaviorPath/chatMessageAct',
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
      const {BI = {}} = window;
      BI.traceV && BI.traceV({widgetName:"私信展开",traceName:"学员查询/学员档案/私信展开"});
      if (this.state.dateList[index].dialogList.length < 1) {
        let date = this.state.dateList[index].date.replace(/[\u4e00-\u9fa5]/g, '-').split('-');
        date.length = 3;
        this.getLetterList(date.join('-'));
      }

    }
    this.state.dateList[index].collapse = !this.state.dateList[index].collapse;
  };

  render() {
    const total = this.props.behaviorPath.letterTotal
    return (
      <div className={styles.comWrap}>
        <Spin spinning={this.props.isLoading}>
          {this.state.dateList.length > 0 ? (
            <Layout dataLists={this.state.dateList} onClick={this.toggle} />
          ) : (
              <div style={{textAlign:'center'}}><Empty /></div>
            )}
        </Spin>
        <Pager onClick={this.setIndex} type="5" total={total} stuId={this.props.stuId}></Pager>
      </div>
    );
  }
}

export default PrivateLetter;
