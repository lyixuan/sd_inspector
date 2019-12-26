import React from 'react';
import { connect } from 'dva';
import BIContainer from '@/components/BIContainer';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import { companyThousandsIncome } from '@/utils/utils';
import styles from './styles.less';
import { Tooltip } from 'antd';

@connect(({ resubmitModal }) => ({
  packageData: resubmitModal.packageData,
}))
class PackageIndex extends React.Component {
  columns = () => {
    const columns = [
      {
        title: '排名',
        dataIndex: 'id',
        key: 'id',
        width: '60px',
        render: (text, record) => {
          return (
            <div className={`${styles.rankColumn}`}>
              {record.id > 3 ? (
                <span className={styles.rankSpan}>{record.id}</span>
              ) : (
                <img className={styles.rank} src={`rank${record.id}`} alt=''/>
              )}
            </div>
          );
        },
      },
      {
        ellipsis: true,
        title: '浮动指数',
        dataIndex: 'floatingIndex',
        key: 'floatingIndex',
      },
      {
        title: '产品包名称',
        dataIndex: 'packageName',
        key: 'packageName',
        render: text => {
          return (
            <Tooltip title={text}>{text}</Tooltip>
          );
        },
      },
      {
        title: '创收单量',
        dataIndex: 'itemCount',
        key: 'itemCount',
      },
      {
        title: '创收流水',
        dataIndex: 'itemAmount',
        key: 'itemAmount',
      },
    ];
    return columns || [];
  };
  render() {
    return (
      <BIContainer
      title="续报热销榜单"
      style={{ width: 'calc(50% - 12px)' }}
      >
        <BIScrollbarTable
          columns={this.columns()}
          dataSource={this.props.packageData || []}
          pagination={false}
          loading={this.props.loading}
          onRow={this.onClickRow}
          rowKey={record => record.id}
          // scroll={{ y: 288 }}
        />
    </BIContainer>
    );
  }
}

export default PackageIndex;
