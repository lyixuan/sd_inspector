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

const filterKeyName = [];
function columns() {
  const col = [
    {
      title: '学员',
      dataIndex: 'userName',
      width: 80,
      fixed: 'left',
    },
    {
      title: '注册',
      dataIndex: 'registerStatus',
      width: 60,
      fixed: 'left',
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
      fixed: 'left',
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
      width: 110,
      fixed: 'left',
    },
    {
      title: '订单时间',
      dataIndex: 'orderTime',
      width: 110,
      fixed: 'left',
    },
    {
      title: '出勤数',
      dataIndex: 'attendenceCount',
      filterMultiple: false,
      width: 82,
      filters: [
        { text: '大于0', value: 'attendenceExist', },
      ],
    },
    {
      title: '做题量',
      dataIndex: 'studyExeciseNum',
      filterMultiple: false,
      width: 82,
      filters: [
        { text: '大于0', value: 'execiseExist' },
      ],
    },
    {
      title: 'IM咨询量',
      dataIndex: 'imDialogueNum',
      width: 100,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'imDialogueExist' },
      ],
    },
    {
      title: 'IM老师主动量',
      dataIndex: 'imTeacherChatNum',
      width: 120,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'imTeacherExist' },
      ],
    },
    {
      title: 'IM学员主动量',
      dataIndex: 'imStudentChatNum',
      width: 120,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'imStudentExit' },
      ],
    },
    {
      title: '排队数',
      dataIndex: 'imQueueDialogueNum',
      width: 82,
      filters: [
        { text: '大于0', value: 'imQueueDialogueExist' },
      ],
    },
    {
      title: '留言数',
      dataIndex: 'imMessageDialogueNum',
      width: 82,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'imMsgExist' },
      ],
    },
    {
      title: '发帖量',
      dataIndex: 'bbsPostNum',
      width: 82,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'bbsPostExist' },
      ],
    },
    {
      title: '跟帖量',
      dataIndex: 'bbsFollowNum',
      width: 82,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'bbsFollowExist' },
      ],
    },
    {
      title: '微信咨询量',
      dataIndex: 'wechatDialogueNum',
      width: 110,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'wechatDialogueExist' },
      ],
    },
    {
      title: '微信老师主动量',
      dataIndex: 'wechatTeacherChatNum',
      width: 130,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'wechatTeacherExist' },
      ],
    },
    {
      title: '微信学员主动量',
      dataIndex: 'wechatStudentChatNum',
      width: 130,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 'wechatStudentExist' },
      ],
    },
    {
      title: '',
      dataIndex: 'duoyukuandu',
    },
  ];
  col.forEach((v) => {
    v.onCell = (record, rowIndex) => {
      return {
        onClick: (event) => {
          jump(record, v);
        },
      };
    };
    if (v.filters) {
      filterKeyName.findIndex(item => item.dataIndex === v.dataIndex) === -1 && filterKeyName.push({ dataIndex: v.dataIndex, filterKey: v.filters[0].value })
    }
    if (v.dataIndex !== 'orderTime' && v.dataIndex !== 'choiceLessionTime') {
      v.render = v.render || ((text) => {
        return (
          <>
            {Number(text) === 0 ? (<span style={{ cursor: 'pointer', color: '#bfbfbf' }}>{text}</span>) : (<span style={{ cursor: 'pointer' }}>{text}</span>)}
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

function jump(record, v) {
  const origin = window.location.origin;
  const url = `${origin}${config.base}ko/behaviorPath`;
  const params = { userId: record.userId, target: v.dataIndex };
  const strParams = encodeURIComponent(JSON.stringify(params));
  window.open(`${url}?params=${strParams}`);
}
@connect(({ userListModel, koPlan, loading }) => ({
  userListModel,
  tabFromParams: koPlan.tabFromParams,
  pageParams: userListModel.pageParams,
  chooseEventData: koPlan.chooseEventData,
  loading: loading.effects['userListModel/getTableList'],
}))
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.initpage = {
      currentPage: 1, pageSize: 30
    }
    this.state = {
      pageParams: this.initpage,
      filterExitParams: {},

    };
  };
  componentDidMount() {
    this.getInitParams();
    this.queryData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.tabFromParams) !== JSON.stringify(this.props.tabFromParams)) {
      this.queryData(nextProps.tabFromParams, this.initpage);
    }
    if (JSON.stringify(nextProps.chooseEventData) !== JSON.stringify(this.props.chooseEventData)) {
      this.queryData(undefined, this.initpage, nextProps.chooseEventData);
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
    this.queryData(this.props.tabFromParams, newPageParams);
    this.getPopupContainer();
  };
  tableChange = (...arg) => {
    const filters = arg[1];
    const filterExitParams = {};
    filterKeyName.forEach(item => {
      const filterArr = filters[item.dataIndex];
      filterExitParams[item.filterKey] = Array.isArray(filterArr) ? (filterArr.length > 0 ? 1 : 0) : undefined;
    });
    this.setState({
      filterExitParams
    }, () => {
      this.queryData(undefined, undefined, undefined, filterExitParams)
    });
  }
  getLocationParams = (chooseEventData = this.props.chooseEventData) => {
    const obj = chooseEventData[0] || {};
    return obj.id ? {
      actionKey: obj.id,
    } : {}
  };
  queryData = (params = this.props.tabFromParams, pageParams = this.state.pageParams, chooseEventData = this.props.chooseEventData, filterExitParams = this.state.filterExitParams) => {
    if (!params || JSON.stringify(params) === '{}') return;
    const localtionParams = this.getLocationParams(chooseEventData)
    const newParams = { ...params.formParams, ...pageParams, ...localtionParams, ...filterExitParams };
    this.props.dispatch({
      type: 'userListModel/getTableList',
      payload: { params: newParams },
    });
  };

  render() {
    const { userList, currentPage = 1, totalCount = 0 } = this.props.userListModel;
    const { loading } = this.props;
    const { pageParams } = this.state;
    const dataSource = userList;
    return (
      <div>
        <div className={style.contentWrap}>
          <BITable
            onChange={this.tableChange}
            rowKey={record => { return record.userId + Math.random() * 1000 }}
            dataSource={dataSource} columns={columns()}
            pagination={false} loading={loading}
            scroll={{ x: 1630, y: 570 }}
            size="middle"
          />
          <br />
          <span style={{ color: '#999', fontSize: 12 }}>注：左右滑动可以查看更多字段</span>
          <BIPagination showQuickJumper defaultPageSize={pageParams.pageSize ? pageParams.pageSize : 30} onChange={this.onPageChange} current={currentPage} total={totalCount} />
        </div>
      </div>
    );
  }
}

export default UserList;
