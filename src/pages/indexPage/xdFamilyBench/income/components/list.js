import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import normal from '@/assets/xdFamily/rankNormal.png';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
// import BIWrapperTable from '@/pages/indexPage/components/BIWrapperTable';
import { thousandsFormat } from '@/utils/utils';
import styles from './style.less';
import BILoading from '@/components/BILoading'

const rankImg = {
  0: down,
  1: normal,
  2: up,
}
const getPercentFn = (m, d) => {
  return (d ? m / d * 100 : 0) + '%';
}
@connect(({ loading }) => ({
  loading: loading.effects['xdFamilyModal/getCurrentIncomeClass'] || loading.effects['xdFamilyModal/getCurrentIncomeGroup'],
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      familyIncome: [],
      goodpushKpiMax: 0,
      renewalKpiMax: 0,
      examZbtKpiMax: 0
    }
  }
  componentDidMount() {
    this.getData();
  }
  columns = () => {
    const { goodpushKpiMax, renewalKpiMax, examZbtKpiMax } = this.state;
    const widthVal = this.props.tabKey === '2' ? '7%' : '8%'
    const columns = [
      {
        width: this.props.tabKey === '2' ? '8%' : '10%',
        title: '集团排名',
        dataIndex: 'ranking',
        key: 'ranking',
        render: (text, record) => <div className={styles.sort}>
          {text}/{record.classCount} <img src={rankImg[record.rankingFlag + 1]} alt=""/>
        </div>
      }, {
        width: '8%',
        title: '家族/小组',
        dataIndex: 'groupName',
        key: 'groupName',
      }, {
        width: '7%',
        title: '总流水',
        dataIndex: 'kpiFlow',
        key: 'kpiFlow',
        render: text => thousandsFormat(parseInt(text))
      }, {
        width: '8%',
        title: '好推绩效',
        dataIndex: 'goodpushKpi',
        key: 'goodpushKpi',
        className: styles.row1,
        render: text => <BIWrapperProgress style={{marginLeft: '-8px'}} text={thousandsFormat(parseInt(text))} isColor="green" percent={getPercentFn(text, goodpushKpiMax)}/>
      }, {
        width: widthVal,
        title: '好推单量',
        dataIndex: 'goodpushOrderCount',
        key: 'goodpushOrderCount',
        className: styles.row1,
      }, {
        width: widthVal,
        title: '好推流水',
        dataIndex: 'goodpushFlow',
        key: 'goodpushFlow',
        className: styles.row1,
        render: (text, record) => thousandsFormat(parseInt(text))
      }, {
        width: '8%',
        title: '续报绩效',
        dataIndex: 'renewalKpi',
        key: 'renewalKpi',
        className: styles.row2,
        render: text => <BIWrapperProgress style={{marginLeft: '-8px'}} text={thousandsFormat(parseInt(text))} isColor="green" percent={getPercentFn(text, renewalKpiMax)}/>
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
        render: (text, record) => {
          return <span>{thousandsFormat(parseInt(text))}</span>
        }
      }, {
        width: '8%',
        title: '成本套绩效',
        dataIndex: 'examZbtKpi',
        key: 'examZbtKpi',
        className: styles.row3,
        render: text =>  <BIWrapperProgress style={{marginLeft: '-8px'}} text={thousandsFormat(parseInt(text))} isColor="green" percent={getPercentFn(text, examZbtKpiMax)}/>
      }, {
        width: '8%',
        title: '成本套单量',
        dataIndex: 'examZbtOrderCount',
        key: 'examZbtOrderCount',
        className: styles.row3,
      }, {
        width: '8%',
        title: '成本套流水',
        dataIndex: 'examZbtFlow',
        key: 'examZbtFlow',
        className: styles.row3,
        render: (text, record) => {
          return <span>{thousandsFormat(parseInt(text))}</span>
        }
      }, {
        title: '',
        dataIndex: 'empty',
        key: 'empty',
        className: styles.row3,
      }
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
        type: 'xdFamilyModal/getCurrentIncomeGroup',
        callback: familyIncome => this.dispatchCallback(familyIncome)
      });
    } else if (this.props.tabKey === '2') {
      this.props.dispatch({
        type: 'xdFamilyModal/getCurrentIncomeClass',
        callback: familyIncome => this.dispatchCallback(familyIncome)
      });
    }
  }
  dispatchCallback = familyIncome => {
    this.setState({
      familyIncome,
      goodpushKpiMax: Math.max.apply(Math, familyIncome.map(item => item.goodpushKpi)),
      renewalKpiMax: Math.max.apply(Math, familyIncome.map(item => item.renewalKpi)),
      examZbtKpiMax: Math.max.apply(Math, familyIncome.map(item => item.examZbtKpi)),
    })
  }
  render() {
    return (
      <BILoading isLoading={this.props.loading}>
        <div className={`${styles.tableList} ${this.props.tabKey === '2' ? styles.tableOther : ''}`}>
          <BITable
            columns={this.columns()}
            dataSource={this.state.familyIncome}
            pagination={false}
            // loading={this.props.loading}
            rowKey={record => record.userId}
            // scroll={{ x: 'max-content', y: 400 }}
            // bordered={true}
          />
        </div>
      </BILoading>
    );
  }
}

export default ProfitList;
