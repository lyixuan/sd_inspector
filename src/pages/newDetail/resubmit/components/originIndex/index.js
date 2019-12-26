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

@connect(({ newDetailModal }) => ({
  newDetailModal,
}))
class Top extends React.Component {
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
        width: '100px',
        render: (incomeFlowKpi, record) => {
          const percent = record.incomeFlowKpiRatio * 100 + '%';
          const money = companyThousandsIncome(incomeFlowKpi);
          return <BIWrapperProgress
          text={money}
          percent={percent}
          propsStyle={{ flex: 'inherit', width: '70px', textAlign: 'right' }}
        />
        },
      },
    ];
    return columns || [];
  };
  render() {
    return (
      <BIContainer
      title="原产品包榜单"
      style={{ width: 'calc(50% - 12px)', marginBottom: '16px' }}
      >
        <BIScrollbarTable
          columns={this.columns()}
          dataSource={[]}
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

export default Top;
