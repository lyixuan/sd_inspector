import React from 'react';
import { Table } from 'antd';
import styles from './style.less';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import moment from 'moment';

const { Option } = BISelect;
class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeValue: '',
    };
  }
  columnsData = () => {
    const columns = [
      {
        title: '存档时间',
        dataIndex: 'effectMonth',
        width: 200,
        key: 'effectMonth',
      },
      {
        title: '已存档绩效包',
        dataIndex: 'isShow',
        width: 200,
        key: 'isShow',
      },
      {
        title: '操作人',
        dataIndex: 'isShow',
        width: 100,
        key: 'isShow',
      },
      {
        title: '状态',
        dataIndex: 'operation',
        render: (text, record) => {
          // const { isShowState } = record;
          // const titleObj = { 1: '是否设置为前端不可查看?', 0: '是否设置为前端可查看?' };
          return <div>11</div>;
        },
      },
    ];
    return columns;
  };

  // 存档
  handleArchive = () => {
    // 请求
    const { changeValue } = this.state;
    const currentTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const user = localStorage.getItem('admin_user') && JSON.parse(localStorage.getItem('admin_user')).userName;
    console.log(currentTime, changeValue, user);
  };

  // 获取绩效包周期
  formValChange = (val, key) => {
    this.setState({
      changeValue: '2019-08-29至2019-09-28',
    });
  };
  render() {
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];

    return (
      <div className={styles.archiveWrap}>
        <h2 className={styles.title}>创收绩效存档</h2>
        <div className={styles.line}>
          <div>
            <span>需存档的绩效包:</span>
            <BISelect
              placeholder="学院"
              style={{ width: 190, margin: '0 30px 0 10px' }}
              labelInValue
              onChange={val => this.formValChange(val)}
            >
              <Option key={1}>1</Option>
              <Option key={2}>3</Option>
            </BISelect>
            <BIButton onClick={this.handleArchive} style={{ padding: '0 25px', marginRight: 10 }}>
              存档
            </BIButton>
            <BIButton type="primary" onClick={this.handleArchiveStop}>
              取消存档
            </BIButton>
          </div>
          <div className={styles.archiveTable}>
            <Table
              bordered
              dataSource={dataSource}
              columns={this.columnsData()}
              useFixedHeader
              scroll={{ y: 300 }}
              pagination={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Archive;
