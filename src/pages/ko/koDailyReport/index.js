import React from 'react';
import jwt from 'jsonwebtoken'
import { Skeleton } from 'antd';

// const METABASE_SITE_URL = "http://m-bd.ministudy.com";
const METABASE_SITE_URL = "http://s.bd.ministudy.com";
const METABASE_SECRET_KEY = "361bab48a014bcfca3f2290216eea29d6842ba567a9a0f8f79c60cb3435bb8a9";

class metaBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeUrl: ''
    };
  }
  componentDidMount() {
    const payload = {
      resource: { dashboard: 101 },
      params: { }
    };
    const token = jwt.sign(payload, METABASE_SECRET_KEY);
    this.setState({
      iframeUrl: METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true"
    })
  }
  render() {
    const { iframeUrl } = this.state;
    return (
      <Skeleton loading={this.props.loading} active>
        {iframeUrl && <iframe
          src={this.state.iframeUrl}
          frameBorder="0"
          width="100%"
          height="2540"
          // allowTransparency
        ></iframe>}
      </Skeleton>
    );
  }
}

export default metaBase;
