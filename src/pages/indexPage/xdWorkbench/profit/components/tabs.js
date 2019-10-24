import React from 'react';
import { connect } from 'dva';
import BIWrapperTable from '../../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import gradeA from '@/assets/workBench/a.png';
import gradeB from '@/assets/workBench/b.png';
import gradeC from '@/assets/workBench/c.png';
import gradeS from '@/assets/workBench/s.png';
import { thousandsFormat } from '@/utils/utils';
import styles from '../style.less';
import BIIcon from '@/components/BIIcon';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';

const thousandsFormatAll = (n) => {
  return thousandsFormat(parseInt(n));
}
const gradeImg = { // 等级
  A: gradeA,
  B: gradeB,
  C: gradeC,
  S: gradeS,
  1: rank1, 
  2: rank2, 
  3: rank3,
}
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getContrastIncomeKpiPkList'],
}))
class ProfitTbas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profitData: {
        pkList: [],
        maxValue: {}
      },
    }
  }
  componentDidMount() {
    this.getPkList();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pkUsers !== this.props.pkUsers) {
      this.getPkList(nextProps.pkUsers);
    }
  }

  // 对比列表
  getPkList = (pkUsers = this.props.pkUsers) => {
    this.props.dispatch({
      type: 'xdWorkModal/getContrastIncomeKpiPkList',
      payload: { params: { pkUsers } },
      callback: (profitData) => {
        if (profitData) this.setState({ profitData })
      },
    });
  }
  columns = () => {
    const { maxValue } = this.state.profitData;
    const columns = [ {
        title: 'PK 对象',
        dataIndex: 'personId',
        key: 'personId',
        render: (text, record, index) => {
          return (
            <>
              <div className={styles.pkMsg}>
                <img src={gradeImg[record.personGrade]} alt=''/>
                <span>
                  {record.personName}
                  <span style={{color: '#56595E', fontWeight: 'normal'}}>{record.orgName}</span>
                </span>
              </div>
              {index !== 0 ? <BIIcon onClick={() => this.props.changeSelected(text)}/> : ''}
            </>
          )
        }
      }, {
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',
        render: text => <BITextAlign textalign='center'>{text > 3 ? text : <img src={gradeImg[text]} alt='' style={{ width: '20px'}}/>}</BITextAlign>
      }, {
        title: '创收绩效',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.totalKpi)} style={{marginLeft: '-8px'}}/>
      }, {
        title: '创收绩效流水',
        dataIndex: 'totalFinanceNetFlow',
        key: 'totalFinanceNetFlow',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.totalFinanceNetFlow)} style={{marginLeft: '-8px'}}/>
      }, {
        title: '创收总单量',
        dataIndex: 'totalOrderCount',
        key: 'totalOrderCount',
        render: text => <BITextAlign>{text}</BITextAlign>
      }, {
        className: styles.rowBg2,
        title: '好推绩效',
        dataIndex: 'goodpushKpi',
        key: 'goodpushKpi',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushKpi)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg2,
        title: '好推绩效流水',
        dataIndex: 'goodpushFinanceNetFlow',
        key: 'goodpushFinanceNetFlow',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushFinanceNetFlow)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg2,
        title: '好推绩效均值',
        dataIndex: 'goodpushValueAvg',
        key: 'goodpushValueAvg',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushValueAvg)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg2,
        title: '好推单量',
        dataIndex: 'goodpushOrderCount',
        key: 'goodpushOrderCount',
        render: text => <BITextAlign>{text}</BITextAlign>
      }, {
        className: styles.rowBg3,
        title: '续报绩效',
        dataIndex: 'renewalKpi',
        key: 'renewalKpi',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.renewalKpi)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg3,
        title: '续报绩效流水',
        dataIndex: 'renewalFinanceNetFlow',
        key: 'renewalFinanceNetFlow',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.renewalFinanceNetFlow)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg3,
        title: '续报单量',
        dataIndex: 'renewalOrderCount',
        key: 'renewalOrderCount',
        render: text => <BITextAlign>{text}</BITextAlign>
      }, {
        className: styles.rowBg4,
        title: '成考绩效',
        dataIndex: 'examZbtKpi',
        key: 'examZbtKpi',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.examZbtKpi)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg4,
        title: '成考绩效流水',
        dataIndex: 'examZbtFinanceNetFlow',
        key: 'examZbtFinanceNetFlow',
        render: text => <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.examZbtFinanceNetFlow)} style={{marginLeft: '-8px'}}/>
      }, {
        className: styles.rowBg4,
        title: '成考单量',
        dataIndex: 'examZbtOrderCount',
        key: 'examZbtOrderCount',
        render: text => <BITextAlign>{text}</BITextAlign>
      }
    ];
    return columns || [];
  };
  getPercent = (n, t) => {
    return (n/t)*100 + '%'
  }
  render() {
    const { profitData } = this.state;
    return (
      <div className={styles.profitTabs}>
        <BIWrapperTable
          columns={this.columns()}
          dataSource={profitData.pkList}
          pagination={false}
          loading={this.props.loading}
          rowKey={(record, index) => record.userId + '' + index}
          onRow={this.onClickRow}
          rowClassName={this.getRowClassName}
          bordered={true}
        />
      </div>
    );
  }
}

export default ProfitTbas;
