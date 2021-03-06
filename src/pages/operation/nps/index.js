import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '@/components/BIContainer_wen';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { BiFilter } from '@/utils/utils';
import NPSLeft from './NPSLeft';
// import NPSRight from './NPSRight'
import moment from 'moment';
import { initTimeData } from '../../ko/utils/utils';
import { removeTypeDuplicates } from '@babel/types';
import Echarts from '@/components/Echart';
import { getOption } from './npsLeftOptions.js';
import { getOption1 } from './npscenterOptions.js';
import NPSRight from './npsrightOptions.js';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
const { BI = {} } = window;
@connect(({ xdOperation }) => ({
  xdOperation,
  xdOperationNpsData: xdOperation.xdOperationNpsData,
  getCurrentDateRangeData1: xdOperation.getCurrentDateRangeData1,
  xdOperationNpsPaiData: xdOperation.xdOperationNpsPaiData,
  userInfo: xdOperation.userInfo,
}))
class NPSEvaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeOptions: [
        {
          collegeId: 1,
          collegeName: '自变量',
        },
        {
          collegeId: 2,
          collegeName: '睿博',
        },
        {
          collegeId: 3,
          collegeName: 'π学院',
        },
        {
          collegeId: 4,
          collegeName: '芒格',
        },
        {
          collegeId: 5,
          collegeName: '狐逻泰罗',
        },
      ],
      orgValue: '自变量',
      userOrgConfig: [],
      groupId: [0] || localStorage.getItem('NPSGroupId'),
      groupTypeArr: [],
      NPSParams: {},
      dateArr: this.getIniDateRange(),
      userInfo: props.userInfo,
      disableEndDate: this.handleDefaultPickerValueMarkDays(),
      star: this.getStar(),
      cycle: localStorage.getItem('CYCLE_VALUE') ? localStorage.getItem('CYCLE_VALUE') : '0',
      npsList: [],
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdOperation/getUserInfo',
      callback: userInfo => {
        this.getUserOrgList();
        let groupIds = [0];
        if (
          userInfo.userType == 'college' ||
          userInfo.userType == 'family' ||
          userInfo.userType == 'class' ||
          userInfo.userType == 'group'
        ) {
          groupIds = [userInfo.collegeId, userInfo.familyId, userInfo.groupId];
        } else {
          groupIds = [0];
        }
        this.setState(
          {
            groupId: localStorage.getItem('NPSGroupId')
              ? JSON.parse(localStorage.getItem('NPSGroupId'))
              : groupIds,
            userInfo,
            star: this.getStar(),
          },
          () => {
            this.getNpsAutonomousEvaluation(0, false);
            this.getNpsData();
            this.getPieData();
          }
        );
      },
    });
  }

  // 获取nps标签评分接口
  getNpsData = () => {
    const { userInfo } = this.state;
    const datares = JSON.parse(localStorage.getItem('NPSGroupId'));
    let params = {
      ...this.initRecordTimeListData(this.state.dateArr),
      collegeId: datares ? (datares[0] == 0 ? null : datares[0]) : userInfo.collegeId,
      // (userInfo && userInfo.collegeId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[0]) ||
      // null,
      familyId: datares ? datares[1] : userInfo.familyId,
      // (userInfo && userInfo.familyId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[1]) ||
      // null,
      groupId: datares ? datares[2] : userInfo.groupId,
      // (userInfo && userInfo.groupId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[2]) ||
      // null,
      star: this.state.star === '0' ? null : Number(this.state.star),
      cycle: this.state.cycle === '0' ? null : Number(this.state.cycle),
    };
    this.props.dispatch({
      type: 'xdOperation/getNpsData',
      payload: { params: params },
    });
    // this.props.dispatch({
    //   type: 'xdOperation/getNpsData',
    //   payload: { params: { ...this.initRecordTimeListData(this.state.dateArr) } },
    // });
  };

  getIniDateRange = () => {
    const { params } = this.props.location.query;
    const { dataRange } = params ? JSON.parse(params) : {};
    if (dataRange && dataRange instanceof Array && dataRange.length === 2) {
      return [moment(dataRange[0]), moment(dataRange[1])];
    } else if (localStorage.getItem('NPSDates')) {
      return this.localStoryDates();
    } else {
      return [this.handleDefaultPickerValueMark(), this.handleDefaultPickerValueMarkDays()];
    }
  };

  getStar = () => {
    let { params } = this.props.location.query;
    if (params) {
      params = JSON.parse(params);
      if (params.star) {
        return params.star;
      } else {
        return localStorage.getItem('NPSStar') ? localStorage.getItem('NPSStar') : '0';
      }
    }
  };
  localStoryDates = () => {
    let startDate = moment(JSON.parse(localStorage.getItem('NPSDates'))[0]);
    let endDate = moment(JSON.parse(localStorage.getItem('NPSDates'))[1]);
    return [startDate, endDate];
  };

  initRecordTimeListData = (params = []) => {
    const [startTime, endTime] = params.map(item => item && moment(item).format(dateFormat));
    return { startTime, endTime };
  };

  getCommentList = (page, change) => {
    // const { commentLists } = this.props.cubePlanDetail;
    // const params = { id: this.id, pageSize: 10, page: page + 1 || 1, commentLists };
    this.getNpsAutonomousEvaluation(page, change);
  };

  //获取NPS自主评价的的数据接口
  getNpsAutonomousEvaluation = (pageNum, change) => {
    const { userInfo, npsList } = this.state;
    const datares = JSON.parse(localStorage.getItem('NPSGroupId'));
    let params = {
      ...this.initRecordTimeListData(this.state.dateArr),
      collegeId: datares ? (datares[0] == 0 ? null : datares[0]) : userInfo.collegeId,
      // (userInfo && userInfo.collegeId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[0]) ||
      // null,
      familyId: datares ? datares[1] : userInfo.familyId,
      // (userInfo && userInfo.familyId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[1]) ||
      // null,
      groupId: datares ? datares[2] : userInfo.groupId,
      // (userInfo && userInfo.groupId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[2]) ||
      // null,
      star: this.state.star === '0' ? null : Number(this.state.star),
      cycle: this.state.cycle === '0' ? null : Number(this.state.cycle),
      pageNum: pageNum ? pageNum + 1 : 1,
      pageSize: 30,
      npsList,
      change,
    };
    this.props.dispatch({
      type: 'xdOperation/getNpsAutonomousEvaluation',
      payload: { params: params },
      callback: (res, npsList) => {
        this.setState({
          NPSParams: res,
          npsList,
        });
      },
    });
  };

  getPieData = () => {
    const { userInfo } = this.state;
    const datares = JSON.parse(localStorage.getItem('NPSGroupId'));
    let params = {
      ...this.initRecordTimeListData(this.state.dateArr),
      collegeId: datares ? (datares[0] == 0 ? null : datares[0]) : userInfo.collegeId,
      // (userInfo && userInfo.collegeId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[0]) ||
      // null,
      familyId: datares ? datares[1] : userInfo.familyId,
      // (userInfo && userInfo.familyId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[1]) ||
      // null,
      groupId: datares ? datares[2] : userInfo.groupId,
      // (userInfo && userInfo.groupId) ||
      // (this.state.groupId.length > 0 && this.state.groupId[2]) ||
      // null,
      star: this.state.star === '0' ? null : Number(this.state.star),
      cycle: this.state.cycle === '0' ? null : Number(this.state.cycle),
    };

    // let params = {
    //   ...this.initRecordTimeListData(this.state.dateArr),
    //   collegeId:
    //     (userInfo && userInfo.collegeId) ||
    //     (this.state.groupId.length > 0 && this.state.groupId[0]) ||
    //     null,
    //   familyId:
    //     (userInfo && userInfo.familyId) ||
    //     (this.state.groupId.length > 0 && this.state.groupId[1]) ||
    //     null,
    //   groupId:
    //     (userInfo && userInfo.groupId) ||
    //     (this.state.groupId.length > 0 && this.state.groupId[2]) ||
    //     null,
    //   star: this.state.star === '0' ? null : Number(this.state.star),
    //   cycle: this.state.cycle === '0' ? null : Number(this.state.cycle),
    // };
    this.props.dispatch({
      type: 'xdOperation/getNPSPaiData',
      payload: { params: params },
    });
  };
  // 组织 - 时间
  getUserOrgList = () => {
    this.props.dispatch({
      type: 'xdOperation/getOrgMapTree',
      payload: { params: {} },
      callback: res => {
        if (res && res.length > 0) {
          res.unshift({ id: 0, name: '组织', nodeList: '' });
          this.setState({
            userOrgConfig: res,
          });
        }
      },
    });
  };
  // 选择组织
  onChangeSelect = (groupId, groupTypeArr) => {
    console.log(271,groupId,groupTypeArr)
    //   collegeId:
    //   (userInfo && userInfo.collegeId) ||
    //   (this.state.groupId.length > 0 && this.state.groupId[0]) ||
    //   null,
    // familyId:
    //   (userInfo && userInfo.familyId) ||
    //   (this.state.groupId.length > 0 && this.state.groupId[1]) ||
    //   null,
    // groupId:
    //   (userInfo && userInfo.groupId) ||
    //   (this.state.groupId.length > 0 && this.state.groupId[2]) ||
    //   null,
    this.setState(
      {
        groupId,
        groupTypeArr,
      },
      () => {
        this.getNpsAutonomousEvaluation(0, true);
        this.getPieData();
        this.getNpsData();
      }
    );
    BI.traceV && BI.traceV({ widgetName: 'NPS归属筛选', traceName: '管理层工作台/NPS归属筛选' });
    localStorage.setItem('NPSGroupId', JSON.stringify(groupId));
  };
  onChangeStar = star => {
    this.setState(
      {
        star,
      },
      () => {
        this.getNpsAutonomousEvaluation(0, true);
        this.getPieData();
        this.getNpsData();
      }
    );
    BI.traceV && BI.traceV({ widgetName: '星级筛选', traceName: '管理层工作台/NPS分析' });
    localStorage.setItem('NPSStar', star);
  };

  onChangeCycle = cycle => {
    this.setState(
      {
        cycle,
      },
      () => {
        this.getNpsAutonomousEvaluation(0, true);
        this.getPieData();
        this.getNpsData();
      }
    );
    BI.traceV &&
      BI.traceV({ widgetName: '学员生命周期筛选', traceName: '家族长工作台/NPS学员生命周期筛选' });
    localStorage.setItem('CYCLE_VALUE', cycle);
  };

  // 选择时间
  onDateChange = v => {
    localStorage.setItem('NPSDates', JSON.stringify(initTimeData(v)));
    this.setState(
      {
        dateArr: v,
      },
      () => {
        this.getNpsAutonomousEvaluation(0, true);
        this.getPieData();
        this.getNpsData();
      }
    );
    // this.setState({ dateArr: v }, () => this.getNpsAutonomousEvaluation(0, true));
    BI.traceV && BI.traceV({ widgetName: 'NPS时间筛选', traceName: '管理层工作台/NPS时间筛选' });
  };
  //取T-2日期的数据
  handleDefaultPickerValueMark = cTime => {
    cTime = cTime ? moment(cTime) : moment();
    // const startDate = cTime.subtract(1, 'months');
    return cTime.subtract(1, 'months');
  };
  handleDefaultPickerValueMarkDays = (n = 2, cTime) => {
    cTime = cTime ? moment(cTime) : moment();
    // const defTime = cTime.subtract(n, 'days');
    return cTime.subtract(n, 'days');
  };

  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current > moment(this.state.disableEndDate) || current < moment('2019-07-08');
  };
  rightPart = () => {
    // const {collegeOptions,orgValue} = this.state
    const { groupId = [0], userOrgConfig, dateArr, star = '0', cycle } = this.state;
    const { orgList } = this.props.xdOperation;
    orgList.length > 0 && this.getResetGroupMsg(orgList);
    return (
      <div className={styles.more}>
        <span className={styles.change}>
          {/* 组织： */}
          <BICascader
            placeholder="请选择组织"
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
        <span className={styles.change}>
          {/* 星级： */}
          <BISelect
            placeholder="请选择星级"
            value={star}
            onChange={this.onChangeStar}
            allowClear={false}
            style={{ width: '136px' }}
          >
            <Option key={0}>星级</Option>
            {BiFilter('WB_STAR').map(item => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </BISelect>
        </span>
        <span className={styles.change}>
          {/* 学员生命周期： */}
          <BISelect
            placeholder="请选择生命周期"
            value={cycle}
            onChange={this.onChangeCycle}
            allowClear={false}
            style={{ width: '136px' }}
          >
            <Option key={0}>周期</Option>
            {BiFilter('WB_LIFE_CYCLE').map(item => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </BISelect>
        </span>
        <span className={styles.change}>
          {/* 时间： */}
          <BIRangePicker
            value={dateArr}
            placeholder={['选择起始时间', '选择截止时间']}
            format={dateFormat}
            onChange={this.onDateChange}
            allowClear={false}
            disabledDate={this.disabledDate}
            style={{ width: '224px' }}
          />
        </span>
      </div>
    );
  };
  render() {
    const { NPSParams } = this.state;
    const { npsList = [], xdOperationNpsData, xdOperationNpsPaiData } = this.props.xdOperation;
    const total = xdOperationNpsPaiData.total;
    const options = getOption(xdOperationNpsPaiData.detailList);
    const options1 = getOption1(xdOperationNpsData);
    return (
      <Container
        title="NPS详情"
        style={{ width: '100%', marginBottom: '16px' }}
        right={this.rightPart()}
      >
        <div className={styles.NPSMainCon}>
          <div className={styles.NPSCenter}>
            <div className={styles.NPSCenterL}>
              <p className={styles.title}>
                <span></span>
                生命周期分布
              </p>
              <div className={styles.NPSCenterLPie}>
                <div className={styles.NPSCenterLTotal}>
                  <p className={styles.total}>{total}</p>
                  <p className={styles.totalWord}>总数量</p>
                </div>
                <Echarts options={options} style={{ width: '263px', height: 223 + 'px' }} />
              </div>
            </div>
            <div className={styles.NPSCenterC}>
              <p className={styles.title}>
                <span></span>
                NPS评分
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Echarts
                  options={options1}
                  style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
                />
              </div>
            </div>
            <div className={styles.NPSCenterR}>
              <p className={styles.title}>
                <span></span>
                NPS标签
              </p>
              <div className={styles.NPSCenterRCon}>
                <NPSRight cloudOptions={xdOperationNpsData.tagImageDtoList} />
              </div>
            </div>
          </div>
          {NPSParams && (
            <div className={styles.NPSMain}>
              <NPSLeft
                NPSleftParams={NPSParams}
                npsList={npsList}
                getCommentList={(pageNum, change) => {
                  this.getCommentList(pageNum, change);
                }}
              />
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default NPSEvaluate;
