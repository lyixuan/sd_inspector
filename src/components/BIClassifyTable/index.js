import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import styles from './style.less';

const titleList = ['所有分类', '产品方向', '产品使用', '产品使用']
const titleList2 = ['版本更新1', '版本更新2', '版本更新3', '版本更新4', '版本更新4']
const dataSource = [{
  orgId: 1,
  orgName: '组织名称1',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 55],
  total: 340
}, {
  orgId: 2,
  orgName: '组织名称2',
  groupType: 'group',
  values: [12, 3.4, 55, 34, 55],
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
      checked: false
    }
  }
  title = () => {
    return (
      <div>
        {titleList.map(item => {
          return <span onClick={this.handleClassifyClick} style={{ cursor: 'pointer', color: '#00CCC3' }}>{item}/</span>
        })}
        <span></span>
      </div>
    )
  }
  handleClassifyClick = () => {
    console.log(53)
  }
  cellClick = (e) => {
    console.log(55, e)
    // this.setState({
    //   checked: !this.state.checked
    // })
  }

  columns = () => {
    const children = [];
    console.log(65, dataSource)
    titleList2.map((item, index) => {
      children.push({
        title: item,
        dataIndex: 'index',
        key: 'index',
        width: 85,
        className: styles.txRight,
        render: (text, record) => {
          console.log(1112, record)
          return (
            <BIContrastCell onClick={this.cellClick} nums={dataSource[index].values} text={dataSource[index].values[index]} />
            // this.state.checked ? <BISelectCell text={text} onClick={this.cellClick} /> : <BIContrastCell onClick={this.cellClick} nums={dataSource[index].values} text={dataSource[index].values[index]} />
          )
        },
      })
    })
    children.push({
      title: '-',
      dataIndex: 'companyName',
      className: styles.txRight,
      key: 'companyName',
      render: (text, record) => {
        return <BISelectCell>-</BISelectCell>
      },
    })
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
        dataIndex: 'gender',
        key: 'gender',
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
  render() {
    return (
      <div className={styles.tableWrap}>
        <BITable
          pagination={false}
          columns={this.columns()}
          samlled
          bordered
          dataSource={dataSource}
        />
      </div>
    );
  }
}

export default BIClassifyTable;
