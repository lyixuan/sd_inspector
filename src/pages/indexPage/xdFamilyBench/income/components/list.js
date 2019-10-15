import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import SmallProgress from '@/pages/indexPage/components/smallProgress'
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
    super(props)
    this.state = {
      familyIncome: [],
    }
  }
  componentDidMount() {
    this.getData();
  }
  columns = () => {
    const { tabKey } = this.props;
    const widthVal = tabKey === '1' ? '8%' : '7%';
    const columns = [
      {
        width: '9%',
        title: '集团排名',
        dataIndex: 'ranking',
        key: 'ranking',
        render: (text, record) => <div className={styles.sort}>
          {text}/{record.classCount} <img src={rankImg[record.rankingFlag + 1]} />
        </div>
      }, {
        width: '9%',
        title: '小组',
        dataIndex: 'groupName',
        key: 'groupName',
      }, {
        width: '9%',
        title: '总绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
      }, {
        width: '9%',
        title: '好推绩效',
        dataIndex: 'goodpushKpi',
        key: 'goodpushKpi',
        className: styles.row1,
        render: text => <>{text}<SmallProgress isColor="green" percent={`${30}%`}></SmallProgress></>
      }, {
        width: widthVal,
        title: '好推单量',
        dataIndex: 'goodpushOrderCount',
        key: 'goodpushOrderCount',
        className: styles.row1,
      }, {
        width: '9%',
        title: '好推流水',
        dataIndex: 'goodpushFlow',
        key: 'goodpushFlow',
        className: styles.row1,
      }, {
        width: widthVal,
        title: '续报绩效',
        dataIndex: 'renewalKpi',
        key: 'renewalKpi',
        className: styles.row2,
        render: text => <>{text}<SmallProgress isColor="green" percent={`${30}%`}></SmallProgress></>
      }, {
        width: widthVal,
        title: '续报单量',
        dataIndex: 'renewalOrderCount',
        key: 'renewalOrderCount',
        className: styles.row2,
      }, {
        width: widthVal,
        title: '续报流水',
        dataIndex: 'renewalFlow',
        key: 'renewalFlow',
        className: styles.row2,
      }, {
        width: widthVal,
        title: '成本套绩效',
        dataIndex: 'examZbtKpi',
        key: 'examZbtKpi',
        className: styles.row3,
        render: text => <>{text}<SmallProgress isColor="green" percent={`${30}%`}></SmallProgress></>
      }, {
        width: widthVal,
        title: '成本套当量',
        dataIndex: 'examZbtOrderCount',
        key: 'examZbtOrderCount',
        className: styles.row3,
      }, {
        // width: tabKey === '1' ? '12%': '16%',
        title: '成本套流水',
        dataIndex: 'examZbtFlow',
        key: 'examZbtFlow',
        className: styles.row3,
      },
    ];
    if (this.props.tabKey === '2') {
      columns.splice(2, 0, {
        width: widthVal,
        title: '班主任',
        dataIndex: 'userName',
        key: 'userName',
      })
    }
    return columns || [];
  };
  getData = () => {
    if (this.props.tabKey === '1') { // 小组
      this.props.dispatch({
        type: 'xdWorkModal/getCurrentIncomeGroup',
        callback: familyIncome => this.setState({ familyIncome })
      });
    } else if (this.props.tabKey === '2') {
      this.props.dispatch({
        type: 'xdWorkModal/getCurrentIncomeClass',
        callback: familyIncome => this.setState({ familyIncome })
      });
    } 
  }

  render() {
    console.log(this.props.tabKey)
    return (
      <div className={styles.tableList}>
        <BITable
          columns={this.columns()}
          dataSource={this.state.familyIncome}
          pagination={false}
          loading={this.props.loading}
          rowKey={record => record.id}
          scroll={{ x: 'max-content', y: 400 }}
        />
      </div>

    );
  }
}

export default ProfitList;
