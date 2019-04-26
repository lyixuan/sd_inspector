import React from 'react';
import { connect } from 'dva';
import { Popover } from 'antd';
import BITable from '@/components/BIKoTable';
import BIButtonText from '@/components/BIButtonText';
import BIPagination from '@/ant_components/BIPagination';
import { BiFilter } from '@/utils/utils';
import storage from '@/utils/storage';
import style from './style.less';
import config from '../../../../config/config';

function columns_small() {
  const col = [
    {
      title: '学员',
      dataIndex: 'userName',
      width: 60,
    },
    {
      title: '注册',
      dataIndex: 'registerStatus',
      width: 60,
      render: (text, record) => {
        return (
          <>
            <span style={{ cursor: 'pointer' }}>{BiFilter(`REGISTER_STATUS|id:${record.registerStatus}`).name}</span>
          </>
        );
      },
    },
    {
      title: '选课',
      dataIndex: 'choiceLessonStatus',
      width: 60,
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
      dataIndex: 'choiceLessionTime',
      width: 82,
    },
    {
      title: '订单时间',
      dataIndex: 'orderTime',
      width: 82,
    },
    {
      title: '出勤数',
      dataIndex: 'attendenceCount',
      width: 60,
    },
    {
      title: '做题量',
      dataIndex: 'studyExeciseNum',
      width: 60,
    },
    {
      title: 'IM咨询量',
      dataIndex: 'imDialogueNum',
      width: 72,
    },
    {
      title: 'IM老师主动量',
      dataIndex: 'imTeacherChatNum',
      width: 63,
    },
    {
      title: 'IM学员主动量',
      dataIndex: 'imStudentChatNum',
      width: 63,
    },
    {
      title: '排队数',
      dataIndex: 'imQueueDialogueNum',
      width: 60,
    },
    {
      title: '留言数',
      dataIndex: 'imMessageDialogueNum',
      width: 60,
    },
    {
      title: '发帖量',
      dataIndex: 'bbsPostNum',
      width: 60,
    },
    {
      title: '跟帖量',
      dataIndex: 'bbsFollowNum',
      width: 60,
    },
    {
      title: '微信咨询量',
      dataIndex: 'wechatDialogueNum',
      width: 60,
    },
    {
      title: '微信老师主动量',
      dataIndex: 'wechatTeacherChatNum',
      width: 70,
    },
    {
      title: '微信学员主动量',
      dataIndex: 'wechatStudentChatNum',
      width: 70,
    },
  ];
  col.forEach((v) => {
    v.onCell = (record, rowIndex) => {
      return {
        onClick: (event) => {
          jump(record,v);
        },
      };
    };
    if (v.dataIndex !== 'orderTime' && v.dataIndex !== 'choiceLessionTime') {
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

function columns_big() {
  const col = [
    {
      title: '学员',
      dataIndex: 'userName',
      minWidth: 70,
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
      dataIndex: 'choiceLessionTime',
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
      title: 'IM咨询量',
      dataIndex: 'imDialogueNum',
    },
    {
      title: 'IM老师主动量',
      dataIndex: 'imTeacherChatNum',
    },
    {
      title: 'IM学员主动量',
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
      title: '微信咨询量',
      dataIndex: 'wechatDialogueNum',
    },
    {
      title: '微信老师主动数量',
      dataIndex: 'wechatTeacherChatNum',
    },
    {
      title: '微信学员主动数量',
      dataIndex: 'wechatStudentChatNum',
    },
  ];
  col.forEach((v) => {
    v.onCell = (record, rowIndex) => {
      return {
        onClick: (event) => {
          jump(record,v);
        },
      };
    };
    if (v.dataIndex !== 'orderTime' && v.dataIndex !== 'choiceLessionTime') {
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

function columns() {
  return columns_small();
  // const width =1500;
  // if (window.outerWidth < width) {
  //   return columns_small();
  // } else {
  //   return columns_big();
  // }
}
function jump(record,v) {
  const origin = window.location.origin;
  const url = `${origin}${config.base}ko/behaviorPath`;
  const params = { record, target: v.dataIndex };
  storage.setItem('pathParams',params);
  window.open(url);
}
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
  };
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
    const { userList, currentPage = 1, totalCount = 0} = this.props.userListModel;
    const { loading } = this.props;
    const { pageParams } = this.state;
    const dataSource = userList;
    return (
      <div>
        <div className={style.contentWrap}>
          <BITable
            rowKey={record => { return record.userId + Math.random() * 1000 }}
            dataSource={dataSource} columns={columns()}
            pagination={false} loading={loading}
            scroll={{ x: 1060}}
            size="middle"
          />
          <br />
          <BIPagination showQuickJumper defaultPageSize={pageParams.pageSize ? pageParams.pageSize : 30} onChange={this.onPageChange} current={currentPage} total={totalCount} />
        </div>
      </div>
    );
  }
}

export default UserList;
