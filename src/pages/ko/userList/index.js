import React from 'react';
import { connect } from 'dva';
import { Popover, message, Tag, Tooltip, Progress, Icon } from 'antd';
import BITable from '@/components/BIKoTable';
import BIButtonText from '@/components/BIButtonText';
import BIPagination from '@/ant_components/BIPagination';
import BIButton from '@/ant_components/BIButton';
import { BiFilter, thousandsFormat } from '@/utils/utils';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import moment from 'moment';
import storage from '@/utils/storage';
import style from './style.less';
import config from '../../../../config/config';
import face1 from '@/assets/face1.png';
import face2 from '@/assets/face2.png';

const dateFormat = 'YYYY.MM.DD';
const { TextArea } = BIInput;

const filterKeyName = [];
const sorterKeyName = {
  attendenceCount: 'study_total_attendance_num',
  listenTime: 'study_total_listen_time',
  studyExeciseNum: 'study_exercise_num',
  imDialogueNum: 'im_dialogue_num',
  imTeacherChatNum: 'im_teacher_chat_num',
  imStudentChatNum: 'im_student_chat_num',
  imQueueDialogueNum: 'im_queue_dialogue_num',
  imMessageDialogueNum: 'im_message_dialogue_num',
  bbsPostNum: 'bbs_post_num',
  bbsFollowNum: 'bbs_follow_num',
  wechatDialogueNum: 'wechat_dialogue_num',
  wechatTeacherChatNum: 'wechat_teacher_chat_num',
  wechatStudentChatNum: 'wechat_student_chat_num',
  imEmotionValue: 'positive_msg_num',
};
function columns() {
  const col = [
    {
      title: '学员',
      key: 'userName',
      dataIndex: 'userName',
      width: 110,
      fixed: 'left',
    },
    {
      title: '注册',
      key: 'registerStatus',
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
      key: 'choiceLessonStatus',
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
      key: 'choiceLessionTime',
      dataIndex: 'choiceLessionTime',
      width: 110,
      fixed: 'left',
    },
    {
      title: '订单时间',
      key: 'orderTime',
      dataIndex: 'orderTime',
      width: 110,
      fixed: 'left',
    },
    {
      title: '出勤数',
      key: 'attendenceCount',
      dataIndex: 'attendenceCount',
      filterMultiple: false,
      width: 94,
      filters: [
        { text: '大于0', value: 1, key: 'attendenceExist' },
        { text: '等于0', value: 2, key: 'attendenceExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '听课（分钟）',
      key: 'listenTime',
      dataIndex: 'listenTime',
      filterMultiple: false,
      width: 130,
      filters: [
        { text: '大于0', value: 1, key: 'lessonTime' },
        { text: '等于0', value: 2, key: 'lessonTime' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '做题量',
      key: 'studyExeciseNum',
      dataIndex: 'studyExeciseNum',
      filterMultiple: false,
      width: 94,
      filters: [
        { text: '大于0', value: 1, key: 'execiseExist' },
        { text: '等于0', value: 2, key: 'execiseExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'IM咨询量',
      key: 'imDialogueNum',
      dataIndex: 'imDialogueNum',
      width: 112,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'imDialogueExist' },
        { text: '等于0', value: 2, key: 'imDialogueExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'IM老师主动量',
      key: 'imTeacherChatNum',
      dataIndex: 'imTeacherChatNum',
      width: 132,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'imTeacherExist' },
        { text: '等于0', value: 2, key: 'imTeacherExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'IM学员主动量',
      key: 'imStudentChatNum',
      dataIndex: 'imStudentChatNum',
      width: 132,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'imStudentExit' },
        { text: '等于0', value: 2, key: 'imStudentExit' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'IM情绪值',
      key: 'imEmotionValue',
      dataIndex: 'imEmotionValue',
      width: 150,
      filterMultiple: false,
      filters: [
        { text: '高兴值>=怒气值', value: 1, key: 'emotionValue' },
        { text: '高兴值<怒气值', value: 2, key: 'emotionValue' },
        { text: '高兴值>0', value: 3, key: 'emotionValue' },
        { text: '怒气值=0', value: 4, key: 'emotionValue' },
        { text: '怒气值>0', value: 5, key: 'emotionValue' },
        { text: '高兴值=0', value: 6, key: 'emotionValue' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '排队数',
      key: 'imQueueDialogueNum',
      dataIndex: 'imQueueDialogueNum',
      width: 94,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'imQueueDialogueExist' },
        { text: '等于0', value: 2, key: 'imQueueDialogueExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '留言数',
      key: 'imMessageDialogueNum',
      dataIndex: 'imMessageDialogueNum',
      width: 94,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'imMsgExist' },
        { text: '等于0', value: 2, key: 'imMsgExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '发帖量',
      key: 'bbsPostNum',
      dataIndex: 'bbsPostNum',
      width: 94,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'bbsPostExist' },
        { text: '等于0', value: 2, key: 'bbsPostExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '跟帖量',
      key: 'bbsFollowNum',
      dataIndex: 'bbsFollowNum',
      width: 94,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'bbsFollowExist' },
        { text: '等于0', value: 2, key: 'bbsFollowExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '微信咨询量',
      key: 'wechatDialogueNum',
      dataIndex: 'wechatDialogueNum',
      width: 122,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'wechatDialogueExist' },
        { text: '等于0', value: 2, key: 'wechatDialogueExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '微信老师主动量',
      key: 'wechatTeacherChatNum',
      dataIndex: 'wechatTeacherChatNum',
      width: 142,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'wechatTeacherExist' },
        { text: '等于0', value: 2, key: 'wechatTeacherExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: '微信学员主动量',
      key: 'wechatStudentChatNum',
      dataIndex: 'wechatStudentChatNum',
      width: 142,
      filterMultiple: false,
      filters: [
        { text: '大于0', value: 1, key: 'wechatStudentExist' },
        { text: '等于0', value: 2, key: 'wechatStudentExist' },
      ],
      sorter: true,
      sortDirections: ['descend', 'ascend']
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
      filterKeyName.findIndex(item => item.dataIndex === v.dataIndex) === -1 && filterKeyName.push({
        dataIndex: v.dataIndex,
        filterKey: v.filters[0].key,
      });
    }
    if (v.dataIndex === 'imEmotionValue') {
      v.render = v.render || ((text) => {
        return (
          <>
            <DateBar text={text}></DateBar>
          </>
        );
      });
    } else if (v.dataIndex !== 'orderTime' && v.dataIndex !== 'choiceLessionTime') {
      v.render = v.render || ((text) => {
        return (
          <>
            {Number(text) === 0 ? (<span style={{ cursor: 'pointer', color: '#bfbfbf' }}>{text}</span>) : (
              <span style={{ cursor: 'pointer' }}>{text}</span>)}
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

// 日期条
function DateBar(props) {
  return (
    <div>
      <div className={style.expressionArea}>
        <img src={face1} />
        <div className={style.progress}>
          <p className={style.progressText}>
            <span>{props.text.positiveMsgNum}</span>
            <span>{props.text.negativeMsgNum}</span>
          </p>
          <div className={style.progressBar}>
            <div className={style.bar1} style={{ width: props.text.positivePercent }}></div>
            <div className={style.bar2} style={{ width: props.text.negativePercent }}></div>
          </div>
        </div>
        <img src={face2} />
      </div>
    </div>
  );
}

@connect(({ userListModel, koPlan, loading }) => ({
  userListModel,
  tabFromParams: koPlan.tabFromParams,
  originParams: koPlan.originParams,
  pageParams: userListModel.pageParams,
  chooseEventData: koPlan.chooseEventData,
  loading: loading.effects['userListModel/getTableList'],
}))
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.initpage = {
      currentPage: 1, pageSize: 30,
    };
    const { visible, visible2 } = props.userListModel;
    this.state = {
      pageParams: this.initpage,
      visible: visible,
      visible2: visible2,
      filterExitParams: {},
      groupName: '',
      totalUser: 0,
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
    });
  };
  onPageChange = (currentPage) => {
    const { pageParams } = this.state;
    const newPageParams = { ...pageParams, currentPage };
    this.queryData(this.props.tabFromParams, newPageParams);
  };
  tableChange = (...arg) => {
    // 筛序
    const filters = arg[1];
    const orderSort = arg[2];
    const filterExitParams = {};
    const orderSortParams = {};
    // 筛选
    filterKeyName.forEach(item => {
      const filterArr = filters[item.dataIndex];
      filterExitParams[item.filterKey] = Array.isArray(filterArr) ? (filterArr.length > 0 ? filterArr[0] : 0) : undefined;
    });
    // 排序
    if (orderSort.columnKey && orderSort.order) {
      orderSortParams.field = sorterKeyName[orderSort.columnKey];
      orderSortParams.sort = orderSort.order === 'ascend' ? 'asc' : 'desc';
    }
    this.setState({
      filterExitParams,
    }, () => {
      this.queryData(undefined, this.initpage, undefined, filterExitParams, { sortField: orderSortParams });
    });
  };
  getLocationParams = (chooseEventData = this.props.chooseEventData) => {
    const obj = chooseEventData[0] || {};
    return obj.id ? {
      actionKey: obj.id,
    } : {};
  };
  queryData = (params = this.props.tabFromParams, pageParams = this.state.pageParams, chooseEventData = this.props.chooseEventData, filterExitParams = this.state.filterExitParams, orderSortParams = {}) => {
    if (!params || JSON.stringify(params) === '{}') return;
    const localtionParams = this.getLocationParams(chooseEventData);
    const newParams = { ...params.formParams, ...pageParams, ...localtionParams, ...filterExitParams, ...orderSortParams };
    this.props.dispatch({
      type: 'userListModel/getTableList',
      payload: { params: newParams },
    });
  };
  renderDateTags = (date, key, name, index) => {
    const { isShowFiexd } = this.state;
    let [startTime, endTime] = date;
    startTime = moment(startTime).format(dateFormat);
    endTime = moment(endTime).format(dateFormat);
    return (<span key={name + index}><Tag closable={!isShowFiexd}
      onClose={() => !isShowFiexd ? this.onClose(key, date) : null}>{name}:{`${startTime}~${endTime}`}</Tag></span>);
  };
  renderGrouptags = (item, key) => {
    const { isShowFiexd } = this.state;
    const orgName = item.map(item => item.name).join('/');
    return orgName ? (<span key={orgName}><Tag closable={!isShowFiexd}
      onClose={() => !isShowFiexd ? this.onClose(key, item) : null}>{orgName}</Tag></span>) : null;
  };
  renderTypeTage = (obj, key, color = '#F4F4F4') => (type) => {
    return obj.name
  }

  checkoutTypeTage = (key, item) => {
    let returnDom = null;
    switch (key) {
      case 'fromDevice':
        returnDom = (Array.isArray(item) && item.length > 0) ? item.map(ls => this.renderTypeTage(ls, 'fromDevice', '#E9F4FF')()) : null;
        break;
      case 'fromApp':
        returnDom = (Array.isArray(item) && item.length > 0) ? item.map(ls => this.renderTypeTage(ls, 'fromApp', '#FFF9E9')()) : null;
        break;
      case 'registerTime':
        returnDom = (Array.isArray(item) && item.length > 0) ? this.renderDateTags(item, 'registerTime', '注册时间', 1) : null;
        break;
      case 'choiceLessonStatus':
        returnDom = item ? this.renderTypeTage(item, 'choiceLessonStatus')() : null;
        break;
      case 'publicLesson':
        returnDom = item ? this.renderTypeTage(item, 'publicLesson')() : null;
        break;
      case 'publicChoiceLessonTime':
        returnDom = (Array.isArray(item) && item.length > 0) ? this.renderDateTags(item, 'publicChoiceLessonTime', '公共课选课时间', 2) : null;
        break;
      case 'certificateChoiceLesson':
        returnDom = item ? this.renderTypeTage(item, 'certificateChoiceLesson')() : null;
        break;
      case 'certificateChoiceLessonTime':
        returnDom = (Array.isArray(item) && item.length > 0) ? this.renderDateTags(item, 'certificateChoiceLessonTime', '资格证课选课时间', 3) : null;
        break;
      case 'attendanceStatus':
        returnDom = item ? this.renderTypeTage(item, 'attendanceStatus')() : null;
        break;
      case 'attendanceNum':
        returnDom = item ? this.renderTypeTage(item, 'attendanceNum')('custorm') : null;
        break;
      case 'listenLessonTime':
        returnDom = item ? this.renderTypeTage(item, 'listenLessonTime')('custorm') : null;
        break;
      case 'payOrder':
        returnDom = item ? this.renderTypeTage(item, 'payOrder')() : null;
        break;
      case 'orderMoney':
        returnDom = item ? this.renderTypeTage(item, 'orderMoney')('custorm') : null;
        break;
      case 'koOrderGap':
        returnDom = item ? this.renderTypeTage(item, 'koOrderGap')('custorm') : null;
        break;
      case 'frontBelong':
        returnDom = item ? this.renderGrouptags(item, 'frontBelong') : null;
        break;
      case 'backBelong':
        returnDom = item ? this.renderGrouptags(item, 'backBelong') : null;
        break;
      default:
        returnDom = null;
        break;
    }
    return returnDom;

  };
  renderChooseTags = () => {
    const params = this.props.originParams.originParams;
    if (params) {
      const returnNode = Object.keys(params).map(item => {
        return (params[item] !== null || params[item] !== undefined) && this.checkoutTypeTage(item, params[item]);
      });
      return returnNode;
    }
    return []

  };
  showPop = () => {
    // return;
    this.props.dispatch({
      type: 'userListModel/userGroupCheck',
      payload: {},
    });
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      visible2: false,
    });
  };
  handleOk = (val) => {
    if (val == 'check') {
      this.setState({
        visible: false,
      });
    } else {
      if (!this.state.groupName) {
        message.info('请输入名称');
        return;
      }
      let params = this.props.tabFromParams,
        pageParams = this.state.pageParams,
        chooseEventData = this.props.chooseEventData,
        filterExitParams = this.state.filterExitParams;
      let localtionParams = this.getLocationParams(chooseEventData);
      let newParams = { ...params.formParams, ...pageParams, ...localtionParams, ...filterExitParams };
      let arr = this.renderChooseTags();
      let userTag = []
      arr.map(item => {
        if (item) {
          userTag.push(item)
        }
      })
      let submitParam = {
        queryParam: newParams,
        userCount: this.state.totalUser,
        groupName: this.state.groupName,
        userTag: userTag.join(",")
      }
      this.props.dispatch({
        type: 'userListModel/userGroupSubmit',
        payload: { params: submitParam },
      });
      this.setState({
        visible: this.props.userListModel.visible,
        visible2: this.props.userListModel.visible2,
      });
    }

  };
  userGroupInput = (e) => {
    this.setState({
      groupName: e.target.value,
    });
  };

  render() {
    const { userList, currentPage = 1, totalCount = 0, totalUser = 0, groupCheck } = this.props.userListModel;
    const { visible, visible2 } = this.state;
    const { loading } = this.props;
    const { pageParams } = this.state;
    const dataSource = userList;
    this.state.totalUser = thousandsFormat(totalUser);
    return (
      <div>
        <div className={style.contentWrap}>
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: 12 }}>共查询到 <span style={{ color: '#52C9C2' }}>{thousandsFormat(totalUser)}</span> 个用户
            </p>
            <BIButton type="primary" style={{ position: 'absolute', right: 0, top: 0 }}
              onClick={this.showPop}>创建用户组</BIButton>
          </div>

          <BITable
            onChange={this.tableChange}
            rowKey={record => {
              return record.userId + Math.random() * 1000;
            }}
            dataSource={dataSource} columns={columns()}
            pagination={false} loading={loading}
            scroll={{ x: 2080, y: 570 }}
            size="middle"
          />
          <br />
          <span style={{ color: '#999', fontSize: 12 }}>注：左右滑动可以查看更多字段</span>
          <BIPagination showQuickJumper defaultPageSize={pageParams.pageSize ? pageParams.pageSize : 30}
            onChange={this.onPageChange} current={currentPage} total={totalCount} />
        </div>
        {/* 别忘了把！去掉 */}
        {
          groupCheck ?
            <BIModal
              title={'创建用户组'}
              visible={visible}
              onOk={() => this.handleOk('check')}
              onCancel={this.handleCancel}
              footer={[
                <BIButton key="submit" type="primary" onClick={() => this.handleOk('check')}>
                  确定
                </BIButton>,
              ]}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ paddingBottom: '0' }}>你有一个正在创建的用户组</p>
                <p style={{ paddingBottom: '0' }}>预计需要5～10分钟</p>
                <p style={{ paddingBottom: '0' }}>请在用户运营页查看最新的创建状态。</p>
              </div>
            </BIModal>
            : <BIModal
              title={'创建用户组'}
              visible={visible}
              onOk={() => this.handleOk('add')}
              onCancel={this.handleCancel}
              footer={[
                <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
                  取消
                </BIButton>,
                <BIButton key="submit" type="primary" onClick={() => this.handleOk('add')}>
                  确定
                </BIButton>,
              ]}>
              <div>
                <p>保存{thousandsFormat(totalUser)}个学员为一个用户组，请设置用户组名称</p>
                <TextArea
                  onChange={this.userGroupInput}
                  placeholder="输入名称"
                  maxLength={50}
                  style={{ resize: 'none' }}
                  autosize={{ minRows: 2, maxRows: 2 }}
                />
              </div>
            </BIModal>
        }
        <BIModal
          title={'创建用户组'}
          visible={visible2}
          onOk={() => this.handleCancel()}
          footer={[
            <BIButton key="submit" type="primary" onClick={() => this.handleCancel()}>
              确定
            </BIButton>,
          ]}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>提交成功</h4>
            <p style={{ paddingBottom: '0' }}>正在保存用户组，预计需要5～10分钟，请在用户运营页查看最新的创建状态。</p>
          </div>
        </BIModal>

      </div>
    );
  }
}

export default UserList;
