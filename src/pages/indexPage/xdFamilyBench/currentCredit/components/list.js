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
        title: '运营长',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '排名系数',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '学分均分',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '正面均分',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '有效直播',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '有效重播',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '有效做题',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '社区运营',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '创收',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '负面均分',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '优新',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: 'IM',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        title: '质检',
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
        this.setState({ profitList: [{ id: 1, }, { id: 2 }] })
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
