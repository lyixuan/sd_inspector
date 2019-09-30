import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import styles from './style.less';

const rankImg = {
  0: down,
  1: normal,
  2: up,
}
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getCurrentIncomeClass'] || loading.effects['xdWorkModal/getCurrentIncomeGroup'],
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomeList: [],
    }
  }
  componentDidMount() {
    this.getData();
  }
  columns = () => {
    const columns = [
      {
        title: '集团排名',
        dataIndex: 'ranking',
        key: 'ranking',
        render: (text, record) => <div className={styles.sort}>
        {text} <img className={styles.sortImg} src={rankImg[record.rankingFlag]} />
      </div>
      }, {
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
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
        dataIndex: 'goodpushKpi',
        key: 'goodpushKpi',
        className: styles.row1,
      }, {
        title: '好推单量',
        dataIndex: 'goodpushOrderCount',
        key: 'goodpushOrderCount',
        className: styles.row1,
      }, {
        title: '好推流水',
        dataIndex: 'goodpushFlow',
        key: 'goodpushFlow',
        className: styles.row1,
      }, {
        title: '续报绩效',
        dataIndex: 'renewalKpi',
        key: 'renewalKpi',
        className: styles.row2,
      }, {
        title: '续报单量',
        dataIndex: 'renewalOrderCount',
        key: 'renewalOrderCount',
        className: styles.row2,
      }, {
        title: '续报流水',
        dataIndex: 'renewalFlow',
        key: 'renewalFlow',
        className: styles.row2,
      }, {
        title: '成本套绩效',
        dataIndex: 'examZbtKpi',
        key: 'examZbtKpi',
        className: styles.row3,
      }, {
        title: '成本套当量',
        dataIndex: 'examZbtOrderCount',
        key: 'examZbtOrderCount',
        className: styles.row3,
      }, {
        title: '成本套流水',
        dataIndex: 'examZbtFlow',
        key: 'examZbtFlow',
        className: styles.row3,
      }
    ];
    return columns || [];
  };
  getData = () => {
    if (this.props.tabKey) { // 班主任
      this.props.dispatch({
        type: 'xdWorkModal/getCurrentIncomeClass',
        payload: { params: { id: 1446 } },
        callback: (incomeList) => {
          this.setState({ incomeList: [{id: 1, incomeKpi: 1233}, {id: 2, incomeKpi: 484884}] })
        },
      });
    } else {
      this.props.dispatch({
        type: 'xdWorkModal/getCurrentIncomeGroup',
        payload: { params: { id: 1446 } },
        callback: (incomeList) => {
          this.setState({ incomeList: [{id: 1, incomeKpi: 1233}, {id: 2, incomeKpi: 484884}] })
        },
      });
    }
    
  }

  render() {
    const { incomeList = [] } = this.state;
    return (
      <div className={styles.tableList}>
        <BITable
          columns={this.columns()}
          dataSource={incomeList}
          pagination={false}
          loading={this.props.loading}
          rowKey={record => record.id}
          smalled
        />
      </div>

    );
  }
}

export default ProfitList;
