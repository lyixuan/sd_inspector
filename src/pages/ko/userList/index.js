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

function columns() {
  const col = [
    {
      title: '学员',
      dataIndex: 'userName',
      width: 60,
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
      width: 80,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '做题量',
      dataIndex: 'studyExeciseNum',
      width: 80,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: 'IM咨询量',
      dataIndex: 'imDialogueNum',
      width: 100,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: 'IM老师主动量',
      dataIndex: 'imTeacherChatNum',
      width: 120,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: 'IM学员主动量',
      dataIndex: 'imStudentChatNum',
      width: 120,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '排队数',
      dataIndex: 'imQueueDialogueNum',
      width: 80,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '留言数',
      dataIndex: 'imMessageDialogueNum',
      width: 80,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '发帖量',
      dataIndex: 'bbsPostNum',
      width: 80,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '跟帖量',
      dataIndex: 'bbsFollowNum',
      width: 80,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '微信咨询量',
      dataIndex: 'wechatDialogueNum',
      width: 120,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '微信老师主动量',
      dataIndex: 'wechatTeacherChatNum',
      width: 130,
      filters: [
        { text: '隐藏0', value: '233' },
      ],
    },
    {
      title: '微信学员主动量',
      dataIndex: 'wechatStudentChatNum',
      filters: [
        { text: '隐藏0', value: '233' },
      ],
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
    if (v.dataIndex !== 'orderTime' && v.dataIndex !== 'choiceLessionTime') {
      v.render = v.render || ((text) => {
        return (
          <>
            {Number(text) === 0 ?(<span style={{ cursor: 'pointer',color:'#bfbfbf' }}>{text}</span>):(<span style={{ cursor: 'pointer' }}>{text}</span>)}
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
  const params = { record, target: v.dataIndex };
  storage.setItem('pathParams', params);
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
    this.initpage = {
      currentPage: 1, pageSize: 30
    }
    this.state = {
      pageParams: this.initpage,

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
    if (JSON.stringify(nextProps.pageParams) !== JSON.stringify(this.props.pageParams)) {
      this.setState({ pageParams: nextProps.pageParams });
    }
  }
  getInitParams = () => {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    })
  };
  onPageChange = (currentPage,filters) => {
    console.log(123,filters)
    const { pageParams } = this.state;
    const newPageParams = { ...pageParams, currentPage };
    this.queryData(this.props.tabFromParams, newPageParams);
    // this.props.dispatch({
    //   type: 'userListModel/savePageParams',
    //   payload: { pageParams: newPageParams },
    // });

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
    const { userList, currentPage = 1, totalCount = 0 } = this.props.userListModel;
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
            scroll={{ x: 1620,y: 570 }}
            size="middle"
          />
          <br />
          <span style={{color:'#999',fontSize:12}}>注：左右滑动可以查看更多字段</span>
          <BIPagination showQuickJumper defaultPageSize={pageParams.pageSize ? pageParams.pageSize : 30} onChange={this.onPageChange} current={currentPage} total={totalCount} />
        </div>
      </div>
    );
  }
}

export default UserList;
