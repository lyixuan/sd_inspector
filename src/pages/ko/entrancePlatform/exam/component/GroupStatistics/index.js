import React, { Component } from 'react';
import BITable from '@/ant_components/BITable';
import styles from '../style.less';
import { connect } from 'dva/index';
import { Skeleton, Table } from 'antd';
import BISelect from '@/ant_components/BISelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { getSubStringValue } from '../../../../utils/utils';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
  {
    title: '通知时间',
    dataIndex: 'pushDate',
    key: 'pushDate',
    width: 100,
    fixed: 'left',
  },
  {
    title: '用户群组名称',
    dataIndex: 'userGroupName',
    key: 'userGroupName',
    width: 120,
    fixed: 'left',
  },
  {
    title: '用户群组人数',
    dataIndex: 'stuCount',
    key: 'stuCount',
    width: 120,
    fixed: 'left',
  },
  {
    title: '通知类型',
    dataIndex: 'pushType',
    key: 'pushType',
    width: 100,
    fixed: 'left',
  },
  {
    title: '通知人数',
    dataIndex: 'totalPushCount',
    key: 'totalPushCount',
    width: 100,
    fixed: 'left',
  },
  {
    title: '已读人数',
    dataIndex: 'totalReadCount',
    key: 'totalReadCount',
    width: 140,
  },
  {
    title: '打开率',
    dataIndex: 'totalReadRatio',
    key: 'totalReadRatio',
    width: 140,
  },
  {
    title: '未读人数',
    dataIndex: 'totalNoReadCount',
    key: 'totalNoReadCount',
    width: 140,
  },
  {
    title: '微信',
    children: [
      {
        title: '送达人数',
        dataIndex: 'wechatPushCount',
        key: 'wechatPushCount',
        width: 200,
      },
      {
        title: '已读人数',
        dataIndex: 'wechatReadCount',
        key: 'wechatReadCount',
        width: 200,
      },
      {
        title: '打开率',
        dataIndex: 'wechatReadRatio',
        key: 'wechatReadRatio',
        width: 200,
      },
      {
        title: '未读人数',
        dataIndex: 'wechatNoReadCount',
        key: 'wechatNoReadCount',
        width: 200,
      },
    ],
  },
  {
    title: 'app',
    children: [
      {
        title: '送达人数',
        dataIndex: 'appPushCount',
        key: 'appPushCount',
        width: 200,
      },
      {
        title: '已读人数',
        dataIndex: 'appReadCount',
        key: 'appReadCount',
        width: 200,
      },
      {
        title: '打开率',
        dataIndex: 'appReadRatio',
        key: 'appReadRatio',
        width: 200,
      },
      {
        title: '未读人数',
        dataIndex: 'appNoReadCount',
        key: 'appNoReadCount',
        width: 200,
      },
    ],
  },
];
const slidingValue = addRecursion(columns);

// The table sliding value calculation
function addRecursion(arr) {
  let count = 0;
  arr.forEach(item => {
    if (item.children) {
      count = count + addRecursion(item.children)
    } else {
      if (!item.fixed) {
        count = count + item.width;
      }
    }

  });
  return count;
}

@connect(({ examPlatformModal, loading }) => ({
  dataStatisticsList: examPlatformModal.dataStatisticsList,
  pageSize: examPlatformModal.pageSize,
  statisticsCount: examPlatformModal.statisticsCount,
  exportTypeList: examPlatformModal.exportTypeList,
  userGroupConfig: examPlatformModal.userGroupConfig,
  configloading: loading.effects['examPlatformModal/getUserGroupList'],
  listloading: loading.effects['examPlatformModal/getDataStatistics'],
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPramas: {
        page: 1,
        pageSize: this.props.pageSize,
        type: 1
      },
      selectedList: [],
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'examPlatformModal/getUserGroupList',
    });
    this.handleSearch()
  }

  // user gruop request
  handleSearch() {
    this.props.dispatch({
      type: 'examPlatformModal/getDataStatistics',
      payload: { params: {...this.state.userPramas} }
    });
  }
  // time conversion
  formateDateTime = (dateTime = []) => {
    if (dateTime.length > 0) {
      return {beginDate: dateTime[0].format(dateFormat), endDate: dateTime[0].format(dateFormat)};
    } else {
      return {beginDate: undefined, endDate: undefined}
    }
  }
  onChangeDate = (dateTime) => {
    this.setState({
      userPramas: {...this.state.userPramas, ...this.formateDateTime(dateTime)},
      dateTime
    }, () => this.handleSearch())
  }
  onChangeGroup = (userGroupIdList) => {
    console.log(userGroupIdList)
    this.setState({
      userPramas: {...this.state.userPramas, userGroupIdList}
    }, () => this.handleSearch())
  }
  onChangeSize = (page) => {
    this.state.userPramas.page = page;
    this.handleSearch();
  }
  onChangeExport = (exportType) => {
    this.setState({
      exportType
    })
    if (exportType == 11 || exportType == 21) {
      const { userGroupIdList, beginDate, endDate} = this.state.userPramas;
      this.props.dispatch({
        type: 'examPlatformModal/exportExcelData',
        payload: { params: { queryCondition: { userGroupIdList, beginDate, endDate }, exportType } }
      });
    } else if (exportType == 12 || exportType == 22) {
      this.props.dispatch({
        type: 'examPlatformModal/exportExcelData',
        payload: { params: { exportType, selectedList: this.state.selectedList} }
      });
    }
  }
  onRowChange = (selectedList) => {
    this.setState({
      selectedList
    })
  }

  render() {
    const { userPramas, dateTime = [], exportType} = this.state;
    const { page } = userPramas;
    const {statisticsCount, pageSize, dataStatisticsList, exportTypeList, userGroupConfig, configloading, listloading} = this.props;
    return (
      <div className={styles.userGroup}>
        <div className={`${styles.formStyle} ${styles.formCotainer} ${styles.userGroupForm}`}>
          <Skeleton loading={configloading} active>
            <div className={styles.rowWrap}>
              <div className={`${styles.itemCls} ${styles.itemTips}`}>数据统计：</div>
              <div className={`${styles.itemCls} ${styles.itemDates}`}>
                <BIRangePicker placeholder={["通知起始时间", "通知截止时间"]}
                               format="YYYY-MM-DD"
                               onChange={this.onChangeDate}
                               value={dateTime}/>
              </div>
              <div className={`${styles.itemCls} ${styles.itemDates}`}>
                <BISelect mode="multiple" placeholder="选择用户群组" value={userPramas.userGroupIdList} onChange={this.onChangeGroup} allowClear>
                  {userGroupConfig.map(item => (
                    <Option title={item.name} key={item.id} id={item.id}>
                      {getSubStringValue(item.name, 6)}
                    </Option>
                  ))}
                </BISelect>
              </div>
              <div className={styles.itemCls}>
                <BISelect placeholder="导出数据" value={exportType} onChange={this.onChangeExport} allowClear>
                  {exportTypeList.map(item => (
                    <Option key={item.id} id={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </div>
              <div className={styles.updateDate}>数据更新时间：2019-01-08 01:03:21</div>
            </div>
          </Skeleton>
        </div>
        <div className={styles.tableWrap}>
          <Table
            dataSource={dataStatisticsList}
            columns={columns}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current: page,
              total: statisticsCount
            }}
            loading={listloading}
            scroll={{ x: slidingValue + 600}}
            bordered
            rowSelection={{
              onChange: this.onRowChange
            }}
            rowKey={record => record.id}
          />
        </div>
      </div>
    );
  }
}

export default Index;
