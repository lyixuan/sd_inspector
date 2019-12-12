import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import extentImg from '@/assets/xdcredit/extent.png';
import { initTimeData } from '../ko/utils/utils';
import Dimension from './dimension';
import CollegeScore from './collegeScore';
import AttendanceScore from './attendanceScore';
import CreditDetials from './details';
import Attendance from './attendance';
import CreditImDetials from './imDetails';
import creditImg from '@/assets/xdcredit/credit.gif';
import styles from './style.less';
import moment from 'moment';
import { beforeAll } from 'lodash-decorators';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
const collegeType = [
  {
    familyType: 0,
    name: '自考',
  },
  {
    familyType: 1,
    name: '壁垒',
  },
];
@connect(({ xdCreditModal, loading }) => ({
  dimensionLevel: xdCreditModal.dimensionLevel,
  dimensionData: xdCreditModal.dimensionData,
  imDetailData: xdCreditModal.imDetailData,
  dimensionDetails: xdCreditModal.dimensionDetails,
  attendanceDeatils: xdCreditModal.attendanceDeatils,
  kpiDateRange: xdCreditModal.kpiDateRange,
  infoLoading: loading.effects['xdCreditModal/getUserInfo'],
}))
class XdCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userOrgConfig: [],
      allUserInfo: {},
      extendFlag: false, // 权限
      groupId: [],
      groupTypeArr: [],
      dementionId: '',
      // pageFrom: '',
      familyType: '',
      groupArr: [],
      orgId: '',
      orgType: '',
      // startTime: '',
      // endTime: '',
      pageSize: 15,
      pageSize2: 10,
      page: 1,
      reasonTypeId: 0,
      // isIm: false,
      loadingStatus: true,
      dimisionLoadingStatus: true,
    };
  }
  componentDidMount() {
    // 权限
    this.props.dispatch({
      type: 'xdCreditModal/getUserInfo',
      callback: extendFlag => {
        this.setState({ extendFlag: extendFlag.scoreView, allUserInfo: extendFlag });
        if (extendFlag.scoreView) {
          const { params } = this.props.location.query;
          if (params) {
            const {
              dementionId,
              startTime,
              endTime,
              orgId,
              orgType = 'college',
              familyType = '0',
            } = params ? JSON.parse(params) : {};
            this.setState(
              {
                dementionId,
                startTime,
                endTime,
                // pageFrom,
                orgId,
                orgType,
                familyType,
              },
              () => this.getUserOrgList()
            );
          } else {
            this.getUserOrgList();
          }
        }
      },
    });
    this.queryAppealDataPage();
  }
  defaultPage = page => {
    this.setState(
      {
        pageSize2: page,
      },
      () => {
        this.getImDetail();
      }
    );
  };
  reasonTypeClick = item => {
    this.setState(
      {
        loadingStatus: false,
        reasonTypeId: item.typeId,
      },
      () => {
        this.getReasonListData();
      }
    );
  };
  cellClick = (item, record, type) => {
    let reasonTypeId = this.state.reasonTypeId;
    if (item) {
      reasonTypeId = item.typeId;
    } else if (type == 'total' && this.state.reasonTypeId == 0) {
      reasonTypeId = 0;
    }
    const params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      familyType:
        (this.state.familyType.length == 3 ? '0' : this.state.familyType) ||
        this.state.allUserInfo.familyType,
      groupType: record.groupType,
      orgId: record.orgId,
      reasonTypeId: reasonTypeId,
      pageSize: this.state.pageSize2,
      page: this.state.page,
    };
    this.props.dispatch({
      type: 'xdCreditModal/imDetailList',
      payload: { params: params },
    });
  };
  getFamilyType = () => {
    const { familyType } = this.state;
    if (familyType.length === 3 || !familyType) {
      return 0;
    } else if (familyType) {
      return familyType;
    } else if (this.state.allUserInfo.familyType) {
      return this.state.allUserInfo.familyType;
    } else {
      return 0;
    }
  };
  getReasonListData() {
    const params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      familyType: this.getFamilyType(),
      groupType: this.getGroupMsg().groupType || 'group',
      orgId: this.getGroupMsg().groupId || this.state.allUserInfo.groupId,
      reasonTypeId: this.state.reasonTypeId,
    };
    this.props.dispatch({
      type: 'xdCreditModal/reasonList',
      payload: { params },
    });
    // this.getImDetail();
  }
  getImDetail = () => {
    const params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      familyType: this.getFamilyType(),
      groupType: this.getGroupMsg().groupType || 'group',
      orgId: this.getGroupMsg().groupId || this.state.allUserInfo.groupId,
      reasonTypeId: this.state.reasonTypeId,
      pageSize: this.state.pageSize2,
      page: this.state.page,
    };
    this.props.dispatch({
      type: 'xdCreditModal/imDetailList',
      payload: { params: params },
    });
  };
  // 组织 - 时间
  getUserOrgList = () => {
    const params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    };
    this.props.dispatch({
      type: 'xdCreditModal/getUserOrgList',
      payload: { params: params },
      callback: res => {
        if (res && res.length > 0) {
          this.setState(
            {
              userOrgConfig: res,
              ...this.getResetGroupMsg(res),
            },
            () => this.getDimensionList()
          );
        } else {
          this.getDimensionList();
        }
        const { dementionId } = this.state;
        if (dementionId) {
          this.queryAppealDataPage();
          if (dementionId === 16) {
            this.getReasonListData();
            // this.setState({
            //   isIm: true,
            // })
          } else if (dementionId === 37 || dementionId === 38) {
            this.getAttendanceDeail();
          } else {
            this.getDimensionDetail();
          }
        }
      },
    });
    this.props.dispatch({
      type: 'xdCreditModal/getKpiDateRange',
      callback: res => {
        if (!this.state.startTime || !this.state.endTime) {
          this.setState({
            startTime: res.endDate,
            endTime: res.endDate,
          });
        }
      },
    });
  };
  getParentNode(data, nodeId, groupType, arr = []) {
    if (data && data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        if (item.id == nodeId && item.groupType == groupType) {
          arr.unshift(item);
          return true;
        } else {
          if (item.nodeList && item.nodeList.length > 0) {
            let flag = this.getParentNode(item.nodeList, nodeId, groupType, arr);
            if (flag) {
              arr.unshift(item);
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  // 列表
  getDimensionList = () => {
    const { startTime, endTime } = this.state;
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionList',
      payload: {
        params: { ...this.getGroupMsg(), startTime, endTime, familyType: this.getFamilyType() },
      },
      // callback: (data) => {
      //   if (this.state.pageFrom) {
      //     this.fillDataSource(data.dimensionList)
      //   }
      // }
    });
  };
  // fillDataSource = (params) => {
  //   params.map(item => {
  //     if (item.children && item.children.length > 0) {
  //       this.fillDataSource(item.children);
  //     }
  //   })
  // params.map((item) => {
  //   if (item.id === this.state.dementionId) {
  //     this.setState({
  //       dementionId: item.children[0].id
  //     }, () => {
  //       this.getDimensionDetail()
  //     })
  //   }
  // })
  //   return params
  // }
  // 详情
  getDimensionDetail = () => {
    const groupMsg = this.getGroupMsg();
    const param = {
      ...groupMsg,
      familyType: this.getFamilyType(),
      dementionId: this.state.dementionId,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageSize: this.state.pageSize,
      page: this.state.page,
    };
    this.props.dispatch({
      type: 'xdCreditModal/getDimensionDetail',
      payload: { params: param },
      callback: res => {
        if (res && res.length > 0) {
          this.setState({
            userOrgConfig: res,
          });
        }
      },
    });
  };

  // 直播重播详情
  getAttendanceDeail = () => {
    const groupMsg = this.getGroupMsg();
    const param = {
      ...groupMsg,
      familyType: this.getFamilyType(),
      dementionId: this.state.dementionId,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageSize: this.state.pageSize,
      page: this.state.page,
    };
    this.props.dispatch({
      type: 'xdCreditModal/getAttendanceDeail',
      payload: { params: param },
      callback: res => {
        if (res && res.length > 0) {
          this.setState({
            userOrgConfig: res,
          });
        }
      },
    });
  };
  // 参数groupId
  getGroupMsg = () => {
    const { groupId, groupTypeArr } = this.state;
    if (groupId && groupId.length > 0) {
      const index = groupId.length - 1;
      return { groupId: groupId[index], groupType: groupTypeArr[index].groupType };
    } else {
      return {};
    }
  };
  // reset groupId数组 getResetGroupId
  getResetGroupMsg = (arr = this.state.userOrgConfig) => {
    const { orgId, orgType } = this.state;
    let arr1 = [];
    if (arr && arr.length > 0) {
      this.getParentNode(arr, orgId, orgType, arr1);
      const item = arr[0];
      if (orgId && arr1.length > 0) {
        const { familyType } = JSON.parse(this.props.location.query.params);
        const groupArr = arr1.map(item => item.id);
        this.setState({
          showCollege: arr1.length == 1 && arr1[0].familyType.length > 1,
        });
        return {
          groupId: groupArr,
          groupTypeArr: arr1,
          familyType: familyType ? familyType : arr1[arr1.length - 1].familyType,
        };
      }
      // else if (item.groupType === 'college' && item.nodeList && item.nodeList.length > 0) {
      //   const node = item.nodeList[0];
      //   return { groupId: [item.id, node.id], groupTypeArr: [item, node], familyType: node.familyType };
      // }
      this.setState({
        showCollege: item.familyType.length > 1,
      });
      return { groupId: [item.id], groupTypeArr: [item], familyType: item.familyType };
    } else {
      return { groupId: [], groupTypeArr: [], familyType: '' };
    }
  };
  // date
  getDate = () => {
    const { startTime, endTime } = this.state;
    return startTime && endTime ? [moment(startTime), moment(endTime)] : [];
  };
  // 多级渲染
  renderCascader = label => {
    if (Array.isArray(label) && label.length === 0) return;
    let labelStr = label.join('/');
    labelStr = labelStr.length >= 8 ? `${labelStr.substr(0, 6)}...` : labelStr;
    return <span>{labelStr}</span>;
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return (
      current > moment(this.props.kpiDateRange.endDate) ||
      current < moment(this.props.kpiDateRange.startDate)
    );
  };
  // 左侧维度id
  onChangeParams = (v, type) => {
    // 点击不满意会话
    if (v == 16) {
      this.setState(
        {
          // isIm: true,
          [type]: v,
          page: 1,
        },
        () => {
          this.queryAppealDataPage();
        }
      );
      this.getReasonListData();
    } else if (v === 37 || v === 38) {
      this.setState(
        {
          [type]: v,
          page: 1,
          // isIm: false
        },
        () => {
          if (type === 'dementionId') {
            this.getAttendanceDeail();
            this.queryAppealDataPage();
          }
        }
      );
    } else {
      this.setState(
        {
          [type]: v,
          page: 1,
          // isIm: false
        },
        () => {
          if (type === 'dementionId') {
            this.getDimensionDetail();
            this.queryAppealDataPage();
          }
        }
      );
    }
  };
  // 选择组织
  onChangeSelect = (groupId, groupTypeArr) => {
    this.setState(
      {
        groupId,
        groupTypeArr,
        familyType: groupTypeArr[groupTypeArr.length - 1].familyType,
      },
      () => {
        // if (this.state.familyType != '0' && this.state.familyType != '1' && groupTypeArr[groupTypeArr.length - 1].groupType == 'college') {
        if (
          this.state.familyType &&
          this.state.familyType.length > 1 &&
          groupTypeArr[groupTypeArr.length - 1].groupType == 'college'
        ) {
          this.setState({
            showCollege: true,
          });
        } else {
          this.setState({
            showCollege: false,
          });
        }
      }
    );
  };
  // 选择时间
  onDateChange = v => {
    const [startTime, endTime] = initTimeData(v);
    this.setState({ startTime, endTime }, () => {
      const params = {
        startTime: startTime,
        endTime: endTime,
      };
      this.props.dispatch({
        type: 'xdCreditModal/getUserOrgList',
        payload: { params: params },
        callback: res => {
          if (res && res.length > 0) {
            this.setState({
              userOrgConfig: res,
              ...this.getResetGroupMsg(res),
            });
          }
        },
      });
    });
  };
  handleClick = () => {
    this.setState(
      {
        dimisionLoadingStatus: false,
      },
      () => {
        this.getDimensionList();
        this.onChangeParams(this.state.dementionId, 'dementionId');
      }
    );
  };
  handleReset = () => {
    this.setState(
      {
        dimisionLoadingStatus: false,
        startTime: this.props.kpiDateRange.endDate,
        endTime: this.props.kpiDateRange.endDate,
        ...this.getResetGroupMsg(),
      },
      () => {
        this.getDimensionList();
        this.onChangeParams('', 'dementionId');
      }
    );
  };
  onPageChange = currentPage => {
    this.setState(
      {
        page: currentPage,
      },
      () => {
        this.getDimensionDetail();
      }
    );
  };
  onPageChange2 = currentPage => {
    this.setState(
      {
        page: currentPage,
      },
      () => this.getImDetail()
    );
  };
  onPageChange3 = currentPage => {
    this.setState(
      {
        page: currentPage,
      },
      () => this.getAttendanceDeail()
    );
  };
  onSelectChange = val => {
    this.setState({
      familyType: val,
    });
  };
  // getType
  getTypeId = () => {
    const groupMsg = this.getGroupMsg();
    if (groupMsg.groupType === 'college') {
      return { collegeId: groupMsg.groupId };
    } else if (groupMsg.groupType === 'family') {
      return { familyId: groupMsg.groupId };
    } else if (groupMsg.groupType === 'group') {
      return { groupId: groupMsg.groupId };
    } else {
      return {};
    }
  };
  //获取柱状图及维度的接口
  queryAppealDataPage = () => {
    const params = {
      contrasts: 4,
      familyType: this.getFamilyType(),
      dimensionId: this.state.dementionId,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      ...this.getTypeId(),
    };
    if (this.state.dementionId === 37 || this.state.dementionId === 38) {
      this.props.dispatch({
        type: 'xdCreditModal/queryAttendancePage',
        payload: { params: params },
      });
    } else {
      this.props.dispatch({
        type: 'xdCreditModal/queryAppealDataPage',
        payload: { params: params },
      });
    }
  };
  render() {
    const { dementionId, groupId, extendFlag, userOrgConfig } = this.state;
    const { infoLoading, dimensionLevel = {} } = this.props;
    const value = this.getFamilyType();
    const level = dimensionLevel[dementionId];
    let newTable = null;
    let newChart = null;
    switch (dementionId) {
      case 16:
        newTable = (
          <CreditImDetials
            onPageChange={this.onPageChange2}
            pageSize2={this.state.pageSize2}
            currentPage={this.state.page}
            defaultPage={this.defaultPage}
            loadingStatus={this.state.loadingStatus}
            cellClick={this.cellClick}
            resetCell={this.resetCell}
            reasonTypeClick={this.reasonTypeClick}
          />
        );
        newChart = <CollegeScore />;
        break;
      case 37:
      case 38:
        newChart = <AttendanceScore />;
        newTable = (
          <Attendance
            onPageChange={this.onPageChange3}
            pageSize={this.state.pageSize}
            currentPage={this.state.page}
            detailsData={this.props.attendanceDeatils}
            dementionId={dementionId}
          />
        );
        break;
      default:
        newChart = <CollegeScore />;
        newTable = (
          <CreditDetials
            onPageChange={this.onPageChange}
            pageSize={this.state.pageSize}
            currentPage={this.state.page}
            detailsData={this.props.dimensionDetails}
            dementionId={dementionId}
            timeDate={{startTime: this.state.startTime, endTime: this.state.endTime}}
          />
        );
        break;
    }

    return (
      <div className={`${styles.credit} ${extendFlag ? '' : styles.extent}`}>
        <Skeleton loading={infoLoading}>
          {extendFlag ? (
            <>
              <div className={styles.form}>
                {/* <span className={styles.date}>{startTime}～{endTime}</span> */}
                <span className={styles.change}>
                  选择时间：
                  <BIRangePicker
                    value={this.getDate()}
                    placeholder={['选择起始时间', '选择截止时间']}
                    format={dateFormat}
                    onChange={this.onDateChange}
                    allowClear={false}
                    disabledDate={this.disabledDate}
                    style={{ width: '224px' }}
                  />
                </span>
                {userOrgConfig.length > 0 && (
                  <span className={styles.change}>
                    选择组织：
                    <BICascader
                      placeholder="选择组织"
                      changeOnSelect
                      options={userOrgConfig}
                      fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                      displayRender={this.renderCascader}
                      value={groupId}
                      onChange={this.onChangeSelect}
                      allowClear={false}
                      style={{ width: '136px' }}
                    />
                  </span>
                )}
                {// (this.state.familyType != 0 && this.state.familyType != 1) && (this.state.groupTypeArr.length > 0 && this.state.groupTypeArr[0].groupType == 'college') &&
                this.state.showCollege && (
                  <span className={styles.change}>
                    学院类型：
                    <BISelect
                      value={value}
                      placeholder="请选择学院类型"
                      style={{ width: '136px' }}
                      onChange={this.onSelectChange}
                    >
                      {collegeType &&
                        collegeType.map(item => (
                          <Option key={item.familyType} value={item.familyType}>
                            {item.name}
                          </Option>
                        ))}
                    </BISelect>
                  </span>
                )}
                <BIButton type="reset" onClick={this.handleReset} style={{ marginRight: '8px' }}>
                  重置
                </BIButton>
                <BIButton
                  data-trace='{"widgetName":"查询","traceName":"数据服务/学分明细/查询"}'
                  type="primary"
                  onClick={this.handleClick}
                  htmlType="submit"
                >
                  查询
                </BIButton>
              </div>
              {
                <div className={styles.dataShow}>
                  <Dimension
                    dimisionLoadingStatus={this.state.dimisionLoadingStatus}
                    dementionId={dementionId}
                    onChangeParams={this.onChangeParams}
                    dimensionData={this.props.dimensionData}
                    groupId={groupId}
                  />
                  <div className={`${styles.creditTrend} ${dementionId ? '' : styles.creditNone}`}>
                    {dementionId ? (
                      <>
                        {/* 图表代码 */}
                        {newChart}
                        {level === 4
                          ? newTable
                          : // <>
                            //   {this.state.dementionId === 16 ? (
                            //     <CreditImDetials
                            //       onPageChange={this.onPageChange2}
                            //       pageSize2={this.state.pageSize2}
                            //       currentPage={this.state.page}
                            //       defaultPage={this.defaultPage}
                            //       loadingStatus={this.state.loadingStatus}
                            //       cellClick={this.cellClick}
                            //       resetCell={this.resetCell}
                            //       reasonTypeClick={this.reasonTypeClick}
                            //     />
                            //   ) : (
                            //     <CreditDetials
                            //       onPageChange={this.onPageChange}
                            //       pageSize={this.state.pageSize}
                            //       currentPage={this.state.page}
                            //       detailsData={this.props.dimensionDetails}
                            //       dementionId={dementionId}
                            //     />
                            //   )}
                            // </>
                            ''}
                      </>
                    ) : (
                      <img src={creditImg} alt="权限" />
                    )}
                  </div>
                </div>
              }{' '}
            </>
          ) : (
            <>
              <img src={extentImg} alt="权限" />
              <span>你没有权限查看该页面，请联系系统管理员</span>
            </>
          )}
        </Skeleton>
      </div>
    );
  }
}

export default XdCredit;
