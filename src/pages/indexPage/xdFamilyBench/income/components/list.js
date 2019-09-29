import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less';

@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profitList: [],
    }
  }
  componentDidMount() {
    this.getData();
  }
  columns = () => {
    const columns = [
      {
        title: '集团排名',
        dataIndex: 'sort',
        key: 'sort',
      }, {
        title: '小组',
        dataIndex: 'org',
        key: 'org',
      }, {
        title: this.props.tabKey === '1' ? '运营长' : '班主任',
        dataIndex: 'userName',
        key: 'userName',
      }, {
        title: '总绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '好推绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '好推单量',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '好推流水',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '续报绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '续报单量',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '续报流水',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '成本套绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '成本套当量',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '成本套流水',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }
    ];
    return columns || [];
  };
  getData = () => {
    this.props.dispatch({
      type: 'xdWorkModal/getCountCurrentQuality',
      payload: { params: { id: 1446 } },
      callback: (profitList) => {
        this.setState({ profitList: [{id: 1,}, {id: 2}] })
      },
    });
  }

  render() {
    const { profitList = [] } = this.state;
    return (
      <div className={styles.tableList}>
        <BITable
              columns={this.columns()}
              dataSource={profitList}
              pagination={false}
              loading={this.props.loading}
              rowKey={record => record.id}
              scroll={{ x: 0, y: 420 }}
            />
      </div>

    );
  }
}

export default ProfitList;
