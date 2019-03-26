import React from 'react';
import { connect } from 'dva';
import CommonForm from '../../components/commonForm';

@connect(({ loading }) => ({
  loading
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
    const { qualityDetail = {} } = this.props.qualityNewSheet;
    const { orderDetail, qualityAudit, ...others } = qualityDetail;
    return (<div>
      <CommonForm {...this.props} onSubmit={this.onSubmit} dataSource={{ ...others }}>

      </CommonForm>
    </div>)
  }
}
export default CreateQualityNewSheet;