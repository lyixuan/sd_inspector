import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIContainer from '@/components/BIContainer';
import BITotalTable from '@/pages/newDetail/components/BITotalTable';
import { getProText } from '@/pages/newDetail/components/utils/utils';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import styles from './style.less';

const ranks = {
  1: rank1,
  2: rank2,
  3: rank3,
}
@connect(({ resubmitModal, loading }) => ({
  paramsQuery: resubmitModal.paramsQuery || {},
  originData: resubmitModal.originData || [],
  loading: loading.effects['resubmitModal/getOriginPackageList'],
}))
class OriginIndex extends React.Component {
  columns = () => {
    const maxVal =  Math.max.apply(null, this.props.originData.map(item => item.itemAmount));
    const columns = [
      {
        title: '排名',
        dataIndex: 'rankNum',
        key: 'rankNum',
        render: text => <div className={styles.rankColumn}>
          {text > 3 ? text : <img src={ranks[text]} alt=''/>}
        </div> 
      },
      {
        ellipsis: true,
        width: '40%',
        title: '原产品包',
        dataIndex: 'packageName',
        key: 'packageName',
        render: text => <Tooltip title={text}>{text}</Tooltip>
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
        render: text => getProText(text, maxVal)
      },
    ];
    return columns || [];
  };
  onRowHandle = record => {
    return {
      onClick: () => {
        const flag = this.props.paramsQuery.originPackageName === record.packageName;
        this.props.onParamsChange(flag ? undefined : record.packageName, 'originPackageName')
      },
    }
  }
  render() {
    return (
      <BIContainer
      title="原产品包榜单"
      style={{ width: 'calc(50% - 12px)' }}
      >
        <div className={styles.originIndex}>
          <BITotalTable
            columns={this.columns()}
            dataSource={this.props.originData}
            pagination={false}
            loading={this.props.loading}
            rowKey={(record, index) => record.rankNum + index}
            scroll={{ y: 240 }}
            name='originIndex'
            onRow={record => this.onRowHandle(record)}
          />
        </div>
      </BIContainer>
    );
  }
}

export default OriginIndex;
