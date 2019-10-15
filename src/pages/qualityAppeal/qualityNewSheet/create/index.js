import React from 'react';
import { connect } from 'dva';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';
import styles from './style.less';
import router from 'umi/router';

@connect(({ loading, qualityNewSheet }) => ({
  loading,
  qualityNewSheet,
}))

class CreateQualityNewSheet extends React.Component {
  onSubmit = (params) => {
    this.props.dispatch({
      type: 'qualityNewSheet/addQuality',
      payload: { ...params },
    }).then((res)=>{
      res && router.goBack();
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
