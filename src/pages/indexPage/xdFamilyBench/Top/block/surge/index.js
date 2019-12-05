import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect';
import styles from './styles.less';
import BIWrapperTable from '../../../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import up from '@/assets/up.png';
import down from '@/assets/down.png';
import flat from '@/assets/flat.png';
import moment from 'moment';
import { thousandsFormatBigger } from '@/utils/utils';
import { Tooltip } from 'antd';
const { Option } = BISelect;

@connect(xdFamilyModal => ({
  xdFamilyModal,
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

  getData() {
    this.props
      .dispatch({
        type: 'xdFamilyModal/getRisePackageRankList',
      })
      .then(res => {
        this.setState({ dataSource: res });
      });
  }

  columns = () => {
    const columns = [
      {
        title: '排名',
        dataIndex: 'id',
        key: 'id',
        width: '100px',
        render: (text, record) => {
          let className = '';
          let rank = 1;
          if (record.id == 1) {
            rank = rank1;
          } else if (record.id == 2) {
            rank = rank2;
          } else if (record.id == 3) {
            rank = rank3;
          }
          return (
            <div className={`${styles.rankColumn} ${styles[className]}`}>
              {record.id > 3 ? (
                <div className={styles.rankSpan}>
                  <span className={styles.num}>{record.id}</span>
                  {record.riseIndex > 0 && (
                    <span className={styles.up}>
                      <img src={up} />
                      <i>+{record.riseIndex}</i>
                    </span>
                  )}
                  {record.riseIndex < 0 && (
                    <span className={styles.down}>
                      <img src={down} />
                      <i>-{record.riseIndex}</i>
                    </span>
                  )}
                  {record.riseIndex === 0 && (
                    <span className={styles.flat}>
                      <img src={flat} />
                      <i>+0</i>
                    </span>
                  )}
                </div>
              ) : (
                <div className={styles.rankSpan}>
                  <img className={styles.rank} src={rank} />
                  {record.riseIndex > 0 && (
                    <span className={styles.up}>
                      <img src={up} />
                      <i>+{record.riseIndex}</i>
                    </span>
                  )}
                  {record.riseIndex < 0 && (
                    <span className={styles.down}>
                      <img src={down} />
                      <i>-{record.riseIndex}</i>
                    </span>
                  )}
                  {record.riseIndex === 0 && (
                    <span className={styles.flat}>
                      <img src={flat} />
                      <i>+0</i>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        },
      },
      {
        ellipsis: true,
        title: '创收产品包',
        dataIndex: 'packageName',
        key: 'packageName',
        // width: '40%',
        render: (packageName, record) => {
          return (
            <Tooltip title={packageName}>
              <span style={{ textAlign: 'left' }}>{packageName}</span>
            </Tooltip>
          );
        },
      },
      {
        title: '创收单量',
        dataIndex: 'incomeOrder',
        key: 'incomeOrder',
        width: '25%',
        className: styles.marIncome,
        render: (incomeOrder, record) => {
          return <div style={{ textAlign: 'left', width: '70px' }}>{incomeOrder}</div>;
        },
      },
      {
        title: '创收流水',
        dataIndex: 'incomeFlowKpi',
        key: 'incomeFlowKpi',
        width: '100px',
        render: (incomeFlowKpi, record) => {
          const percent = record.incomeFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(incomeFlowKpi);
          return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
                propsStyle={{ flex: 'inherit', width: '70px', textAlign: 'right' }}
              />
            </div>
          );
        },
      },
    ];
    return columns || [];
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className={styles.topCon}>
        <div className={styles.title}>
          <span>飙升产品包榜单</span>
          <div style={{ fontSize: '13px' }}>最近一周</div>
        </div>
        <div className={styles.tableContainer}>
          <BIWrapperTable
            name={'tableWrap'}
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            // onRow={this.onClickRow}
            // rowKey={record => record.id}
            scroll={{ y: 288 }}
          />
        </div>
      </div>
    );
  }
}

export default Top;
