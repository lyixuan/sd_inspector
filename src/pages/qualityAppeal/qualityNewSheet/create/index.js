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
    console.log(params)
  }
  render() {
    return (<div>
      <CommonForm {...this.props} onSubmit={this.onSubmit}>
      </CommonForm>
    </div>)
  }
}
export default CreateQualityNewSheet;