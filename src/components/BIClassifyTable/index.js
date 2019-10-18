import React from 'react';
import BITable from '@/ant_components/BITable';
import BIContrastCell from '@/components/BIContrastCell';
import BISelectCell from '@/components/BISelectCell';
import styles from './style.less';

const dataSource = [{
  key: 1,
  name: 'Johwn',
  age: 12,
  street: 'Lake Park',
  building: 'C',
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLake Co',
  gender: 'M',
}, {
  key: 2,
  name: 'John Brown',
  age: 13,
  street: 'Lake Park',
  building: 'C',
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftLaa',
  gender: 'M',
}, {
  key: 3,
  name: 'John Brown',
  age: 14,
  street: 'Lake Park',
  building: 'C',
  number: 2035,
  companyAddress: 'Lake Street 42',
  companyName: 'SoftL',
  gender: 'M',
}];


class BIClassifyTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      checked: false
    }
  }
  title = () => {
    return (
      <div>选择分类：所有分类/产品方向/产品使用/产品使用/<span style={{ cursor: 'pointer', color: '#00CCC3' }} onClick={this.handleClassifyClick}>aaa</span></div>
    )
  }
  handleClassifyClick = () => {
    console.log(53)
  }
  cellClick = (e) => {
    console.log(55, e)
    this.setState({
      checked: !this.state.checked
    })
  }

  columns = () => {
    const columns = [
      {
        title: '组织',
        dataIndex: 'name',
        key: 'name',
        width: 105,
        fixed: 'left'
      },
      {
        title: this.title(),
        children: [
          {
            title: '版本更新',
            dataIndex: 'companyAddress',
            key: 'companyAddress',
            width: 85,
            className: styles.txRight,
            render: (text, record) => {
              return (
                this.state.checked ? <BISelectCell text={text} onClick={this.cellClick} /> : <BIContrastCell onClick={this.cellClick} nums={[-0.55, 4.50, -1.10, -1.62, 0, 5.23]} text={5.23} />
              )
            },
          },
          {
            title: '版本更新2',
            dataIndex: 'companyName',
            width: 85,
            className: styles.txRight,
            key: 'companyName',
            render: (text, record) => {
              return <BIContrastCell nums={[-0.55, 4.50, -1.10, -1.62, 0, 5.23]} text={4.50} />
            },
          },
          {
            title: '版本更新3',
            dataIndex: 'companyName',
            width: 85,
            className: styles.txRight,
            key: 'companyName',
            render: (text, record) => {
              return <BISelectCell text={13} />
            },
          },
          {
            title: '版本更新2',
            dataIndex: 'companyName',
            width: 85,
            className: styles.txRight,
            key: 'companyName',
            render: (text, record) => {
              return <BIContrastCell nums={[-0.55, 4.50, -1.10, -1.62, 0, 5.23]} text={4.50} />
            },
          },
          {
            title: '版本更新2',
            dataIndex: 'companyName',
            className: styles.txRight,
            key: 'companyName',
            render: (text, record) => {
              return <BIContrastCell nums={[-0.55, 4.50, -1.10, -1.62, 0, 5.23]} text={4.50} />
            },
          },
        ],
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
