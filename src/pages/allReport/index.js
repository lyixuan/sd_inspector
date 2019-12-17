import React from 'react';
import { connect } from "dva";
import jwt from 'jsonwebtoken';
import { Skeleton } from 'antd';

@connect(({ loading }) => ({
  loading: loading.effects['reportPlan/getReportMessage'],
}))
class metaBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeUrl: ''
    };
  }
  componentDidMount() {
    this.getReportMessage();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.match) !== JSON.stringify(this.props.match)) {
      this.getReportMessage(nextProps.match.params.siteKey);
    }
  }
  getReportMessage = (siteKey = this.props.match.params.siteKey) => {
    this.props.dispatch({
      type: 'reportPlan/getReportMessage',
      payload: { siteKey },
      callback: (res) => this.getIframeUrl(res)
    });
  }
  getIframeUrl = (res) => {
    if (res.siteType === 1) {
      const payload = {
        resource: { dashboard:  Number(res.dashboard) },
        params: res.params ? JSON.parse(res.params): {}
      };
      const token = jwt.sign(payload, res.secretKey);
      this.setState({
        iframeUrl: res.siteUrl + "/embed/dashboard/" + token + "#bordered=true&titled=true"
      })
    } else {
      this.setState({
        iframeUrl: res.siteUrl
      })
    }
  }
  render() {
    const { iframeUrl } = this.state;
    return (
      <Skeleton loading={this.props.loading !== false} active>
        <iframe
          src={iframeUrl}
          frameBorder="0"
          width="100%"
          height="3600"
          // allowTransparency
        ></iframe>
      </Skeleton>
    );
  }
}

export default metaBase;
