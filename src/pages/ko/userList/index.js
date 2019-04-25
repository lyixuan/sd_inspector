import React from 'react';
import { connect } from 'dva';
import { Popover, Button } from 'antd';
import BITable from '@/ant_components/BITable';
import BIButtonText from '@/components/BIButtonText';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import style from './style.less';
import router from 'umi/router';

function columns() {
  const col = [
    {
      title: '学员',
      dataIndex: 'userName',
    },
    {
      title: '注册状态',
      dataIndex: 'registerStatus',
      render: (text, record) => {
        return (
          <>
            <span style={{ cursor: 'pointer' }}>{BiFilter(`REGISTER_STATUS|id:${record.registerStatus}`).name}</span>
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
            <span style={{ cursor: 'pointer' }}>{BiFilter(`CHOISE_STATUS|id:${record.choiceLessonStatus}`).name}</span>
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
  col.forEach((v) => {
    v.onCell = (record, rowIndex) => {
      return {
        onClick: (event) => {
          router.push({
            pathname: '/ko/behaviorPath',
            params: { record, target: v.dataIndex }
          });
        },
      };
    };
    if (v.dataIndex !== 'orderTime') {
      v.render = v.render || ((text) => {
        return (
          <>
            <span style={{ cursor: 'pointer' }}>{text}</span>
          </>
        );
      });
    } else {
      v.render = (text) => {
        const content = (
          <div className={style.popover}>
            {text}
          </div>
        );
        return (
          <>
            <Popover content={content}>
              <BIButtonText>{text}</BIButtonText>
            </Popover>
          </>
        );
      };
    }
  });
  return col;
};

@connect(({ userListModel, koPlan, loading }) => ({
  userListModel,
  tabFromParams: koPlan.tabFromParams,
  pageParams: userListModel.pageParams,
  loading: loading.effects['userListModel/getTableList'],
}))
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageParams: this.props.pageParams,

    };
  };
  componentDidMount() {
    this.getInitParams();
    this.queryData();
    console.log(this.props)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.tabFromParams) !== JSON.stringify(this.props.tabFromParams)) {
      this.queryData(nextProps.tabFromParams);
    }
    if (JSON.stringify(nextProps.pageParams) !== JSON.stringify(this.props.pageParams)) {
      this.setState({ pageParams: nextProps.pageParams });
    }
  }
  getInitParams = () => {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    })
  };
  onPageChange = (currentPage) => {
    const { pageParams } = this.state;
    const newPageParams = { ...pageParams, currentPage };
    this.queryData(this.props.tabFromParams.formParams, newPageParams);
    this.props.dispatch({
      type: 'userListModel/savePageParams',
      payload: { pageParams: newPageParams },
    });

  };
  getLocationParams = () => {
    const { location: { state = {} } } = this.props;
    return state
  }
  queryData = (params = this.props.tabFromParams, pageParams = this.state.pageParams) => {
    if (!params || JSON.stringify(params) === '{}') return;
    const localtionParams = this.getLocationParams()
    const newParams = { ...params.formParams, ...pageParams, ...localtionParams };
    this.props.dispatch({
      type: 'userListModel/getTableList',
      payload: { params: newParams },
    });
  };

  render() {
    const { userList, page = {} } = this.props.userListModel;
    const { loading } = this.props;
    const { pageParams } = this.state;
    const dataSource = userList;
    return (
      <div>
        <div className={style.contentWrap}>
          <BITable
            rowKey={record => { return record.userId + Math.random() * 1000 }}
            dataSource={dataSource} columns={columns()}
            pagination={false} loading={loading} />
          <br />
          <BIPagination showQuickJumper defaultPageSize={pageParams.pageSize ? pageParams.pageSize : 30} onChange={this.onPageChange} current={pageParams.currentPage} total={page.total} />
        </div>
      </div>
    );
  }
}

export default UserList;
