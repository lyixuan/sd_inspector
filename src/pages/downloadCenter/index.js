import React, { Component } from 'react';
import { connect } from 'dva';
import { message, Button, DatePicker } from 'antd';
import moment from 'moment';
import AuthorizedButton from './components/AuthorizedButton';
import ModalDialog from './components/Modal/Modal';
import common from './utils/common.less';
import storage from '@/utils/storage';
import ModalContent from './components/_modalContent';
import backTop from '@/assets/downloadCenter/backTop.svg';
import FormFilter from './components/FormFilter';
import {getUrlParams} from './utils/util';
import style from './style.less';

import { STATIC_HOST } from '@/utils/constants';
import { formatDate } from './utils/util';
import { BOTTOM_TABLE_STATUS } from './constants/constant';
import packSucess from '@/assets/downloadCenter/packSucess.svg';
import packError from '@/assets/downloadCenter/packError.svg';
import compress from '@/assets/downloadCenter/compress.svg';
import packing from '@/assets/downloadCenter/packing.svg';
import DownLoad from './components/download';

import BIButton from '@/ant_components/BIButton';

const dateFormat = 'YYYY-MM-DD';
const imgArr = [packing, packSucess, packError];

function postTraceData(type) {
  let obj;
  if (type === 0) {
    obj = {widgetName:"学分明细页督学表下载",traceName:"学分明细/学分底表下载"};
  } else if (type === 2) {
    obj = {widgetName:"下载中心督学表下载",traceName:"学分明细/督学底表下载"};
  } else {

  }
  const {BI = {}} = window;
  BI.traceV && BI.traceV(obj)
}

