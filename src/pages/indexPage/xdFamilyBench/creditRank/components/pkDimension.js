import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { getSubtract } from '@/pages/indexPage/components/utils/utils';
import BIWrapperTable from '../../../components/BIWrapperTable';
import BIFillCell from '@/components/BIFillCell';
import BILoading from '@/components/BILoading';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import down from '@/assets/xdFamily/rankDown.png';
import up from '@/assets/xdFamily/rankUp.png';
import styles from './style.less';

const { BI = {} } = window;
function CustomExpandIcon(props) {
  return (
     <a />
   );
}
const initShowKey ={
  pkValue: 'groupId',
  columnOrgName: 'groupName'
}
@connect(({ xdFamilyModal }) => ({
  kpiTimes: xdFamilyModal.familyKpiTimes || {},
}))
class pkDimension extends React.Component {
  // getShowKe
  getShowKey = (key) => {
    const { showKey = {} } = this.props;
    if (showKey[key]) {
      return showKey[key]
    } else {
      return initShowKey[key];
    }
  }
  columns = () => {
    const { groupList = [] } = this.props.groupPkList;
    const { startTime, endTime } = this.props.kpiTimes;
    const pkValue = this.getShowKey('pkValue');
    const columns = [
      {
        width: '14%',
        title: '学分维度',
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        render: (text, record) => this.getDimensionName(record)
      }, {
        width: '8%',
        title: '环比(%)',
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
        render: text => <>{text && text !== 'N/A' ? <BIFillCell>{text} <img src={text > 0 ? up : down} alt="" /></BIFillCell> : ''}</>
      },
    ];
    groupList &&groupList.map((item, index) => {
      columns.push({
        width: '12%',
          title: <div>
          {index > 0 ? item[this.getShowKey('columnOrgName')] : '我的'}
          {index > 0 ? <BIIcon onClick={() => this.props.handleDelete(item[pkValue])} /> : ''}
        </div>,
        dataIndex: item[pkValue],
        key: item[pkValue],
        render: (text, record) => {
          const textV = record.values[index];
          const flagText = index === 0 && textV && record.level === 4;
          return (
              <>
                {
                  record.flagMark ? <BIFillCell {...record.valuesParams[index]} className={flagText ? styles.mineHover : ''}>
                    {
                      flagText ? <Link onClick={() => this.getDataTrace(record)} target='_black' to={`/xdCredit/index?params=${JSON.stringify({ startTime, endTime, "dementionId": record.id })}`} >
                        {textV}
                        <span style={{ marginLeft: '2px' }}>{'>'}</span>
                      </Link>
                        : <>{textV}<span style={{ marginLeft: '8px' }}></span></>}
                  </BIFillCell>
                    : <BIFillCell style={{ paddingRight: '16px' }}>{textV}</BIFillCell>
                }
              </>
            )
        }
      })
    })
    const len = groupList ? 6 - groupList.length: 6
    for (var i = 0; i < len; i++) {
      columns.push({
        width: '12%',
        title: <div className={styles.pluscircle} onClick={this.handleToggle}><img src={pluscircle} alt='icon' />添加PK对象</div>,
        dataIndex: '添加PK对象' + i,
        key: '添加PK对象' + i,
      })
    }
      return columns || [];
  };
  // 学分查看埋点
  getDataTrace = (r) => {
    BI.traceV && BI.traceV({ "widgetName": r.dimensionName, "traceName": "班主任工作台/本期学分/" + r.dimensionName });
  }
  // 添加pk对象点击事件
  handleToggle = () => {
    BI.traceV && BI.traceV({ "widgetName": "本期学分-添加pk对象", "traceName": "本期学分-添加pk对象" });
    this.props.toggleDrawer(true);
  }
  // 列表维度name
  getDimensionName = ({ dimensionName, level, sequenceNo }) => {
    if (sequenceNo) {
      return <b style={{ marginLeft: level === 3 ? '-20px' : '0' }}>{sequenceNo} {dimensionName}</b>
    } else {
      return dimensionName
    }
  }
  setRowClassName = record => {
    let className = ''
    if (record.flagMark === 3) {
      className = 'yellowBgColor';
    } else if (record.flagMark === 1 || record.dimensionName === '退挽' || record.dimensionName === '随堂考') {
      className = 'plusBgColor';
    } else if (record.flagMark === 2) {
      className = 'minusBgColor';
    }
    return className
  }
  getDataSource = () => {
    const { groupPkList = {} } = this.props;
    const data = groupPkList.dimensionList || [];
    if (data.length > 0) {
      if (this.props.hasData) {
        return data;
      } else {
        return [data[data.length -1]]; 
      }
    }
    return []
  }

  render() {
    const { pkUsers, hasData } = this.props
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft} style={{ minHeight: getSubtract(hasData, 732) + 'px' }}>
        {this.props.loading ? <BILoading isLoading={ this.props.loading} /> : <div className={styles.tableContainer}>
          {
            dataSource && dataSource.length > 0 && <BIWrapperTable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination={false}
              rowKey={record => record.id}
              loading={this.props.loading}
              bordered={true}
              scroll={{ x: 'max-content', y: getSubtract(hasData, 680) }}
            />
          }
          {
            pkUsers && pkUsers.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt='' /></div>
          }
        </div>}
      </div>
    );
  }
}

export default pkDimension;