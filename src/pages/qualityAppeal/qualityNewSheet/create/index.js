import React from 'react';
import { connect } from 'dva';
import BaseForm from '@/pages/qualityAppeal/components/BaseForm/form';
import styles from './style.less';

@connect(({ loading, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  submitLoading: loading.effects['qualityNewSheet/addQuality'],
  orgList: qualityAppealHome.orgList,
}))

class CreateQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
    };
  }

  getSubOrderDetail = (orderNum) => {
    this.props.dispatch({
      type: 'qualityAppealHome/getOrderNum',
      payload: { orderNum },
    });
  };

  changeDimension = (dimensionId,qualityType) => {
    this.props.dispatch({
      type: 'qualityAppealHome/queryDimensionTreeList',
      payload: { dimensionId,qualityType },
    });
  };
  onSubmit = (params) => {
    this.props.dispatch({
      type: 'qualityNewSheet/addQuality',
      payload: { ...params },
    });
  };

  render() {
    const { orgList, qualityAppealHome } = this.props;
    const { orderNumData,dimensionList1,dimensionList2,dimensionTreeList } = qualityAppealHome || {};
    return (
      <div className={styles.qualityContainter}>
        <BaseForm orgList={orgList}
                  orderNumData={orderNumData}
                  dimensionList1={dimensionList1}
                  dimensionList2={dimensionList2}
                  dimensionTreeList={dimensionTreeList}
                  params={null}
                  changeDimension={this.changeDimension}
                  getSubOrderDetail={this.getSubOrderDetail}
                  onSubmit={this.onSubmit}/>
      </div>);
  }
}

export default CreateQualityNewSheet;
