import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import searchIcon from '@/assets/xdCredit/search.png';
import styles from './style.less';

const colors = ['rgba(255, 89, 89, 1)', 'rgba(255, 89, 89, 0.8)', 'rgba(255, 89, 89, .6)', 'rgba(255, 89, 89, .5)', 'rgba(255, 89, 89, .4)', 'rgba(255, 89, 89, .3)']
const reasonTypeList = [{
  typeId: 1,
  typeName: '所有分类'
}, {
  typeId: 2,
  typeName: '产品方向'
}, {
  typeId: 3,
  typeName: '产品使用'
}, {
  typeId: 4,
  typeName: '产品使用'
}]
const titleList2 = ['版本更新1', '版本更新2', '版本更新3', '版本更新4', '版本更新4']
const dataSource = [{
  orgId: 1,
  orgName: '组织名称1',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 45],
  total: 340
}, {
  orgId: 2,
  orgName: '组织名称2',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 45],
  total: 340
}, {
  orgId: 3,
  orgName: '组织名称3',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 55],
  total: 340
}, {
  orgId: 4,
  orgName: '组织名称4',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 55],
  total: 340
}, {
  orgId: 5,
  orgName: '组织名称4',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 55],
  total: 340
}]
class BIClassifyTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      checked: false,
      scrollWidth: 0
    }
  }
  title = () => {
    return (
      <div>
        {reasonTypeList.map((item, index) => {
          const condition = index === reasonTypeList.length - 1;
          return <span key={index} onClick={condition ? null : this.handleClassifyClick} className={condition ? styles.titleCurrent : styles.title}>{item.typeName}{condition ? '' : '/'}</span>
        })}
        <span></span>
      </div>
    )
  }
  handleClassifyClick = () => {
    console.log(53)
  }
  cellClick = (e, record) => {
    console.log(55, record)
    this.setState({
      checked: !this.state.checked
    })
  }

  columns = () => {
    const children = [];
    let repairArr = 0
    if (this.state.scrollWidth > titleList2.length * 85) {
      repairArr = Math.ceil((this.state.scrollWidth - titleList2.length * 85) / 85)
    }
    titleList2.map((item, index) => {
      children.push({
        title: <div>{item}<img src={searchIcon}></img></div>,
        dataIndex: 'index',
        key: index,
        width: 85,
        className: styles.txRight,
        render: (text, record) => {
          return (
            this.state.checked ? <BISelectCell key={index} text={dataSource[index].values[index]} onClick={this.cellClick} /> : <BIContrastCell key={index} colors={colors} onClick={this.cellClick} nums={dataSource[index].values} text={dataSource[index].values[index]} />
          )
        },
      })
    })

    if (repairArr > 0) {
      for (let i = 0; i < repairArr; i++) {
        children.push({
          title: '-',
          dataIndex: 'companyName',
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
        dataIndex: 'orgName',
        key: 'orgName',
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
  onCellClick() {
    console.log(1166)
  }
  componentDidMount() {
    const tableWidth = document.getElementById("tableWrap").offsetWidth;
    const scrollWidth = tableWidth - 105 - 60;
    console.log(138)
    this.setState({
      scrollWidth
    })
  }
  render() {
    return (
      <div className={styles.tableWrap} id="tableWrap">
        <BITable
          pagination={false}
          columns={this.columns()}
          rowKey={record => record.orgId}
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
