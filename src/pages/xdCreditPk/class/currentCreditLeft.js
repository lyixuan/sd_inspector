import React from 'react';
import { connect } from 'dva';
import { Typography, Tooltip } from 'antd';
import styles from './style.less';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BITextCell from '@/pages/indexPage/components/BITextCell';
import BILoading from '@/components/BILoading';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import up from '@/assets/xdcredit/fu.png';
import down from '@/assets/xdFamily/rankDown.png';

const { BI = {} } = window;
const { Paragraph } = Typography
class currentCreditLeft extends React.Component {
  columns = () => {
    const { groupList = [] } = this.props.groupPkList;
    const columns = [
      {
        width: '17%',
        title: '学分维度',
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        render: (text, record) => this.getDimensionName(record)
      }, {
        width: '11%',
        title: '环比(%)',
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
        render: text => <>{text && text !== 'N/A' ? <BITextCell>{text} <img src={text > 0 ? up : down} alt="" /></BITextCell> : ''}</>
      },
    ];
    groupList.map((item, index) => {
      columns.push({
        width: '12%',
        title: <Tooltip title={item.groupName} placement='bottom'>
          <Paragraph ellipsis={{ rows: 1}}>
            {item.groupName}
            {index > 0 ? <BIIcon onClick={() => this.props.handleDelete(item.groupId)} /> : ''}
          </Paragraph>
        </Tooltip>,
        dataIndex: item.groupId,
        key: item.groupId,
        render: (text, record) => {
          const textV = record.values[index];
          return (
            <>
              {
                record.flagMark ? record.valuesParams[index] : <BITextCell style={{ paddingRight: '16px' }}>{textV}</BITextCell>
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
  // 添加pk对象点击事件
  handleToggle = () => {
    BI.traceV && BI.traceV({ "widgetName": "本期学分-添加pk对象", "traceName": "本期学分-添加pk对象" });
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
    return dimensionList
    // if (dimensionList.length > 0) {
    //   if (this.props.hasData) {
    //     return dimensionList;
    //   } else {
    //     const [s, a, d, f, ...others] = dimensionList;
    //     return others;
    //   }
    // } else {
    //   return []
    // }
  }
  render() {
    const { pkGroupList, loading } = this.props;
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft} style={{ minHeight: 600 }}>
        <BILoading isLoading={loading} > <div className={styles.tableContainer}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            pagination={false}
            rowKey={record => record.id}
            bordered={true}
            scroll={{ y: 560 }}
          />
          {
            pkGroupList && pkGroupList.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt='' /></div>
          }
        </div>
        </BILoading>
      </div>
    );
  }
}

export default currentCreditLeft;