@connect(({ bottomTable, loading }) => ({
  bottomTable,
  loading: loading.models.bottomTable,
  isLoading: loading.effects['bottomTable/getRange'],
}))
class Index extends Component {
  constructor(props) {
    super(props);
    const localStorage = storage.getUserInfo();
    const userId = !localStorage ? null : localStorage.userId;
    this.state = {
      timeParams: {
        orderDirection: 'desc',
        orderType: 'dateTime',
      },
      modalParam: {
        bottomDate: '',
        collegeId: null,
        type: null,
      },
      userId,
      type: 0,
      bottomTime: '',
      pageNum: 0,
      pageSize: 30,
      visible: false,
    };
    this.dateArea = [];
    this.columns = [
      {
        title: '底表名称',
        dataIndex: 'taskName',
        render: text => {
          return (
            <>
              <img src={compress} alt="compress" style={{ marginRight: '8px' }} />
              {text}
            </>
          );
        },
      },
      {
        title: '底表时间',
        dataIndex: 'bottomTime',
        // render: text => formatDate(text).substr(0, 10),
        render: text => text,
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        render: text => formatDate(text),
      },
      {
        title: '任务状态',
        dataIndex: 'status',
        render: text => {
          return (
            <>
              <img src={imgArr[text]} alt="packError" style={{ marginRight: '8px' }} />
              {BOTTOM_TABLE_STATUS.map(item => {
                if (Number(item.id) === text) {
                  return item.name;
                }
                return null;
              })}
            </>
          );
        },
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <>
              {Number(record.status) !== 1 ? null : (
                <AuthorizedButton authority="/bottomTable/downloadBottomTable">
                  <div
                    style={{
                      color: '#0062FF',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <div onClick={postTraceData.bind(null, record.type)}>
                      <DownLoad
                        loadUrl={`${STATIC_HOST}${record.zipPath}`}
                        fileName={() => record.taskName}
                      />
                    </div>
                  </div>
                </AuthorizedButton>
              )}
            </>
          );
        },
      },
    ];
  }
  componentDidMount() {
    let search = this.props.location.search;
    const initVal = getUrlParams(search);
    const initParams = {};
    if (JSON.stringify(initVal) !== '{}') {
      initParams.bottomTime = initVal.bottomTime ? Date.parse(new Date(initVal.bottomTime)) : null;
      initParams.type = 0; // initVal.type && initVal.type !== '' ? Number(initVal.type) : '';
    }
    this.getRange(); // 时间范围
    this.disDateList(); // 不可选时间
    this.getAllOrg(); // 所有学院列表
    this.getDataList();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.bottomTable) !== JSON.stringify(this.props.bottomTable)) {
      this.getDateRange(nextProps.bottomTable);
    }
  }

  onSubmit = data => {
    const bottomTime = data.bottomTime ? Date.parse(new Date(data.bottomTime)) : null;
    const type = 0; // data.type && data.type !== '' ? Number(data.type) : '';
    const pageNum = data.pageNum ? Number(data.pageNum) : 0;
    this.getDataList({ bottomTime, type, pageNum }); // 列表数据
  };

  // 获取最新时间和最小时间
  getDateRange = (bottomTable = {}) => {
    const { dateArea = {}, disDateList = [] } = bottomTable;
    const { content = [] } = disDateList;
    const { beginTime = '', endTime = '' } = dateArea;
    const disabledDate = content.map(item => moment(item.dateTime).format(dateFormat));
    const newTime = this.haddleMaxDate(endTime);
    this.dateArea = this.haddleDateArea(newTime, beginTime, disabledDate);
  };

  // 列表数据
  getDataList = paramObj => {
    const { userId, type, bottomTime, pageNum, pageSize } = this.state;
    const params = { userId, type, bottomTime, pageNum, pageSize, ...paramObj };
    this.props.dispatch({
      type: 'bottomTable/bottomTableList',
      payload: params,
    });
  };

  // 所有学院列表
  getAllOrg = () => {
    this.props.dispatch({
      type: 'bottomTable/findAllOrg',
      payload: {},
    });
  };

  // 初始化回显时间日期
  getRange = () => {
    this.props.dispatch({
      type: 'bottomTable/getRange',
    });
  };

  isDataAnalyst = false; // 是否是数据分析员
  haddleMaxDate = endTime => {
    const endDate = endTime || moment().valueOf;
    const taday_13 = moment().format('YYYY-MM-DD 13:30');
    const isBeforeTaday_13 = moment().isBefore(taday_13);
    let newDate = null;
    if (isBeforeTaday_13) {
      newDate = moment().subtract(2, 'd');
    } else {
      newDate = moment().subtract(1, 'd');
    }
    return Math.min(endDate, newDate.valueOf());
  };
  haddleDateArea = (maxTime, minTime, disabledDate) => {
    const dateArr = [];
    for (let i = maxTime; i >= minTime && dateArr.length < 10; i -= 86400000) {
      const isSameDate = disabledDate.find(
        item => moment(item).format(dateFormat) === moment(i).format(dateFormat)
      );
      if (!isSameDate) {
        dateArr.push(moment(i).format(dateFormat));
      }
    }
    return dateArr;
  };

  // 点击某一页函数
  changePage = (pageNum, size) => {
    this.getDataList({
      pageSize: size,
      pageNum,
    });
  };
  // 不可选时间
  disDateList = () => {
    const { timeParams, pageNum, pageSize } = this.state;
    this.props.dispatch({
      type: 'bottomTable/getDates',
      payload: { ...timeParams, pageNum, pageSize },
    });
  };

  // 模态框确定
  clickModalOK = () => {
    const { modalParam, type = 0, userId, bottomTime, pageNum, pageSize } = this.state;
    if (modalParam.bottomDate === '') {
      message.error('请选择底表时间');
      return;
    } else if (this.isDataAnalyst && modalParam.collegeId === null) {
      message.error('请选择学院');
      return;
    }
    const sendParam = {
      addParams: { ...modalParam, userId },
      listParams: { userId, type, bottomTime, pageNum, pageSize },
    };
    this.props.dispatch({
      type: 'bottomTable/addTask',
      payload: sendParam,
    });
    this.showModal(false);
  };
  // 模态框显隐回调
  showModal = bol => {
    this.setState({
      visible: bol,
    });
  };

  // 添加任务
  addTasks = () => {
    this.setState({
      visible: true,
      modalParam: {
        bottomDate: '',
        collegeId: null,
        type: 0,
      },
    });
  };

  backTop = () => {
    window.scrollTo(0, 0);
  };

  updateModalData = modalParam => {
    this.setState({ modalParam });
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const currentDate = current || moment();
    const currentFormat = moment(currentDate.format(dateFormat));
    const disableData = this.dateArea.find(item => currentFormat.isSame(item));
    return !disableData;
  };
  isDataAnalystFn = bol => {
    this.isDataAnalyst = bol;
  };
  render() {
    const { bottomTable = {}, loading, isLoading } = this.props;
    const { dataList = [], findAllOrg = [], totalNum = 0 } = bottomTable;
    // const columns = columnsFn(this.downLoadBTable);
    const columns = this.columns;

    return (
      <div className="download-content">
        <div className={style.title}>下载中心</div>
        <div className={style.contentWrap}>
          {
            <AuthorizedButton authority="/bottomTable/addBottomTable">
              <BIButton onClick={this.addTasks} type="primary">
                学分底表
              </BIButton>
            </AuthorizedButton>
          }
          {
            <FormFilter.Table
              bordered
              totalNum={totalNum}
              loading={loading}
              dataSource={dataList}
              columns={columns}
              onChangePage={this.changePage} />
          }
        </div>

        {/* 回到顶部 */}
        <div className={style.fixBox}>
          <img src={backTop} alt="backTop" onClick={this.backTop} />
        </div>
        {/* 添加底表下载任务 */}
        <ModalDialog
          title="添加底表下载任务"
          visible={this.state.visible}
          modalContent={
            <ModalContent
              disabledDate={this.disabledDate}
              updateModalData={this.updateModalData}
              selectOption={findAllOrg}
              authList={storage.getUserAuth()}
              isDataAnalyst={bol => this.isDataAnalystFn(bol)}
            />
          }
          showModal={bol => this.showModal(bol)}
          clickOK={() => this.clickModalOK()}
        />
      </div>
    );
  }
}

export default Index;
