import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BISelect from '@/ant_components/BISelect';
import BIWrapperTable from '@/components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import { companyThousandsIncome, handleDataTrace } from '@/utils/utils';

const allColumns = {
  college: { title: '学院', key: 'collegeName' },
  family: { title: '家族', key: 'familyName' },
  group: { title: '小组', key: 'groupName' },
  class: { title: '班主任', key: 'cpName' },
}
const { Option } = BISelect;
@connect(({ newDetailModal, incomeOrderModal, loading }) => ({
  globalUserInfo: newDetailModal.globalUserInfo,
  incomeCollegeList: incomeOrderModal.incomeCollegeList,
  incomeDateRange: incomeOrderModal.incomeDateRange,
  loading: loading.effects['incomeOrderModal/getIncomeDetailPage']
}))
class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourceTotal: {},
      dataSource: [], // 显示数据
      totalCount: 0,
      currentPage: 1, // 筛选条件
      pageSize: 10,
      collegeId: this.getInitCollegeId()
    };
  }
  componentDidMount() {
    this.getData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.incomeDateRange) !== JSON.stringify(this.props.incomeDateRange)) {
      this.getData({ page: 1, ...getDateObj(nextProps.incomeDateRange) });
    }
  }
  getInitCollegeId = () => {
    const { globalUserInfo } = this.props;
    if (typeof globalUserInfo.collegeId === 'number' && this.props.rankType !== 'college') {
      return globalUserInfo.collegeId
    } else {
      return undefined;
    }
  }
  getData = (others) => {
    const { collegeId, currentPage, pageSize } = this.state;
    const initParams = {
      rankType: this.props.rankType,
      collegeId,
      pageSize,
      page: currentPage,
      ...getDateObj(this.props.incomeDateRange),
    }
    const params = others ? {...initParams, ...others} : initParams;
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeDetailPage',
      payload: { params },
    }).then(res => {
      const list = res.list;
      const dataSourceTotal = {};
      dataSourceTotal.totalAmountTotal = Math.max.apply(null, list.map(item => item.totalAmount));
      dataSourceTotal.htAmountTotal = Math.max.apply(null, list.map(item => item.htAmount));
      dataSourceTotal.xbAmountTotal = Math.max.apply(null, list.map(item => item.xbAmount));
      dataSourceTotal.cbtAmountTotal = Math.max.apply(null, list.map(item => item.cbtAmount));
      this.setState({
        dataSource: list,
        totalCount: res.total,
        dataSourceTotal,
        currentPage: params.page
      })
    });
  }
  // 页数改变
  onChangeSize = (page) => {
    this.getData({ page });
  }
  // 学院改变
  onChangeCollege = (collegeId) => {
    this.setState({ collegeId }, () => this.getData({ page: 1 }));
    handleDataTrace({"widgetName": '创收_组织筛选',"traceName": '2.1/创收_组织筛选'})
  }
  columns = () => {
    const { rankType } = this.props;
    const item = allColumns[rankType];
    const columns = [
      {
        title: '排名',
        dataIndex: 'rankNum',
        key: 'rankNum',
      },
      {
        width: '10%',
        title: '原产品包',
        dataIndex: 'packageName',
        key: 'packageName',
      },
      {
        title: '续报单量',
        dataIndex: 'itemCount',
        key: 'itemCount',
      },
      {
        width: '10%',
        title: '续报流水',
        dataIndex: 'htAmount',
        key: 'htAmount',
      },
    ];
    return columns || [];
  };
  // 进度条值
  getProText = (val, record) => {
    const percent = record[val]/this.state.dataSourceTotal[val + 'Total'] * 100 + '%';
    const money = companyThousandsIncome(record[val]);
    return <BIWrapperProgress text={money} percent={percent} />
  }
  setRowClassName = (record) => {
    if (record.selfGroup) {
      return styles.rowLight;
    }
  };

  render() {
    const { dataSource, pageSize, currentPage, totalCount, collegeId} = this.state;
    return (
      <div className={styles.container}>
        {this.props.rankType !== 'college' && <span className={styles.select}>
          <BISelect style={{ width: 130 }} placeholder="选择组织" value={collegeId} onChange={this.onChangeCollege} allowClear>
            {this.props.incomeCollegeList.map(item => <Option key={item.collegeId} value={item.collegeId} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.collegeName}
            </Option>)}
          </BISelect>
        </span>}
        <BIWrapperTable
          className={styles.table}
          columns={this.columns()}
          dataSource={dataSource}
          pagination={{
            onChange: this.onChangeSize,
            defaultPageSize: pageSize,
            current: currentPage,
            total: totalCount,
            hideOnSinglePage: true,
            showQuickJumper: true,
          }}
          loading={this.props.loading}
          onRow={this.onClickRow}
          rowKey={(record, index) => record.collegeId + '' + index}
          rowClassName={this.setRowClassName}
          // bordered={true}
        />
      </div>
    );
  }
}

export default Compare;
