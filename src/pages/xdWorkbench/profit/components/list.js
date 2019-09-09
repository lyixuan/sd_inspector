import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import BITable from '@/ant_components/BITable'
import BISelect from '@/ant_components/BISelect'
import styles from '../style.less';

const { Option } = BISelect;
const pkTypeconfig = ['集团排行', '学院内排行', '家族内排行', '同期入职排行', '同级排行', ];
@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class profitList extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      pkListType: 5,
      profitList: [
        { sort: 123, userId: 1, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 2, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 3, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 4, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 5, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 6, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 7, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 8, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 9, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 10, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 11, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 12, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
      ]
    }
  }
  componentDidMount() {
    this.getData();
  }

  columns = () => {
    const columns = [
      {
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',
      }, {
        title: '组织',
        dataIndex: 'org',
        key: 'org',
      }, {
        title: '班主任',
        dataIndex: 'userName',
        key: 'userName',
      }, {
        title: '绩效收入',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
        render: text => <div
            style={{
              cursor: 'pointer',
              height: '24px'
            }}
          >
            <span style={{ position: 'relative', top: '-2px'}}>{10000}</span>
            <Progress
              percent={90}
              strokeColor={'#00CCC3'}
              showInfo={false}
              strokeWidth={4}
            ></Progress>
          </div>
      }
    ];
    return columns || [];
  };
  onClickRow = (record) => {
    return {
      onClick: () => this.props.changeSelected(record.userId)
    };
  }
  getRowClassName = (record) => {
    if (this.props.pkUser === record.userId) return styles.pkUser;
  }
  onChangeParams = (v) => {
    this.setState({ pkListType : v}, () => this.getData());
  }
  getData = () => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeKpiPkList',
      payload: { params: { pkListType: this.state.pkListType } },
      callback: (dataSource) => this.setState({ dataSource }),
    });
  }

  render() {
    console.log(this.props)
    const { pkListType, profitList } = this.state;
    return (
      <div className={styles.profitList}>
        <div className={styles.form}>
          选择对比小组：
          <BISelect
            value={pkListType}
            placeholder="请选择"
            onChange={this.onChangeParams}
            style={{width: '136px', marginLeft: '8px'}}
            allowClear 
          >
            {pkTypeconfig.map((item, index) => <Option key={index} value={index + 1}>{item}</Option>)}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          <BITable
            columns={this.columns()} 
            dataSource={profitList}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.userId} 
            onRow= {this.onClickRow}
            rowClassName={this.getRowClassName}
          />
        </div>
      </div>
      
    );
  }
}

export default profitList;
