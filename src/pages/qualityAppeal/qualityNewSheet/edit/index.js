import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';
import styles from './style.less';
import router from 'umi/router';

@connect(({ loading, qualityAppealHome, qualityNewSheet }) => ({
  loading,
  qualityAppealHome,
  qualityNewSheet,
  pageLoading: loading.effects['qualityAppealHome/getQualityDetailData']
}))

class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.getQualityDetailData();
  }
  getQualityDetailData = () => {
    const { location: { query }} = this.props;
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: query,
    }).then((res)=>{
      if(res) {
        this.props.dispatch({
          type: 'qualityAppealHome/saveOrderNumData',
          payload: { orderNumData: res.orderDetail },
        });
      }
    });
  };
  onSubmit = params => {
    this.props.dispatch({
      type: 'qualityNewSheet/updateQuality',
      payload: { ...params },
    }).then((res)=>{
      res && router.goBack();
    });
  };

  render() {
    const { QualityDetailData = {} } = this.props.qualityAppealHome;
    const { qualityAudit, ...others } = QualityDetailData;

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.qualityContainter}>
          <FormIndex params={{ ...others }}
                     onSubmit={this.onSubmit}/>
        </div>
      </Spin>
    );
  }
}

export default EditQualityNewSheet;
