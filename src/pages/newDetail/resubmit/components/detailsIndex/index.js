import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import styles from './styles.less';

@connect(({ resubmitModal }) => ({
  originData: resubmitModal.originData,
}))
class DetailsIndex extends React.Component {
  columns = () => {
    const columns = [
      {
        title: '学员id',
        dataIndex: 'id',
        key: 'id',
        width: '60px',
      },
      {
        title: '学员姓名',
        dataIndex: 'packageName',
        key: 'packageName',
      },
      {
        title: '周期',
        dataIndex: 'itemCount',
        key: 'itemCount',
      },
      {
        title: '报名时间',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },
      {
        title: '学院',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },{
        title: '家族',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },{
        title: '小组',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },{
        ellipsis: true,
        title: '老产品包',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
        render: (text, record) => {
          return (
            <Tooltip title={text}>{text}</Tooltip>
          );
        },
      },{
        title: '续费产品包',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },{
        title: '净流水',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },
    ];
    return columns || [];
  };
  render() {
    return (
      <BIContainer 
      title="原产品包榜单"
      headStyle={{display: 'none'}}
      >
        <BIScrollbarTable
          columns={this.columns()}
          dataSource={this.props.originData || []}
          pagination={false}
          loading={this.props.loading}
          onRow={this.onClickRow}
          rowKey={record => record.id}
        />
    </BIContainer>
    );
  }
}

export default DetailsIndex;
