import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import style from './style.less';
import router from 'umi/router';

@connect(({ userListModel,loading }) => ({
  userListModel,
  loading: loading.effects['userListModel/getTableList'],
}))
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 30
    };
  };
  componentDidMount() {
    this.queryData();
  }
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
      type: 'userListModel/getTableList',
      payload: { params },
    });
  };

  columns() {
    const col = [
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
        width: 150,
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
    col.forEach((v)=>{
      v.onCell = (record,rowIndex) => {
        return {
          onClick: (event) => {
            router.push({
              pathname:'/ko/behaviorPath',
              params: {record,target:v.dataIndex}
            });
          },
        };
      };
      if (v.dataIndex !== 'orderTime') {
        v.render = (text) => {
          return (
            <>
              <span style={{cursor:'pointer'}}>{text}</span>
            </>
          );
        };
      } else {
        v.render = (text) => {
          return (
            <>
              <span className={style.blankBox} style={{cursor:'pointer'}}>{text}</span>
            </>
          );
        };
      }
    });
    return col;
  };
  render() {
    const {userList,page={}} = this.props.userListModel;
    const {loading} = this.props;
    const dataSource = userList;
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
