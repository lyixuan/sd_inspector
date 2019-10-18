import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import Proportion from '../../../components/proportion';
import BIRadio from '@/ant_components/BIRadio';
import gradeA from '@/assets/workBench/a.png';
import gradeB from '@/assets/workBench/b.png';
import gradeC from '@/assets/workBench/c.png';
import gradeS from '@/assets/workBench/s.png';
import xdGif from '@/assets/workBench/xdpk.gif';
import pkImg from '@/assets/xdwork/pk.png';
import { thousandsFormat } from '@/utils/utils';
import BILoading from '@/components/BILoading'
import styles from '../style.less';
import BITable from '@/ant_components/BITable';
import SmallProgress from '@/pages/indexPage/components/smallProgress';
import BIFillCell from '@/components/BIFillCell';


const thousandsFormatAll = (n, u) => {
  if (n !== null) {
    if (u === '%') {
      return (n * 100).toFixed(2) + u
    } else {
      return thousandsFormat(n) + '' + u
    }
  } else {
    return ' '
  }
}
const pkTypeObj = ['综合对比', '好推绩效', '续报绩效', '成考专本套'];
const pkTypeTrace = [
  '{"widgetName":"本期创收-综合对比","traceName":"小德工作台/本期创收/综合对比"}',
  '{"widgetName":"本期创收-好推绩效","traceName":"小德工作台/本期创收/好推绩效"}',
  '{"widgetName":"本期创收-续报绩效","traceName":"小德工作台/本期创收/续报绩效"}',
  '{"widgetName":"本期创收-成考专本套","traceName":"小德工作台/本期创收/成考专本套"}',
];
const gradeImg = { // 等级
  A: gradeA,
  B: gradeB,
  C: gradeC,
  S: gradeS,
}
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPersonInfo'] || loading.effects['xdWorkModal/getContrastIncomeKpiPkList'],
}))
class ProfitTbas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pkType: 1,
      profitData: {
        colNames: ['创收绩效', '排名', '绩效流水'],
        data: [{
          name: '邓静雷',
          rowMsg: [3000, 6, 900000],
          org: '邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟'
        }]
      },
    }
  }
  componentDidMount() {
    this.getPkmsg();
    this.getPkList();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pkUser !== this.props.pkUser) {
      this.getPkmsg(nextProps.pkUser);
      this.getPkList(nextProps.pkUser);
    }
  }

  handlePkTypeChange = (e) => {
    this.setState({
      pkType: e.target.value
    }, () => this.getPkList());
  }
  // pk信息
  getPkmsg = (pkUser = this.props.pkUser) => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeKpiPersonInfo',
      payload: { params: { pkUser } },
      callback: (profitPersonData) => {
        if (profitPersonData) this.setState({ profitPersonData })
      },
    });
  }
  // 对比列表
  getPkList = (pkUser = this.props.pkUser) => {
    this.props.dispatch({
      type: 'xdWorkModal/getContrastIncomeKpiPkList',
      payload: {
        params: {
          pkUser,
          tabType: this.state.pkType,
          pkListType: this.props.pkListType,
        }
      },
      // callback: (profitData) => {
      //   if (profitData) this.setState({ profitData })
      // },
    });
  }
  getSizeStyle = ({ selfValue, pkUserValue }, index) => {
    if (!this.props.pkUser) return ''
    if (index === 0) {
      if (selfValue < pkUserValue) {
        return '#00CCC3';
      } else if (selfValue > pkUserValue) {
        return '#FF626A';
      }
    }
    if (selfValue > pkUserValue) {
      return '#00CCC3';
    } else if (selfValue < pkUserValue) {
      return '#FF626A';
    }
    return '';
  }
  columns = () => {
    const { profitData } = this.state;
    const columns = [ {
        width: '50%',
        title: 'PK 对象',
        dataIndex: 'org',
        key: 'org',
        render: text => <div data-trace='{"widgetName":"本期创收-创收pk","traceName":"小德工作台/本期创收/创收pk"}'>{text}</div>
      }
    ];
    profitData.colNames.map((item, index) => {
      columns.push({
        title: item,
        dataIndex: item,
        key: item,
        render: (text, record) => {
          return ( 
            <BIFillCell className={styles.fillCell}>
              <span>{thousandsFormat(record.rowMsg[index])}</span>
              <SmallProgress isColor="green" percent={'30%'} style={{width: '100%', marginTop: '10px'}}></SmallProgress>
            </BIFillCell>
          )
        }
      })
    })
    return columns || [];
  };

  render() {
    const { profitData } = this.state;
    const { pkUser } = this.props;
    return (
      <div className={styles.profitTabs}>
        <BIRadio onChange={this.handlePkTypeChange} value={this.state.pkType} style={{ marginBottom: 16 }}>
          {pkTypeObj.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div data-trace={pkTypeTrace[index]}>{item}</div></BIRadio.Radio.Button>)}
        </BIRadio>
        <BITable
          columns={this.columns()}
          dataSource={profitData.data}
          pagination={false}
          loading={this.props.loading}
          rowKey={(record, index) => record.userId + '' + index}
          onRow={this.onClickRow}
          rowClassName={this.getRowClassName}
          // scroll={{ y: 420 }}
          bordered={true}
        />

      </div>
    );
  }
}

export default ProfitTbas;
