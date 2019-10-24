import React from 'react';
import { connect } from 'dva';
import BIWrapperTable from '../../../components/BIWrapperTable'
import BIRadio from '@/ant_components/BIRadio';
import gradeA from '@/assets/workBench/a.png';
import gradeB from '@/assets/workBench/b.png';
import gradeC from '@/assets/workBench/c.png';
import gradeS from '@/assets/workBench/s.png';
import pkImg from '@/assets/xdwork/pk.png';
import { thousandsFormat } from '@/utils/utils';
import BILoading from '@/components/BILoading'
import styles from '../style.less';
import BIIcon from '@/components/BIIcon';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';


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
// const pkTypeObj = ['综合对比', '好推绩效', '续报绩效', '成考专本套'];
// const pkTypeTrace = [
//   '{"widgetName":"本期创收-综合对比","traceName":"小德工作台/本期创收/综合对比"}',
//   '{"widgetName":"本期创收-好推绩效","traceName":"小德工作台/本期创收/好推绩效"}',
//   '{"widgetName":"本期创收-续报绩效","traceName":"小德工作台/本期创收/续报绩效"}',
//   '{"widgetName":"本期创收-成考专本套","traceName":"小德工作台/本期创收/成考专本套"}',
// ];
const gradeImg = { // 等级
  A: gradeA,
  B: gradeB,
  C: gradeC,
  S: gradeS,
}
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getContrastIncomeKpiPkList'],
}))
class ProfitTbas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pkType: 1,
      profitData: {
        colNames: ['创收绩效', '排名', '绩效流水'],
        data: [{
          userId: 1744,
          name: '邓静雷',
          rowMsg: [3000, 6, 900000],
          org: '邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟'
        }, {
          userId: 1627,
          name: '邓静雷',
          rowMsg: [3000, 6, 900000],
          org: '邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟邓嘟嘟'
        }]
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

  // handlePkTypeChange = (e) => {
  //   this.setState({
  //     pkType: e.target.value
  //   }, () => this.getPkList());
  // }
  // 对比列表
  getPkList = (pkUsers = this.props.pkUsers) => {
    this.props.dispatch({
      type: 'xdWorkModal/getContrastIncomeKpiPkList',
      payload: {
        params: {
          pkUsers,
          // tabType: this.state.pkType,
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
        render: (text, record) => {
          return (
            <>
              <div className={styles.pkMsg}>
                <img src={pkImg} alt=''/>
                <span>
                  李三
                  <span style={{color: '#56595E', fontWeight: 'normal'}}>自变量学院</span>
                </span>
              </div>
              <BIIcon onClick={() => this.props.changeSelected(record.userId)}/>
            </>
          )
        }
      }
    ];
    profitData.colNames.map((item, index) => {
      columns.push({
        title: item,
        dataIndex: item,
        key: item,
        render: (text, record) => {
          return ( 
            <BIWrapperProgress text={thousandsFormat(record.rowMsg[index])} isColor="green" percent={'30%'} style={{marginLeft: '-8px'}}/>
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
        {/* <BIRadio onChange={this.handlePkTypeChange} value={this.state.pkType} style={{ marginBottom: 16 }}>
          {pkTypeObj.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div data-trace={pkTypeTrace[index]}>{item}</div></BIRadio.Radio.Button>)}
        </BIRadio> */}
        <BIWrapperTable
          columns={this.columns()}
          dataSource={profitData.data}
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
