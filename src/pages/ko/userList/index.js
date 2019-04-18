import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import style from './style.less';

@connect(({ userListModel,loading }) => ({
  userListModel,
  loading: loading.effects['userListModel/userList'],
}))
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  onPageChange = (currentPage)=>{
    this.queryData({page:currentPage});
  };
  queryData = (page) => {
    let params = { ...this.state };
    if (page) {
      params = { ...params, ...page };
      this.setState({
        page: page.page
      });
    }
    this.props.dispatch({
      type: 'userListModel/userList',
      payload: { params },
    });
  };

  columns() {
    const col1 = [
      {
        title: '学员',
        dataIndex: 'username',
      },
      {
        title: '注册状态',
        dataIndex: 'registerStatus',
        render: (text, record) => {
          return (
            <>
              {BiFilter(`REGISTER_STATUS|id:${record.registerStatus}`).name}
            </>
          );
        },
      },
      {
        title: '选课状态',
        dataIndex: 'choiceLessonStatus',
        render: (text, record) => {
          return (
            <>
              {BiFilter(`CHOISE_STATUS|id:${record.choiceLessonStatus}`).name}
            </>
          );
        },
      },
      {
        title: '选课时间',
        dataIndex: 'choiceLessonTime',
      },
      {
        title: '订单时间',
        dataIndex: 'orderTime',
      },
      {
        title: '出勤次数',
        dataIndex: 'attendenceCount',
      },
      {
        title: '做题数量',
        dataIndex: 'studyExeciseNum',
      },
      {
        title: 'IM咨询次数',
        dataIndex: 'imDialogueNum',
      },
      {
        title: 'IM老师主动发起量',
        dataIndex: 'imTeacherChatNum',
      },
      {
        title: 'IM学员主动发起量',
        dataIndex: 'imStudentChatNum',
      },
      {
        title: '排队次数',
        dataIndex: 'imQueueDialogueNum',
      },
      {
        title: '留言次数',
        dataIndex: 'imMessageDialogueNum',
      },
      {
        title: '发帖数量',
        dataIndex: 'bbsPostNum',
      },
      {
        title: '跟帖数量',
        dataIndex: 'bbsFollowNum',
      },
      {
        title: '微信咨询次数',
        dataIndex: 'wechatDialogueNum',
      },
      {
        title: '微信老师主动发起量',
        dataIndex: 'wechatTeacherChatNum',
      },
      {
        title: '微信学员主动发起量',
        dataIndex: 'wechatStudentChatNum',
      },
    ];
    const col = [
      {
        title: '学员',
        dataIndex: '1',
      },
      {
        title: '注册状态',
        dataIndex: '2',
      },
      {
        title: '选课状态',
        dataIndex: '3',
      },
      {
        title: '浏览页面数量',
        dataIndex: '4',
      },
      {
        title: '视频播放次数',
        dataIndex: '5',
      },
      {
        title: '做题次数',
        dataIndex: '6',
      },
      {
        title: 'IM咨询次数',
        dataIndex: '7',
      },
      {
        title: '排队次数',
        dataIndex: '8',
      },
      {
        title: '留言次数',
        dataIndex: '9',
      },
      {
        title: '跟帖次数',
        dataIndex: '10',
      },
      {
        title: '微信咨询次数',
        dataIndex: '11',
      },
      {
        title: 'KO转化',
        dataIndex: '12',
        render: (text) => {
          const c1 = '#52C9C2';
          const c2 = '#595959';
          const c = text === '已转化'?c1:c2;
          const stl = {
            color: c
          };
          return (
            <>
              <span style={stl}>{text}</span>
            </>
          );
        },
      },
    ];
    col.forEach((v)=>{
      v.onCell = (record,rowIndex) => {
        return {
          onClick: (event) => {
            this.jumpTo('/ko/behaviorInfo');
            console.log(233111,record,event,event.detail)
          },
        };
      };
      v.render = (text) => {
        return (
          <>
            <span style={{cursor:'pointer'}}>{text}</span>
          </>
        );
      };
    })
    console.log(col)
    return col;
  };
  render() {
    const {userList,page={},loading} = this.props.userListModel;
    // const dataSource = userList;
    const dataSource = [{
      userId:1,
      '1':'姓名1',
      '2':'未注册',
      '3':'已选课',
      '4':'1',
      '5':'10',
      '6':'3',
      '7':'20',
      '8':'30',
      '9':'40',
      '10':'50',
      '11':'60',
      '12':'未转化',
    },{
      userId:2,
      '1':'姓名2',
      '2':'未注册',
      '3':'已选课',
      '4':'1',
      '5':'10',
      '6':'3',
      '7':'20',
      '8':'30',
      '9':'40',
      '10':'50',
      '11':'60',
      '12':'未转化',
    },{
      userId:3,
      '1':'姓名3',
      '2':'未注册',
      '3':'已选课',
      '4':'1',
      '5':'10',
      '6':'3',
      '7':'20',
      '8':'30',
      '9':'40',
      '10':'50',
      '11':'60',
      '12':'已转化',
    }];
    return (
      <div>
        <div className={style.contentWrap}>
          <BITable rowKey={record=>record.userId + Math.random()*1000} dataSource={dataSource} columns={this.columns()} pagination={false} loading={loading} />
          <br/>
          <BIPagination showQuickJumper defaultPageSize={page.pageSize?page.pageSize:30} onChange={this.onPageChange} current={page.pageNum} total={page.total} />
        </div>
      </div>
    );
  }
}

export default UserList;
