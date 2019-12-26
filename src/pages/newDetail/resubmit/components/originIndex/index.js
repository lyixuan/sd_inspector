import React from 'react';
import { connect } from 'dva';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import styles from './styles.less';
import { Tooltip } from 'antd';

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
        ellipsis: true,
        title: '原产品包',
        dataIndex: 'packageName',
        key: 'packageName',
        render: (packageName, record) => {
          return (
            <Tooltip title={packageName}>{packageName}</Tooltip>
          );
        },
      },
      {
        title: '续报单量',
        dataIndex: 'itemCount',
        key: 'itemCount',
      },
      {
        title: '续报流水',
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
      style={{ width: 'calc(50% - 12px)' }}
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
