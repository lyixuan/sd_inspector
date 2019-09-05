import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import BITable from '@/ant_components/BITable'

class  currentCreditLeft extends React.Component {
  columns = () => {
    const columns = [
      {
        title: '学分维度',
        dataIndex: 'date',
        key: 'date',
      }, {
        title: '环比（%）',
        dataIndex: 'operator',
        key: 'operator',
      }, {
        title: '我的',
        dataIndex: 'operator1',
        key: 'operator1',
      },{
        title: '对比小组',
        dataIndex: 'operator2',
        key: 'operator2',
      }
    ];
    return columns || [];
  };
  render() {
    return (
          <div style = {{width: 'calc(100% - 496px)'}}>
            <BITable
              columns={this.columns()}
            >
            </BITable>
          </div>
    );
  }
}

export default currentCreditLeft;
