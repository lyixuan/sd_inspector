import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import searchIcon from '@/assets/xdCredit/search.png';
import styles from './style.less';


// const reasonTypeList = [{
//   typeId: 1,
//   typeName: '所有分类'
// }, {
//   typeId: 2,
//   typeName: '产品方向'
// }, {
//   typeId: 3,
//   typeName: '产品使用'
// }, {
//   typeId: 4,
//   typeName: '产品使用'
// }]
// const titleList2 = ['版本更新1', '版本更新2', '版本更新3', '版本更新4', '版本更新4']
// const dataSource = [{
//   id: 1,
//   name: '组织名称1',
//   groupType: 'group',
//   values: [1, 3.43, 15, 34, 45],
//   total: 340
// }, {
//   id: 2,
//   name: '组织名称2',
//   groupType: 'group',
//   values: [2, 3.41, 55, 34, 45],
//   total: 340
// }, {
//   id: 3,
//   name: '组织名称3',
//   groupType: 'group',
//   values: [3, 3.4, 55, 34, 55],
//   total: 340
// }, {
//   id: 4,
//   name: '组织名称4',
//   groupType: 'group',
//   values: [4, 3.4, 55, 34, 55],
//   total: 340
// }, {
//   id: 5,
//   name: '组织名称4',
//   groupType: 'group',
//   values: [5, 3.4, 55, 34, 55],
//   total: 340
// }]
class BIClassifyTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      checkedId: null,
      scrollWidth: 0
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
  cellClick = (record, index) => {
    console.log(84, record, index)
    this.setState({
      currentIndex: index,
      checkedId: record[this.props.defaultKey.id]
    })
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
        key: index,
        width: 85,
        className: styles.txRight,
        render: (text, record, indexs) => {
          return (
            this.state.checkedId == record[this.props.defaultKey.id] && this.state.currentIndex == index ? <BISelectCell key={index} text={dataSource[indexs].values[index]} onClick={(e) => { this.cellClick(record, index, e) }} /> : <BIContrastCell key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, index, e) }} nums={dataSource[indexs].values} text={dataSource[indexs].values[index]} />
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
            this.state.checkedId == record[this.props.defaultKey.id] && this.state.currentIndex == index ? <BISelectCell text={text} onClick={(e) => { this.cellClick(record, index) }} /> : <BIContrastCell key={index} colors={this.props.colors} onClick={(e) => { this.cellClick(record, index, e) }} nums={nums} text={text} />
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
        children: children,
      },
      {
        title: '汇总',
        dataIndex: 'total',
        key: 'total',
        width: 60,
        className: styles.txRight,
        fixed: 'right',
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
          rowKey={record => record.id}
          samlled
          bordered
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
        />
      </div>
    );
  }
}

export default BIClassifyTable;
