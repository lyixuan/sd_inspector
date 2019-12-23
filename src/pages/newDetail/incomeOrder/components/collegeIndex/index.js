import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BISelect from '@/ant_components/BISelect';
import BIWrapperTable from '@/components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import { thousandsFormatBigger } from '@/utils/utils';

const allColumns = {
  college: { title: '学院', key: 'collegeName' },
  family: { title: '家族', key: 'familyName' },
  group: { title: '小组', key: 'groupName' },
  class: { title: '班主任', key: 'cpName' },
}
const { Option } = BISelect;
@connect(({ incomeOrderModal }) => ({
  incomeCollegeList: incomeOrderModal.incomeCollegeList,
  incomeDateRange: incomeOrderModal.incomeDateRange
}))
class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [], // 显示数据
      totalCount: 0,
      currentPage: 0, // 筛选条件
      pageSize: 10,
      collegeId: undefined
    };
  }
  componentDidMount() {
    this.getData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.incomeDateRange) !== JSON.stringify(this.props.incomeDateRange)) {
      this.getData(nextProps.incomeDateRange, 'date');
    }
  }

  getData = (val, type) => {
    const { collegeId, currentPage } = this.state;
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeDetailPage',
      payload: { params: { 
        rankType: this.props.rankType,
        collegeId,
        page: type === 'page' ? val : currentPage,
        ...getDateObj(type === 'date' ? val : this.props.incomeDateRange)
      } },
    }).then(res => {
      this.setState({
        dataSource: res.list,
        totalCount: res.total,
      })
    });
  }
  // 页数改变
  onChangeSize = (page) => {
    this.getData(page, 'page');
    this.setState({ currentPage: page })
  }
  columns = () => {
    const { rankType } = this.props;
    const columns = [
      {
        title: '排名',
        dataIndex: 'rankNum',
        key: 'rankNum',
      },
      {
        title: allColumns[rankType].title,
        dataIndex: allColumns[rankType].ley,
        key: allColumns[rankType].ley,
      },
      {
        title: '总流水',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
      },
      {
        title: '好推单量',
        dataIndex: 'goodPushOrder',
        key: 'goodPushOrder',
      },
      {
        title: '好推流水',
        dataIndex: 'htAmount',
        key: 'htAmount',
        render: (text, record) => this.getProText(text, record)
      },
      {
        title: '续报单量',
        dataIndex: 'xbCount',
        key: 'xbCount',
      },
      {
        title: '续报流水',
        dataIndex: 'xbAmount',
        key: 'xbAmount',
        render: (text, record) => this.getProText(text, record)
      },
      {
        title: '成本套单量',
        dataIndex: 'cbtCount',
        key: 'cbtCount',
      },
      {
        title: '成本套流水',
        dataIndex: 'cbtCount',
        key: 'cbtCount',
        render: (text, record) => this.getProText(text, record)
      },
    ];
    if (this.props.rankType !== 'class') {
      columns.push({
        title: '创收总流水',
        dataIndex: 'cbtAmount',
        key: 'cbtAmount',
        render: (text, record) => this.getProText(text, record)
      })
    }
    return columns || [];
  };
  // 进度条值
  getProText = (val, record) => {
    const percent = record.incomeTotalKpiRatio * 100 + '%';
    const money = thousandsFormatBigger(val);
    return <BIWrapperProgress text={money} percent={percent} />
  }
  
  render() {
    const { dataSource, pageSize, currentPage, totalCount, collegeId} = this.state;
    if (dataSource && dataSource.length > 6) {
      dataSource.splice(6);
    }
    return (
      <div className={styles.container}>
        <span>
          <BISelect style={{ width: 110, marginRight: 12 }} placeholder="选择组织" value={collegeId} onChange={val => this.onFormChange(val, 'collegeId')} allowClear>
            {this.props.incomeCollegeList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
        </span>
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
          rowKey={record => record.id}
          bordered={true}
        />
      </div>
    );
  }
}

export default Compare;
