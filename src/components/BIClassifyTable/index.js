import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import searchIcon from '@/assets/xdCredit/search.png';
import styles from './style.less';

const totalLength = 9999;
class BIClassifyTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      checkedId: null,
      scrollWidth: 0
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.dataSource != nextProps.dataSource) {
      const dataList = nextProps.dataSource.dataList;
      const item = dataList[dataList.length - 1]
      this.resetCell(item, totalLength);
    }
  }
  title = () => {
    const reasonTypeList = this.props.dataSource.reasonTypeList
    if (!reasonTypeList) return <span>所有分类</span>
    const ressonTypeLists = [{
      expand: true,
      typeId: 0,
      typeName: '所有分类'
    }, ...reasonTypeList]
    return (
      <div>
        {ressonTypeLists.map((item, index) => {
          const condition = index === ressonTypeLists.length - 1;
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
      checkedId: record && record[this.props.defaultKey.id]
    })
  }
  cellClick = (record, index, type) => {
    this.resetCell(record, index, type)
    this.props.cellClick(index !== totalLength ? this.props.dataSource.titleList[index] : '', record, type)
  }

  columns = () => {
    const data = this.props.dataSource
    const titleList = data.titleList
    const dataSource = data.dataList
    const reasonTypeList = data.reasonTypeList
    const children = [];
    let repairArr = 0
    if (!titleList) return;
    if (this.state.scrollWidth > titleList.length * 85) {
      repairArr = Math.ceil((this.state.scrollWidth - titleList.length * 85) / 85)
    }
    titleList && titleList.map((item, index) => {
      children.push({
        title: <div onClick={() => this.reasonTypeClick(item)} style={{ cursor: item.expand ? 'pointer' : '' }}>{item.typeName}{item.expand ? <img src={searchIcon}></img> : null}</div>,
        dataIndex: 'index',
        key: `children${index}`,
        width: 85,
        className: styles.txRight,
        render: (text, record, indexs) => {
          return (
            this.state.checkedId == record[this.props.defaultKey.id] && this.state.currentIndex == index && this.props.isChecked ? <BISelectCell key={index} text={dataSource[indexs].values[index]} unit="%" onClick={(e) => { this.cellClick(record, index, e) }}></BISelectCell> : <BIContrastCell others={this.props.others} key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, index, e) }} nums={dataSource[indexs].values} text={dataSource[indexs].values[index]} />
          )
        },
      })

    })
    if (!reasonTypeList) {
      children.push({
        title: '未分类数据',
        dataIndex: 'unClassifyCount',
        key: 'unClassifyCount',
        width: 60,
        className: styles.txRight,
        render: (text, record, index) => {
          const nums = [...dataSource[index].values, text]
          return (
            this.state.checkedId == record[this.props.defaultKey.id] && this.state.currentIndex == nums.length - 1 && this.props.isChecked ? <BISelectCell text={text} unit="%" onClick={(e) => { this.cellClick(record, nums.length - 1, 'none') }} /> : <BIContrastCell others={this.props.others} key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, nums.length - 1, 'none') }} nums={nums} text={text} />
          )
        }
      })
    }


    if (repairArr > 0) {
      for (let i = 0; i < repairArr; i++) {
        children.push({
          title: '-',
          dataIndex: 'i',
          className: styles.txRight,
          key: `empty${i}`,
          render: () => {
            return <>-</>
          },
        })
      }
    }
    const columns = [
      {
        title: '组织',
        dataIndex: this.props.defaultKey.name,
        key: this.props.defaultKey.name,
        width: 105,
        fixed: 'left'
      },
      {
        title: this.title(),
        children: children
      },
      {
        title: '汇总',
        dataIndex: 'total',
        key: 'total',
        width: 60,
        className: styles.txRight,
        fixed: 'right',
        render: (text, record, index) => {
          const length = totalLength;
          return (
            this.state.checkedId == record[this.props.defaultKey.id] && this.state.currentIndex == length && this.props.isChecked ? <BISelectCell text={text} onClick={(e) => { this.cellClick(record, length, 'total') }} /> : <BIContrastCell key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, length, 'total') }} nums={record.values} text={text} />
          )
        }
      }

    ]
    return columns;
  }
  componentDidMount() {
    const tableWidth = document.getElementById("tableWrap").offsetWidth;
    const scrollWidth = tableWidth - 105 - 60;
    this.setState({
      scrollWidth
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
