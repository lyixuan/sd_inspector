import React from 'react';
import { connect } from 'dva';
// import BITable from '@/ant_components/BITable';
import up from '@/assets/xdcredit/zheng.png';
import down from '@/assets/xdcredit/fu.png';
import open from '@/assets/xdcredit/open.png';
import close from '@/assets/xdcredit/close.png';
import mingxi from '@/assets/xdcredit/mingxi.png';
// import BILoading from '@/components/BILoading';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import { handleDataTrace } from '@/utils/utils';
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
        className: styles.selected,
        width: 146,
        render: (text, record) => {
          if (record.level === 4) {    
            return  <div onClick={() => this.onClickRow(record)} className={`${styles.dimensionName} ${record.num > 0 ? styles.dimensionClick : ''}`}>
              <span>{text}</span>
              <span className={record.num > 0 ? styles.num : ''}>{record.num}{record.unit} {record.num > 0 ?<img src={mingxi} alt=""/> : ''}</span>
            </div>
          } else {
            return <span style={{color: '#1B1C20'}}>{text}</span>
          }
        }
      }, {
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
    if (this.props.dementionId === record.id) {
      return styles.selectedRow;
    }
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
    if (record.level === 4 && record.num) {
      const obj = { widgetName: record.dimensionName, traceName: `数据服务/学分明细/${record.dimensionName}` }
      const { BI = {} } = window;
      this.props.onChangeParams(record.id, 'dementionId');
      // window.scrollTo({ // 产品去掉了
      //   top: 0,
      //   behavior: "smooth"
      // })
      BI.traceV && BI.traceV(obj);
    }
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
      handleDataTrace({ "widgetName": `${record.dimensionName}展开`, "traceName": `小德学分/学分/${record.dimensionName}展开` })
    } else {
      record.childrenIds.map(delVal => {
        if (expandedRowKeys.includes(delVal)) {
          expandedRowKeys.splice(expandedRowKeys.indexOf(delVal), 1)
        }
      });
      // handleDataTrace({ "widgetName": `${record.dimensionName}关闭`, "traceName": `小德学分/学分/${record.dimensionName}关闭` })
    }
    this.setState({expandedRowKeys});
  }
  // 其它展开关闭事件
  onExpandOthers = (panelProps) => {
    panelProps.onExpand();
    if (!panelProps.expanded) {
      handleDataTrace({ "widgetName": `${panelProps.record.dimensionName}展开`, "traceName": `小德学分/学分/${panelProps.record.dimensionName}展开` })
    }
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
        return <img src={close} onClick={() => this.onExpandOthers(panelProps)} className={styles.expandIcon} alt=""/>
      } else {
        return <img src={open} onClick={() => this.onExpandOthers(panelProps)} className={styles.expandIcon} alt=""/>
      }
    } else {
      return
    }
  }
  //
  // 得到打开关闭的值
  onExpandedRowsChange = expandedRowKeys => {
    this.setState({expandedRowKeys})
  }

  render() {
    const dataSource = this.fillDataSource(this.props.dimensionData.dimensionList);
    return (
      <div className={styles.dimension}>
        {
          dataSource.length > 0 ? <BIScrollbarTable
            defaultExpandedRowKeys={[1,2,10]}
            expandIcon={this.expandIconRender}
            expandedRowKeys={this.state.expandedRowKeys}
            onExpandedRowsChange={expandedRowKeys => this.onExpandedRowsChange(expandedRowKeys)}
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            loading={this.props.loading}
            rowKey={record => record.id}
            indentSize={10}
            pagination={false}
            smalled={true}
            bordered
            scroll={{ y: 1000 }}
          /> : ''
        }
      </div>

    );
  }
}

export default Dimension;
