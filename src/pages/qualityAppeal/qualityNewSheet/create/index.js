import React from 'react';
import { connect } from 'dva';
import BaseForm from '@/pages/qualityAppeal/components/BaseForm/form';
import styles from './style.less';

@connect(({ loading }) => ({
  loading,
  submitLoading: loading.effects['qualityNewSheet/addQuality'],
}))
class CreateQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
    };
  }

  onSubmit = (params) => {
    this.props.dispatch({
      type: 'qualityNewSheet/addQuality',
      payload: { ...params },
    })
  };

  render() {
    return (
      <div className={styles.qualityContainter}>
      <BaseForm {...this.props} params={{}} onSubmit={this.onSubmit}/>
    </div>)
  }
}
export default CreateQualityNewSheet;
