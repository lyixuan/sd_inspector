import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './style.less';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIContrastCell from '@/components/BIContrastCell';
import BILoading from '@/components/BILoading';
import BIFillCell from '@/components/BIFillCell';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';

const { BI = {} } = window;
const colorsArr = ['rgba(255, 120, 120, 1)', 'rgba(255, 120, 120, 0.8)', 'rgba(255, 120, 120, 0.6)', 'rgba(255, 120, 120, 0.4)', 'rgba(255, 120, 120, 0.2)', 'rgba(255, 120, 120, 0.1)'];
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({  }) => ({
}))
class currentCreditLeft extends React.Component {
  columns = () => {
    const { groupList = [] } = this.props.groupPkList;
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
    groupList.map((item, index) => {
      columns.push({
        width: '12%',
        title: <div>
          {index > 0 ? item.groupName : '我的'}
          {index > 0 ? <BIIcon onClick={() => this.props.handleDelete(item.groupId)} /> : ''}
        </div>,
        dataIndex: item.groupId,
        key: item.groupId,
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
    for (var i = 0; i < 6 - groupList.length; i++) {
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
    const { groupPkList={} } = this.props;
    const { dimensionList = [] } = groupPkList;
    if (dimensionList.length > 0) {
      if (this.props.hasData) {
        return dimensionList;
      } else {
        return [dimensionList[dimensionList.length - 1]];
      }
    } else {
      return []
    }
  }
  render() {
    const { pkGroupList, loading } = this.props;
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft} style={{ minHeight: this.props.getNumValue(732) + 'px' }}>
        {loading ? <BILoading isLoading={loading} /> : <div className={styles.tableContainer}>
          {
            dataSource && dataSource.length > 0 && <BIWrapperTable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination={false}
              rowKey={record => record.id}
              loading={loading}
              bordered={true}
              scroll={{ x: 'max-content', y: this.props.getNumValue(680) }}
            />
          }
          {
            pkGroupList && pkGroupList.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt='' /></div>
          }
        </div>}
      </div>
    );
  }
}

export default currentCreditLeft;
