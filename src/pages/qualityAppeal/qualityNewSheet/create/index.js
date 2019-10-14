import React from 'react';
import { connect } from 'dva';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';
import styles from './style.less';

@connect(({ loading, qualityAppealHome }) => ({
  loading,
  qualityAppealHome,
  submitLoading: loading.effects['qualityNewSheet/addQuality'],
}))

class CreateQualityNewSheet extends React.Component {
  onSubmit = (params) => {
    this.props.dispatch({
      type: 'qualityNewSheet/addQuality',
      payload: { ...params },
    });
  };

  render() {
    return (
      <div className={styles.qualityContainter}>
        <FormIndex params={{}}
                  onSubmit={this.onSubmit}/>
      </div>);
  }
}

export default CreateQualityNewSheet;
