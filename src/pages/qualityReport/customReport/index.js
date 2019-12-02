import React from 'react';
import { connect} from 'dva';
import { message,Spin } from 'antd';

@connect(({ cubePlanDetail, cubePlan, loading }) => ({
  cubePlanDetail,
  cubePlan,
  pageLoading: loading.effects['cubePlanDetail/getCommentPage'],
  loadingBtn: loading.effects['cubePlanDetail/getCopyUrl'],
  loadingBtn2: loading.effects['cubePlanDetail/getCopyUrl'],
  loading:loading.effects['cubePlanDetail/getCommentPage']||loading.effects['cubePlanDetail/getCopyUrl'],
}))

class CustomReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {

    return (
      <Spin  spinning={false}>
        <div>
          CustomReport
      </div>
      </Spin>
    );
  }
}

export default CustomReport;
