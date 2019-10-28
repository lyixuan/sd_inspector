import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import searchIcon from '@/assets/xdcredit/search.png';
import styles from './style.less';

const totalLength = 9999;
class BIClassifyTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollWidth: 0
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.dataSource != nextProps.dataSource) {
      const dataList = nextProps.dataSource.dataList;
      const item = dataList[dataList.length - 1]
      this.resetCell(item, `${dataList.length - 1}${totalLength}`);
    }
  }
  title = () => {
    const reasonTypeList = this.props.dataSource.reasonTypeList
    return (
      <div>
        {this.props.defaultKey.classfy}
        {reasonTypeList.map((item, index) => {
          const condition = index === reasonTypeList.length - 1;
          return <span key={index} onClick={condition ? null : (e) => this.reasonTypeClick(item, e)} className={condition ? styles.titleCurrent : styles.title}>{item.typeName}{condition ? '' : '/'}</span>
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
    const titleList = data.titleList;
    const dataSource = data.dataList;
    const children = [];
    let repairArr = 0
    if (!titleList) return;
    if (this.state.scrollWidth > titleList.length * this.props.cellWidth) {
      repairArr = Math.ceil((this.state.scrollWidth - titleList.length * this.props.cellWidth) / this.props.cellWidth)
    }
    titleList && titleList.map((item, index) => {
      children.push({
        title: <div onClick={() => this.reasonTypeClick(item)} style={{ cursor: item.expand ? 'pointer' : '' }}>{item.typeName}{item.expand ? <img src={searchIcon}></img> : null}</div>,
        dataIndex: 'index',
        key: `children${index}`,
        width: this.props.cellWidth,
        className: styles.txRight,
        render: (text, record, indexs) => {
          const currentIndex = `${index}${indexs}`
          return (
            this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell key={index} text={`${dataSource[indexs].values[index]}`} unit="%" onClick={(e) => { this.cellClick(record, currentIndex, index) }}></BISelectCell> : <BIContrastCell others={this.props.defaultKey.unit} key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, currentIndex, index) }} nums={dataSource[indexs].values} text={dataSource[indexs].values[index]} />
          )
        },
      })
    })
    if (repairArr > 0) {
      for (let i = 0; i < repairArr; i++) {
        children.push({
          title: '-',
          dataIndex: 'i',
          className: styles.txRight,
          key: `empty${i}`,
          width: this.props.cellWidth,
          render: () => {
            return <>-</>
          },
        })
      }
    }
    const columns = []
    this.props.columns.map(item => {
      if (item.type == 'leftFixed') {
        columns.push({
          title: item.name,
          dataIndex: this.props.defaultKey.name,
          key: this.props.defaultKey.name,
          width: item.width,
          fixed: 'left'
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
            return (
              this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell text={text} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} /> : <BIContrastCell key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} nums={record.values} text={text} />
            )
          }
        })
      }
    })
    // const columns = [
    //   {
    //     title: this.props.columns[type] == 'column' && this.props.columns[name],
    //     dataIndex: this.props.defaultKey.name,
    //     key: this.props.defaultKey.name,
    //     width: 105,
    //     fixed: 'left'
    //   },
    //   {
    //     title: this.title(),
    //     children: children
    //   },
    //   {
    //     title: '汇总',
    //     dataIndex: 'total',
    //     key: 'total',
    //     width: 60,
    //     className: styles.txRight,
    //     fixed: 'right',
    //     render: (text, record, index) => {
    //       const currentIndex = `${index}${totalLength}`;
    //       return (
    //         this.state.currentIndex == currentIndex && this.props.isChecked ? <BISelectCell text={text} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} /> : <BIContrastCell key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, currentIndex, 'total') }} nums={record.values} text={text} />
    //       )
    //     }
    //   }

    // ]
    return columns || [];
  }
  componentDidMount() {
    // const tableWidth = document.getElementById("tableWrap").offsetWidth;
    // const scrollWidth = tableWidth - 105 - 60;
    // this.setState({
    //   scrollWidth
    // })
    this.countWidth();//计算表格滚动区域的宽度
    // window.addEventListener('resize', this.countWidth);
  }
  countWidth() {
    const tableWidth = document.getElementById("tableWrap").offsetWidth;
    let scrollWidth1 = this.props.columns.reduce(function (prev, curr, idx, arr) {
      return prev.width ? prev.width : prev + curr.width;
    })
    this.setState({
      scrollWidth: tableWidth - scrollWidth1
    })
  }
  render() {
    const dataSource = this.props.dataSource.dataList
    return (
      <div className={styles.tableWrap} id="tableWrap">
        <BITable
          pagination={false}
          columns={this.columns()}
          samlled
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
