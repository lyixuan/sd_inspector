import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import searchIcon from '@/assets/xdcredit/search.png';
import { Tooltip } from 'antd';
import styles from './style.less';

const totalLength = 9999;
class BIClassifyTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollWidth: 0,
      tableHeight: 0
    }
  }
  componentDidMount() {
    this.countWidth();//计算表格滚动区域的宽度
    this.countHeight()//计算表格高度
    this.onMouseLeave();
    const dataList = this.props.dataSource.dataList;
    if (!dataList) return;
    const item = dataList[dataList.length - 1]
    this.resetCell(item, `${dataList.length - 1}${totalLength}`);
    if (navigator.userAgent.indexOf("Firefox") > -1) return;
    window.addEventListener('resize', this.debounce(this.countWidth, 300));

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.countWidth);
  }
  debounce(func, wait) {
    let timeout;
    return () => {
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait);
    }
  }
  countWidth = () => {
    const tableWidth = document.getElementById("tableWrap") && document.getElementById("tableWrap").offsetWidth;
    let scrollWidth1 = this.props && this.props.columns.reduce(function (prev, curr, idx, arr) {
      return prev.width ? prev.width : prev + curr.width;
    })
    this.setState({
      scrollWidth: Math.floor(tableWidth - scrollWidth1)
    })
  }
  countHeight = () => {
    const tableHeight = document.getElementById("tableWrap") && document.getElementById("tableWrap").offsetHeight;
    this.setState({
      tableHeight: tableHeight
    })
  }
  onMouseEnter = () => {
    const dom = document.getElementById("tableWrap").querySelector('.ant-table-body');
    dom.style.overflowX = 'scroll';
  }
  onMouseLeave = () => {
    const dom = document.getElementById("tableWrap").querySelector('.ant-table-body');
    dom.style.overflowX = 'hidden';
  }
  title = () => {
    const reasonTypeList = this.props.dataSource.reasonTypeList
    return (
      <div>
        {this.props.defaultKey.classfy}
        {reasonTypeList.map((item, index) => {
          const condition = index === reasonTypeList.length - 1;
          return <span key={index} data-trace='{"widgetName":"切换原因","traceName":"数据服务/学分明细/不满意会话/切换原因"}' onClick={condition ? null : (e) => this.reasonTypeClick(item, e)} className={condition ? styles.titleCurrent : styles.title}>{item.typeName}{condition ? '' : '/'}</span>
        })}
        <span></span>
      </div>
    )
  }

  reasonTypeClick = (item) => {
    if (!item.expand) return;
    this.props.reasonTypeClick(item);
  }
  resetCell = (record, index, type) => {
    this.setState({
      currentIndex: index,
    })
  }
  cellClick = (record, index, indexs, type) => {
    this.resetCell(record, index)
    this.props.cellClick(this.props.dataSource.titleList[indexs], record, type)
  }
  setColumns = (item) => {
    return {
      width: item.width,
      title: item.title
    }
  }
  columns = () => {
    const data = this.props.dataSource;
    const titleList = data.titleList
    const dataSource = data.dataList
    const children = [];
    let repairArr = 0
    if (!titleList) return;
    if (this.state.scrollWidth > titleList.length * this.props.cellWidth) {
      repairArr = Math.ceil((this.state.scrollWidth - titleList.length * this.props.cellWidth) / this.props.cellWidth)
    }
    titleList && titleList.map((item, index) => {
      children.push({
        title: <div data-trace='{"widgetName":"切换原因","traceName":"数据服务/学分明细/不满意会话/切换原因"}' onClick={() => this.reasonTypeClick(item)} style={{ cursor: item.expand ? 'pointer' : '' }}>{item.typeName}{item.expand ? <img src={searchIcon}></img> : null}</div>,
        dataIndex: 'index',
        key: `children${index}`,
        width: this.props.cellWidth,
        className: styles.txRight,
        render: (text, record, indexs) => {
          const currentIndex = `${index}${indexs}`
          // 如果userType == 'college'只能点击当前学院的数据
          if ((record[this.props.defaultKey.id] == this.props.collegeId && this.props.userType == 'college') || !this.props.collegeId) {
            return (
              this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell style={{ cursor: 'pointer' }} key={index} text={`${dataSource[indexs].values[index]}`} unit="%" onClick={(e) => { this.cellClick(record, currentIndex, index) }}></BISelectCell> :
                <Tooltip overlayClassName={styles.listMarkingTooltip2} placement="right" title={`差评数：${dataSource[indexs].valueCounts[index]}`}>
                  <BIContrastCell style={{ cursor: 'pointer' }} data-trace='{"widgetName":"选择数据","traceName":"数据服务/学分明细/不满意会话/选择数据"}' key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, currentIndex, index) }} nums={dataSource[indexs].values} text={dataSource[indexs].values[index]} textContent={`${dataSource[indexs].values[index]}%`} />
                </Tooltip>
            )
          }
          return (
            this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell key={index} text={`${dataSource[indexs].values[index]}`} unit="%" ></BISelectCell> : <BIContrastCell others="%" key={index} colors={this.props.colors} nums={dataSource[indexs].values} text={dataSource[indexs].values[index]} textContent={`${dataSource[indexs].values[index]}%`} />
          )
        },
      })
    })
    console.log(133, repairArr)
    if (repairArr > 0) {
      children.push({
        title: ' ',
        dataIndex: 'repairArr',
        key: `empty${repairArr}`,
        render: (val, row, index) => {
          const obj = {
            children: ' ',
            props: {}
          }
          obj.props.rowSpan = 0
          return obj
          // return <> </>
        },
      })
      // for (let i = 0; i < repairArr; i++) {
      //   children.push({
      //     title: ' ',
      //     dataIndex: 'i',
      //     className: styles.txRight,
      //     key: `empty${i}`,
      //     width: this.props.cellWidth,
      //     render: () => {
      //       return <> </>
      //     },
      //   })
      // }
    }
    const columns = []
    this.props.columns.map(item => {
      if (item.type == 'leftFixed') {
        columns.push({
          title: item.name,
          dataIndex: this.props.defaultKey.name,
          key: this.props.defaultKey.name,
          width: item.width,
          fixed: 'left',
          className: styles.zIndex,
          render: (text, record) => {
            const flag = this.props.orgClick && this.props.collegeId == record[this.props.defaultKey.id] && this.props.userType == 'college' || this.props.userType == 'boss'; //判断组织列能不能点击
            return <span style={{ cursor: flag ? 'pointer' : '' }} onClick={flag ? () => this.props.cellClick('', record) : null}>{text}</span>
          }
        })
      } else if (item.type == 'children') {
        columns.push({
          title: this.title(),
          children: children
        })
      } else if (item.type == 'others') {
        columns.push({
          title: item.name,
          dataIndex: item.key,
          key: item.key,
          width: item.width
        })
      } else if (item.type == 'rightFixed') {
        columns.push({
          title: item.name,
          dataIndex: item.key,
          key: item.key,
          width: item.width,
          className: styles.txRight,
          fixed: 'right',
          render: (text, record, index) => {
            const currentIndex = `${index}${totalLength}`;
            if ((record[this.props.defaultKey.id] == this.props.collegeId && this.props.userType == 'college') || !this.props.collegeId) {
              return (
                this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell style={{ cursor: 'pointer' }} text={text} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} /> : <BIContrastCell style={{ cursor: 'pointer' }} data-trace='{"widgetName":"选择数据","traceName":"数据服务/学分明细/不满意会话/选择数据"}' key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} text={text} />
              )
            }
            return (
              this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell text={text} /> : <BIContrastCell key={index} colors={this.props.colors} nums={record.values} text={text} />
            )
            // return (
            //   this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell style={{ cursor: 'pointer' }} text={text} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} /> : <BIContrastCell style={{ cursor: 'pointer' }} data-trace='{"widgetName":"选择数据","traceName":"数据服务/学分明细/不满意会话/选择数据"}' key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} nums={record.values} text={text} />
            // )
          }
        })
      }
    })
    return columns || [];
  }

  render() {
    const height = this.state.tableHeight + 20;
    const dataSource = this.props.dataSource && this.props.dataSource.dataList.length > 0 ? this.props.dataSource.dataList : []
    return (
      <div className={styles.tableWrap} id="tableWrap" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{ minHeight: `${height}px` }}>
        <BITable
          pagination={false}
          columns={this.columns()}
          // smalled
          bordered
          rowKey={(record, index) => record[this.props.defaultKey.id] + '' + index}
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
        />
      </div>
    );
  }
}

export default BIClassifyTable;
