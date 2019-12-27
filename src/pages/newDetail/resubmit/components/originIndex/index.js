import React from 'react';
import { connect } from 'dva';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { Tooltip } from 'antd';
import styles from './style.less';

@connect(({ resubmitModal }) => ({
  originData: resubmitModal.originData,
}))
class OriginIndex extends React.Component {
  columns = () => {
    const columns = [
      {
        title: '学员id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        ellipsis: true,
        width: '40%',
        title: '原产品包',
        dataIndex: 'packageName',
        key: 'packageName',
        render: (text, record) => {
          return (
            <Tooltip title={text}>{text}</Tooltip>
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
        <div className={styles.originIndex}>
          <BIScrollbarTable
            columns={this.columns()}
            dataSource={this.props.originData || []}
            pagination={false}
            loading={this.props.loading}
            onRow={this.onClickRow}
            rowKey={record => record.id}
            scroll={{ y: 240 }}
            name='originIndex'
          />
        </div>
    </BIContainer>
    );
  }
}

export default OriginIndex;
