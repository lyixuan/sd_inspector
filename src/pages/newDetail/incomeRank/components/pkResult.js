import React from 'react';
import { connect } from 'dva';
import { thousandsFormatAll } from '@/pages/indexPage/components/utils/utils';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BIWrapperTable from '@/components/BIWrapperTable';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import styles from './style.less';

const { BI = {} } = window;
const gradeImg = { // 等级
  1: rank1, 
  2: rank2, 
  3: rank3,
}
@connect(({ newDetailModal }) => ({
  globalUserType: newDetailModal.globalUserType
}))
class ProfitTbas extends React.Component {
  columns = () => {
    const { profitData={} } = this.props;
    const { maxValue= {} } = profitData;
    const columns = [ {
        title: 'PK 对象',
        dataIndex: 'orgId',
        key: 'orgId',
        render: (text, record, index) => {
          return (
            <>
              {
                record.isNot ? <div className={styles.pluscircle} onClick={this.handleToggle}><img src={pluscircle} alt='icon'/>添加PK对象</div> : <>{record.orgName}
                {index !== 0 || this.props.globalUserType === 'boss' ? <BIIcon onClick={() => this.props.handleDelete(text)}/> : ''}</>
              }
            </>
          )
        }
      }, {
        width: '8%',
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
        render: (text, record) => this.getColumn(record, <BITextAlign textalign='center'>{text > 3 ? text : <img src={gradeImg[text]} alt='' style={{ width: '20px'}}/>}</BITextAlign>)
      }, {
        width: '10%',
        title: this.props.incomeType + '绩效流水',
        dataIndex: 'kpiFlow',
        key: 'kpiFlow',
        render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.kpiFlow)}/>)
      }, {
        className: styles.rowBg2,
        width: '10%',
        title: '好推流水',
        dataIndex: 'goodpushFlow',
        key: 'goodpushFlow',
        render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushFlow)}/>)
      },
      //  {
      //   className: styles.rowBg2,
      //   width: 90,
      //   title: '好推绩效',
      //   dataIndex: 'goodpushKpi',
      //   key: 'goodpushKpi',
      //   render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.goodpushKpi)}/>)
      // }, 
      {
        width: '10%',
        className: styles.rowBg2,
        title: '好推单量',
        dataIndex: 'goodpushOrderCount',
        key: 'goodpushOrderCount',
        render: (text, record) => this.getColumn(record, text)
      }, {
        width: '9%',
        className: styles.rowBg3,
        title: '续报流水',
        dataIndex: 'renewalFlow',
        key: 'renewalFlow',
        render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.renewalFlow)}/>)
      }, 
      // {
      //   width: 90,
      //   className: styles.rowBg3,
      //   title: '续报绩效',
      //   dataIndex: 'renewalKpi',
      //   key: 'renewalKpi',
      //   render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.renewalKpi)}/>)
      // }, 
      {
        width: '10%',
        className: styles.rowBg3,
        title: '续报单量',
        dataIndex: 'renewalOrderCount',
        key: 'renewalOrderCount',
        render: (text, record) => this.getColumn(record, text)
      }, {
        width: '10%',
        className: styles.rowBg4,
        title: '成考流水',
        dataIndex: 'examZbtFlow',
        key: 'examZbtFlow',
        render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.examZbtFlow)}/>)
      },
      //  {
      //   width: 90,
      //   className: styles.rowBg4,
      //   title: '成本套绩效',
      //   dataIndex: 'examZbtKpi',
      //   key: 'examZbtKpi',
      //   render: (text, record) => this.getColumn(record, <BIWrapperProgress text={thousandsFormatAll(text)} isColor="green" percent={this.getPercent(text, maxValue.examZbtKpi)}/>)
      // }, 
      {
        width: '10%',
        className: styles.rowBg4,
        title: '成考单量',
        dataIndex: 'examZbtOrderCount',
        key: 'examZbtOrderCount',
        render: (text, record) => this.getColumn(record, <BITextAlign style={{marginRight: 8}}>{text}</BITextAlign>)
      }
    ];
    return columns || [];
  };
  handleToggle = () => {    
    BI.traceV &&  BI.traceV({"widgetName": `创收-选择PK小组${this.props.incomeType}`,"traceName": `家族长工作台/创收-选择PK${this.props.incomeType}`});
    this.props.toggleDrawer(true);
  }
  getColumn = (r, v) => {
    if (r.isNot) {
      return ''
    } else {
      return v;
    }
  }
  getPercent = (n, t) => {
    return (n/t)*100 + '%'
  }
  // 列表渲染数据
  getDataSource = () => {
    const { profitData } = this.props;
    if (profitData.pkList instanceof Array) {
      const pkList =[...profitData.pkList];
      const l = pkList.length;
      for (var i = l; i < 8; i++) {
        pkList.push({isNot: true, userId: new Date().getTime()})
      }
      return pkList;
    } else {
      return []
    }
  }
  render() {
    const { pkUsers } = this.props;
    return (
      <div className={styles.profitTabs}>
        <BIWrapperTable
          columns={this.columns()}
          dataSource={this.getDataSource()}
          pagination={false}
          loading={this.props.loading}
          rowKey={(record, index) => record.userId + '' + index}
          onRow={this.onClickRow}
          rowClassName={this.getRowClassName}
          bordered={true}
          name={this.props.incomeType === '小组' ? "djlGroupe" : 'djlFamily'}
        />
        {
          pkUsers && pkUsers.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt=''/></div>
        }
      </div>
    );
  }
}

export default ProfitTbas;
