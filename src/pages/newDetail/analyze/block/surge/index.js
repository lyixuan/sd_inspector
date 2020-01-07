import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect';
import styles from './styles.less';
import BIWrapperTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import up from '@/assets/up.png';
import down from '@/assets/down.png';
import flat from '@/assets/flat.png';
import float1 from '@/assets/up.png';
import float2 from '@/assets/down.png';
import float0 from '@/assets/flat.png';
import float3 from '@/assets/resubmit/float3.png';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import { companyThousandsIncome } from '@/utils/utils';
import { Tooltip } from 'antd';
const { Option } = BISelect;

const ranks = {
  1: rank1,
  2: rank2,
  3: rank3,
}
const floats = {
  0: float0,
  1: float1,
  2: float2,
  3: float3
}
@connect(({ analyzeModel }) => ({
  dateRange: analyzeModel.dateRange,
}))
class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dateRange) !== JSON.stringify(this.props.dateRange)) {
      this.getData(getDateObj(nextProps.dateRange));
    }
  }

  getData(dateObj) {
    const date = dateObj ? dateObj : getDateObj(this.props.dateRange);
    this.props
      .dispatch({
        type: 'newDetailModal/getRisePackageRankList',
        payload: {
          params: {
            beginDate: date.startTime,
            endDate: date.endTime,
          },
        },
      })
      .then(res => {
        this.setState({ dataSource: res });
      });
  }

  columns = () => {
    const columns = [
      {
        width: '60px',
        title: '排名',
        dataIndex: 'id',
        key: 'id',
        render: text => <div className={styles.rankColumn}>
          {text > 3 ? text : <img src={ranks[text]} alt=''/>}
        </div>
      },
      {
        width: '80px',
        title: '浮动指数',
        dataIndex: 'riseIndex',
        key: 'riseIndex',
        render: text => {
          const falg = text === 0 ? 0 : (!text ? 3 : (text > 0 ? 1 : 2));
          return (
            <div className={`${styles.markColumn} ${styles['markColumn' + falg]}`}>
              <img src={floats[falg]} alt=''/>
              { falg === 3 ? '' : <span>{Math.abs(text)} </span>}
            </div>
          )
        }
      },
      {
        ellipsis: true,
        title: '好推产品包',
        dataIndex: 'packageName',
        key: 'packageName',
        render: (packageName, record) => <Tooltip placement="topLeft" title={packageName}>{packageName}</Tooltip>
      },
      {
        title: '好推单量',
        dataIndex: 'incomeOrder',
        key: 'incomeOrder',
        align: 'center',
        width: '80px',
      },
      {
        title: '好推流水',
        dataIndex: 'incomeFlowKpi',
        key: 'incomeFlowKpi',
        width: '80px',
        render: (incomeFlowKpi, record) => {
          const percent = record.incomeFlowKpiRatio * 100 + '%';
          const money = companyThousandsIncome(incomeFlowKpi);
          return (
            // <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
                propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'right' }}
              />
            // </div>
          );
        },
      },
      {
        width: '86px',
        align: 'center',
        title: 'ARPU(元)',
        dataIndex: 'arpu',
        key: 'arpu',
        render: text => text.toFixed(1),
      }
    ];
    return columns || [];
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className={styles.topCon}>
        <div className={styles.title}>
          <span>好推飙升产品榜单</span>
        </div>
        <div className={styles.tableContainer}>
          <BIWrapperTable
            name={'tableWrap'}
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            // onRow={this.onClickRow}
            rowKey={(record, index) => index}
            // scroll={{ y: 288 }}
          />
        </div>
      </div>
    );
  }
}

export default Top;
