import React from 'react';
import { connect } from 'dva';
import CommonForm from '../../components/commonForm';
import styles from './style.less';
@connect(({ loading }) => ({
  loading,
  submitLoading: loading.effects['qualityNewSheet/addQuality']
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
  }
  render() {
    return (
      <div className={styles.qualityContainter}>
      <CommonForm {...this.props} onSubmit={this.onSubmit} formType="quality" actionType="create">
      </CommonForm>
    </div>)
  }
}
export default CreateQualityNewSheet;
