import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import open from '@/assets/xdCredit/open.png';
import close from '@/assets/xdCredit/close.png';
import BILoading from '@/components/BILoading';
import styles from './style.less'

@connect(({ loading }) => ({
  loading: loading.effects['xdCreditModal/getDimensionList'],
}))
class Dimension extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedRowKeys: [1, 2, 10]
    }
  }
  columns = () => {
    const columns = [
      {
        title: this.props.dimensionData.groupFullName,
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        rowClassName: styles.fontWeight,
        width: '170px',
        render: (text, record) => {
          // if (record.sequenceNo) {
          //   return <span><b>{record.sequenceNo} {text}</b></span>
          // } else {
          //   return <span>{text}</span>
          // }
          const vul = record.level === 4 && record.num > 0;
          if (record.level === 4 && record.num > 0) {    
            return  <div style={{color: '#999999'}}>
              <span>{text}</span>
                {/* { record.level === 4 && record.num > 0<span>{record.num}{record.unit}</span> } */}
            </div>
          } else {
            return <span style={{color: '#1B1C20'}}>{text}</span>
          }
        }
      }, {
        width: 90,
        title: '学分/环比',
        dataIndex: 'scoreRatio',
        className: 'txRight',
        key: 'scoreRatio',
        render: (text, record) => {
          const num = Number(text);
          const imgSrc = num > 0 ? up : down;
          return (
            <div className={styles.scoreRatio}>
              <span className={styles.score}>{record.score}</span>
              <span className={styles.ratio}>{text}{text === 'N/A' || num === 0 ? '' : <img src={imgSrc} alt=""/>}</span>
            </div>
          )
        }
      },
    ];
    return columns || [];
  };
  setRowClassName = record => {
    let className = ''
    if (this.props.dementionId === record.id) {
      return styles.selectedRow;
    } else if (record.flagMark === 3) {
      className = 'yellowBgColor';
    } else if (record.flagMark === 1) {
      className = 'plusBgColor';
    } else if (record.flagMark === 2) {
      className = 'minusBgColor';
    }
    return className
  }
  fillDataSource = (params = [], n = 1, flagMark, record) => {
    params.map(item => {
      item.level = n;
      item.flagMark = item.dimensionName === '学分均分' ? 3 : flagMark; // 1 正面均分  2 负面均分 3学分均分 其它
      if (record && item.level === 3) { // 获取正面均分 和 负面均分下一级的别的id
        record.childrenIds.push(item.id);
      }
      if (item.children && item.children.length > 0) {
        const mark = item.dimensionName === '学分均分' ? 1 : (item.dimensionName === '负面均分' ? 2 : flagMark);
        if (item.id === 2 || item.id === 10) { // 获取正面均分 和 负面均分下一级的别的id
          item.childrenIds = [];
          this.fillDataSource(item.children, n + 1, mark, item);
        } else {
          this.fillDataSource(item.children, n + 1, mark, record ? record : '');
        }
      }
    })
    return params
  }
  onClickRow = (record) => {
    return {
      onClick: () => {
        if (record.level === 4 && record.num) {
          const obj = { widgetName: record.dimensionName, traceName: `数据服务/学分明细/${record.dimensionName}` }
          const { BI = {} } = window;
          this.props.onChangeParams(record.id, 'dementionId');
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
          BI.traceV && BI.traceV(obj);
        }
      }
    };
  }
  // 正负极点击事件
  onExpandLevel = record => {
    const { expandedRowKeys } = this.state;
    record.panelProps = !record.panelProps;
    if (record.panelProps) {  
      record.childrenIds.map(addVal => {
        if (!expandedRowKeys.includes(addVal)) {
          expandedRowKeys.push(addVal);
        }
      });
    } else {
      record.childrenIds.map(delVal => {
        if (expandedRowKeys.includes(delVal)) {
          expandedRowKeys.splice(expandedRowKeys.indexOf(delVal), 1)
        }
      });
    }
    this.setState({expandedRowKeys});
  }
  // 展开关闭图标渲染
  expandIconRender = (panelProps) => {
    if (panelProps.record.level === 2) {
      if (panelProps.record.panelProps) {
        return <img src={close} onClick={() => this.onExpandLevel(panelProps.record)} className={styles.expandIcon} alt=""/>
      } else {
        return <img src={open} onClick={() => this.onExpandLevel(panelProps.record)} className={styles.expandIcon} alt=""/>
      }
    } else if (panelProps.record.level === 3) {
      if (panelProps.expanded) {
        return <img src={close} onClick={panelProps.onExpand} className={styles.expandIcon} alt=""/>
      } else {
        return <img src={open} onClick={panelProps.onExpand} className={styles.expandIcon} alt=""/>
      }
    } else {
      return <img src={open} style={{width: 0}} alt=""/>
    }
  }
  // 得到打开关闭的值
  onExpandedRowsChange = expandedRowKeys => {
    this.setState({expandedRowKeys})
  }

  render() {
    const dataSource = this.fillDataSource(this.props.dimensionData.dimensionList);
    return (
      <div className={styles.dimension}>
        {
          dataSource.length > 0 ? <BITable
            defaultExpandedRowKeys={[1,2,10]}
            expandIcon={this.expandIconRender}
            expandedRowKeys={this.state.expandedRowKeys}
            onExpandedRowsChange={expandedRowKeys => this.onExpandedRowsChange(expandedRowKeys)}
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            onRow={this.onClickRow}
            loading={this.props.loading}
            rowKey={record => record.id}
            pagination={false}
            smalled={true}
            bordered
          /> : ''
        }
      </div>

    );
  }
}

export default Dimension;
