import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIContainer from '@/components/BIContainer';
import BITotalTable from '@/pages/newDetail/components/BITotalTable';
import { getProText } from '@/pages/newDetail/components/utils/utils';
import rank1 from '@/assets/xdFamily/rank1.png';
import rank2 from '@/assets/xdFamily/rank2.png';
import rank3 from '@/assets/xdFamily/rank3.png';
import float1 from '@/assets/up.png';
import float2 from '@/assets/down.png';
import float0 from '@/assets/flat.png';
import styles from './style.less';

const ranks = {
  1: rank1,
  2: rank2,
  3: rank3,
}
const floats = {
  0: float0,
  1: float1,
  2: float2,
}
@connect(({ resubmitModal, loading }) => ({
  packageData: resubmitModal.packageData || [],
  loading: loading.effects['resubmitModal/getPackageList'],
}))
class PackageIndex extends React.Component {
  columns = () => {
    const maxVal =  Math.max.apply(null, this.props.packageData.map(item => item.itemAmount));
    const columns = [
      {
        title: '排名',
        dataIndex: 'rankNum',
        key: 'rankNum',
        width: '60px',
        render: text => <div className={styles.rankColumn}>
          {text > 3 ? text : <img src={ranks[text]} alt=''/>}
        </div>
      },
      {
        ellipsis: true,
        title: '浮动指数',
        dataIndex: 'floatingIndex',
        key: 'floatingIndex',
        render: text => {
          const falg = text === 0 ? 0 : (text > 0 ? 1 : 2);
          return <div className={`${styles.markColumn} ${styles['markColumn' + falg]}`}>
          <img src={floats[falg]} alt=''/>
          <span>{Math.abs(text)} </span>
        </div>
        }
      },
      {
        ellipsis: true,
        width: '30%',
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
        render: text => getProText(text, maxVal)
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
        <div className={styles.packageIndex}>
          <BITotalTable
            columns={this.columns()}
            dataSource={this.props.packageData}
            pagination={false}
            loading={this.props.loading}
            rowKey={(record, index) => record.rankNum + index}
            scroll={{ y: 240 }}
            name='packageIndex'
            onRow={ record => {
              return {
                onClick: event => this.props.onParamsChange(record.packageName, 'packageName')
              }
            }}
          />
        </div>
      </BIContainer>
    );
  }
}

export default PackageIndex;
