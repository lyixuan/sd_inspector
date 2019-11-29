import React from 'react';
import { connect } from 'dva';
import BIScrollbarTable from '../../class/node_modules/@/ant_components/BIScrollbarTable';
import BIFillCell from '@/components/BIFillCell';
import BILoading from '@/components/BILoading';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import down from '@/assets/xdFamily/rankDown.png';
import up from '@/assets/xdFamily/rankUp.png';
import styles from './style.less';

const { BI = {} } = window;
const initShowKey ={
  pkValue: 'groupId',
  columnOrgName: 'groupName'
}
@connect(({ xdCreditPkModal }) => ({
  kpiTimes: xdCreditPkModal.familyKpiTimes || {},
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
    groupList && groupList.map((item, index) => {
      columns.push({
        width: '12%',
          title: <div>
          {item[this.getShowKey('columnOrgName')]}
          {index > 0 ? <BIIcon onClick={() => this.props.handleDelete(item[pkValue])} /> : ''}
        </div>,
        dataIndex: item[pkValue],
        key: item[pkValue],
        render: (text, record) => {
          const textV = record.values[index];
          return (
            <>
              {
                record.flagMark ? record.valuesParams[index] : <BIFillCell style={{ paddingRight: '16px' }}>{textV}</BIFillCell>
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
  // 添加pk对象点击事件
  handleToggle = () => {
    const pkName = this.getShowKey('pkValue') === 'groupId' ? '小组' : '家族';
    BI.traceV && BI.traceV({ "widgetName": `学分-选择PK${pkName}`, "traceName": `家族长工作台/学分-选择PK${pkName}` });
    this.props.toggleDrawer(true);
  }
  // 列表维度name
  getDimensionName = ({ dimensionName, level, sequenceNo }) => {
    if (sequenceNo) {
      return <b style={{ marginLeft: level === 2 || level === 3 ? '20px' : '0' }}>{sequenceNo} {dimensionName}</b>
    } else if (level === 4) {
      return <span style={{ marginLeft: '40px' }}>{dimensionName}</span>
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
    const { groupPkList={} } = this.props;
    const { dimensionList = [] } = groupPkList;
    if (dimensionList.length > 0) {
      if (this.props.hasData) {
        return dimensionList;
      } else {
        if (this.getShowKey('pkValue') === 'groupId') {
          const [s, a, d, f, ...others] = dimensionList;
          return others;
        } else {
          const [s, a, d, ...others] = dimensionList;
          return others;
        }      
      }
    } else {
      return []
    }
  }

  render() {
    const { pkUsers } = this.props
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft} style={{ minHeight: 560 + 'px' }}>
        <BILoading isLoading={ this.props.loading} > 
          <div className={styles.tableContainer}>
            {
              <BIScrollbarTable
                columns={this.columns()}
                dataSource={dataSource}
                rowClassName={this.setRowClassName}
                pagination={false}
                rowKey={record => record.id}
                bordered={true}
                scroll={{ y: 480 }}
              />
            }
            {
              pkUsers && pkUsers.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt='' /></div>
            }
          </div>
        </BILoading>
      </div>
    );
  }
}

export default pkDimension;