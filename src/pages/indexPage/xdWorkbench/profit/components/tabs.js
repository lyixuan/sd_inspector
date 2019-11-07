import React from 'react';
import { connect } from 'dva';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BIWrapperTable from '../../../components/BIWrapperTable';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIIcon from '@/components/BIIcon';
import BILoading from '@/components/BILoading';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import gradeA from '@/assets/workBench/a.png';
import gradeB from '@/assets/workBench/b.png';
import gradeC from '@/assets/workBench/c.png';
import gradeS from '@/assets/workBench/s.png';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import { thousandsFormat } from '@/utils/utils';
import styles from '../style.less';

const { BI = {} } = window;
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
  loading: loading.effects['xdClsssModal/getContrastIncomeKpiPkList'],
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
      type: 'xdClsssModal/getContrastIncomeKpiPkList',
      payload: { params: { pkUsers } },
      callback: (profitData) => {
        if (profitData) this.setState({ profitData })
      },
    });
  }
  columns = () => {
    const { maxValue } = this.state.profitData;
    const columns = [{
      width: 300,
      fixed: 'left',
      title: 'PK 对象',
      dataIndex: 'personId',
      key: 'personId',
      render: (text, record, index) => {
        return (
          <>
            {
              record.isNot ? <div className={styles.pluscircle} onClick={this.handleToggle}><img src={pluscircle} alt='icon' />添加PK对象</div> : <><div className={styles.pkMsg}>
                <img src={gradeImg[record.personGrade]} alt='' />
                <span>
                  {record.personName}
                  <span style={{ color: '#56595E', fontWeight: 'normal' }}>{record.orgName}</span>
                </span>
              </div>
                {index !== 0 ? <BIIcon onClick={() => this.props.changeSelected(text)} /> : ''}</>
            }
          </>
        )
      }
    }, {
      width: 140,
      title: '排名',
      dataIndex: 'sort',
      key: 'sort',
      render: (text, record) => this.getColumn(record, <BITextAlign textalign='center'>{text > 3 ? text : <img src={gradeImg[text]} alt='' style={{ width: '20px' }} />}</BITextAlign>)
    }, {
      width: 140,
      title: '创收绩效',
      dataIndex: 'totalKpi',
      key: 'totalKpi',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.totalKpi)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      title: '创收绩效流水',
      dataIndex: 'totalFinanceNetFlow',
      key: 'totalFinanceNetFlow',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.totalFinanceNetFlow)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      title: '创收总单量',
      dataIndex: 'totalOrderCount',
      key: 'totalOrderCount',
      render: (text, record) => this.getColumn(record, <BITextAlign>{text}</BITextAlign>)
    }, {
      width: 140,
      className: styles.rowBg2,
      title: '好推绩效',
      dataIndex: 'goodpushKpi',
      key: 'goodpushKpi',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushKpi)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg2,
      title: '好推绩效流水',
      dataIndex: 'goodpushFinanceNetFlow',
      key: 'goodpushFinanceNetFlow',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushFinanceNetFlow)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg2,
      title: '好推系数均值',
      dataIndex: 'goodpushValueAvg',
      key: 'goodpushValueAvg',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={text} isColor="green" percent={this.getPercent(text, maxValue.goodpushValueAvg)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg2,
      title: '好推单量',
      dataIndex: 'goodpushOrderCount',
      key: 'goodpushOrderCount',
      render: (text, record) => this.getColumn(record, <BITextAlign>{text}</BITextAlign>)
    }, {
      width: 140,
      className: styles.rowBg3,
      title: '续报绩效',
      dataIndex: 'renewalKpi',
      key: 'renewalKpi',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.renewalKpi)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg3,
      title: '续报绩效流水',
      dataIndex: 'renewalFinanceNetFlow',
      key: 'renewalFinanceNetFlow',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.renewalFinanceNetFlow)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg3,
      title: '续报单量',
      dataIndex: 'renewalOrderCount',
      key: 'renewalOrderCount',
      render: (text, record) => this.getColumn(record, <BITextAlign>{text}</BITextAlign>)
    }, {
      width: 140,
      className: styles.rowBg4,
      title: '成考绩效',
      dataIndex: 'examZbtKpi',
      key: 'examZbtKpi',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.examZbtKpi)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg4,
      title: '成考绩效流水',
      dataIndex: 'examZbtFinanceNetFlow',
      key: 'examZbtFinanceNetFlow',
      render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.examZbtFinanceNetFlow)} style={{ marginLeft: '-8px', marginTop: '10px' }} />)
    }, {
      width: 140,
      className: styles.rowBg4,
      title: '成考单量',
      dataIndex: 'examZbtOrderCount',
      key: 'examZbtOrderCount',
      render: (text, record) => this.getColumn(record, <BITextAlign>{text}</BITextAlign>)
    },
    ];
    return columns || [];
  };
  handleToggle = () => {
    BI.traceV && BI.traceV({ "widgetName": "本期创收-添加pk对象", "traceName": "本期创收-添加pk对象" });
    this.props.toggleDrawer(true);
  }
  getColumn = (r, v) => {
    if (r.isNot) {
      return ''
    } else {
      return v;
    }
  }
  getPercent = (n, t, title) => {
    if (t && n) {
      return (n / t) * 100 + '%'
    } else {
      return 0
    }
  }
  // 列表渲染数据
  getDataSource = () => {
    const { profitData } = this.state;
    if (profitData.pkList && profitData.pkList.length) {
      const pkList = [...profitData.pkList];
      const l = pkList.length;
      for (var i = l; i < 6; i++) {
        pkList.push({ isNot: true, userId: new Date().getTime() })
      }
      return pkList;
    } else {
      return []
    }
  }
  render() {
    const { pkUsers } = this.props;
    return (
      <BILoading isLoading={this.props.loading}>
        <div className={styles.profitTabs}>
          <BIWrapperTable
            name='incomes'
            columns={this.columns()}
            dataSource={this.getDataSource()}
            pagination={false}
            // loading={this.props.loading}
            rowKey={(record, index) => record.userId + '' + index}
            onRow={this.onClickRow}
            rowClassName={this.getRowClassName}
            bordered={true}
            scroll={{ x: 2260 }}
          />
          {
            pkUsers && pkUsers.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt='' /></div>
          }
        </div>
      </BILoading>
    );
  }
}

export default ProfitTbas;
